import React, { useState } from "react";
import { Scale, FileText, AlertTriangle, ShieldCheck, HelpCircle, ArrowRight, BookOpen, ExternalLink } from "lucide-react";

export default function Newsroom() {
  const [activeArticle, setActiveArticle] = useState<"improvement" | "litigation" | "consignment-faq">("improvement");

  return (
    <div className="space-y-8" id="newsroom-page">
      {/* Visual Header */}
      <div className="p-6 bg-zinc-900 text-white border-3 border-black shadow-lego rounded-none space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-lego-yellow text-black border border-black px-2 py-0.5 text-[10px] font-mono font-black uppercase">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Newsroom & Brand Transparency</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
          Brand Improvements & Accountability
        </h2>
        <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed font-medium">
          Bricks & Minifigs® is built on trust, creativity, and the LEGO® community. Read our official press releases, litigation status updates, and operational reforms below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation / List of Releases */}
        <div className="lg:col-span-4 bg-white border-3 border-black p-5 shadow-lego space-y-4">
          <h3 className="text-xs font-black text-black uppercase pb-2 border-b-2 border-black tracking-wider">
            Official Announcements
          </h3>
          
          <div className="space-y-2.5">
            {/* Article 1 */}
            <button
              onClick={() => setActiveArticle("improvement")}
              className={`w-full text-left p-3 border-2 border-black rounded-none text-xs flex flex-col gap-1 transition-all cursor-pointer ${
                activeArticle === "improvement"
                  ? "bg-lego-blue text-white shadow-lego-sm translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-black hover:bg-zinc-50"
              }`}
              id="news-tab-improvement"
            >
              <span className="text-[9px] font-mono font-black uppercase text-lego-yellow">July 10, 2026</span>
              <span className="font-black uppercase tracking-wide leading-tight">An Update on Brand Improvements & Reforms</span>
            </button>

            {/* Article 2 */}
            <button
              onClick={() => setActiveArticle("litigation")}
              className={`w-full text-left p-3 border-2 border-black rounded-none text-xs flex flex-col gap-1 transition-all cursor-pointer ${
                activeArticle === "litigation"
                  ? "bg-lego-blue text-white shadow-lego-sm translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-black hover:bg-zinc-50"
              }`}
              id="news-tab-litigation"
            >
              <span className="text-[9px] font-mono font-black uppercase text-lego-yellow">June 24, 2026</span>
              <span className="font-black uppercase tracking-wide leading-tight">Pending Litigation & Salem Store Status</span>
            </button>

            {/* Article 3 */}
            <button
              onClick={() => setActiveArticle("consignment-faq")}
              className={`w-full text-left p-3 border-2 border-black rounded-none text-xs flex flex-col gap-1 transition-all cursor-pointer ${
                activeArticle === "consignment-faq"
                  ? "bg-lego-blue text-white shadow-lego-sm translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-black hover:bg-zinc-50"
              }`}
              id="news-tab-faq"
            >
              <span className="text-[9px] font-mono font-black uppercase text-lego-yellow">Educational Release</span>
              <span className="font-black uppercase tracking-wide leading-tight">Consignment Safeguards & Custody FAQ</span>
            </button>
          </div>
        </div>

        {/* Article Viewer */}
        <div className="lg:col-span-8 bg-white border-3 border-black p-6 sm:p-8 shadow-lego space-y-6" id="news-article-view">
          {activeArticle === "improvement" && (
            <article className="space-y-6 text-xs text-zinc-900 font-semibold leading-relaxed" id="article-improvement">
              <div className="border-b-2 border-black pb-4">
                <span className="text-[10px] font-mono font-black text-lego-blue uppercase">Official Release • July 10, 2026</span>
                <h1 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight mt-1 leading-tight">
                  Bricks & Minifigs®: An Update on Brand Improvements and Pending Litigation
                </h1>
                <p className="text-[10px] text-zinc-500 font-bold mt-2">BY MARKETING TEAM | NEWSROOM</p>
              </div>

              <div className="space-y-4 text-justify">
                <p className="font-black text-black">
                  At Bricks & Minifigs, we understand trust is earned through actions, not just words.
                </p>
                
                <p>
                  Over the past several weeks, we’ve heard from customers, franchise owners, LEGO® enthusiasts, and other community members who care deeply about our brand. We know people have been concerned, frustrated, and disappointed by what they’ve seen and heard in the social media world about Bricks & Minifigs. We also understand that, for some people, this hasn’t been just about one store or one situation. It has raised broader questions about trust, accountability, communication and how we protect the values that make Bricks & Minifigs special.
                </p>

                <p>
                  Bricks & Minifigs isn’t just another retail concept. We built our stores around creativity, childhood memories, family moments, and community support. Each location is a neighborhood business run by owners who live and work in the same community. When one location falls short of our standards, it affects the entire ecosystem.
                </p>

                <p className="font-bold border-l-4 border-lego-red pl-3 text-black">
                  To ensure these issues are resolved systematically, Bricks & Minifigs Corporate is rolling out the following brand improvements across all 17 national franchise locations:
                </p>

                <ul className="list-disc pl-5 space-y-2">
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

                <p>
                  We are fully committed to earning back your trust. We thank our franchise owners and LEGO fans for holding us accountable and helping us build a more secure sandbox.
                </p>
              </div>
            </article>
          )}

          {activeArticle === "litigation" && (
            <article className="space-y-6 text-xs text-zinc-900 font-semibold leading-relaxed" id="article-litigation">
              <div className="border-b-2 border-black pb-4">
                <span className="text-[10px] font-mono font-black text-lego-blue uppercase">Press Update • June 24, 2026</span>
                <h1 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight mt-1 leading-tight">
                  Official Statement: Pending Litigation & Salem, Oregon Store Termination
                </h1>
                <p className="text-[10px] text-zinc-500 font-bold mt-2">BY LEGAL DEPT & CORPORATE COMMUNICATIONS</p>
              </div>

              <div className="space-y-4 text-justify">
                <div className="bg-lego-yellow/15 border-2 border-black p-4 flex gap-3 items-start text-[11px] text-black shadow-lego-sm">
                  <AlertTriangle className="w-5 h-5 text-black shrink-0 mt-0.5" />
                  <div>
                    <strong className="uppercase tracking-wide text-xs block mb-1">Salem, OR Store Status Update:</strong>
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
            <article className="space-y-6 text-xs text-zinc-900 font-semibold leading-relaxed" id="article-faq">
              <div className="border-b-2 border-black pb-4">
                <span className="text-[10px] font-mono font-black text-lego-blue uppercase">Community Guide • Educational</span>
                <h1 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight mt-1 leading-tight">
                  Consignment & Trade Safety Guidelines: A Buyer & Seller FAQ
                </h1>
                <p className="text-[10px] text-zinc-500 font-bold mt-2">BY CUSTOMER ADVOCACY TEAM</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-black text-black text-xs uppercase flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-lego-blue" />
                    How do I safely consign my sets or collection?
                  </h3>
                  <p className="pl-5 text-zinc-700">
                    Always request a signed, physical copy of the <strong>Consignment Bailment Agreement</strong>. Never leave sets on verbal-only terms. Ensure that the agreement includes a full list of item descriptions, estimated values, store liability limits, and a set schedule for inventory audits.
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-zinc-200">
                  <h3 className="font-black text-black text-xs uppercase flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-lego-blue" />
                    What if a franchise location closes abruptly?
                  </h3>
                  <p className="pl-5 text-zinc-700">
                    Under our updated franchise guidelines, bailable assets are owned by the consignor (the Bailor) and <strong>do not belong to the franchisee's bankrupt estate</strong>. Standard agreements require 30 days closure notice to return assets immediately.
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-zinc-200">
                  <h3 className="font-black text-black text-xs uppercase flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-lego-blue" />
                    How is trade-in value calculated?
                  </h3>
                  <p className="pl-5 text-zinc-700">
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
