export interface Review {
  author: string;
  location: string;
  date: string;
  rating: number;
  targetStore: string;
  source: "Yelp" | "Trustindex";
  text: string;
  isCritical: boolean;
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  overallRating: number;
  trustTier: "Highly Trusted" | "Proceed with Caution" | "Flagged / Closed";
  management: string;
  notableNotes: string;
  totalReviews: number;
}

export interface EvaluatorItem {
  id: string;
  type: "set" | "minifig" | "bulk";
  name: string;
  condition: "New Sealed" | "Used Complete" | "Used Incomplete" | "Bulk Pieces";
  weightPounds?: number;
  retailValue: number; // Est. BrickLink/BrickEconomy value
}

export interface ConsignmentContract {
  id: string;
  consignorName: string;
  consignorPhone: string;
  consignorEmail: string;
  storeLocationId: string;
  items: EvaluatorItem[];
  customTerms: string;
  dateDrafted: string;
  requireAuditSchedule: "Monthly" | "Bi-Weekly" | "Quarterly";
  insuranceValueCap: number;
}
