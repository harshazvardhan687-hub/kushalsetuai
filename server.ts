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

// 1. MODULE 2: PROBLEM READINESS AI
app.post('/api/gemini/problem-readiness', async (req, res) => {
  const { problemDescription, organizationType, location, language = 'en' } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    return res.json({ fallback: true, message: 'Using KaushalSetu Smart Readiness Evaluator' });
  }

  try {
    const prompt = `You are the "Problem Readiness AI" for KaushalSetu AI (Local Problem-to-Employment Platform).
Your role: Evaluate a local problem submitted by an organization (e.g., Kirana store, small business, NGO, school, clinic in ${location || 'Vizianagaram, AP'}).
Analyze:
1. Problem Clarity (Is the bottleneck well understood?)
2. Safety for Student (Is it safe for college students? No hazardous physical or illegal work)
3. Student Solvability (Can an ambitious student solve this with digital skills/Excel/coding/design?)
4. Measurability (Can we measure before vs after impact?)
5. Mission Readiness Score (0 to 100%)

Problem: "${problemDescription}"
Organization: "${organizationType || 'Kirana & Local Retail'}"
Language: ${language}

Output format in JSON only:
{
  "readiness_score": 92,
  "clarity_score": 95,
  "safety_score": 100,
  "solvability_score": 94,
  "measurability_score": 90,
  "is_mission_ready": true,
  "category": "Retail & Inventory Management",
  "ai_verdict": "Clear, safe, and highly solvable student mission.",
  "clarification_questions": [
    "Approximately how many total products/items need to be tracked?",
    "Will the merchant view the solution on an Android phone or computer?"
  ]
}
Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed, engine: 'gemini-3.8-flash' });
  } catch (err: any) {
    return res.status(200).json({ fallback: true, error: err?.message });
  }
});

// 2. MODULE 3: AI MISSION GENERATOR
app.post('/api/gemini/mission-generator', async (req, res) => {
  const { problemDescription, organizationName, location, category } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    return res.json({ fallback: true, message: 'Using KaushalSetu Mission Generator Engine' });
  }

  try {
    const prompt = `You are the "AI Mission Generator" for KaushalSetu AI.
Transform this local organization problem into a structured, measurable student mission.
Problem: "${problemDescription}"
Organization: "${organizationName || 'Sri Lakshmi Kirana'}"
Location: "${location || 'Vizianagaram, AP'}"
Category: "${category || 'Retail Operations'}"

Return JSON:
{
  "title": "Digital Inventory Setup for a Local Kirana Shop",
  "difficulty": "Beginner",
  "estimated_time": "3–5 Hours",
  "required_skills": ["Excel", "Data Management", "Basic Data Analysis"],
  "tasks": [
    {"id": 1, "title": "Create a product database", "description": "Group items into categories with unit types."},
    {"id": 2, "title": "Add available stock quantities", "description": "Input stock counts from ledger notebook."},
    {"id": 3, "title": "Set minimum stock levels", "description": "Calculate 3-day safety threshold."},
    {"id": 4, "title": "Create low-stock alerts", "description": "Color-coded alerts when stock is low."},
    {"id": 5, "title": "Generate a weekly stock report", "description": "One-click printable supplier order sheet."}
  ],
  "deliverables": [
    "Inventory file (.xlsx / Google Sheets)",
    "Low-stock alert system",
    "Weekly report template",
    "Screenshots and short user guide"
  ],
  "expected_outcome": "Eliminate stockouts of staple items and save 45 minutes daily."
}
Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed, engine: 'gemini-3.8-flash' });
  } catch (err: any) {
    return res.status(200).json({ fallback: true, error: err?.message });
  }
});

