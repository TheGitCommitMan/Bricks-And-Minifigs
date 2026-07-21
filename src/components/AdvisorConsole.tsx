import React, { useState } from "react";
import { EvaluatorItem } from "../types";
import { STORE_LOCATIONS } from "../data/stores";
import { Shield, Sparkles, Send, ShieldAlert, BookOpen, RefreshCw, AlertCircle } from "lucide-react";

export default function AdvisorConsole({ 
  items,
  storeLocationId
 }: { 
  items: EvaluatorItem[];
  storeLocationId: string;
}) {
  const [messages, setMessages] = useState<Array<{ sender: "user" | "gemini"; text: string }>>([
    {
      sender: "gemini",
      text: "Welcome to the LEGO Trade-In & Security Advisor console, powered securely by server-side Gemini AI. I can analyze your current trade list for standard secondary market rates, or perform a security and risk audit on your consignment terms. Select one of the quick audit prompts below or ask a custom question."
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const selectedStore = STORE_LOCATIONS.find(s => s.id === storeLocationId);

  const callAdvisor = async (prompt: string, type: "appraisal" | "contract" | "custom") => {
    setLoading(true);
    setErrorText(null);

    // Optimistically add user message if custom
    if (type === "custom") {
      setMessages(prev => [...prev, { sender: "user", text: prompt }]);
    }

    try {
      const response = await fetch("/api/gemini/advisor", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ prompt, type })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `HTTP error ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, { sender: "gemini", text: data.text }]);
    } catch (error: any) {
      console.error("Advisor Fetch Error:", error);
      setErrorText(error.message || "Could not connect to the AI advisor. Check if the server is running and the GEMINI_API_KEY is configured in Settings > Secrets.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const txt = inputText;
    setInputText("");
    callAdvisor(txt, "custom");
  };

  const handleTriggerAppraisal = () => {
    if (items.length === 0) {
      setMessages(prev => [
        ...prev,
        {
          sender: "gemini",
          text: "⚠️ Your appraisal list is currently empty. Please go to the **Trade Evaluator** tab first and add a few sets, minifigures, or bulk boxes, then come back here to trigger a market analysis!"
        }
      ]);
      return;
    }

    const itemsStr = items.map(item => 
      `- ${item.name} (${item.type === "bulk" ? `${item.weightPounds} lbs bulk` : item.condition}), estimated market retail: $${item.retailValue}`
    ).join("\n");

    const prompt = `Please appraise my LEGO trade-in inventory list and give me standard reseller payout estimates, condition tips, and dusting advice:\n\n${itemsStr}`;
    
    // Set user visual prompt
    setMessages(prev => [
      ...prev, 
      { sender: "user", text: `Analyze and appraise my current list of ${items.length} LEGO items.` }
    ]);
    
    callAdvisor(prompt, "appraisal");
  };

  const handleTriggerRiskConsult = () => {
    const itemsCount = items.length;
    const targetStoreName = selectedStore ? selectedStore.name : "Local LEGO Reseller Store";
    const targetStoreStatus = selectedStore ? selectedStore.trustTier : "Unspecified Status";

    const prompt = `I am planning to consign my LEGO collection at: ${targetStoreName} (Community Status: ${targetStoreStatus}). 
    My collection contains ${itemsCount} items with an estimated retail value of $${items.reduce((sum, i) => sum + i.retailValue, 0)}.
    Please review standard risk points and tell me what specific contract clauses I must demand to protect myself from store default, lost items, or sudden closures. Refer to the recent $200k Lego Star Wars Carol Stream consignment controversy and Ammon/RecklessBen investigation context to explain why these rules are necessary.`;

    setMessages(prev => [
      ...prev, 
      { sender: "user", text: `Consult on consignment safety risks at ${targetStoreName}.` }
    ]);

    callAdvisor(prompt, "contract");
  };

  return (
    <div className="space-y-6" id="advisor-console-tab">
      {/* Risk Alert Eyebrow statement */}
      <div className="p-4 bg-zinc-900 text-zinc-100 rounded-xl flex items-start gap-3 max-w-4xl text-xs shadow-sm">
        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed font-sans font-normal">
          <span className="font-mono text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-0.5">Secure AI Audit Gateway</span>
          This advisor routes through a secure backend proxy. All AI audits utilize the modern <code className="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded font-mono text-[10px]">gemini-2.5-flash</code> model to provide verified secondary market appraisals and legal bailment advice. No personal names or credentials are sent to external networks.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Quick Audits Control Box */}
        <div className="lg:col-span-4 bg-white border border-zinc-100 rounded-2xl p-6 space-y-4 shadow-lego">
          <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider pb-3 border-b border-zinc-100 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-zinc-500" />
            Quick AI Audits
          </h3>

          <div className="space-y-3">
            {/* Action 1 */}
            <button
              onClick={handleTriggerAppraisal}
              disabled={loading}
              className="w-full text-left p-4 border border-zinc-200/60 hover:border-zinc-350 bg-zinc-50/30 hover:bg-zinc-50 rounded-xl transition-all text-xs space-y-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
              id="btn-ai-appraise"
            >
              <div className="flex items-center gap-1.5 font-heading font-semibold text-zinc-900 group-hover:text-lego-blue">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500/10" /> Appraise My Trade List
              </div>
              <p className="text-zinc-500 font-normal leading-relaxed text-[11px]">
                Send your current trade list to Gemini to calculate fair market values and get specific preparation tips to increase offers.
              </p>
            </button>

            {/* Action 2 */}
            <button
              onClick={handleTriggerRiskConsult}
              disabled={loading}
              className="w-full text-left p-4 border border-zinc-200/60 hover:border-zinc-350 bg-zinc-50/30 hover:bg-zinc-50 rounded-xl transition-all text-xs space-y-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
              id="btn-ai-risk"
            >
              <div className="flex items-center gap-1.5 font-heading font-semibold text-zinc-900 group-hover:text-lego-blue">
                <Shield className="w-4 h-4 text-zinc-600" /> Consignment Risk Audit
              </div>
              <p className="text-zinc-500 font-normal leading-relaxed text-[11px]">
                Analyze contract safety for <strong className="text-zinc-800 font-bold">{selectedStore ? selectedStore.name : "Selected Location"}</strong>. Highlights liability, closing notices, and audit schedules.
              </p>
            </button>
          </div>
        </div>

        {/* Chat / Feed Column */}
        <div className="lg:col-span-8 bg-white border border-zinc-100 rounded-2xl overflow-hidden flex flex-col justify-between h-[520px] shadow-lego" id="advisor-chat-panel">
          {/* Messages stream */}
          <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
                id={`chat-msg-${index}`}
              >
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[9px] font-mono font-bold tracking-wider ${
                  msg.sender === "user" ? "bg-zinc-800 text-white" : "bg-lego-blue text-white"
                }`}>
                  {msg.sender === "user" ? "ME" : "AI"}
                </div>

                {/* Message Box */}
                <div className={`p-4 rounded-2xl leading-relaxed whitespace-pre-wrap text-zinc-700 text-xs font-normal ${
                  msg.sender === "user" 
                    ? "bg-lego-blue text-white rounded-tr-none" 
                    : "bg-zinc-50 border border-zinc-100 text-zinc-700 rounded-tl-none font-normal"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-zinc-500 font-semibold italic animate-pulse text-[11px] py-1">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-lego-blue" />
                Gemini Advisor is analyzing parameters...
              </div>
            )}

            {errorText && (
              <div className="p-4 bg-red-50 text-red-900 border border-red-200 rounded-xl flex gap-3 items-start" id="advisor-error">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <div className="space-y-1">
                  <span className="font-heading font-semibold text-red-800 block text-xs">Advisor Connection Error</span>
                  <p className="text-[11px] font-normal leading-normal text-red-700">{errorText}</p>
                </div>
              </div>
            )}
          </div>

          {/* User Input bar */}
          <form onSubmit={handleSendCustom} className="p-3 bg-zinc-50/50 border-t border-zinc-150 flex items-center gap-2">
            <input
              type="text"
              disabled={loading}
              placeholder="Ask a custom safety, resale, or standard commission split question..."
              className="flex-1 px-4 py-2.5 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-lego-blue bg-white text-zinc-850 font-normal disabled:opacity-50 placeholder:text-zinc-400"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              id="advisor-input"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="p-2.5 bg-lego-blue text-white hover:bg-slate-900 rounded-xl transition-all cursor-pointer disabled:opacity-40 shadow-sm"
              id="advisor-send-button"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
