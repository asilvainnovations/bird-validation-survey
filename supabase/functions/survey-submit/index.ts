import { withSupabase } from 'npm:@supabase/server'

const ALLOWED_ORIGINS = new Set([
  'http://localhost:5173',
  'http://localhost:8080',
  'https://bird-validation-survey.bolt.host',
  'https://bird-app.bolt.host',
  'https://asilvainnovations.com',
  'https://asilvainnovations.github.io/bird-validation-survey/public/',
  'https://asilvainnovations.github.io/BIRD-2026-2035/public/',
])

const corsHeadersDynamic = (origin: string | null) => ({
  'Access-Control-Allow-Origin':
    origin && ALLOWED_ORIGINS.has(origin) ? origin : Array.from(ALLOWED_ORIGINS)[0],
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
})

export default withSupabase({ auth: 'user' }, async (req, ctx) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeadersDynamic(req.headers.get('Origin')) })
  }

  try {
    const payload = await req.json()

    if (payload?.q01_consent_participate !== true && payload?.consent_final !== true) {
      return new Response(
        JSON.stringify({ error: 'Consent is required to submit the survey.' }),
        {
          status: 400,
          headers: {
            ...corsHeadersDynamic(req.headers.get('Origin')),
            'Content-Type': 'application/json',
          },
        }
      )
    }

    const { data, error } = await ctx.supabase
      .from('survey_responses')
      .insert(payload)
      .select('id')
      .single()

    if (error) {
      console.error('Database insertion error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to save survey response.', details: error.message }),
        {
          status: 500,
          headers: {
            ...corsHeadersDynamic(req.headers.get('Origin')),
            'Content-Type': 'application/json',
          },
        }
      )
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: {
        ...corsHeadersDynamic(req.headers.get('Origin')),
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    console.error('Edge function error:', err)
    return new Response(
      JSON.stringify({ error: 'Internal server error.' }),
      {
        status: 500,
        headers: {
          ...corsHeadersDynamic(req.headers.get('Origin')),
          'Content-Type': 'application/json',
        },
      }
    )
  }
})