// 3. MODULE 5: ADAPTIVE AI MENTOR CHAT
app.post('/api/gemini/mentor-chat', async (req, res) => {
  const { messages, currentContext, language = 'en' } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    return res.json({ fallback: true, message: 'Using Adaptive AI Mentor Simulation' });
  }

  try {
    const formattedHistory = (messages || [])
      .map((m: any) => `${m.sender === 'student' ? 'Student' : 'Mentor'}: ${m.message}`)
      .join('\n');

    const prompt = `You are the "Adaptive AI Mentor" in KaushalSetu AI.
Your student is working on a real mission: "${currentContext?.missionTitle || 'Digital Inventory Setup for a Local Kirana Shop in Vizianagaram'}".
Support Telugu and English gracefully.
Help the student break tasks down, explain formulas or concepts, debug errors, and ensure practical client usability.
Language: ${language === 'te' ? 'Telugu (తెలుగు)' : 'English'}.

History:
${formattedHistory}

Output JSON:
{
  "message": "Detailed supportive mentor guidance in ${language === 'te' ? 'Telugu' : 'English'}",
  "telugu_message": "Telugu translation or summary",
  "codeSnippet": "=IF(C2<=D2, \\"REORDER\\", \\"OPTIMAL\\")",
  "audioText": "1-2 brief conversational spoken sentences for audio synthesis."
}
Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed, engine: 'gemini-3.8-flash' });
  } catch (err: any) {
    return res.status(200).json({ fallback: true, error: err?.message });
  }
});

// 4. MODULE 7: AI QUALITY EVALUATION
app.post('/api/gemini/evaluate-solution', async (req, res) => {
  const { missionTitle, explanation, files, deliverables } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    return res.json({ fallback: true, message: 'Using KaushalSetu AI Quality Evaluator' });
  }

  try {
    const prompt = `You are "AI Quality Evaluation" in KaushalSetu AI.
Evaluate a student's submitted solution for: "${missionTitle || 'Kirana Digital Inventory'}".
Explanation: "${explanation}"
Files: ${JSON.stringify(files || [])}
Deliverables expected: ${JSON.stringify(deliverables || [])}

Score each dimension from 0 to 100:
- task_completion (Did they deliver all requested parts?)
- solution_quality (How clean and usable is it?)
- accuracy (Are formulas and structures sound?)
- documentation (Is client explanation and handover clear?)

Output JSON:
{
  "task_completion": 100,
  "solution_quality": 85,
  "accuracy": 88,
  "documentation": 80,
  "overall_score": 88,
  "summary_feedback": "Clear, functional, and practical for local merchant usage.",
  "key_strengths": ["Strong conditional rules", "Bilingual labeling", "Clean data hierarchy"],
  "refinement_areas": ["Could add direct WhatsApp alert integration"]
}
Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed, engine: 'gemini-3.8-flash' });
  } catch (err: any) {
    return res.status(200).json({ fallback: true, error: err?.message });
  }
});

// 5. MODULE 8: SKILLPROOF CHALLENGE GENERATOR
app.post('/api/gemini/generate-skillproof', async (req, res) => {
  const { missionTitle, explanation, skills } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    return res.json({ fallback: true, message: 'Using KaushalSetu SkillProof Engine' });
  }

  try {
    const prompt = `You are "SkillProof AI" in KaushalSetu AI.
Verify if the student genuinely built this solution themselves or just copied a generic template.
Mission: "${missionTitle}"
Student Explanation: "${explanation}"
Target Skills: ${JSON.stringify(skills || ['Excel', 'Data Management'])}

Generate 3 rigorous, personalized multiple-choice questions about their actual implementation choices:
Output JSON:
{
  "questions": [
    {
      "id": "sp-q1",
      "question": "How does your low-stock alert trigger when current inventory drops below the safety threshold?",
      "componentTested": "Conditional Logic & Dynamic Thresholding",
      "options": [
        "Compares current stock cell against safety threshold cell and applies conditional format rule",
        "Calls an external paid cloud API",
        "Manually re-colors cells every evening"
      ],
      "correctOptionIndex": 0,
      "aiEvaluation": "Demonstrates authentic understanding of dynamic spreadsheet referencing."
    }
  ]
}
Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed, engine: 'gemini-3.8-flash' });
  } catch (err: any) {
    return res.status(200).json({ fallback: true, error: err?.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KaushalSetu AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
