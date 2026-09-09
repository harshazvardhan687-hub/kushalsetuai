import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Gemini client getter
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
  res.json({ status: 'ok', hasGeminiKey: hasKey });
});

// API: Diagnostic and Operational Analysis
app.post('/api/gemini/analyze', async (req, res) => {
  const { problemTitle, businessType, description, language = 'en', metrics } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    return res.json({
      fallback: true,
      message: 'Using Smart Intelligent Simulation Engine (Gemini API key not provided in Secrets).',
    });
  }

  try {
    const prompt = `You are a Chief Enterprise Retail & Micro-Commerce Operations Strategist advising an independent general retail store, commercial merchandise enterprise, or community cooperative.
Treat the merchant with deep professional respect, dignity, and enterprise-grade rigor. Never use condescending or cheap terminology.
Language target: ${language} (if 'te' output in professional Telugu with English terms in parentheses where helpful; if 'hi' output in Hindi; if 'en' output in English).

Business Profile: ${businessType || 'General Retail & Commercial Store'}
Problem / Challenge: ${problemTitle}
Context / Operations Details: ${description}
Operational Metrics: ${JSON.stringify(metrics || {})}

Provide a structured, rigorous, enterprise-grade strategic diagnostic report in JSON format with:
{
  "executiveSummary": "Concise high-level strategic diagnosis",
  "rootCauseAnalysis": ["Key systemic bottleneck 1", "Key systemic bottleneck 2", "Key systemic bottleneck 3"],
  "financialImpact": {
    "cashFlowImpact": "Estimated liquidity strain or working capital trap",
    "projectedRecovery": "Expected percentage or rupee margin recovery within 60-90 days",
    "roiTimeline": "e.g., 45-60 Days"
  },
  "actionPlan": [
    {
      "phase": "Immediate (Days 1-7)",
      "title": "Action title",
      "steps": ["Step 1", "Step 2"],
      "expectedOutcome": "Tangible operational milestone"
    },
    {
      "phase": "Medium Term (Days 8-30)",
      "title": "Action title",
      "steps": ["Step 1", "Step 2"],
      "expectedOutcome": "Tangible operational milestone"
    },
    {
      "phase": "Systemic Scale (Days 31-90)",
      "title": "Action title",
      "steps": ["Step 1", "Step 2"],
      "expectedOutcome": "Tangible operational milestone"
    }
  ],
  "negotiationScript": "Professional dignified script for speaking with distributors, suppliers, or institutional partners",
  "audioSummaryText": "A warm, dignified, empowering 2-3 sentence verbal briefing suitable for audio text-to-speech playback to the merchant in ${language}."
}
Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed, engine: 'gemini-3.8-flash' });
  } catch (error: any) {
    console.error('Gemini analyze error:', error);
    return res.status(200).json({
      fallback: true,
      error: error?.message || 'Error executing AI analysis',
    });
  }
});

// API: Interactive Mentor Chat
app.post('/api/gemini/mentor-chat', async (req, res) => {
  const { messages, currentContext, language = 'en' } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    return res.json({
      fallback: true,
      message: 'Using Smart Intelligent Simulation Engine for mentor advice.',
    });
  }

  try {
    const formattedHistory = (messages || []).map((m: any) => `${m.role === 'user' ? 'Merchant' : 'Advisor'}: ${m.content}`).join('\n');
    const prompt = `You are a Senior Retail Operations & Enterprise Finance Mentor.
You are counseling an independent retail merchant, general store operator, or community NGO enterprise manager.
Tone: Highly respectful, empowering, practical, dignified, executive-level retail expertise.
Language instruction: Respond in ${language === 'te' ? 'Telugu (తెలుగు)' : language === 'hi' ? 'Hindi (हिंदी)' : 'English'}.
Current store context: ${JSON.stringify(currentContext || {})}

Dialogue History:
${formattedHistory}

Provide a direct, practical response addressing the merchant's latest query. Include:
1. Direct strategic recommendation.
2. 2-3 specific action items or phrasing they can immediately deploy.
3. 2 concise suggested follow-up questions they might ask next.
Format your output as JSON:
{
  "replyText": "Full formatted response with clear paragraphs",
  "audioSummary": "1-2 crisp spoken sentences for immediate audio text-to-speech playback",
  "suggestedFollowUps": ["Follow up 1", "Follow up 2"]
}
Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed, engine: 'gemini-3.8-flash' });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    return res.status(200).json({
      fallback: true,
      error: error?.message || 'Error running mentor chat',
    });
  }
});

// API: Custom SkillProof Challenge Generation
app.post('/api/gemini/generate-challenge', async (req, res) => {
  const { topic, difficulty = 'Intermediate', language = 'en' } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    return res.json({
      fallback: true,
      message: 'Using Smart Simulation Engine challenge pool.',
    });
  }

  try {
    const prompt = `Generate a realistic, high-stakes operational retail simulation challenge for a general store merchant or retail enterprise manager.
Topic: ${topic || 'Supplier Negotiation & Working Capital Defense'}
Difficulty: ${difficulty}
Language: ${language}

Produce a JSON object with:
{
  "id": "challenge-${Date.now()}",
  "title": "Concise professional scenario title",
  "domain": "e.g., Working Capital, Inventory Logistics, Supplier Relations, or Credit Risk",
  "scenario": "A detailed 3-paragraph commercial scenario describing an urgent decision facing the merchant (e.g., bulk discount versus liquidity risk)",
  "financialContext": {
    "availableCash": "₹1,20,000",
    "creditOwed": "₹85,000",
    "weeklyTurnover": "₹1,50,000"
  },
  "options": [
    {
      "id": "A",
      "text": "Strategic Choice A",
      "financialScore": 85,
      "riskScore": 60,
      "relationshipScore": 90,
      "explanation": "Detailed strategic rationale for this decision"
    },
    {
      "id": "B",
      "text": "Strategic Choice B",
      "financialScore": 65,
      "riskScore": 90,
      "relationshipScore": 70,
      "explanation": "Detailed strategic rationale for this decision"
    },
    {
      "id": "C",
      "text": "Strategic Choice C",
      "financialScore": 95,
      "riskScore": 75,
      "relationshipScore": 85,
      "explanation": "Detailed strategic rationale for this decision"
    }
  ],
  "bestOptionId": "C",
  "executiveDebrief": "Mastery summary explaining the optimal commercial strategy"
}
Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed, engine: 'gemini-3.8-flash' });
  } catch (error: any) {
    console.error('Gemini challenge error:', error);
    return res.status(200).json({
      fallback: true,
      error: error?.message || 'Error generating challenge',
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Retail Enterprise Advisory Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
