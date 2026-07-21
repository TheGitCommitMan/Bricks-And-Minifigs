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
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col justify-between text-black font-sans" id="app-root">
      {/* Top Brand Reform Banner */}
      <div className="bg-lego-red text-white border-b-4 border-black py-3 px-4 font-black uppercase text-xs tracking-wider" id="system-notice">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-white shrink-0" />
            <span>Brand Update: All franchise locations are adopting standardized bailment & security guidelines.</span>
          </span>
          <span className="text-[10px] bg-black text-lego-yellow px-2 py-0.5 rounded-none font-mono font-black">Corporate Portal: v2.6.J</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8 flex-1">
        
        {/* Navigation Bar / Brand Header */}
        <header className="bg-lego-yellow border-4 border-black p-6 sm:p-8 rounded-none shadow-lego-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          {/* Lego style background details */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-none pointer-events-none rotate-45 translate-x-16 -translate-y-16" />
          
          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-lego-blue rounded-none border-3 border-black flex items-center justify-center shadow-lego-sm">
                <div className="w-3.5 h-3.5 bg-white rounded-none border border-black"></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-black text-white px-2 py-0.5 font-mono text-[9px] uppercase font-black tracking-widest rounded-none">Official</span>
                <span className="text-black/75 text-xs font-mono font-black">• Bricks & Minifigs® Corporate Webpage</span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black font-display leading-none">
              Bricks & Minifigs®
            </h1>
            <p className="text-xs text-black font-bold max-w-2xl leading-relaxed">
              Welcome to the national corporate hub. Explore our toy outlets, estimate trade values, plan secure consignment partnerships, and read our latest litigation updates and quality assurance reforms.
            </p>
          </div>

          {/* Quick status counters */}
          <div className="flex gap-4 font-bold text-xs relative z-10" id="header-stats">
            <div className="px-4 py-3 bg-white border-3 border-black rounded-none text-center min-w-[120px] shadow-lego-sm">
              <span className="block text-black/50 text-[9px] uppercase font-black tracking-wider">Active Stores</span>
              <span className="text-sm font-black text-lego-blue uppercase mt-0.5 block">{STORE_LOCATIONS.length} National Outlets</span>
            </div>
            <div className="px-4 py-3 bg-white border-3 border-black rounded-none text-center min-w-[120px] shadow-lego-sm">
              <span className="block text-black/50 text-[9px] uppercase font-black tracking-wider">Appraisal List</span>
              <span className="text-sm font-black text-lego-red uppercase mt-0.5 block">{items.length} Items</span>
            </div>
          </div>
        </header>

        {/* Tab Selection Area - Neobrutalist Block Tabs */}
        <div className="flex flex-wrap gap-2.5" id="dashboard-navigation">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-5 py-3 text-xs font-black uppercase tracking-wider rounded-none border-3 border-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "home"
                ? "bg-lego-blue text-white shadow-lego translate-x-[-2px] translate-y-[-2px]"
                : "bg-white text-black hover:bg-zinc-100 hover:shadow-lego-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-y-0"
            }`}
            id="nav-home"
          >
            <HomeIcon className="w-4 h-4 shrink-0" />
            Home
          </button>

          <button
            onClick={() => setActiveTab("directory")}
            className={`px-5 py-3 text-xs font-black uppercase tracking-wider rounded-none border-3 border-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "directory"
                ? "bg-lego-blue text-white shadow-lego translate-x-[-2px] translate-y-[-2px]"
                : "bg-white text-black hover:bg-zinc-100 hover:shadow-lego-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-y-0"
            }`}
            id="nav-directory"
          >
            <Store className="w-4 h-4 shrink-0" />
            Store Locator & Yelp Reviews
          </button>

          <button
            onClick={() => setActiveTab("evaluator")}
            className={`px-5 py-3 text-xs font-black uppercase tracking-wider rounded-none border-3 border-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "evaluator"
                ? "bg-lego-blue text-white shadow-lego translate-x-[-2px] translate-y-[-2px]"
                : "bg-white text-black hover:bg-zinc-100 hover:shadow-lego-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-y-0"
            }`}
            id="nav-evaluator"
          >
            <Scale className="w-4 h-4 shrink-0" />
            Trade Estimator
          </button>

          <button
            onClick={() => setActiveTab("vault")}
            className={`px-5 py-3 text-xs font-black uppercase tracking-wider rounded-none border-3 border-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "vault"
                ? "bg-lego-blue text-white shadow-lego translate-x-[-2px] translate-y-[-2px]"
                : "bg-white text-black hover:bg-zinc-100 hover:shadow-lego-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-y-0"
            }`}
            id="nav-vault"
          >
            <FileText className="w-4 h-4 shrink-0" />
            Consignment Planner
          </button>

          <button
            onClick={() => setActiveTab("news")}
            className={`px-5 py-3 text-xs font-black uppercase tracking-wider rounded-none border-3 border-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "news"
                ? "bg-lego-blue text-white shadow-lego translate-x-[-2px] translate-y-[-2px]"
                : "bg-white text-black hover:bg-zinc-100 hover:shadow-lego-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-y-0"
            }`}
            id="nav-news"
          >
            <Newspaper className="w-4 h-4 shrink-0" />
            Newsroom
          </button>

          <button
            onClick={() => setActiveTab("advisor")}
            className={`px-5 py-3 text-xs font-black uppercase tracking-wider rounded-none border-3 border-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "advisor"
                ? "bg-lego-red text-white shadow-lego translate-x-[-2px] translate-y-[-2px]"
                : "bg-white text-black hover:bg-zinc-100 hover:shadow-lego-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-y-0"
            }`}
            id="nav-advisor"
          >
            <Sparkles className="w-4 h-4 text-lego-yellow fill-lego-yellow shrink-0" />
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

      {/* Footer block - High contrast black background with clean legal and navigation details */}
      <footer className="mt-20 border-t-4 border-black bg-black text-white py-12 px-4 sm:px-8 text-xs font-bold uppercase tracking-wider" id="app-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-lego-yellow font-black text-sm">
              <Shield className="w-5 h-5 text-lego-yellow" />
              <span>Bricks & Minifigs® Corporate Portal</span>
            </div>
            <p className="max-w-xl leading-relaxed text-[11px] text-zinc-400 normal-case font-medium">
              This webpage serves as an informative corporate portal and safety resource. Bricks & Minifigs® is a registered trademark of Bricks & Minifigs, LLC. LEGO® is a trademark of the LEGO Group of companies. This portal represents our ongoing commitment to community transparency and dispute accountability.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 sm:gap-12 font-mono text-[10px] text-zinc-300">
            <div>
              <span className="block text-lego-yellow font-black uppercase tracking-widest text-[9px]">Webpage Framework</span>
              <span className="mt-1 block font-medium">Vite + React 19 SPA</span>
            </div>
            <div>
              <span className="block text-lego-yellow font-black uppercase tracking-widest text-[9px]">Reforms Program</span>
              <span className="mt-1 block font-medium">Bailment Audits Active</span>
            </div>
            <div>
              <span className="block text-lego-yellow font-black uppercase tracking-widest text-[9px]">Community Care</span>
              <span className="mt-1 block font-medium">Honest Yelp Listings</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] text-zinc-500 font-mono tracking-normal normal-case">
          <span>© 2026 Bricks & Minifigs® National. Transparency Initiative.</span>
          <span>Security & Consignment Audit ledger: Enabled</span>
        </div>
      </footer>
    </div>
  );
}
