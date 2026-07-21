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
    <div className="space-y-8" id="trade-evaluator">
      {/* Educational Block on Resale Realities */}
      {showExplanation && (
        <div className="bg-white border-3 border-black p-5 shadow-lego rounded-none space-y-4 max-w-4xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <div className="p-2 bg-lego-yellow border-2 border-black shadow-lego-sm rounded-none shrink-0">
                <Info className="w-5 h-5 text-black shrink-0" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-black text-black tracking-wider uppercase bg-lego-yellow px-2 py-0.5 inline-block border-2 border-black shadow-lego-sm">
                  Understanding LEGO Resale Economics
                </h3>
                <p className="text-xs text-black font-medium leading-relaxed pt-2">
                  Many sellers go to local toy reseller stores expecting full retail value and walk away feeling scammed. To operate successfully, brick-and-mortar storefronts face heavy overheads: retail rent, full-time wages for workers to verify, count, clean, and organize thousands of loose parts, and holding slow-moving inventory.
                </p>
                <p className="text-xs text-black font-bold leading-relaxed">
                  Standard industry trade ratios are: Cash offers typically represent 30% to 40% of BrickLink average secondary market rates. Store Credit typically represents 50% to 60%, incentivizing community rotation. Prepare your items beforehand (dusting them, sorting minifigs) to unlock maximum value.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowExplanation(false)} 
              className="text-lego-red hover:underline font-black uppercase tracking-wider text-[11px] shrink-0 cursor-pointer"
              id="hide-explanation"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Builder */}
        <form onSubmit={handleAddItem} className="lg:col-span-5 bg-white border-3 border-black shadow-lego rounded-none p-5 space-y-4">
          <h2 className="text-sm font-black text-black uppercase tracking-wider pb-3 border-b-2 border-black flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-lego-red" />
            Add Item to Appraisal
          </h2>

          {/* Quick Presets Select */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-black uppercase tracking-wider block">Quick Reference Presets</label>
            <select
              onChange={(e) => handleSelectPreset(e.target.value)}
              className="w-full px-2 py-1.5 bg-white border-2 border-black rounded-none text-xs font-bold focus:outline-none"
              defaultValue=""
              id="preset-select"
            >
              <option value="" disabled>-- Select a standard preset (optional) --</option>
              {STANDARD_PRESETS.map((p, idx) => (
                <option key={idx} value={p.name}>
                  {p.name} ({p.type === "bulk" ? `$${p.value}/lb` : `$${p.value} retail`})
                </option>
              ))}
            </select>
          </div>

          {/* Item Type */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-black uppercase tracking-wider block">Item Category</label>
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
                  className={`py-1.5 border-2 border-black text-center rounded-none text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    itemType === type 
                      ? "bg-lego-blue text-white shadow-lego-sm translate-x-[-1px] translate-y-[-1px]" 
                      : "bg-white text-black hover:bg-zinc-100 active:translate-y-0"
                  }`}
                  id={`type-${type}`}
                >
                  {type === "set" ? "Set" : type === "minifig" ? "Minifig" : "Bulk"}
                </button>
              ))}
            </div>
          </div>

          {/* Item Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-black uppercase tracking-wider block">Item Description / Name</label>
            <input
              type="text"
              required
              placeholder={itemType === "set" ? "e.g., Star Wars X-Wing Starfighter 75301" : itemType === "minifig" ? "e.g., Darth Vader (Imperial)" : "e.g., Loose clean bricks"}
              className="w-full px-3 py-1.5 border-2 border-black rounded-none text-xs font-bold focus:outline-none bg-zinc-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="input-item-name"
            />
          </div>

          {/* Condition and inputs based on type */}
          {itemType === "bulk" ? (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-black uppercase tracking-wider flex items-center justify-between">
                <span>Weight (Pounds)</span>
                <span className="font-mono text-black font-black">{weight} lbs</span>
              </label>
              <div className="flex items-center gap-3">
                <Scale className="w-4 h-4 text-black shrink-0" />
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={weight}
                  onChange={(e) => handleWeightChange(parseInt(e.target.value))}
                  className="w-full accent-lego-blue"
                  id="input-weight"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-black uppercase tracking-wider block">Condition Status</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full px-2 py-1.5 bg-white border-2 border-black rounded-none text-xs font-bold focus:outline-none"
                id="input-condition"
              >
                <option value="New Sealed">New & Sealed In Box (+25% premium)</option>
                <option value="Used Complete">Used & Complete (Standard baseline)</option>
                <option value="Used Incomplete">Used & Incomplete (Missing pieces, -50%)</option>
              </select>
            </div>
          )}

          {/* Estimated secondary retail value */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-black uppercase tracking-wider flex items-center justify-between">
              <span>Estimated Market Retail Value ($)</span>
              <span className="text-[10px] text-zinc-500 font-bold normal-case">BrickLink / Ebay Average</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs text-black font-black font-mono">$</span>
              <input
                type="number"
                min="1"
                required
                className="w-full pl-7 pr-3 py-1.5 border-2 border-black rounded-none text-xs font-black focus:outline-none bg-zinc-50 font-mono"
                value={retailValueInput}
                onChange={(e) => setRetailValueInput(e.target.value)}
                id="input-retail-value"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-lego-red text-white border-3 border-black rounded-none font-black uppercase tracking-widest text-xs shadow-lego hover:shadow-lego-lg hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-y-0 active:shadow-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            id="add-item-button"
          >
            <Plus className="w-4 h-4 text-white" /> Add to Appraisal List
          </button>
        </form>

        {/* Right Column: Calculations & Cart */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Calculation Summary Card */}
          <div className="bg-zinc-900 text-white border-3 border-black rounded-none p-6 space-y-4 shadow-lego relative overflow-hidden" id="valuation-summary">
            {/* Structural accent mark to anchor attention */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-800 rounded-none border-l-2 border-b-2 border-black rotate-45 translate-x-12 -translate-y-12 opacity-35" />

            <div className="relative space-y-3">
              <h2 className="text-xs font-black tracking-widest text-lego-yellow uppercase">Valuation Summary</h2>
              
              <div className="grid grid-cols-2 gap-4 pb-4 border-b-2 border-zinc-800">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-black tracking-wider block">Total Items Listed</span>
                  <span className="text-3xl font-black font-mono tracking-tight text-white">{items.length}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-black tracking-wider block">Secondary Market Value</span>
                  <span className="text-3xl font-black font-mono tracking-tight text-lego-yellow">${calculations.adjustedValue.toFixed(2)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Cash offer range */}
                <div className="bg-zinc-800 p-3.5 border-2 border-zinc-700 rounded-none">
                  <span className="text-[10px] text-zinc-300 uppercase block font-black tracking-wider mb-1">Est. Cash Value (30-40%)</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-white font-mono">${calculations.cashMin.toFixed(0)}</span>
                    <span className="text-xs text-zinc-400 font-mono">to</span>
                    <span className="text-xl font-black text-white font-mono">${calculations.cashMax.toFixed(0)}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 block mt-1 leading-normal">Recommended for fast, guaranteed payout.</span>
                </div>

                {/* Store credit offer range */}
                <div className="bg-zinc-850 p-3.5 border-2 border-lego-yellow rounded-none">
                  <span className="text-[10px] text-lego-yellow uppercase block font-black tracking-wider mb-1">Est. Store Credit (50-60%)</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-lego-yellow font-mono">${calculations.creditMin.toFixed(0)}</span>
                    <span className="text-xs text-zinc-300 font-mono">to</span>
                    <span className="text-xl font-black text-lego-yellow font-mono">${calculations.creditMax.toFixed(0)}</span>
                  </div>
                  <span className="text-[10px] text-zinc-300 block mt-1 leading-normal">Best trade value. Exchange for Lego sets directly in-store.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Inventory Table List */}
          <div className="bg-white border-3 border-black rounded-none shadow-lego overflow-hidden" id="inventory-list">
            <div className="px-5 py-4 border-b-3 border-black bg-zinc-50 flex items-center justify-between">
              <h3 className="text-xs font-black text-black uppercase tracking-wider">Appraisal List Items</h3>
              {items.length > 0 && (
                <button
                  onClick={() => setItems([])}
                  className="px-2 py-1 bg-lego-red text-white border-2 border-black rounded-none text-[10px] font-black uppercase tracking-wider shadow-lego-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-lego active:translate-y-0 active:shadow-none transition-all cursor-pointer"
                  id="clear-all-items"
                >
                  Clear All
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="p-10 text-center text-zinc-500 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Inventory Empty</p>
                <p className="text-xs">Your appraisal list is empty. Add Lego sets, minifigures, or bulk packages to view payout estimates.</p>
              </div>
            ) : (
              <div className="divide-y-2 divide-black">
                {items.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between text-xs gap-4 bg-white hover:bg-zinc-50 transition-colors" id={`inventory-item-${item.id}`}>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-black text-sm">{item.name}</span>
                        <span className={`px-2 py-0.5 text-[9px] font-black uppercase border-2 border-black rounded-none ${
                          item.type === "set" ? "bg-lego-yellow text-black" : item.type === "minifig" ? "bg-lego-blue text-white" : "bg-lego-red text-white"
                        }`}>
                          {item.type === "set" ? "Set" : item.type === "minifig" ? "Minifig" : `${item.weightPounds} lbs Bulk`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-bold">
                        <span>Condition: <span className="text-black uppercase font-black">{item.condition}</span></span>
                        <span>•</span>
                        <span>Retail Market Value: <span className="text-black font-black font-mono">${item.retailValue.toFixed(0)}</span></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      {/* Live Calculated Payout ranges for single item */}
                      <div className="text-right hidden sm:block font-bold">
                        <div className="text-[10px] text-zinc-600">
                          Cash: <strong className="font-mono text-black font-black">${(item.retailValue * (item.condition === "Used Incomplete" ? 0.5 : item.condition === "New Sealed" ? 1.25 : 1) * 0.3).toFixed(0)}-${(item.retailValue * (item.condition === "Used Incomplete" ? 0.5 : item.condition === "New Sealed" ? 1.25 : 1) * 0.4).toFixed(0)}</strong>
                        </div>
                        <div className="text-[10px] text-lego-red">
                          Credit: <strong className="font-mono text-lego-red font-black">${(item.retailValue * (item.condition === "Used Incomplete" ? 0.5 : item.condition === "New Sealed" ? 1.25 : 1) * 0.5).toFixed(0)}-${(item.retailValue * (item.condition === "Used Incomplete" ? 0.5 : item.condition === "New Sealed" ? 1.25 : 1) * 0.6).toFixed(0)}</strong>
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1.5 bg-zinc-100 hover:bg-lego-red hover:text-white border-2 border-black rounded-none shadow-lego-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-lego active:translate-y-0 active:shadow-none transition-all cursor-pointer text-black"
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
