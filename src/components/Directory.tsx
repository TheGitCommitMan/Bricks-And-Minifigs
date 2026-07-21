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

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Highly Trusted":
        return "bg-emerald-600 text-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]";
      case "Proceed with Caution":
        return "bg-lego-yellow text-black border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]";
      case "Flagged / Closed":
        return "bg-lego-red text-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]";
      default:
        return "bg-white text-black border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]";
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Highly Trusted":
        return <ShieldCheck className="w-4 h-4 text-white mr-1.5" />;
      case "Proceed with Caution":
        return <AlertTriangle className="w-4 h-4 text-black mr-1.5" />;
      case "Flagged / Closed":
        return <AlertCircle className="w-4 h-4 text-white mr-1.5" />;
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
    <div className="space-y-8" id="store-directory">
      {/* Background Statement Block (Objective, transparent, clean) */}
      <div className="p-6 bg-white border-3 border-black shadow-lego rounded-none space-y-4 max-w-4xl">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-lego-blue border-2 border-black shadow-lego-sm rounded-none shrink-0 text-white">
            <Store className="w-6 h-6 text-white shrink-0" />
          </div>
          <div className="space-y-2">
            <h2 className="text-sm font-black text-white tracking-wider uppercase bg-lego-blue px-2 py-0.5 inline-block border-2 border-black shadow-lego-sm">
              Official Store Locator & Yelp Reviews Tracker
            </h2>
            <p className="text-xs text-black font-medium leading-relaxed pt-2">
              Bricks & Minifigs® operates on a national franchise network where each location is independently owned and operated. To ensure total transparency and customer success, we track local store ratings, owner management names, and audited Yelp/Trustindex feedback.
            </p>
            <p className="text-xs text-black font-medium leading-relaxed">
              Use this locator to explore national outlets, search for trusted local operators (such as Ryans, Chris, Gary, and Holly), and review individual store policy ratings. Select any location to link it to your custom trade estimators or consignment forms.
            </p>
          </div>
        </div>
      </div>

      {/* Directory Search & Filter Controls */}
      <div className="bg-white border-3 border-black shadow-lego rounded-none p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-black" />
            <input
              type="text"
              placeholder="Search store name, city, state, or key terms..."
              className="w-full pl-9 pr-4 py-2 border-2 border-black rounded-none text-xs font-bold focus:outline-none focus:bg-white bg-zinc-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="directory-search"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {/* Tab selection */}
            <button
              onClick={() => { setActiveTab("stores"); }}
              className={`px-4 py-2 rounded-none text-xs font-black uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
                activeTab === "stores"
                  ? "bg-lego-blue text-white shadow-lego-sm translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-black hover:bg-zinc-100 active:translate-y-0"
              }`}
              id="tab-stores"
            >
              Store Locator ({filteredStores.length})
            </button>
            <button
              onClick={() => { setActiveTab("reviews"); }}
              className={`px-4 py-2 rounded-none text-xs font-black uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
                activeTab === "reviews"
                  ? "bg-lego-red text-white shadow-lego-sm translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-black hover:bg-zinc-100 active:translate-y-0"
              }`}
              id="tab-reviews"
            >
              Audited Yelp & Community Reviews ({filteredReviews.length})
            </button>
          </div>
        </div>

        {/* Inline Filters */}
        <div className="flex flex-wrap gap-3 pt-3 border-t-2 border-black text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="text-black uppercase tracking-wider text-[11px]">State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-2 py-1 bg-white border-2 border-black rounded-none text-xs font-bold focus:outline-none"
              id="filter-state"
            >
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {activeTab === "stores" ? (
            <div className="flex items-center gap-2">
              <span className="text-black uppercase tracking-wider text-[11px]">Audit Status:</span>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="px-2 py-1 bg-white border-2 border-black rounded-none text-xs font-bold focus:outline-none"
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
              <span className="text-black uppercase tracking-wider text-[11px]">Review Origin:</span>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="px-2 py-1 bg-white border-2 border-black rounded-none text-xs font-bold focus:outline-none"
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
              className="text-lego-red hover:underline font-black uppercase tracking-wider text-[11px] ml-auto cursor-pointer"
              id="reset-filters"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid displays */}
      {activeTab === "stores" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="stores-grid">
          {filteredStores.length === 0 ? (
            <div className="col-span-2 text-center py-12 border-3 border-dashed border-black rounded-none bg-zinc-50">
              <p className="text-zinc-700 font-bold text-sm">No locations matching your search terms found.</p>
            </div>
          ) : (
            filteredStores.map((store) => {
              const storeReviews = REVIEWS.filter(r => r.targetStore === store.id);
              const isClosed = store.trustTier === "Flagged / Closed";
              const isSelected = selectedStoreId === store.id;

              return (
                <div 
                  key={store.id} 
                  className={`border-3 border-black bg-white rounded-none flex flex-col justify-between transition-all shadow-lego hover:shadow-lego-lg hover:translate-x-[-2px] hover:translate-y-[-2px] ${
                    isClosed ? "opacity-85 bg-rose-50/10" : ""
                  } ${isSelected ? "ring-4 ring-lego-blue" : ""}`}
                  id={`store-card-${store.id}`}
                >
                  <div className="p-5 space-y-4">
                    {/* Badge & Rating Row */}
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2 py-1 rounded-none text-[10px] font-black uppercase tracking-wider ${getTierColor(store.trustTier)}`}>
                        {getTierIcon(store.trustTier)}
                        {store.trustTier === "Highly Trusted" ? "Highly Trusted" : store.trustTier === "Proceed with Caution" ? "Audit / Reforms Required" : "Revoked / Closed"}
                      </span>
                      <div className="flex items-center gap-1.5 bg-zinc-100 border-2 border-black px-2 py-0.5 shadow-[1px_1px_0px_rgba(0,0,0,1)] text-xs font-black">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-black shrink-0" />
                        <span className="text-black">{store.overallRating.toFixed(1)}</span>
                        <span className="text-[10px] text-zinc-600">({store.totalReviews})</span>
                      </div>
                    </div>

                    {/* Store Title */}
                    <div>
                      <h3 className="text-base font-black text-black flex items-center gap-1.5 leading-tight uppercase tracking-wide">
                        {store.name}
                      </h3>
                      <p className="text-xs text-zinc-700 font-bold flex items-center gap-1 mt-1 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-black" />
                        {store.city}, {store.state}
                      </p>
                    </div>

                    {/* Operational Details */}
                    <div className="space-y-3 pt-3 border-t-2 border-black text-xs">
                      <div>
                        <span className="font-black text-black uppercase tracking-wider text-[10px] bg-lego-yellow/20 px-1.5 py-0.5 border border-black inline-block">Management / Franchise Owner:</span>{" "}
                        <span className="text-zinc-900 font-bold block mt-1">{store.management}</span>
                      </div>
                      <div>
                        <span className="font-black text-black uppercase tracking-wider text-[10px] bg-lego-blue/10 px-1.5 py-0.5 border border-black inline-block">Policy Status & Audits:</span>{" "}
                        <p className="text-zinc-800 font-semibold leading-relaxed mt-1.5">{store.notableNotes}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action block */}
                  <div className="px-5 py-3.5 bg-zinc-50 border-t-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-black">
                    <span className="text-black font-bold">
                      Customer Reviews: <strong className="text-lego-blue">{storeReviews.length} tracked</strong>
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleStoreClick(store.id)}
                        className={`text-xs font-black uppercase border-2 border-black px-2.5 py-1 shadow-lego-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-lego transition-all cursor-pointer ${
                          isSelected 
                            ? "bg-lego-blue text-white" 
                            : "bg-white text-black hover:bg-lego-yellow"
                        }`}
                        id={`select-store-action-${store.id}`}
                      >
                        {isSelected ? "✓ Active Store" : "Select Store"}
                      </button>
                      <button 
                        onClick={() => {
                          setSearchTerm(store.name);
                          setActiveTab("reviews");
                        }}
                        className="text-black hover:text-lego-red font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors bg-white border-2 border-black px-2.5 py-1 shadow-lego-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-lego hover:bg-zinc-100"
                        id={`view-reviews-${store.id}`}
                      >
                        Yelp Reviews <ExternalLink className="w-3.5 h-3.5 text-black" />
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
            <div className="text-center py-12 border-3 border-dashed border-black rounded-none bg-zinc-50">
              <p className="text-zinc-700 font-bold text-sm">No reviews matching your search criteria found.</p>
            </div>
          ) : (
            filteredReviews.map((review, idx) => {
              const store = STORE_LOCATIONS.find(s => s.id === review.targetStore);
              return (
                <div 
                  key={idx} 
                  className={`border-3 border-black bg-white p-5 space-y-4 shadow-lego hover:shadow-lego-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all rounded-none ${
                    review.isCritical ? "border-black bg-white" : "border-black bg-emerald-50/10"
                  }`}
                  id={`review-item-${idx}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black pb-3">
                    {/* Review Author Metadata */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-black uppercase tracking-wide">{review.author}</span>
                        <span className="text-[10px] text-black bg-lego-yellow border border-black font-mono font-bold px-1.5 py-0.5 shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                          {review.location}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-600 font-mono mt-1 block font-semibold">{review.date}</span>
                    </div>

                    {/* Rating and Source */}
                    <div className="flex items-center gap-3">
                      <div className="flex bg-zinc-100 border border-black p-1 shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${
                              i < review.rating 
                                ? "fill-amber-400 text-black" 
                                : "text-zinc-300"
                            }`} 
                          />
                        ))}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border-2 border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] ${
                        review.source === "Yelp" ? "bg-lego-red text-white" : "bg-lego-blue text-white"
                      }`}>
                        {review.source}
                      </span>
                    </div>
                  </div>

                  {/* Review Text Body */}
                  <div className="space-y-2">
                    {store && (
                      <div className="text-[11px] text-zinc-700 flex items-center gap-1 font-bold">
                        <span>For location:</span>
                        <span className="underline decoration-black decoration-2">{store.name} ({store.city}, {store.state})</span>
                      </div>
                    )}
                    <p className="text-xs text-black leading-relaxed font-semibold italic bg-zinc-50 p-3 border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>

                  {/* Operational Security takeaway based on review */}
                  {review.isCritical && (
                    <div className="flex items-start gap-3 bg-lego-yellow border-2 border-black p-3 text-[11px] text-black shadow-lego-sm font-bold">
                      <ShieldAlert className="w-5 h-5 text-black shrink-0 mt-0.5" />
                      <div>
                        <strong className="uppercase tracking-wide text-xs block mb-1">Franchise Customer Care Note:</strong>
                        This review indicates potential complaints regarding trade valuations, contract defaults, or service delays at this individual location. If you plan to consign or trade high-value LEGO collections with this store, we strongly advise using our online <strong className="underline">Consignment Planner</strong> to generate standardized, binding commercial inventory drafts prior to drop-off.
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
