import React, { useState, useMemo } from "react";
import { EvaluatorItem } from "../types";
import { Plus, Trash2, HelpCircle, ArrowRight, Sparkles, Scale, Info, Layers } from "lucide-react";

const STANDARD_PRESETS = [
  { name: "Star Wars UCS Millennium Falcon (75192)", value: 850, type: "set" },
  { name: "Ninjago City Gardens (71741)", value: 350, type: "set" },
  { name: "Retro Bowling Alley (BrickLink)", value: 280, type: "set" },
  { name: "Captain Rex Minifigure (Phase 2)", value: 120, type: "minifig" },
  { name: "Lego Star Wars Boba Fett (Cloud City)", value: 1500, type: "minifig" },
  { name: "Bulk LEGO bricks (Clean, mixed)", value: 5, type: "bulk" } // Value per lb
];

export default function Evaluator({ 
  items, 
  setItems 
}: { 
  items: EvaluatorItem[]; 
  setItems: React.Dispatch<React.SetStateAction<EvaluatorItem[]>>; 
}) {
  const [itemType, setItemType] = useState<"set" | "minifig" | "bulk">("set");
  const [name, setName] = useState("");
  const [condition, setCondition] = useState<"New Sealed" | "Used Complete" | "Used Incomplete" | "Bulk Pieces">("Used Complete");
  const [weight, setWeight] = useState<number>(5);
  const [retailValueInput, setRetailValueInput] = useState<string>("100");

  const [showExplanation, setShowExplanation] = useState(true);

  // Auto-fill value if preset is selected
  const handleSelectPreset = (presetName: string) => {
    const p = STANDARD_PRESETS.find(x => x.name === presetName);
    if (p) {
      setName(p.name);
      setItemType(p.type as any);
      if (p.type === "bulk") {
        setCondition("Bulk Pieces");
        setRetailValueInput((p.value * weight).toString());
      } else {
        setRetailValueInput(p.value.toString());
      }
    }
  };

  // Handle bulk weight adjustment
  const handleWeightChange = (newWeight: number) => {
    setWeight(newWeight);
    if (itemType === "bulk" && name.includes("Bulk")) {
      setRetailValueInput((newWeight * 5).toString()); // mixed clean bulk value preset is $5/lb
    }
  };

  // Add Item to collection
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedValue = parseFloat(retailValueInput) || 0;

    const newItem: EvaluatorItem = {
      id: Math.random().toString(36).substring(2, 9),
      type: itemType,
      name: name,
      condition: itemType === "bulk" ? "Bulk Pieces" : condition,
      retailValue: parsedValue,
      weightPounds: itemType === "bulk" ? weight : undefined
    };

    setItems(prev => [...prev, newItem]);
    setName("");
    setRetailValueInput("100");
  };

  // Remove Item
  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Math Calculations
  const calculations = useMemo(() => {
    const totalRetail = items.reduce((sum, item) => sum + item.retailValue, 0);
    
    // Adjust value based on condition
    const adjustedValue = items.reduce((sum, item) => {
      let multiplier = 1.0;
      if (item.condition === "Used Incomplete") multiplier = 0.5; // Missing parts drops secondary value in half
      if (item.condition === "New Sealed") multiplier = 1.25;     // Premium for factory-sealed boxes
      return sum + (item.retailValue * multiplier);
    }, 0);

    // Standard resale trade ratios
    const cashMin = adjustedValue * 0.30;
    const cashMax = adjustedValue * 0.40;
    const creditMin = adjustedValue * 0.50;
    const creditMax = adjustedValue * 0.60;

    return {
      totalRetail,
      adjustedValue,
      cashMin,
      cashMax,
      creditMin,
      creditMax
    };
  }, [items]);

  return (
    <div className="space-y-10" id="trade-evaluator">
      {/* Educational Block on Resale Realities */}
      {showExplanation && (
        <div className="bg-white border border-zinc-100 p-6 rounded-2xl shadow-lego max-w-4xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="p-2.5 bg-zinc-50 border border-zinc-200/50 rounded-xl shrink-0">
                <Info className="w-5 h-5 text-lego-blue shrink-0" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">
                  Understanding Resale Exchange Economics
                </h3>
                <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                  Many fans go to physical toy resale outlets expecting full brand retail pricing, and are surprised by trade values. To operate sustainably, brick-and-mortar storefronts carry significant operational overhead: retail leasing, state sales tax compliance, and skilled labor to sort, authenticate, clean, and inventory tens of thousands of loose pieces.
                </p>
                <p className="text-xs text-zinc-700 font-semibold leading-relaxed">
                  Standard trade-in industry benchmarks: Cash offers generally represent 30% to 40% of standard secondary market value (e.g. verified BrickLink historical sells), while Store Credit offers represent 50% to 60%, incentivizing community circular economy.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowExplanation(false)} 
              className="text-zinc-400 hover:text-zinc-600 font-semibold uppercase tracking-wider text-[10px] shrink-0 cursor-pointer"
              id="hide-explanation"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Builder */}
        <form onSubmit={handleAddItem} className="lg:col-span-5 bg-white border border-zinc-100 shadow-lego rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-heading font-bold text-zinc-900 pb-3 border-b border-zinc-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-lego-red" />
            Add Item to Appraisal
          </h2>

          {/* Quick Presets Select */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">Quick Reference Presets</label>
            <select
              onChange={(e) => handleSelectPreset(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-lego-blue text-zinc-800"
              defaultValue=""
              id="preset-select"
            >
              <option value="" disabled>-- Select a standard preset (optional) --</option>
              {STANDARD_PRESETS.map((p, idx) => (
                <option key={idx} value={p.name}>
                  {p.name} ({p.type === "bulk" ? `$${p.value}/lb` : `$${p.value} value`})
                </option>
              ))}
            </select>
          </div>

          {/* Item Type */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">Item Category</label>
            <div className="grid grid-cols-3 gap-2">
              {(["set", "minifig", "bulk"] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setItemType(type);
                    if (type === "bulk") {
                      setName("Bulk LEGO Bricks (Clean, Mixed)");
                      setCondition("Bulk Pieces");
                      setRetailValueInput((weight * 5).toString());
                    } else {
                      setName("");
                      setRetailValueInput("100");
                    }
                  }}
                  className={`py-2 text-center rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    itemType === type 
                      ? "bg-lego-blue text-white shadow-sm" 
                      : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100"
                  }`}
                  id={`type-${type}`}
                >
                  {type === "set" ? "Set" : type === "minifig" ? "Minifig" : "Bulk"}
                </button>
              ))}
            </div>
          </div>

          {/* Item Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">Item Description / Name</label>
            <input
              type="text"
              required
              placeholder={itemType === "set" ? "e.g., Star Wars X-Wing Starfighter 75301" : itemType === "minifig" ? "e.g., Darth Vader (Imperial)" : "e.g., Loose clean bricks"}
              className="w-full px-3.5 py-2 border border-zinc-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-lego-blue bg-zinc-50/50 text-zinc-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="input-item-name"
            />
          </div>

          {/* Condition and inputs based on type */}
          {itemType === "bulk" ? (
            <div className="space-y-2 bg-zinc-50 p-3 rounded-lg border border-zinc-200/40">
              <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider flex items-center justify-between">
                <span>Weight (Pounds)</span>
                <span className="font-mono text-zinc-800 font-bold">{weight} lbs</span>
              </label>
              <div className="flex items-center gap-3">
                <Scale className="w-4 h-4 text-zinc-400 shrink-0" />
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={weight}
                  onChange={(e) => handleWeightChange(parseInt(e.target.value))}
                  className="w-full accent-lego-blue cursor-pointer h-1.5 bg-zinc-200 rounded-lg appearance-none"
                  id="input-weight"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">Condition Status</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-lego-blue text-zinc-850"
                id="input-condition"
              >
                <option value="New Sealed">New & Sealed In Box (+25% Premium)</option>
                <option value="Used Complete">Used & Complete (Standard baseline)</option>
                <option value="Used Incomplete">Used & Incomplete (Missing pieces, -50%)</option>
              </select>
            </div>
          )}

          {/* Estimated secondary retail value */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              <span>BrickLink / eBay Market Value ($)</span>
              <span className="text-[9px] text-zinc-400 font-medium tracking-normal normal-case">Average Sold Rate</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs text-zinc-400 font-mono">$</span>
              <input
                type="number"
                min="1"
                required
                className="w-full pl-8 pr-3 py-2.5 border border-zinc-200 rounded-lg text-xs font-bold focus:outline-none focus:ring-1 focus:ring-lego-blue bg-zinc-50/50 text-zinc-850 font-mono"
                value={retailValueInput}
                onChange={(e) => setRetailValueInput(e.target.value)}
                id="input-retail-value"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-lego-red hover:bg-red-700 text-white rounded-lg font-semibold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            id="add-item-button"
          >
            <Plus className="w-4 h-4 text-white" /> Add to Appraisal List
          </button>
        </form>

        {/* Right Column: Calculations & Cart */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Calculation Summary Card */}
          <div className="bg-zinc-950 text-white rounded-2xl p-6 md:p-8 space-y-6 shadow-lego relative overflow-hidden" id="valuation-summary">
            {/* Subtle atmospheric gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-lego-blue/10 to-transparent pointer-events-none" />

            <div className="relative space-y-4">
              <h2 className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase">Valuation Summary</h2>
              
              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-zinc-800">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider block mb-1">Total Items</span>
                  <span className="text-3xl font-heading font-bold text-white">{items.length}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider block mb-1">Secondary Market baseline</span>
                  <span className="text-3xl font-heading font-bold text-amber-500 font-mono">${calculations.adjustedValue.toFixed(2)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Cash offer range */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-1">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase block tracking-wider">Est. Cash payout (30-40%)</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white font-mono">${calculations.cashMin.toFixed(0)}</span>
                    <span className="text-xs text-zinc-500 font-mono">to</span>
                    <span className="text-2xl font-bold text-white font-mono">${calculations.cashMax.toFixed(0)}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 block leading-normal pt-1">Recommended for immediate physical settlement.</span>
                </div>

                {/* Store credit offer range */}
                <div className="bg-zinc-900 border border-amber-500/25 rounded-xl p-4 space-y-1">
                  <span className="text-[9px] font-mono text-amber-500 uppercase block tracking-wider">Est. Store Credit (50-60%)</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-amber-500 font-mono">${calculations.creditMin.toFixed(0)}</span>
                    <span className="text-xs text-zinc-400 font-mono">to</span>
                    <span className="text-2xl font-bold text-amber-500 font-mono">${calculations.creditMax.toFixed(0)}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 block leading-normal pt-1">Optimal value. Directly tradable for loose brick inventory.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Inventory Table List */}
          <div className="bg-white border border-zinc-100 rounded-2xl shadow-lego overflow-hidden" id="inventory-list">
            <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">Appraisal List Items</h3>
              {items.length > 0 && (
                <button
                  onClick={() => setItems([])}
                  className="px-2.5 py-1 text-zinc-500 hover:text-lego-red rounded-lg border border-zinc-200 text-[10px] font-semibold uppercase tracking-wider bg-white transition-colors cursor-pointer"
                  id="clear-all-items"
                >
                  Clear All
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="p-12 text-center text-zinc-500 space-y-2">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Inventory Empty</p>
                <p className="text-xs text-zinc-500 font-normal">Your custom trade-in appraisal list is empty. Add elements on the left panel to begin.</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100">
                {items.map((item) => (
                  <div key={item.id} className="p-5 flex items-center justify-between text-xs gap-4 bg-white hover:bg-zinc-50/40 transition-colors" id={`inventory-item-${item.id}`}>
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-zinc-900 text-sm">{item.name}</span>
                        <span className={`px-2 py-0.5 text-[9px] font-semibold uppercase rounded border ${
                          item.type === "set" ? "bg-amber-50 text-amber-800 border-amber-200" : item.type === "minifig" ? "bg-sky-50 text-sky-800 border-sky-200" : "bg-zinc-50 text-zinc-800 border-zinc-200"
                        }`}>
                          {item.type === "set" ? "Set" : item.type === "minifig" ? "Minifig" : `${item.weightPounds} lbs Bulk`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-normal">
                        <span>Condition: <span className="text-zinc-600 font-semibold uppercase">{item.condition}</span></span>
                        <span>•</span>
                        <span>Market baseline: <span className="text-zinc-600 font-semibold font-mono">${item.retailValue.toFixed(0)}</span></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      {/* Live Calculated Payout ranges for single item */}
                      <div className="text-right hidden sm:block">
                        <div className="text-[10px] text-zinc-500">
                          Cash: <strong className="font-mono text-zinc-800 font-bold">${(item.retailValue * (item.condition === "Used Incomplete" ? 0.5 : item.condition === "New Sealed" ? 1.25 : 1) * 0.3).toFixed(0)}-${(item.retailValue * (item.condition === "Used Incomplete" ? 0.5 : item.condition === "New Sealed" ? 1.25 : 1) * 0.4).toFixed(0)}</strong>
                        </div>
                        <div className="text-[10px] text-lego-red">
                          Credit: <strong className="font-mono text-lego-red font-bold">${(item.retailValue * (item.condition === "Used Incomplete" ? 0.5 : item.condition === "New Sealed" ? 1.25 : 1) * 0.5).toFixed(0)}-${(item.retailValue * (item.condition === "Used Incomplete" ? 0.5 : item.condition === "New Sealed" ? 1.25 : 1) * 0.6).toFixed(0)}</strong>
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1.5 hover:bg-zinc-100 rounded-lg text-zinc-400 hover:text-lego-red transition-all cursor-pointer border border-transparent hover:border-zinc-200"
                        title="Remove item"
                        id={`delete-item-${item.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
