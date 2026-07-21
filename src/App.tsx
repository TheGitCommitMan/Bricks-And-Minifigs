import React, { useState } from "react";
import Home from "./components/Home";
import Directory from "./components/Directory";
import Evaluator from "./components/Evaluator";
import SafetyVault from "./components/SafetyVault";
import Newsroom from "./components/Newsroom";
import AdvisorConsole from "./components/AdvisorConsole";
import { STORE_LOCATIONS } from "./data/stores";
import { EvaluatorItem } from "./types";
import { Shield, BookOpen, Scale, FileText, Sparkles, AlertTriangle, Home as HomeIcon, Newspaper, HelpCircle, Store } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "directory" | "evaluator" | "vault" | "news" | "advisor">("home");
  const [items, setItems] = useState<EvaluatorItem[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>(STORE_LOCATIONS[0].id);

  const handleUpdateItems = (newItems: EvaluatorItem[]) => {
    setItems(newItems);
  };

  const handleStoreSelect = (id: string) => {
    setSelectedStoreId(id);
  };

  return (
    <div className="min-h-screen bg-lego-gray flex flex-col justify-between text-zinc-800 font-sans" id="app-root">
      {/* Top Brand Reform Banner */}
      <div className="bg-lego-blue text-white py-2.5 px-4 font-medium text-xs tracking-wide shadow-sm" id="system-notice">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Brand Notice: Standardized consignment & safety guidelines are now active across all national franchises.</span>
          </span>
          <span className="text-[10px] bg-white/10 text-zinc-200 px-2 py-0.5 rounded font-mono">Corporate Ledger: v2.6.J</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6 flex-1">
        
        {/* Navigation Bar / Brand Header */}
        <header className="bg-white border border-stone-200/80 p-6 sm:p-8 rounded-xl shadow-lego flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          {/* Subtle decorative grid background of blocks */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-lego-blue rounded-lg flex items-center justify-center shadow-sm">
                <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 font-mono text-[9px] uppercase font-bold tracking-wider rounded">Official Fan & Reseller Resource</span>
                <span className="text-stone-400 text-xs font-mono">• National Operations</span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-lego-blue font-display leading-none">
              Bricks & Minifigs®
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl leading-relaxed font-medium">
              Welcome to our brand accountability and community portal. Verify verified store directory listings, estimate secondary market trade values, draft standardized bailment contracts, and review official announcements.
            </p>
          </div>

          {/* Quick status counters */}
          <div className="flex gap-4 font-bold text-xs relative z-10" id="header-stats">
            <div className="px-4 py-3 bg-stone-50/50 border border-stone-100 rounded-lg text-center min-w-[120px] shadow-sm">
              <span className="block text-zinc-400 text-[9px] uppercase font-bold tracking-wider">Active Stores</span>
              <span className="text-sm font-black text-lego-blue uppercase mt-0.5 block">{STORE_LOCATIONS.length} National Outlets</span>
            </div>
            <div className="px-4 py-3 bg-stone-50/50 border border-stone-100 rounded-lg text-center min-w-[120px] shadow-sm">
              <span className="block text-zinc-400 text-[9px] uppercase font-bold tracking-wider">Appraisal List</span>
              <span className="text-sm font-black text-lego-red uppercase mt-0.5 block">{items.length} Items</span>
            </div>
          </div>
        </header>

        {/* Tab Selection Area - Elegant Modern Navigation Bar */}
        <div className="flex flex-wrap gap-1.5 bg-stone-100 p-1.5 rounded-xl border border-stone-200/40" id="dashboard-navigation">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "home"
                ? "bg-white text-lego-blue shadow-sm"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-white/50"
            }`}
            id="nav-home"
          >
            <HomeIcon className="w-3.5 h-3.5 shrink-0" />
            Home
          </button>

          <button
            onClick={() => setActiveTab("directory")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "directory"
                ? "bg-white text-lego-blue shadow-sm"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-white/50"
            }`}
            id="nav-directory"
          >
            <Store className="w-3.5 h-3.5 shrink-0" />
            Store Directory & Reviews
          </button>

          <button
            onClick={() => setActiveTab("evaluator")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "evaluator"
                ? "bg-white text-lego-blue shadow-sm"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-white/50"
            }`}
            id="nav-evaluator"
          >
            <Scale className="w-3.5 h-3.5 shrink-0" />
            Trade Estimator
          </button>

          <button
            onClick={() => setActiveTab("vault")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "vault"
                ? "bg-white text-lego-blue shadow-sm"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-white/50"
            }`}
            id="nav-vault"
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            Consignment Contract Builder
          </button>

          <button
            onClick={() => setActiveTab("news")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "news"
                ? "bg-white text-lego-blue shadow-sm"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-white/50"
            }`}
            id="nav-news"
          >
            <Newspaper className="w-3.5 h-3.5 shrink-0" />
            Corporate Newsroom
          </button>

          <button
            onClick={() => setActiveTab("advisor")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "advisor"
                ? "bg-lego-blue text-white shadow-sm"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-white/50"
            }`}
            id="nav-advisor"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
            AI Collection Advisor
          </button>
        </div>

        {/* Tab Contents */}
        <main className="min-h-[500px]" id="dashboard-content">
          {activeTab === "home" && (
            <Home onNavigate={(tab) => {
              if (tab === "newsroom") {
                setActiveTab("news");
              } else {
                setActiveTab(tab as any);
              }
            }} />
          )}

          {activeTab === "directory" && (
            <Directory 
              onSelectStore={handleStoreSelect} 
              selectedStoreId={selectedStoreId} 
            />
          )}

          {activeTab === "evaluator" && (
            <Evaluator 
              items={items} 
              setItems={handleUpdateItems} 
            />
          )}

          {activeTab === "vault" && (
            <SafetyVault 
              items={items} 
            />
          )}

          {activeTab === "news" && (
            <Newsroom />
          )}

          {activeTab === "advisor" && (
            <AdvisorConsole 
              items={items} 
              storeLocationId={selectedStoreId} 
            />
          )}
        </main>
      </div>

      {/* Footer block - Elegant dark background with clean legal and navigation details */}
      <footer className="mt-20 border-t border-zinc-800 bg-zinc-950 text-zinc-300 py-12 px-6 sm:px-8 text-xs font-semibold tracking-wider" id="app-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm uppercase">
              <Shield className="w-5 h-5 text-amber-500" />
              <span>Bricks & Minifigs® Corporate Webpage</span>
            </div>
            <p className="max-w-xl leading-relaxed text-[11px] text-zinc-400 normal-case font-normal">
              This webpage serves as an informative corporate portal and safety resource. Bricks & Minifigs® is a registered trademark of Bricks & Minifigs, LLC. LEGO® is a registered trademark of the LEGO Group of companies. This portal represents our ongoing commitment to community transparency and dispute accountability.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 sm:gap-12 font-mono text-[10px] text-zinc-400">
            <div>
              <span className="block text-amber-500 font-bold uppercase tracking-widest text-[9px]">Webpage Framework</span>
              <span className="mt-1 block font-medium">Vite + React 19 SPA</span>
            </div>
            <div>
              <span className="block text-amber-500 font-bold uppercase tracking-widest text-[9px]">Reforms Program</span>
              <span className="mt-1 block font-medium">Bailment Audits Active</span>
            </div>
            <div>
              <span className="block text-amber-500 font-bold uppercase tracking-widest text-[9px]">Community Care</span>
              <span className="mt-1 block font-medium">Verified Yelp Listings</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] text-zinc-500 font-mono tracking-normal normal-case">
          <span>© 2026 Bricks & Minifigs® Corporate. Community Transparency Initiative.</span>
          <span>Security & Consignment Audit ledger: Verified</span>
        </div>
      </footer>
    </div>
  );
}
