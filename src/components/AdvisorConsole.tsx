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
      <div className="p-4 bg-zinc-900 text-white border-3 border-black rounded-none flex items-start gap-2.5 max-w-4xl text-xs shadow-lego">
        <ShieldAlert className="w-5 h-5 text-lego-yellow shrink-0 mt-0.5" />
        <div className="font-semibold leading-relaxed">
          <span className="font-black text-lego-yellow uppercase tracking-wider block mb-0.5 text-[11px]">Secure Audit Gateway:</span> This advisor routes through a secure backend proxy. All AI audits utilize the modern <code className="bg-zinc-800 text-lego-yellow px-1.5 py-0.5 rounded-none border border-zinc-700 font-mono text-[10px]">gemini-2.5-flash</code> model to provide verified secondary market appraisals and legal bailment advice. No personal names or credentials are sent to external networks.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Quick Audits Control Box */}
        <div className="lg:col-span-4 bg-white border-3 border-black rounded-none p-5 space-y-4 shadow-lego">
          <h3 className="text-xs font-black text-black uppercase pb-2 border-b-2 border-black flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-lego-red" />
            Quick AI Audits
          </h3>

          <div className="space-y-3.5">
            {/* Action 1 */}
            <button
              onClick={handleTriggerAppraisal}
              disabled={loading}
              className="w-full text-left p-3.5 border-2 border-black bg-white hover:bg-lego-yellow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-lego transition-all text-xs space-y-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lego-sm rounded-none group"
              id="btn-ai-appraise"
            >
              <div className="flex items-center gap-1.5 font-black text-black group-hover:text-black">
                <Sparkles className="w-4 h-4 text-lego-red fill-lego-red" /> Appraise My Trade List
              </div>
              <p className="text-zinc-600 font-semibold leading-relaxed">
                Send your current trade list to Gemini to calculate fair market values and get specific preparation tips to increase offers.
              </p>
            </button>

            {/* Action 2 */}
            <button
              onClick={handleTriggerRiskConsult}
              disabled={loading}
              className="w-full text-left p-3.5 border-2 border-black bg-white hover:bg-lego-yellow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-lego transition-all text-xs space-y-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lego-sm rounded-none group"
              id="btn-ai-risk"
            >
              <div className="flex items-center gap-1.5 font-black text-black group-hover:text-black">
                <Shield className="w-4 h-4 text-black" /> Consignment Risk Audit
              </div>
              <p className="text-zinc-600 font-semibold leading-relaxed">
                Analyze contract safety for <strong className="text-black font-black">{selectedStore ? selectedStore.name : "Selected Location"}</strong>. Highlights liability, closing notices, and audit schedules.
              </p>
            </button>
          </div>
        </div>

        {/* Chat / Feed Column */}
        <div className="lg:col-span-8 bg-white border-3 border-black rounded-none overflow-hidden flex flex-col justify-between h-[520px] shadow-lego" id="advisor-chat-panel">
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
                <div className={`w-6 h-6 border-2 border-black rounded-none flex items-center justify-center shrink-0 text-[10px] font-black ${
                  msg.sender === "user" ? "bg-black text-white" : "bg-lego-yellow text-black"
                }`}>
                  {msg.sender === "user" ? "ME" : "AI"}
                </div>

                {/* Message Box */}
                <div className={`p-4 border-2 border-black rounded-none leading-relaxed whitespace-pre-wrap ${
                  msg.sender === "user" 
                    ? "bg-lego-blue text-white shadow-lego-sm" 
                    : "bg-zinc-50 text-black shadow-lego-sm font-semibold"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-black font-black italic animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-lego-red" />
                Gemini Advisor is analyzing parameters...
              </div>
            )}

            {errorText && (
              <div className="p-4 bg-lego-red text-white border-2 border-black rounded-none flex gap-2 items-start" id="advisor-error">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-white" />
                <div className="space-y-1">
                  <span className="font-black uppercase tracking-wider text-white">Advisor Connection Error</span>
                  <p className="text-[11px] font-bold leading-normal text-white">{errorText}</p>
                </div>
              </div>
            )}
          </div>

          {/* User Input bar */}
          <form onSubmit={handleSendCustom} className="p-3 bg-zinc-100 border-t-3 border-black flex items-center gap-2">
            <input
              type="text"
              disabled={loading}
              placeholder="Ask a custom safety, resale, or standard commission split question..."
              className="flex-1 px-3 py-2.5 border-2 border-black rounded-none text-xs focus:outline-none bg-white text-black font-black disabled:opacity-50 placeholder:text-zinc-400"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              id="advisor-input"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="p-2.5 bg-lego-red text-white border-2 border-black rounded-none shadow-lego-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-lego active:translate-y-0 active:shadow-none transition-all cursor-pointer disabled:opacity-50"
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
