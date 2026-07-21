import React from "react";
import { ArrowUpRight, Sparkles, MapPin, Scale, ShieldCheck, Gift, Users, Blocks } from "lucide-react";

export default function Home({ 
  onNavigate 
}: { 
  onNavigate: (tab: "directory" | "evaluator" | "vault" | "advisor" | "newsroom") => void;
}) {
  return (
    <div className="space-y-12" id="home-page">
      {/* Brand Hero Showcase */}
      <section className="bg-lego-yellow border-4 border-black p-8 sm:p-12 relative overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-8 shadow-lego-lg">
        {/* Subtle decorative grid background of blocks */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="space-y-6 max-w-2xl relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-black text-lego-yellow px-3 py-1 font-mono text-xs uppercase font-black tracking-widest border-2 border-black">
            <Blocks className="w-4 h-4 text-lego-yellow shrink-0 animate-bounce" />
            <span>Official Fan Hub</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black leading-none">
            REBUILD YOUR <br />
            <span className="text-lego-blue">IMAGINATION.</span>
          </h1>
          
          <p className="text-sm sm:text-base text-zinc-900 font-bold leading-relaxed">
            Welcome to Bricks & Minifigs®, the ultimate retail sandbox for LEGO® fans. 
            We are the largest independent toy store franchise specializing in buying, selling, and trading new and used LEGO® sets, bulk pieces, and custom minifigures. 
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button
              onClick={() => onNavigate("directory")}
              className="px-6 py-3 bg-lego-blue text-white font-black text-xs uppercase tracking-wider border-3 border-black shadow-lego-sm hover:shadow-lego hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-y-0 active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
              id="hero-btn-find"
            >
              Find a Store Near You
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate("evaluator")}
              className="px-6 py-3 bg-white text-black font-black text-xs uppercase tracking-wider border-3 border-black shadow-lego-sm hover:shadow-lego hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-y-0 active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
              id="hero-btn-trade"
            >
              Estimate Trade-In Value
              <Scale className="w-4 h-4 text-lego-red" />
            </button>
          </div>
        </div>

        {/* Hero Visual Block */}
        <div className="w-full max-w-sm bg-white border-4 border-black p-6 shadow-lego relative z-10 space-y-4 text-center lg:text-left">
          <div className="flex justify-between items-center border-b-2 border-black pb-3">
            <div className="flex gap-1">
              <span className="w-3 h-3 rounded-full bg-lego-red border border-black" />
              <span className="w-3 h-3 rounded-full bg-lego-yellow border border-black" />
              <span className="w-3 h-3 rounded-full bg-lego-blue border border-black" />
            </div>
            <span className="text-[10px] font-mono font-black uppercase text-zinc-500">Live Trade Tracker</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-zinc-50 border-2 border-black flex items-center justify-between">
              <div className="text-left">
                <span className="text-[9px] font-mono text-zinc-500 font-bold block">CURRENT ESTIMATOR STATUS</span>
                <span className="text-xs font-black text-black">LEGO Resale Ratios Active</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase border border-black">Synced</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-lego-blue/10 border-2 border-black text-center space-y-1">
                <span className="font-mono text-zinc-600 block text-[9px] font-bold">AVG CASH VALUE</span>
                <span className="font-black text-lego-blue">30% - 40%</span>
              </div>
              <div className="p-3 bg-lego-yellow/25 border-2 border-black text-center space-y-1">
                <span className="font-mono text-zinc-600 block text-[9px] font-bold">AVG STORE CREDIT</span>
                <span className="font-black text-black">50% - 60%</span>
              </div>
            </div>

            <p className="text-[10px] text-zinc-600 font-bold leading-normal italic text-center">
              "We trade daily for bulk bricks, mini figures, and complete vintage sets!"
            </p>
          </div>
        </div>
      </section>

      {/* The Bricks & Minifigs Experience */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
            The Bricks & Minifigs Experience
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 font-bold max-w-xl mx-auto">
            From childhood sets to rare collectors items, we provide a structured, transparent brick playground.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: BUY & BUILD */}
          <div className="bg-white border-3 border-black p-6 shadow-lego flex flex-col justify-between" id="experience-buy">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-lego-blue border-2 border-black flex items-center justify-center text-white font-black shadow-lego-sm">
                <Blocks className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-black text-black uppercase tracking-wide">Buy & Build</h3>
              <p className="text-xs text-zinc-700 font-medium leading-relaxed">
                Explore massive bulk brick tables, individual minifig creation stations, and pre-owned sets. Find retired sets from your youth, sealed new boxes, or the precise part you need to finish your custom build.
              </p>
            </div>
            <div className="pt-6">
              <button 
                onClick={() => onNavigate("directory")}
                className="text-xs font-black uppercase text-lego-blue hover:underline flex items-center gap-1 cursor-pointer"
              >
                Browse Locations <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: SELL & TRADE */}
          <div className="bg-white border-3 border-black p-6 shadow-lego flex flex-col justify-between" id="experience-sell">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-lego-red border-2 border-black flex items-center justify-center text-white font-black shadow-lego-sm">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-black text-black uppercase tracking-wide">Sell & Trade</h3>
              <p className="text-xs text-zinc-700 font-medium leading-relaxed">
                Turn your old collection into cash or brand new building assets. We buy bulk bricks by the pound, loose figures, and complete built sets. Use our interactive Trade Estimator to organize your collection before visiting!
              </p>
            </div>
            <div className="pt-6">
              <button 
                onClick={() => onNavigate("evaluator")}
                className="text-xs font-black uppercase text-lego-red hover:underline flex items-center gap-1 cursor-pointer"
              >
                Launch Trade Estimator <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: BIRTHDAY PARTIES */}
          <div className="bg-white border-3 border-black p-6 shadow-lego flex flex-col justify-between" id="experience-parties">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-lego-yellow border-2 border-black flex items-center justify-center text-black font-black shadow-lego-sm">
                <Gift className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-black text-black uppercase tracking-wide">Hosts & Parties</h3>
              <p className="text-xs text-zinc-700 font-medium leading-relaxed">
                Host unforgettable LEGO® themed birthday parties and group workshops! Kids and adult builders get exclusive access to building tables, custom minifigure creation, and exciting build contests.
              </p>
            </div>
            <div className="pt-6">
              <button 
                onClick={() => onNavigate("directory")}
                className="text-xs font-black uppercase text-black hover:underline flex items-center gap-1 cursor-pointer"
              >
                Book Store Space <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Transparency banner */}
      <section className="bg-zinc-900 border-3 border-black p-6 sm:p-8 text-white shadow-lego flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-lego-yellow" />
            <span className="text-xs font-black uppercase tracking-wider text-lego-yellow font-mono">Our Trust Commitment</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white leading-tight">
            Independent Verification & Operational Safeguards
          </h3>
          <p className="text-xs text-zinc-400 font-medium leading-relaxed">
            As a national franchise, each of our stores is individually owned. We believe transparency is key to building community confidence. Read our updates on litigation, structural reforms, and consignment safeguards.
          </p>
        </div>

        <button
          onClick={() => onNavigate("newsroom")}
          className="px-5 py-3 bg-lego-red text-white font-black text-xs uppercase tracking-wider border-2 border-black hover:bg-red-600 hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-y-0 active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          id="btn-news-transparency"
        >
          View Transparency Hub
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </section>

      {/* Quick Statistics Banner */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4" id="home-stats">
        <div className="bg-white border-2 border-black p-4 text-center space-y-1 shadow-lego-sm">
          <span className="block text-[9px] font-mono font-black text-zinc-500 uppercase">National Outlets</span>
          <span className="text-xl sm:text-2xl font-black text-black">17+ LOCATIONS</span>
        </div>
        <div className="bg-white border-2 border-black p-4 text-center space-y-1 shadow-lego-sm">
          <span className="block text-[9px] font-mono font-black text-zinc-500 uppercase">Average Customer Rating</span>
          <span className="text-xl sm:text-2xl font-black text-lego-blue">4.1 / 5.0 STARS</span>
        </div>
        <div className="bg-white border-2 border-black p-4 text-center space-y-1 shadow-lego-sm">
          <span className="block text-[9px] font-mono font-black text-zinc-500 uppercase">Community Reviews</span>
          <span className="text-xl sm:text-2xl font-black text-lego-red">334+ AUDITED</span>
        </div>
        <div className="bg-white border-2 border-black p-4 text-center space-y-1 shadow-lego-sm">
          <span className="block text-[9px] font-mono font-black text-zinc-500 uppercase">Consignment Policy</span>
          <span className="text-xl sm:text-2xl font-black text-black">100% SECURE</span>
        </div>
      </section>
    </div>
  );
}
