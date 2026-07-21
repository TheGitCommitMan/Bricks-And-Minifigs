import React from "react";
import { ArrowUpRight, Sparkles, MapPin, Scale, ShieldCheck, Gift, Users, Blocks } from "lucide-react";

export default function Home({ 
  onNavigate 
}: { 
  onNavigate: (tab: "directory" | "evaluator" | "vault" | "advisor" | "newsroom") => void;
}) {
  return (
    <div className="space-y-16" id="home-page">
      {/* Brand Hero Showcase */}
      <section className="bg-white border border-zinc-100 p-8 sm:p-12 md:p-16 rounded-2xl relative overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-12 shadow-lego">
        {/* Subtle decorative grid background of blocks */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="space-y-6 max-w-2xl relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-zinc-50 border border-zinc-200/60 text-zinc-700 px-3.5 py-1 rounded-full font-mono text-[10px] uppercase font-semibold tracking-wider">
            <Blocks className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Official Corporate Resource Hub</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-lego-blue leading-tight">
            Rebuild your <br />
            <span className="text-lego-red italic font-normal">imagination.</span>
          </h1>
          
          <p className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed max-w-xl">
            Welcome to the corporate transparency and service portal for Bricks & Minifigs®, the premier independent toy store franchise specializing in buying, selling, and trading new and used LEGO® sets, rare figures, and custom elements. 
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
            <button
              onClick={() => onNavigate("directory")}
              className="lego-btn-primary flex items-center gap-2"
              id="hero-btn-find"
            >
              Find a Store Location
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate("evaluator")}
              className="lego-btn-secondary flex items-center gap-2"
              id="hero-btn-trade"
            >
              Trade-In Valuator
              <Scale className="w-4 h-4 text-lego-red" />
            </button>
          </div>
        </div>

        {/* Hero Visual Block */}
        <div className="w-full max-w-sm bg-zinc-50/50 border border-zinc-200/60 rounded-xl p-6 shadow-lego-sm relative z-10 space-y-5 text-center lg:text-left">
          <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-lego-red/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-lego-blue/80" />
            </div>
            <span className="text-[9px] font-mono font-semibold uppercase text-zinc-400 tracking-wider">Operational Integrity Ledger</span>
          </div>

          <div className="space-y-4">
            <div className="p-3.5 bg-white border border-zinc-200/50 rounded-lg flex items-center justify-between">
              <div className="text-left">
                <span className="text-[9px] font-mono text-zinc-400 font-medium block uppercase tracking-wider">Estimator Sync Status</span>
                <span className="text-xs font-semibold text-zinc-900">National Resale Ratios Active</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-semibold uppercase rounded border border-emerald-200/50 font-mono">Synced</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white border border-zinc-200/50 rounded-lg text-center space-y-1">
                <span className="font-mono text-zinc-400 block text-[9px] uppercase tracking-wider font-medium">Avg Cash Ratio</span>
                <span className="font-bold text-lego-blue text-sm">30% - 40%</span>
              </div>
              <div className="p-3 bg-white border border-zinc-200/50 rounded-lg text-center space-y-1">
                <span className="font-mono text-zinc-400 block text-[9px] uppercase tracking-wider font-medium">Avg Store Credit</span>
                <span className="font-bold text-lego-red text-sm">50% - 60%</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 font-normal leading-normal italic text-center">
              "Dedicated to providing fair value on bulk pieces, loose minifigures, and sets."
            </p>
          </div>
        </div>
      </section>

      {/* The Bricks & Minifigs Experience */}
      <section className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-zinc-900">
            The Bricks & Minifigs Experience
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-normal max-w-xl mx-auto leading-relaxed">
            From vintage collector sets to bulk playground builders, we deliver structured retail programs designed to honor the legacy of creative play.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: BUY & BUILD */}
          <div className="bg-white border border-zinc-100 rounded-xl p-6 shadow-lego flex flex-col justify-between hover:border-zinc-200 transition-colors duration-200" id="experience-buy">
            <div className="space-y-5">
              <div className="w-10 h-10 bg-zinc-50 rounded-lg border border-zinc-200/50 flex items-center justify-center text-lego-blue">
                <Blocks className="w-5 h-5 text-lego-blue" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-zinc-900 tracking-tight">Buy & Build</h3>
              <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                Explore massive bulk brick tables, individual minifig creation stations, and pre-owned sets. Find retired sets from your youth, sealed new boxes, or the precise part you need to finish your custom build.
              </p>
            </div>
            <div className="pt-6 border-t border-zinc-50 mt-6">
              <button 
                onClick={() => onNavigate("directory")}
                className="text-xs font-semibold uppercase text-lego-blue hover:text-lego-red transition-colors flex items-center gap-1 cursor-pointer"
              >
                Browse Locations <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: SELL & TRADE */}
          <div className="bg-white border border-zinc-100 rounded-xl p-6 shadow-lego flex flex-col justify-between hover:border-zinc-200 transition-colors duration-200" id="experience-sell">
            <div className="space-y-5">
              <div className="w-10 h-10 bg-zinc-50 rounded-lg border border-zinc-200/50 flex items-center justify-center text-lego-red">
                <Scale className="w-5 h-5 text-lego-red" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-zinc-900 tracking-tight">Sell & Trade</h3>
              <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                Turn your old collection into cash or brand new building assets. We buy bulk bricks by the pound, loose figures, and complete built sets. Use our interactive Trade Estimator to organize your collection before visiting!
              </p>
            </div>
            <div className="pt-6 border-t border-zinc-50 mt-6">
              <button 
                onClick={() => onNavigate("evaluator")}
                className="text-xs font-semibold uppercase text-lego-red hover:text-lego-blue transition-colors flex items-center gap-1 cursor-pointer"
              >
                Launch Trade Estimator <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: BIRTHDAY PARTIES */}
          <div className="bg-white border border-zinc-100 rounded-xl p-6 shadow-lego flex flex-col justify-between hover:border-zinc-200 transition-colors duration-200" id="experience-parties">
            <div className="space-y-5">
              <div className="w-10 h-10 bg-zinc-50 rounded-lg border border-zinc-200/50 flex items-center justify-center text-zinc-900">
                <Gift className="w-5 h-5 text-zinc-700" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-zinc-900 tracking-tight">Hosts & Parties</h3>
              <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                Host unforgettable LEGO® themed birthday parties and group workshops! Kids and adult builders get exclusive access to building tables, custom minifigure creation, and exciting build contests.
              </p>
            </div>
            <div className="pt-6 border-t border-zinc-50 mt-6">
              <button 
                onClick={() => onNavigate("directory")}
                className="text-xs font-semibold uppercase text-zinc-800 hover:text-lego-blue transition-colors flex items-center gap-1 cursor-pointer"
              >
                Book Store Space <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Transparency Banner */}
      <section className="bg-zinc-900 rounded-2xl p-8 text-white shadow-lego flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lego-blue/15 to-transparent pointer-events-none" />
        <div className="space-y-3 max-w-xl text-center md:text-left relative z-10">
          <div className="flex justify-center md:justify-start items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono">BAM Integrity Commitment</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white leading-tight">
            Accountability & Operational Reforms
          </h3>
          <p className="text-xs text-zinc-400 font-normal leading-relaxed">
            As an independent toy store franchise, we stand firm on community confidence. Read our national response to past litigation, newly drafted consignment bailment agreements, and verified rating systems.
          </p>
        </div>

        <button
          onClick={() => onNavigate("newsroom")}
          className="px-5 py-3 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap relative z-10 shadow-sm"
          id="btn-news-transparency"
        >
          View Transparency Newsroom
          <ArrowUpRight className="w-4 h-4 text-zinc-600" />
        </button>
      </section>

      {/* Quick Statistics Banner */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4" id="home-stats">
        <div className="bg-white border border-zinc-200/50 rounded-xl p-5 text-center space-y-1 shadow-lego-sm">
          <span className="block text-[9px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">Active Franchise Outlets</span>
          <span className="text-lg sm:text-xl font-heading font-bold text-zinc-900">17+ Locations</span>
        </div>
        <div className="bg-white border border-zinc-200/50 rounded-xl p-5 text-center space-y-1 shadow-lego-sm">
          <span className="block text-[9px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">Average Store Rating</span>
          <span className="text-lg sm:text-xl font-heading font-bold text-lego-blue">4.1 / 5.0 Stars</span>
        </div>
        <div className="bg-white border border-zinc-200/50 rounded-xl p-5 text-center space-y-1 shadow-lego-sm">
          <span className="block text-[9px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">Community Reviews</span>
          <span className="text-lg sm:text-xl font-heading font-bold text-lego-red">334+ Verified</span>
        </div>
        <div className="bg-white border border-zinc-200/50 rounded-xl p-5 text-center space-y-1 shadow-lego-sm">
          <span className="block text-[9px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">Consignment Protection</span>
          <span className="text-lg sm:text-xl font-heading font-bold text-zinc-900">100% Insured</span>
        </div>
      </section>
    </div>
  );
}
