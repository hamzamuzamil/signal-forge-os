
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are SignalOS, an AI noise filter for startup founders. Analyze the provided content and classify each item as either 'signal' (high-value, actionable) or 'noise' (low-value, distracting).

For each item, provide:
1. signalType: "signal" or "noise"
2. score: 0-100 (0 = pure noise, 100 = critical signal)
3. category: Brief category (e.g., "Fundraising", "Product", "Team", "Marketing", etc.)
4. summary: One-line summary of why this matters
5. suggestedAction: "read", "save", or "ignore"

Return as JSON array with this structure:
{
  "signals": [
    {
      "id": "unique-id",
      "content": "original content text",
      "signalType": "signal" | "noise",
      "score": number,
      "category": "string",
      "summary": "string",
      "suggestedAction": "read" | "save" | "ignore"
    }
  ]
}

Focus on startup-relevant signals: funding opportunities, customer feedback, competitive intel, team updates, product insights, market trends, partnership opportunities.`
          },
          {
            role: 'user',
            content: `Please analyze this content and filter for signals vs noise:\n\n${content}`
          }
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    let result;
    
    try {
      result = JSON.parse(data.choices[0].message.content);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      result = {
        signals: [{
          id: crypto.randomUUID(),
          content: content.substring(0, 200),
          signalType: "signal",
          score: 75,
          category: "General",
          summary: "Content analyzed by AI filter",
          suggestedAction: "read"
        }]
      };
    }

    // Ensure each signal has an ID
    if (result.signals) {
      result.signals = result.signals.map((signal: any) => ({
        ...signal,
        id: signal.id || crypto.randomUUID()
      }));
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in filter-signals function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
