import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini if key exists
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API endpoint for AI Advisor
  app.post("/api/gemini/advisor", async (req, res) => {
    try {
      const { prompt, type } = req.body;

      if (!apiKey || !ai) {
        return res.status(500).json({ 
          error: "Gemini API key is not configured in the server. Please add GEMINI_API_KEY in the Secrets panel." 
        });
      }

      let systemInstruction = "";
      if (type === "appraisal") {
        systemInstruction = "You are an expert LEGO collection appraiser. Evaluate the items provided by the user (sets, minifigures, bulk bricks). Give realistic estimated secondary market values (e.g. from BrickLink or BrickEconomy) and give standard trade-in estimates for cash (typically 30-40% of secondary market value) vs store credit (typically 50-60%). Give clear, bulleted lists with high readability, structure, and useful tips on preparing the items (like dusting, sorting, and finding missing pieces) to maximize trade-in value.";
      } else if (type === "contract") {
        systemInstruction = "You are a professional legal contract assistant for LEGO collectors. Analyze the drafted consignment terms, collection description, and selected store location. Provide crucial risk assessment feedback and suggest specific, robust protective clauses based on recent resale disputes (e.g., ensuring immediate general liability insurance, requirements for written inventory drop-off signatures, mandatory audit timelines, and immediate return clauses in case of franchise termination or location closure). Keep your feedback highly professional, protective of the collector, clear, and actionable.";
      } else {
        systemInstruction = "You are an expert safety and integrity advisor for the LEGO collecting community. Answer the user's questions about consignment safety, trade-in value optimization, and retail transparency. Provide realistic, clear guidance.";
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Advisor Error:", error);
      res.status(500).json({ error: error.message || "An error occurred while communicating with the AI Advisor." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
