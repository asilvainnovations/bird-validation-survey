// src/pages/Index.tsx
// App.tsx already wraps every route (this one included) in a single shared
// <AppLayout>. Wrapping AppLayout again here would double-render the header,
// footer, and floating badges every time someone visits "/" — this is a
// silent bug: both wrap attempts are individually valid TypeScript (AppLayout
// legitimately accepts children), so neither npm run typecheck nor npm run
// build catches it. It only shows up by looking at the rendered page. This
// page renders only its own content and lets App.tsx's shared layout do the
// rest.
import React from 'react';
import SurveyWizard from '@/components/strategic/SurveyWizard';

const Index: React.FC = () => {
  return <SurveyWizard />;
};

export default Index;
