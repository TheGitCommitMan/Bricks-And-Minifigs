import React, { useState } from "react";
import { STORE_LOCATIONS } from "../data/stores";
import { EvaluatorItem } from "../types";
import { Shield, FileText, Printer, ShieldCheck, Mail, Phone, User, Store, DollarSign, Calendar, Eye } from "lucide-react";

export default function SafetyVault({ 
  items 
}: { 
  items: EvaluatorItem[] 
}) {
  const [consignorName, setConsignorName] = useState("");
  const [consignorPhone, setConsignorPhone] = useState("");
  const [consignorEmail, setConsignorEmail] = useState("");
  const [storeLocationId, setStoreLocationId] = useState(STORE_LOCATIONS[0].id);
  const [commissionSplit, setCommissionSplit] = useState<number>(75); // % of sale value going to consignor
  const [auditSchedule, setAuditSchedule] = useState<"Monthly" | "Bi-Weekly" | "Quarterly">("Monthly");
  const [insuranceValueCap, setInsuranceValueCap] = useState<number>(1000);
  const [customTerms, setCustomTerms] = useState("");
  const [previewActive, setPreviewActive] = useState(false);

  const selectedStore = STORE_LOCATIONS.find(s => s.id === storeLocationId);

  const estimatedCollectionValue = items.reduce((sum, item) => sum + item.retailValue, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8" id="consignment-planner">
      {/* Structural visual header */}
      <div className="p-6 bg-lego-blue text-white border-3 border-black rounded-none shadow-lego relative overflow-hidden">
        {/* Subtle background detail */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-none rotate-45 translate-x-16 -translate-y-16" />
        
        <div className="space-y-1.5 relative">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-lego-yellow fill-lego-yellow" />
            <h2 className="text-sm font-black uppercase tracking-wider text-lego-yellow">Standard Consignment Planner & Contract Draft Builder</h2>
          </div>
          <p className="text-xs text-zinc-100 max-w-xl leading-relaxed font-medium">
            At Bricks & Minifigs®, we believe community trust is built on accountability. This standard consignment planner helps you catalog your collection, verify store policy limits, and draft a formal Bailment and Consignment Agreement prior to dropping off items.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls Column */}
        <div className="lg:col-span-5 bg-white border-3 border-black rounded-none p-5 space-y-4 shadow-lego">
          <h3 className="text-xs font-black text-black uppercase tracking-wider pb-3 border-b-2 border-black flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-black" />
            Consignment Parameters
          </h3>

          {/* Consignor Details */}
          <div className="space-y-3 pt-1">
            <div className="space-y-1">
              <label className="text-[11px] font-black text-black uppercase flex items-center gap-1">
                <User className="w-3 h-3 text-black" /> Consignor Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g., John Doe"
                className="w-full px-3 py-1.5 border-2 border-black rounded-none text-xs focus:outline-none focus:bg-zinc-50 bg-white text-black font-semibold"
                value={consignorName}
                onChange={(e) => setConsignorName(e.target.value)}
                id="contract-name"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-black text-black uppercase flex items-center gap-1">
                  <Phone className="w-3 h-3 text-black" /> Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="555-0199"
                  className="w-full px-3 py-1.5 border-2 border-black rounded-none text-xs focus:outline-none focus:bg-zinc-50 bg-white text-black font-semibold"
                  value={consignorPhone}
                  onChange={(e) => setConsignorPhone(e.target.value)}
                  id="contract-phone"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-black text-black uppercase flex items-center gap-1">
                  <Mail className="w-3 h-3 text-black" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-3 py-1.5 border-2 border-black rounded-none text-xs focus:outline-none focus:bg-zinc-50 bg-white text-black font-semibold"
                  value={consignorEmail}
                  onChange={(e) => setConsignorEmail(e.target.value)}
                  id="contract-email"
                />
              </div>
            </div>
          </div>

          {/* Franchise Select */}
          <div className="space-y-1">
            <label className="text-[11px] font-black text-black uppercase flex items-center gap-1">
              <Store className="w-3 h-3 text-black" /> Consignment Location
            </label>
            <select
              value={storeLocationId}
              onChange={(e) => setStoreLocationId(e.target.value)}
              className="w-full px-2 py-1.5 bg-white border-2 border-black rounded-none text-xs focus:outline-none font-bold text-black"
              id="contract-store"
            >
              {STORE_LOCATIONS.map(store => (
                <option key={store.id} value={store.id}>
                  {store.name} ({store.city}, {store.state})
                </option>
              ))}
            </select>
          </div>

          {/* Splits and terms */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-black text-black uppercase flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-black" /> Consignor Split (%)
              </label>
              <input
                type="number"
                min="1"
                max="99"
                className="w-full px-3 py-1.5 border-2 border-black rounded-none text-xs focus:outline-none bg-white text-black font-black font-mono"
                value={commissionSplit}
                onChange={(e) => setCommissionSplit(parseInt(e.target.value) || 0)}
                id="contract-split"
              />
              <span className="text-[9px] text-zinc-500 font-bold block">Consignor payout percentage.</span>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-black text-black uppercase flex items-center gap-1">
                <Calendar className="w-3 h-3 text-black" /> Reconciliation Interval
              </label>
              <select
                value={auditSchedule}
                onChange={(e) => setAuditSchedule(e.target.value as any)}
                className="w-full px-2 py-1.5 bg-white border-2 border-black rounded-none text-xs focus:outline-none font-bold text-black"
                id="contract-audit"
              >
                <option value="Bi-Weekly">Bi-Weekly Audits</option>
                <option value="Monthly">Monthly Audits</option>
                <option value="Quarterly">Quarterly Audits</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-black text-black uppercase flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-black" /> Insurance Floor Coverage ($)
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g., 5000"
              className="w-full px-3 py-1.5 border-2 border-black rounded-none text-xs focus:outline-none bg-white text-black font-black font-mono"
              value={insuranceValueCap || ""}
              onChange={(e) => setInsuranceValueCap(parseInt(e.target.value) || 0)}
              id="contract-insurance"
            />
            <span className="text-[9px] text-zinc-500 font-bold block">Min. coverage on store's property casualty policy.</span>
          </div>

          {/* Custom Terms text */}
          <div className="space-y-1">
            <label className="text-[11px] font-black text-black uppercase">Additional Custom Conditions</label>
            <textarea
              placeholder="e.g., Unsold items must be packed and returned within 72 hours of written withdrawal."
              className="w-full h-20 px-3 py-1.5 border-2 border-black rounded-none text-xs focus:outline-none bg-white text-black font-semibold resize-none"
              value={customTerms}
              onChange={(e) => setCustomTerms(e.target.value)}
              id="contract-custom-terms"
            />
          </div>

          {/* Sync status based on Evaluator */}
          <div className="p-3 bg-zinc-50 border-2 border-black rounded-none text-xs space-y-1">
            <span className="font-black text-black block uppercase text-[10px] tracking-wider">Lego Inventory Synced</span>
            {items.length === 0 ? (
              <span className="text-zinc-600 font-semibold leading-relaxed block text-[11px]">
                Your Trade Estimator list is empty. You can type sets directly into the draft, or go to the **Trade Estimator** tab to compile a synchronized inventory first.
              </span>
            ) : (
              <span className="text-emerald-700 font-black flex items-center gap-1 text-[11px]">
                ✓ Successfully synchronized {items.length} items (Total: ${estimatedCollectionValue.toFixed(2)}) for attachment.
              </span>
            )}
          </div>

          <button
            onClick={() => setPreviewActive(true)}
            disabled={!consignorName}
            className={`w-full py-2.5 rounded-none text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              consignorName 
                ? "bg-lego-red text-white border-2 border-black shadow-lego-sm hover:shadow-lego hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-y-0 active:shadow-none" 
                : "bg-zinc-100 text-zinc-400 border-2 border-zinc-200 cursor-not-allowed"
            }`}
            id="preview-contract-button"
          >
            <Eye className="w-4 h-4" /> Preview Standard Agreement Draft
          </button>
        </div>

        {/* Contract Preview Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-wider">Printable Agreement Document</h3>
            {previewActive && (
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-lego-yellow text-black text-xs font-black uppercase border-2 border-black rounded-none flex items-center gap-1.5 shadow-lego-sm hover:shadow-lego hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-y-0 active:shadow-none transition-all cursor-pointer"
                id="print-contract-button"
              >
                <Printer className="w-4 h-4" /> Print / Save PDF Contract
              </button>
            )}
          </div>

          {/* Paper Mockup */}
          <div 
            className="bg-white border-3 border-black shadow-lego p-8 sm:p-12 space-y-8 font-serif text-zinc-900 relative min-h-[600px] print:border-none print:shadow-none print:p-0"
            id="printable-contract-area"
          >
            {/* Header watermarks / clean details */}
            <div className="border-b-4 border-black pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-black font-sans uppercase">STANDARD CONSIGNMENT & BAILMENT CONTRACT</h1>
                <p className="text-[10px] uppercase tracking-wider text-zinc-600 font-sans font-black mt-1">Bricks & Minifigs® Corporate Approved Template</p>
              </div>
              <span className="text-xs font-mono text-black font-sans font-bold">Date: {new Date().toLocaleDateString()}</span>
            </div>

            {previewActive ? (
              <div className="space-y-6 text-xs leading-relaxed font-sans">
                {/* Section 1: Parties */}
                <div className="space-y-2">
                  <h4 className="font-sans font-black text-black border-b-2 border-black pb-1 uppercase tracking-wider text-xs">1. Parties of the Agreement</h4>
                  <p className="text-zinc-700 font-medium">
                    This commercial bailment agreement is entered into on this day of <span className="underline font-black font-mono">{new Date().toLocaleDateString()}</span>, by and between the independent LEGO consignor and the retail franchise operator specified below:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50 p-3 rounded-none border-2 border-black font-sans text-[11px]">
                    <div className="space-y-1">
                      <span className="font-black text-zinc-500 block uppercase text-[10px]">THE CONSIGNOR (Bailor):</span>
                      <p className="font-black text-black">{consignorName || "Unspecified Consignor"}</p>
                      <p className="text-zinc-700 font-medium">Phone: {consignorPhone || "None"}</p>
                      <p className="text-zinc-700 font-medium">Email: {consignorEmail || "None"}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-black text-zinc-500 block uppercase text-[10px]">THE FRANCHISEE (Bailee):</span>
                      <p className="font-black text-black">{selectedStore?.name || "Unspecified Store"}</p>
                      <p className="text-zinc-700 font-medium">Representative: Store Manager / Franchise Owner</p>
                      <p className="text-zinc-700 font-medium">Address: {selectedStore?.city || "Unknown"}, {selectedStore?.state || ""}</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Core bailment & closure protections */}
                <div className="space-y-2 text-justify">
                  <h4 className="font-sans font-black text-black border-b-2 border-black pb-1 uppercase tracking-wider text-xs">2. Custody, Accountability & Safeguards</h4>
                  <ul className="list-decimal pl-4 space-y-2 text-zinc-800 font-medium">
                    <li>
                      <strong>Property Liability & Safety:</strong> The Franchisee accepts physical custody of the bailable assets listed in Schedule A. The Franchisee assumes full property responsibility and agrees to keep the items secured, dry, dust-free, and protected from theft, loss, or customer tampering.
                    </li>
                    <li>
                      <strong>Store Closure Notification Mandate:</strong> In order to mitigate consignment risks, the Franchisee is legally obligated to notify the Consignor in writing at least <strong>thirty (30) calendar days</strong> prior to any corporate restructure, store closure, lease termination, or bankruptcy filings. Upon receipt of notice, or immediately upon unnotified closure, the Consignor retains absolute title and immediate retrieval rights to all unsold assets.
                    </li>
                    <li>
                      <strong>Property Casualty Insurance:</strong> The Franchisee certifies that they maintain a active commercial general liability policy with property casualty coverage of at least <strong>${insuranceValueCap}</strong> which covers third-party consigned items stored on retail premises.
                    </li>
                    <li>
                      <strong>Compulsory Reconciliation Audits:</strong> Both parties agree to a mandatory physical inventory check-off to be performed <strong>{auditSchedule}</strong>. The Franchisee will supply a visual checklist confirming the presence and status of all unsold assets.
                    </li>
                    <li>
                      <strong>Payout Splits & Commissions:</strong> Upon successful sale of an asset, the Franchisee shall remit exactly <strong>{commissionSplit}%</strong> of the final pre-tax sale price to the Consignor within 14 business days. The Franchisee retains {100 - commissionSplit}% as a consignment fee.
                    </li>
                  </ul>
                </div>

                {/* Section 3: Custom Terms if any */}
                {customTerms && (
                  <div className="space-y-2">
                    <h4 className="font-sans font-black text-black border-b-2 border-black pb-1 uppercase tracking-wider text-xs">3. Custom Agreements & Amendments</h4>
                    <p className="bg-zinc-50 p-3 border-2 border-black text-[11px] text-zinc-800 font-mono italic">
                      {customTerms}
                    </p>
                  </div>
                )}

                {/* Section 4: Schedule A inventory attachment */}
                <div className="space-y-2">
                  <h4 className="font-sans font-black text-black border-b-2 border-black pb-1 uppercase tracking-wider text-xs">Schedule A: Consigned Asset Inventory</h4>
                  {items.length === 0 ? (
                    <p className="text-zinc-500 italic">No assets listed. Store inventory checklist must be hand-drafted below upon drop-off.</p>
                  ) : (
                    <div className="border-2 border-black overflow-hidden font-sans text-[10px]">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-zinc-100 border-b-2 border-black text-black font-black uppercase">
                            <th className="p-2">Description / Name</th>
                            <th className="p-2">Type</th>
                            <th className="p-2">Condition</th>
                            <th className="p-2 text-right">Est. Value</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-300 text-zinc-800 font-semibold">
                          {items.map((item, index) => (
                            <tr key={index} className="bg-white hover:bg-zinc-50">
                              <td className="p-2 font-black text-black">{item.name}</td>
                              <td className="p-2 capitalize">{item.type}</td>
                              <td className="p-2">{item.condition}</td>
                              <td className="p-2 text-right font-mono font-bold text-black">${item.retailValue.toFixed(0)}</td>
                            </tr>
                          ))}
                          <tr className="bg-zinc-100 font-black border-t-2 border-black text-black">
                            <td colSpan={3} className="p-2 text-right">Estimated Combined Consignment Value:</td>
                            <td className="p-2 text-right font-mono font-black">${estimatedCollectionValue.toFixed(0)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Signatures */}
                <div className="pt-8 grid grid-cols-2 gap-8 font-sans">
                  <div className="space-y-4">
                    <span className="text-[10px] text-zinc-500 block uppercase font-black tracking-wider">CONSIGNOR SIGNATURE:</span>
                    <div className="border-b-2 border-black h-10 w-full" />
                    <div className="text-[10px] text-zinc-700 font-bold">
                      <p className="font-black text-black">{consignorName}</p>
                      <p>Date: __________________</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <span className="text-[10px] text-zinc-500 block uppercase font-black tracking-wider">FRANCHISEE OWNER SIGNATURE:</span>
                    <div className="border-b-2 border-black h-10 w-full" />
                    <div className="text-[10px] text-zinc-700 font-bold">
                      <p className="font-black text-black">{selectedStore?.name}</p>
                      <p>Date: __________________</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 font-sans border-3 border-dashed border-zinc-300 rounded-none bg-zinc-50">
                <Shield className="w-12 h-12 text-zinc-400" />
                <div className="space-y-1 max-w-sm px-4">
                  <h4 className="text-sm font-black uppercase text-black">Agreement Draft Pending</h4>
                  <p className="text-xs text-zinc-600 font-medium leading-relaxed">
                    Please provide your **Consignor Full Name** and contact details on the left parameters panel to compile your standard consignment contract.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
