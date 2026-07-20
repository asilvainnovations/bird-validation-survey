import { supabase } from "./supabase";
import type { SurveySchemaType } from "./survey-schema";

export interface SubmitResult {
  success: boolean;
  responseId?: string;
  error?: string;
  fallback?: "localStorage";
}

export async function submitSurvey(data: SurveySchemaType): Promise<SubmitResult> {
  try {
    // 1. Attempt Supabase Edge Function submission
    const { data: responseData, error } = await supabase.functions.invoke("survey-submit", {
      body: data, // Pass the entire validated object; no manual mapping needed
    });

    if (error) {
      throw error;
    }

    // 2. Clear localStorage backup on successful submission
    localStorage.removeItem("bird_survey_draft");
    
    return { success: true, responseId: responseData?.id };
  } catch (err) {
    console.error("Survey submission failed, falling back to localStorage:", err);
    
    // 3. Fallback to localStorage queue for offline resilience
    try {
      const existingDraft = localStorage.getItem("bird_survey_draft");
      const queue = existingDraft ? JSON.parse(existingDraft) : [];
      queue.push({
        data,
        timestamp: new Date().toISOString(),
        attempts: 1,
      });
      localStorage.setItem("bird_survey_draft", JSON.stringify(queue));
    } catch (storageErr) {
      console.error("Failed to save to localStorage:", storageErr);
    }

    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown submission error",
      fallback: "localStorage",
    };
  }
}

// Optional: Utility to retry queued submissions when connectivity is restored
export async function flushSurveyQueue(): Promise<void> {
  const draft = localStorage.getItem("bird_survey_draft");
  if (!draft) return;

  try {
    const queue = JSON.parse(draft);
    if (!Array.isArray(queue) || queue.length === 0) return;

    const failedQueue = [];
    for (const item of queue) {
      const result = await submitSurvey(item.data);
      if (!result.success) {
        failedQueue.push({ ...item, attempts: item.attempts + 1 });
      }
    }

    if (failedQueue.length === 0) {
      localStorage.removeItem("bird_survey_draft");
    } else {
      localStorage.setItem("bird_survey_draft", JSON.stringify(failedQueue));
    }
  } catch (err) {
    console.error("Failed to flush survey queue:", err);
  }
}
