import React, { useState } from "react";
import { Scale, FileText, AlertTriangle, ShieldCheck, HelpCircle, ArrowRight, BookOpen, ExternalLink } from "lucide-react";

export default function Newsroom() {
  const [activeArticle, setActiveArticle] = useState<"improvement" | "litigation" | "consignment-faq">("improvement");

  return (
    <div className="space-y-8" id="newsroom-page">
      {/* Visual Header */}
      <div className="p-6 md:p-8 bg-lego-blue text-white rounded-2xl shadow-lego relative overflow-hidden">
        {/* Subtle background detail */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-12 -translate-y-12" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-white px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Newsroom & Brand Transparency</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-white">
            Brand Improvements & Accountability
          </h2>
          <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed font-normal">
            Bricks & Minifigs® is built on trust, creativity, and the LEGO® community. Read our official press releases, litigation status updates, and operational reforms below.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation / List of Releases */}
        <div className="lg:col-span-4 bg-white border border-zinc-100 rounded-2xl p-5 shadow-lego space-y-4">
          <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase pb-2 border-b border-zinc-100 tracking-wider">
            Official Announcements
          </h3>
          
          <div className="space-y-2">
            {/* Article 1 */}
            <button
              onClick={() => setActiveArticle("improvement")}
              className={`w-full text-left p-4 rounded-xl text-xs flex flex-col gap-1 transition-all cursor-pointer border ${
                activeArticle === "improvement"
                  ? "bg-lego-blue text-white border-transparent shadow-sm"
                  : "bg-white text-zinc-800 border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50/50"
              }`}
              id="news-tab-improvement"
            >
              <span className={`text-[9px] font-mono font-bold uppercase ${
                activeArticle === "improvement" ? "text-amber-500" : "text-zinc-400"
              }`}>July 10, 2026</span>
              <span className="font-heading font-semibold tracking-wide leading-tight text-xs">An Update on Brand Improvements & Reforms</span>
            </button>

            {/* Article 2 */}
            <button
              onClick={() => setActiveArticle("litigation")}
              className={`w-full text-left p-4 rounded-xl text-xs flex flex-col gap-1 transition-all cursor-pointer border ${
                activeArticle === "litigation"
                  ? "bg-lego-blue text-white border-transparent shadow-sm"
                  : "bg-white text-zinc-800 border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50/50"
              }`}
              id="news-tab-litigation"
            >
              <span className={`text-[9px] font-mono font-bold uppercase ${
                activeArticle === "litigation" ? "text-amber-500" : "text-zinc-400"
              }`}>June 24, 2026</span>
              <span className="font-heading font-semibold tracking-wide leading-tight text-xs">Pending Litigation & Salem Store Status</span>
            </button>

            {/* Article 3 */}
            <button
              onClick={() => setActiveArticle("consignment-faq")}
              className={`w-full text-left p-4 rounded-xl text-xs flex flex-col gap-1 transition-all cursor-pointer border ${
                activeArticle === "consignment-faq"
                  ? "bg-lego-blue text-white border-transparent shadow-sm"
                  : "bg-white text-zinc-800 border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50/50"
              }`}
              id="news-tab-faq"
            >
              <span className={`text-[9px] font-mono font-bold uppercase ${
                activeArticle === "consignment-faq" ? "text-amber-500" : "text-zinc-400"
              }`}>Educational Release</span>
              <span className="font-heading font-semibold tracking-wide leading-tight text-xs">Consignment Safeguards & Custody FAQ</span>
            </button>
          </div>
        </div>

        {/* Article Viewer */}
        <div className="lg:col-span-8 bg-white border border-zinc-100 rounded-2xl p-6 sm:p-10 shadow-lego space-y-6" id="news-article-view">
          {activeArticle === "improvement" && (
            <article className="space-y-6 text-xs text-zinc-700 font-normal leading-relaxed text-justify" id="article-improvement">
              <div className="border-b border-zinc-100 pb-5">
                <span className="text-[10px] font-mono font-bold text-lego-blue uppercase tracking-widest block">Official Release • July 10, 2026</span>
                <h1 className="text-xl sm:text-2xl font-display font-semibold text-zinc-900 tracking-tight mt-1 leading-tight">
                  Bricks & Minifigs®: An Update on Brand Improvements and Pending Litigation
                </h1>
                <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mt-2">BY MARKETING TEAM | NEWSROOM</p>
              </div>

              <div className="space-y-4">
                <p className="font-medium text-zinc-900 text-xs leading-relaxed">
                  At Bricks & Minifigs, we understand trust is earned through actions, not just words.
                </p>
                
                <p>
                  Over the past several weeks, we’ve heard from customers, franchise owners, LEGO® enthusiasts, and other community members who care deeply about our brand. We know people have been concerned, frustrated, and disappointed by what they’ve seen and heard in the social media world about Bricks & Minifigs. We also understand that, for some people, this hasn’t been just about one store or one situation. It has raised broader questions about trust, accountability, communication and how we protect the values that make Bricks & Minifigs special.
                </p>

                <p>
                  Bricks & Minifigs isn’t just another retail concept. We built our stores around creativity, childhood memories, family moments, and community support. Each location is a neighborhood business run by owners who live and work in the same community. When one location falls short of our standards, it affects the entire ecosystem.
                </p>

                <div className="border-l-2 border-lego-red pl-4 py-1 text-zinc-850 font-medium">
                  To ensure these issues are resolved systematically, Bricks & Minifigs Corporate is rolling out the following brand improvements across all 17 national franchise locations:
                </div>

                <ul className="list-disc pl-5 space-y-3 pt-1">
                  <li>
                    <strong>Standardized Consignment Agreements:</strong> We have established a compulsory, uniform bailment contract model to govern all consignment collections valued above $500, requiring explicit liability limits and audit schedules.
                  </li>
                  <li>
                    <strong>Mandatory Commercial Liability Verification:</strong> Every franchisee must verify property insurance limits sufficient to cover all consigned builder assets stored on site.
                  </li>
                  <li>
                    <strong>Reconciliation Audits:</strong> Independent, corporate-guided quarterly audits of consignment ledger books to prevent unrecorded inventory movements or communication breakdowns.
                  </li>
                </ul>

                <p className="pt-2 border-t border-zinc-100 text-zinc-500 font-normal">
                  We are fully committed to earning back your trust. We thank our franchise owners and LEGO fans for holding us accountable and helping us build a more secure sandbox.
                </p>
              </div>
            </article>
          )}

          {activeArticle === "litigation" && (
            <article className="space-y-6 text-xs text-zinc-700 font-normal leading-relaxed text-justify" id="article-litigation">
              <div className="border-b border-zinc-100 pb-5">
                <span className="text-[10px] font-mono font-bold text-lego-blue uppercase tracking-widest block">Press Update • June 24, 2026</span>
                <h1 className="text-xl sm:text-2xl font-display font-semibold text-zinc-900 tracking-tight mt-1 leading-tight">
                  Official Statement: Pending Litigation & Salem, Oregon Store Termination
                </h1>
                <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mt-2">BY LEGAL DEPT & CORPORATE COMMUNICATIONS</p>
              </div>

              <div className="space-y-4">
                <div className="bg-amber-50/50 border border-amber-200/50 p-4 rounded-xl flex gap-3 items-start text-zinc-800">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="uppercase font-mono tracking-wider text-[10px] text-amber-700 block mb-1">Salem, OR Store Status Update</strong>
                    Under our franchise agreements, Bricks & Minifigs Corporate terminated the Salem, OR franchise lease and operations in June 2026 due to repeated failures to comply with brand standards, customer accounting rules, and dispute resolution.
                  </div>
                </div>

                <p>
                  Regarding ongoing litigation and community consignment disputes (Case 2:26-cv-00593-CMR): We understand the LEGO community's intense focus on these proceedings. We want to declare objectively that we are actively cooperating with legal representatives to settle all verified builder claims. 
                </p>

                <p>
                  <strong>Case Status Summary:</strong>
                  The dispute surrounding the consignment Star Wars collection is being audited and addressed directly by corporate remediation teams. We have established legal funds to ensure that no consignor loses their assets or fair market values due to the mistakes of individual franchise owners. 
                </p>

                <p>
                  <strong>Salem Reopening Under Corporate Oversight:</strong>
                  The Salem, Oregon storefront is undergoing a complete corporate reorganization. We are auditing the physical sets and minifigures on-site to return any outstanding consignor properties and verify the ledger database. The store will reopen under new corporate-guided operators who uphold our strict guidelines for community protection.
                </p>
              </div>
            </article>
          )}

          {activeArticle === "consignment-faq" && (
            <article className="space-y-6 text-xs text-zinc-700 font-normal leading-relaxed" id="article-faq">
              <div className="border-b border-zinc-100 pb-5">
                <span className="text-[10px] font-mono font-bold text-lego-blue uppercase tracking-widest block">Community Guide • Educational</span>
                <h1 className="text-xl sm:text-2xl font-display font-semibold text-zinc-900 tracking-tight mt-1 leading-tight">
                  Consignment & Trade Safety Guidelines: A Buyer & Seller FAQ
                </h1>
                <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mt-2">BY CUSTOMER ADVOCACY TEAM</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <h3 className="font-heading font-semibold text-zinc-900 text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    How do I safely consign my sets or collection?
                  </h3>
                  <p className="pl-6 text-zinc-600 text-xs">
                    Always request a signed, physical copy of the <strong>Consignment Bailment Agreement</strong>. Never leave sets on verbal-only terms. Ensure that the agreement includes a full list of item descriptions, estimated values, store liability limits, and a set schedule for inventory audits.
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-zinc-100">
                  <h3 className="font-heading font-semibold text-zinc-900 text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    What if a franchise location closes abruptly?
                  </h3>
                  <p className="pl-6 text-zinc-600 text-xs">
                    Under our updated franchise guidelines, bailable assets are owned by the consignor (the Bailor) and <strong>do not belong to the franchisee's bankrupt estate</strong>. Standard agreements require 30 days closure notice to return assets immediately.
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-zinc-100">
                  <h3 className="font-heading font-semibold text-zinc-900 text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    How is trade-in value calculated?
                  </h3>
                  <p className="pl-6 text-zinc-600 text-xs">
                    Trade-in valuations are based on secondary market trends (derived from BrickLink and eBay historical sales). Cash offers are typically 30-40% of standard market value, while store credit offers 50-60%. Dusting and cataloging your items helps our staff give you the highest possible payout.
                  </p>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
