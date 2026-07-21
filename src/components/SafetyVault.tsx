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
    <div className="space-y-10" id="consignment-planner">
      {/* Structural visual header */}
      <div className="p-6 md:p-8 bg-lego-blue text-white rounded-2xl shadow-lego relative overflow-hidden">
        {/* Subtle background detail */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-12 -translate-y-12" />
        
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            <h2 className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase">Standard Consignment Planner & Contract Draft Builder</h2>
          </div>
          <h3 className="text-xl md:text-2xl font-display font-semibold tracking-tight text-white">
            Bailment & Operational Accountability Drafts
          </h3>
          <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed font-normal">
            At Bricks & Minifigs®, we believe community trust is built on legal clarity. This standard consignment planner helps you catalog your collection, verify franchise policy limits, and draft a binding commercial Bailment Agreement prior to element drop-off.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls Column */}
        <div className="lg:col-span-5 bg-white border border-zinc-100 rounded-2xl p-6 space-y-5 shadow-lego">
          <h3 className="text-sm font-heading font-bold text-zinc-900 pb-3 border-b border-zinc-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-zinc-500" />
            Consignment Parameters
          </h3>

          {/* Consignor Details */}
          <div className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-zinc-400" /> Consignor Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g., John Doe"
                className="w-full px-3.5 py-2 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-lego-blue bg-zinc-50/50 text-zinc-800 font-medium"
                value={consignorName}
                onChange={(e) => setConsignorName(e.target.value)}
                id="contract-name"
              />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-zinc-400" /> Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="555-0199"
                  className="w-full px-3.5 py-2 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-lego-blue bg-zinc-50/50 text-zinc-800 font-medium"
                  value={consignorPhone}
                  onChange={(e) => setConsignorPhone(e.target.value)}
                  id="contract-phone"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-3.5 py-2 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-lego-blue bg-zinc-50/50 text-zinc-800 font-medium"
                  value={consignorEmail}
                  onChange={(e) => setConsignorEmail(e.target.value)}
                  id="contract-email"
                />
              </div>
            </div>
          </div>

          {/* Franchise Select */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-zinc-400" /> Consignment Location
            </label>
            <select
              value={storeLocationId}
              onChange={(e) => setStoreLocationId(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-lego-blue text-zinc-800 font-semibold"
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
          <div className="grid grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-zinc-400" /> Consignor Split (%)
              </label>
              <input
                type="number"
                min="1"
                max="99"
                className="w-full px-3.5 py-2 border border-zinc-200 rounded-lg text-xs focus:outline-none bg-white text-zinc-850 font-bold font-mono"
                value={commissionSplit}
                onChange={(e) => setCommissionSplit(parseInt(e.target.value) || 0)}
                id="contract-split"
              />
              <span className="text-[9px] text-zinc-400 font-normal block">Consignor payout ratio.</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" /> Reconciliation
              </label>
              <select
                value={auditSchedule}
                onChange={(e) => setAuditSchedule(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-lego-blue text-zinc-800 font-semibold"
                id="contract-audit"
              >
                <option value="Bi-Weekly">Bi-Weekly Audits</option>
                <option value="Monthly">Monthly Audits</option>
                <option value="Quarterly">Quarterly Audits</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" /> Insurance Coverage Floor ($)
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g., 5000"
              className="w-full px-3.5 py-2 border border-zinc-200 rounded-lg text-xs focus:outline-none bg-white text-zinc-850 font-bold font-mono"
              value={insuranceValueCap || ""}
              onChange={(e) => setInsuranceValueCap(parseInt(e.target.value) || 0)}
              id="contract-insurance"
            />
            <span className="text-[9px] text-zinc-400 font-normal block">Minimum casualty protection covering retail premises.</span>
          </div>

          {/* Custom Terms text */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Additional Custom Clauses</label>
            <textarea
              placeholder="e.g., Unsold items must be packed and returned within 72 hours of written withdrawal."
              className="w-full h-20 px-3.5 py-2 border border-zinc-200 rounded-lg text-xs focus:outline-none bg-white text-zinc-800 font-medium resize-none"
              value={customTerms}
              onChange={(e) => setCustomTerms(e.target.value)}
              id="contract-custom-terms"
            />
          </div>

          {/* Sync status based on Evaluator */}
          <div className="p-4 bg-zinc-50 border border-zinc-200/50 rounded-xl text-xs space-y-1.5">
            <span className="font-mono text-[9px] font-bold text-zinc-400 block uppercase tracking-wider">Lego Inventory Sync Status</span>
            {items.length === 0 ? (
              <span className="text-zinc-500 font-normal leading-relaxed block text-[11px]">
                Your Trade-In Valuator list is empty. You can compilation a synchronized inventory list in the **Trade-In Valuator** tab to automatically attach them here.
              </span>
            ) : (
              <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                ✓ Synced {items.length} items (Total: ${estimatedCollectionValue.toFixed(2)}) for attachment.
              </span>
            )}
          </div>

          <button
            onClick={() => setPreviewActive(true)}
            disabled={!consignorName}
            className={`w-full py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
              consignorName 
                ? "bg-lego-red text-white hover:bg-red-700 border-transparent" 
                : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
            }`}
            id="preview-contract-button"
          >
            <Eye className="w-4 h-4" /> Preview Standard Agreement
          </button>
        </div>

        {/* Contract Preview Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">Interactive PDF Agreement Document</h3>
            {previewActive && (
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-semibold rounded-lg border border-zinc-200 flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors"
                id="print-contract-button"
              >
                <Printer className="w-4 h-4 text-zinc-500" /> Print / Save Contract PDF
              </button>
            )}
          </div>

          {/* Paper Mockup */}
          <div 
            className="bg-white border border-zinc-100 rounded-2xl shadow-lego p-8 sm:p-12 space-y-8 text-zinc-900 relative min-h-[600px] print:border-none print:shadow-none print:p-0"
            id="printable-contract-area"
          >
            {/* Header watermarks / clean details */}
            <div className="border-b-2 border-zinc-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2">
              <div>
                <h1 className="text-lg md:text-xl font-display font-bold tracking-tight text-zinc-900 uppercase">STANDARD CONSIGNMENT & BAILMENT AGREEMENT</h1>
                <p className="text-[10px] uppercase tracking-wider text-amber-600 font-mono font-semibold mt-1">Bricks & Minifigs® Compliance Approved Document</p>
              </div>
              <span className="text-xs font-mono text-zinc-500 font-medium">Date: {new Date().toLocaleDateString()}</span>
            </div>

            {previewActive ? (
              <div className="space-y-6 text-xs leading-relaxed font-sans text-zinc-700">
                {/* Section 1: Parties */}
                <div className="space-y-2">
                  <h4 className="font-heading font-bold text-zinc-900 border-b border-zinc-100 pb-1 uppercase tracking-wider text-[11px]">1. Parties of the Agreement</h4>
                  <p className="font-normal text-zinc-600">
                    This commercial bailment and listing agreement is entered into on this day of <span className="underline font-semibold font-mono text-zinc-800">{new Date().toLocaleDateString()}</span>, by and between the independent LEGO consignor and the franchisee operator specified below:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50/50 p-4 rounded-xl border border-zinc-100 font-sans text-[11px] text-zinc-600">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] font-bold text-zinc-400 block uppercase">THE CONSIGNOR (Bailor):</span>
                      <p className="font-bold text-zinc-900">{consignorName || "Unspecified Consignor"}</p>
                      <p>Phone: {consignorPhone || "None"}</p>
                      <p>Email: {consignorEmail || "None"}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] font-bold text-zinc-400 block uppercase">THE FRANCHISEE (Bailee):</span>
                      <p className="font-bold text-zinc-900">{selectedStore?.name || "Unspecified Store"}</p>
                      <p>Representative: On-Duty Store Manager</p>
                      <p>Address: {selectedStore?.city || "Unknown"}, {selectedStore?.state || ""}</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Core bailment & closure protections */}
                <div className="space-y-2 text-justify text-zinc-600">
                  <h4 className="font-heading font-bold text-zinc-900 border-b border-zinc-100 pb-1 uppercase tracking-wider text-[11px]">2. Custody, Accountability & Safeguards</h4>
                  <ul className="list-decimal pl-4 space-y-2 font-normal">
                    <li>
                      <strong>Property Liability & Safety:</strong> The Franchisee accepts commercial custody of the assets listed in Schedule A. The Franchisee assumes full property responsibility and agrees to keep the elements secured, dry, dust-free, and protected from theft or tampering.
                    </li>
                    <li>
                      <strong>Store Closure Notification Mandate:</strong> In order to mitigate consignment risks, the Franchisee is legally obligated to notify the Consignor in writing at least <strong>thirty (30) calendar days</strong> prior to any corporate restructure, store closure, lease termination, or bankruptcy filings. Upon receipt of notice, or immediately upon unnotified closure, the Consignor retains absolute title and immediate retrieval rights to all unsold assets.
                    </li>
                    <li>
                      <strong>Property Casualty Insurance:</strong> The Franchisee certifies that they maintain an active commercial general liability policy with property casualty coverage of at least <strong>${insuranceValueCap}</strong> which covers third-party consigned items stored on retail premises.
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
                    <h4 className="font-heading font-bold text-zinc-900 border-b border-zinc-100 pb-1 uppercase tracking-wider text-[11px]">3. Custom Agreements & Amendments</h4>
                    <p className="bg-zinc-50 p-3.5 rounded-lg border border-zinc-100 text-[11px] text-zinc-700 font-mono italic">
                      {customTerms}
                    </p>
                  </div>
                )}

                {/* Section 4: Schedule A inventory attachment */}
                <div className="space-y-2">
                  <h4 className="font-heading font-bold text-zinc-900 border-b border-zinc-100 pb-1 uppercase tracking-wider text-[11px]">Schedule A: Consigned Asset Inventory</h4>
                  {items.length === 0 ? (
                    <p className="text-zinc-400 italic font-normal">No assets attached. Store inventory checklist must be hand-drafted below upon physical drop-off.</p>
                  ) : (
                    <div className="border border-zinc-200 rounded-xl overflow-hidden font-sans text-[10px]">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-700 font-semibold uppercase">
                            <th className="p-2.5">Description / Name</th>
                            <th className="p-2.5">Type</th>
                            <th className="p-2.5">Condition</th>
                            <th className="p-2.5 text-right">Est. Value</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 text-zinc-600">
                          {items.map((item, index) => (
                            <tr key={index} className="bg-white hover:bg-zinc-50/50">
                              <td className="p-2.5 font-semibold text-zinc-900">{item.name}</td>
                              <td className="p-2.5 capitalize">{item.type}</td>
                              <td className="p-2.5">{item.condition}</td>
                              <td className="p-2.5 text-right font-mono font-bold text-zinc-900">${item.retailValue.toFixed(0)}</td>
                            </tr>
                          ))}
                          <tr className="bg-zinc-50/50 font-semibold border-t border-zinc-200 text-zinc-900">
                            <td colSpan={3} className="p-2.5 text-right font-medium text-zinc-500">Estimated Combined Consignment Value:</td>
                            <td className="p-2.5 text-right font-mono font-bold text-amber-600">${estimatedCollectionValue.toFixed(0)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Signatures */}
                <div className="pt-8 grid grid-cols-2 gap-8 font-sans">
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase tracking-wider">CONSIGNOR SIGNATURE:</span>
                    <div className="border-b border-zinc-300 h-10 w-full" />
                    <div className="text-[10px] text-zinc-500">
                      <p className="font-semibold text-zinc-800">{consignorName}</p>
                      <p>Date: __________________</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase tracking-wider">FRANCHISEE OWNER SIGNATURE:</span>
                    <div className="border-b border-zinc-300 h-10 w-full" />
                    <div className="text-[10px] text-zinc-500">
                      <p className="font-semibold text-zinc-800">{selectedStore?.name}</p>
                      <p>Date: __________________</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 font-sans border border-dashed border-zinc-200 rounded-xl bg-zinc-50">
                <Shield className="w-10 h-10 text-zinc-300" />
                <div className="space-y-1.5 max-w-sm px-4">
                  <h4 className="text-sm font-semibold uppercase text-zinc-800">Draft Agreement Pending</h4>
                  <p className="text-xs text-zinc-500 font-normal leading-relaxed">
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
