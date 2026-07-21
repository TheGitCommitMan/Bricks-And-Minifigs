import React, { useState, useMemo } from "react";
import { STORE_LOCATIONS, REVIEWS } from "../data/stores";
import { StoreLocation, Review } from "../types";
import { Search, ShieldAlert, ShieldCheck, MapPin, Star, AlertTriangle, AlertCircle, Info, ExternalLink, Store } from "lucide-react";

export default function Directory({ 
  onSelectStore, 
  selectedStoreId 
}: { 
  onSelectStore?: (id: string) => void; 
  selectedStoreId?: string; 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState<string>("All States");
  const [selectedTier, setSelectedTier] = useState<string>("All Tiers");
  const [selectedSource, setSelectedSource] = useState<string>("All Sources");
  const [activeTab, setActiveTab] = useState<"stores" | "reviews">("stores");

  // Get list of unique states
  const states = useMemo(() => {
    const list = new Set(STORE_LOCATIONS.map(s => s.state));
    return ["All States", ...Array.from(list).sort()];
  }, []);

  // Filter stores
  const filteredStores = useMemo(() => {
    return STORE_LOCATIONS.filter(store => {
      const matchesSearch = 
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.notableNotes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.management.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesState = selectedState === "All States" || store.state === selectedState;
      const matchesTier = selectedTier === "All Tiers" || store.trustTier === selectedTier;
      
      return matchesSearch && matchesState && matchesTier;
    });
  }, [searchTerm, selectedState, selectedTier]);

  // Filter reviews
  const filteredReviews = useMemo(() => {
    return REVIEWS.filter(review => {
      const store = STORE_LOCATIONS.find(s => s.id === review.targetStore);
      const storeName = store ? store.name : "";
      
      const matchesSearch = 
        review.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        storeName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesState = selectedState === "All States" || (store && store.state === selectedState);
      const matchesSource = selectedSource === "All Sources" || review.source === selectedSource;
      
      return matchesSearch && matchesState && matchesSource;
    });
  }, [searchTerm, selectedState, selectedSource]);

  const getTierColorClass = (tier: string) => {
    switch (tier) {
      case "Highly Trusted":
        return "bg-emerald-50 text-emerald-800 border-emerald-200/60";
      case "Proceed with Caution":
        return "bg-amber-50 text-amber-800 border-amber-200/60";
      case "Flagged / Closed":
        return "bg-rose-50 text-rose-800 border-rose-200/60";
      default:
        return "bg-zinc-50 text-zinc-800 border-zinc-200";
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Highly Trusted":
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 mr-1.5" />;
      case "Proceed with Caution":
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-700 mr-1.5" />;
      case "Flagged / Closed":
        return <AlertCircle className="w-3.5 h-3.5 text-rose-700 mr-1.5" />;
      default:
        return null;
    }
  };

  const handleStoreClick = (storeId: string) => {
    if (onSelectStore) {
      onSelectStore(storeId);
    }
  };

  return (
    <div className="space-y-10" id="store-directory">
      {/* Background Statement Block (Objective, transparent, clean) */}
      <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-lego max-w-4xl">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl shrink-0 text-lego-blue">
            <Store className="w-6 h-6 text-lego-blue shrink-0" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-amber-600 tracking-wider uppercase">
              Operational Accountability Directory
            </h2>
            <h3 className="text-xl font-display font-semibold text-zinc-900 tracking-tight">
              Independent Franchise Verification & Reviews
            </h3>
            <p className="text-xs text-zinc-600 font-normal leading-relaxed">
              Bricks & Minifigs® outlets are independently owned and managed. To ensure operational integrity and absolute clarity, we track rating matrices, on-site policy adherence, and certified customer reviews. 
            </p>
            <p className="text-xs text-zinc-500 font-normal leading-relaxed">
              Select an active store location below to link it automatically with your trade estimators or consignment vaults.
            </p>
          </div>
        </div>
      </div>

      {/* Directory Search & Filter Controls */}
      <div className="bg-white border border-zinc-100 rounded-2xl shadow-lego p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by store name, city, owner, or policy notes..."
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium focus:outline-none focus:bg-white focus:ring-1 focus:ring-lego-blue transition-colors text-zinc-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="directory-search"
            />
          </div>

          <div className="flex bg-zinc-100 p-1 rounded-lg gap-1.5 w-full md:w-auto">
            {/* Tab selection */}
            <button
              onClick={() => { setActiveTab("stores"); }}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer text-center whitespace-nowrap ${
                activeTab === "stores"
                  ? "bg-white text-lego-blue shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
              id="tab-stores"
            >
              Stores ({filteredStores.length})
            </button>
            <button
              onClick={() => { setActiveTab("reviews"); }}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer text-center whitespace-nowrap ${
                activeTab === "reviews"
                  ? "bg-white text-lego-red shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
              id="tab-reviews"
            >
              Yelp Reviews ({filteredReviews.length})
            </button>
          </div>
        </div>

        {/* Inline Filters */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-100 text-xs font-medium items-center">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-wider">State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-medium focus:outline-none"
              id="filter-state"
            >
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {activeTab === "stores" ? (
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-wider">Policy Audit Status:</span>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-medium focus:outline-none"
                id="filter-tier"
              >
                <option value="All Tiers">All Policy Statuses</option>
                <option value="Highly Trusted">Highly Trusted Operators</option>
                <option value="Proceed with Caution">Audited / Reform Required</option>
                <option value="Flagged / Closed">Permanently Closed / Revoked</option>
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-wider">Review Origin:</span>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-medium focus:outline-none"
                id="filter-source"
              >
                <option value="All Sources">All Outlets</option>
                <option value="Yelp">Yelp Reviews</option>
                <option value="Trustindex">Trustindex Feedback</option>
              </select>
            </div>
          )}

          {(searchTerm || selectedState !== "All States" || selectedTier !== "All Tiers" || selectedSource !== "All Sources") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedState("All States");
                setSelectedTier("All Tiers");
                setSelectedSource("All Sources");
              }}
              className="text-lego-red hover:text-red-700 font-semibold uppercase tracking-wider text-[11px] ml-auto cursor-pointer"
              id="reset-filters"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid displays */}
      {activeTab === "stores" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="stores-grid">
          {filteredStores.length === 0 ? (
            <div className="col-span-2 text-center py-12 border border-dashed border-zinc-200 rounded-xl bg-zinc-50">
              <p className="text-zinc-500 font-normal text-sm">No store locations match your query.</p>
            </div>
          ) : (
            filteredStores.map((store) => {
              const storeReviews = REVIEWS.filter(r => r.targetStore === store.id);
              const isClosed = store.trustTier === "Flagged / Closed";
              const isSelected = selectedStoreId === store.id;

              return (
                <div 
                  key={store.id} 
                  className={`border rounded-2xl bg-white flex flex-col justify-between transition-all duration-200 shadow-lego hover:border-zinc-300 ${
                    isClosed ? "opacity-90 bg-rose-50/5 border-rose-200/40" : "border-zinc-100"
                  } ${isSelected ? "ring-2 ring-lego-blue/80 border-transparent" : ""}`}
                  id={`store-card-${store.id}`}
                >
                  <div className="p-6 space-y-4">
                    {/* Badge & Rating Row */}
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getTierColorClass(store.trustTier)}`}>
                        {getTierIcon(store.trustTier)}
                        {store.trustTier === "Highly Trusted" ? "Highly Trusted" : store.trustTier === "Proceed with Caution" ? "Audit Required" : "Revoked / Closed"}
                      </span>
                      <div className="flex items-center gap-1 bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-0.5 text-xs font-bold text-zinc-900">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 shrink-0" />
                        <span>{store.overallRating.toFixed(1)}</span>
                        <span className="text-[10px] text-zinc-400 font-normal">({store.totalReviews})</span>
                      </div>
                    </div>

                    {/* Store Title */}
                    <div>
                      <h3 className="text-base font-heading font-bold text-zinc-900 flex items-center gap-1.5 leading-snug">
                        {store.name}
                      </h3>
                      <p className="text-xs text-zinc-500 font-normal flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                        {store.city}, {store.state}
                      </p>
                    </div>

                    {/* Operational Details */}
                    <div className="space-y-3 pt-4 border-t border-zinc-100 text-xs">
                      <div>
                        <span className="font-mono text-[9px] uppercase text-zinc-400 tracking-wider block mb-1">Franchise Management</span>
                        <span className="text-zinc-800 font-semibold">{store.management}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] uppercase text-zinc-400 tracking-wider block mb-1">Store Directives & Policy</span>
                        <p className="text-zinc-600 font-normal leading-relaxed text-[11px]">{store.notableNotes}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action block */}
                  <div className="px-6 py-4 bg-zinc-50/50 border-t border-zinc-100 rounded-b-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <span className="text-zinc-500 text-[11px]">
                      Audited Reviews: <strong className="text-lego-blue font-semibold">{storeReviews.length}</strong>
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleStoreClick(store.id)}
                        className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isSelected 
                            ? "bg-lego-blue text-white border-transparent shadow-sm" 
                            : "bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-50"
                        }`}
                        id={`select-store-action-${store.id}`}
                      >
                        {isSelected ? "Active Store" : "Select Store"}
                      </button>
                      <button 
                        onClick={() => {
                          setSearchTerm(store.name);
                          setActiveTab("reviews");
                        }}
                        className="text-zinc-700 hover:text-lego-red font-semibold flex items-center gap-1 cursor-pointer transition-colors bg-white border border-zinc-200 rounded-lg px-3.5 py-1.5 hover:bg-zinc-50"
                        id={`view-reviews-${store.id}`}
                      >
                        Yelp Reviews <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="space-y-6" id="reviews-list">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-zinc-200 rounded-xl bg-zinc-50">
              <p className="text-zinc-500 font-normal text-sm">No community feedback matches your filter.</p>
            </div>
          ) : (
            filteredReviews.map((review, idx) => {
              const store = STORE_LOCATIONS.find(s => s.id === review.targetStore);
              return (
                <div 
                  key={idx} 
                  className={`border rounded-2xl bg-white p-6 space-y-4 shadow-lego transition-all duration-200 ${
                    review.isCritical ? "border-amber-200 bg-amber-50/10" : "border-zinc-100 bg-white"
                  }`}
                  id={`review-item-${idx}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-4">
                    {/* Review Author Metadata */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-zinc-900">{review.author}</span>
                        <span className="text-[10px] text-zinc-500 bg-zinc-50 border border-zinc-200 rounded px-2 py-0.5 font-mono">
                          {review.location}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono mt-1 block font-normal">{review.date}</span>
                    </div>

                    {/* Rating and Source */}
                    <div className="flex items-center gap-3">
                      <div className="flex bg-zinc-50 border border-zinc-200 rounded-lg p-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${
                              i < review.rating 
                                ? "fill-amber-400 text-amber-500" 
                                : "text-zinc-200"
                            }`} 
                          />
                        ))}
                      </div>
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded border shadow-sm ${
                        review.source === "Yelp" ? "bg-rose-50 text-rose-700 border-rose-150" : "bg-sky-50 text-sky-700 border-sky-150"
                      }`}>
                        {review.source}
                      </span>
                    </div>
                  </div>

                  {/* Review Text Body */}
                  <div className="space-y-3">
                    {store && (
                      <div className="text-[11px] text-zinc-500 flex items-center gap-1 font-normal">
                        <span>Concerning Outlet:</span>
                        <span className="font-semibold text-zinc-800">{store.name} ({store.city}, {store.state})</span>
                      </div>
                    )}
                    <p className="text-sm text-zinc-700 leading-relaxed font-normal italic bg-zinc-50/50 p-4 rounded-xl border border-zinc-200/50">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>

                  {/* Operational Security takeaway based on review */}
                  {review.isCritical && (
                    <div className="flex items-start gap-3 bg-amber-50/70 border border-amber-200/70 rounded-xl p-4 text-[11px] text-zinc-700">
                      <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="uppercase font-mono tracking-wider text-[10px] text-amber-800 block mb-1">Franchise Customer Directive:</strong>
                        This report notes substantial consumer complaints regarding trade evaluation ratios, contract compliance, or payout delays. For high-value collection transfers or consignment at this location, builders are strongly encouraged to draft a certified <strong className="font-semibold text-amber-900 underline cursor-pointer">Consignment Contract</strong> inside the Safety Vault prior to physical box turnover.
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
