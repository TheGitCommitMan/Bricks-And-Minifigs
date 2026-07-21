import { Review, StoreLocation } from "../types";

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: "crest-hill",
    name: "Bricks & Minifigs of Crest Hill",
    city: "Crest Hill",
    state: "IL",
    overallRating: 5.0,
    trustTier: "Highly Trusted",
    management: "Ryan, Chris, and staff",
    notableNotes: "Fairest pricing of local resellers, friendly staff, regularly rotating sets and minifigures.",
    totalReviews: 24
  },
  {
    id: "austin",
    name: "Bricks & Minifigs Austin",
    city: "Austin",
    state: "TX",
    overallRating: 4.8,
    trustTier: "Highly Trusted",
    management: "Gary and Holly",
    notableNotes: "Expert staff, highly welcoming environment, fair trade practices widely trusted by the community.",
    totalReviews: 45
  },
  {
    id: "avondale",
    name: "Bricks & Minifigs Avondale",
    city: "Avondale",
    state: "AZ",
    overallRating: 5.0,
    trustTier: "Highly Trusted",
    management: "Local team",
    notableNotes: "Incredible customer conversations, highly engaging team, highly recommended by locals.",
    totalReviews: 12
  },
  {
    id: "san-antonio-ne",
    name: "Bricks & Minifigs San Antonio NE",
    city: "San Antonio",
    state: "TX",
    overallRating: 2.0,
    trustTier: "Proceed with Caution",
    management: "Unknown",
    notableNotes: "Reported messy setups and nonchalant staff who appear uninterested in assisting families.",
    totalReviews: 18
  },
  {
    id: "lutz",
    name: "Bricks & Minifigs Lutz",
    city: "Lutz",
    state: "FL",
    overallRating: 1.5,
    trustTier: "Proceed with Caution",
    management: "Local franchise group",
    notableNotes: "Multiple complaints regarding extreme lowball trade offers, inconsistent consignment claims, and rude service.",
    totalReviews: 32
  },
  {
    id: "fitchburg-madison",
    name: "Bricks & Minifigs Madison",
    city: "Fitchburg",
    state: "WI",
    overallRating: 2.0,
    trustTier: "Proceed with Caution",
    management: "Local manager",
    notableNotes: "Reported as unwelcoming to families with young children, toddlers asked to leave due to fussiness.",
    totalReviews: 15
  },
  {
    id: "orem",
    name: "Bricks & Minifigs Orem",
    city: "Orem",
    state: "UT",
    overallRating: 2.5,
    trustTier: "Proceed with Caution",
    management: "Corporate linked",
    notableNotes: "Heavily critiqued for corporate deflection regarding major consignment safety breaches.",
    totalReviews: 88
  },
  {
    id: "carol-stream",
    name: "Bricks & Minifigs Carol Stream",
    city: "Carol Stream",
    state: "IL",
    overallRating: 1.0,
    trustTier: "Flagged / Closed",
    management: "Former Owner (Closed)",
    notableNotes: "Closed permanently after losing a civil lawsuit regarding a massive $200k Lego Star Wars consignment theft.",
    totalReviews: 140
  },
  {
    id: "albuquerque",
    name: "Bricks & Minifigs Albuquerque",
    city: "Albuquerque",
    state: "NM",
    overallRating: 1.0,
    trustTier: "Flagged / Closed",
    management: "Former Owner (Closed)",
    notableNotes: "Closed store abruptly under scrutiny for failing to pay consignment clients or return properties.",
    totalReviews: 56
  }
];

export const REVIEWS: Review[] = [
  {
    author: "Eliseo M.",
    location: "Oswego, IL",
    date: "2 months ago",
    rating: 5,
    targetStore: "crest-hill",
    source: "Yelp",
    text: "The only B&M I really trust and regularly like to go to. Ryan, Chris, and all staff are all very friendly and helpful. Fairest pricing of any of the local resellers as well. Great selection of figs and used sets that changes pretty regularly.",
    isCritical: false
  },
  {
    author: "Anthony L.",
    location: "Austin, TX",
    date: "2 months ago",
    rating: 5,
    targetStore: "austin",
    source: "Yelp",
    text: "Despite all the things I've recently seen about other BaM locations THIS location easily earns my 5 stars. Gary and Holly have an amazing store that accurately represents the fun and joy that LEGO fans deserve. Their knowledgeable staff are always helpful when I am in the store looking to buy.",
    isCritical: false
  },
  {
    author: "Axel S.",
    location: "Avondale, AZ",
    date: "2 months ago",
    rating: 5,
    targetStore: "avondale",
    source: "Yelp",
    text: "Amazing service, employees are amazing, would come again, they're incredible and fun people be around, enjoyed having conversations about lego with them, gonna miss hanging out with them, would highly recommend.",
    isCritical: false
  },
  {
    author: "Porter W.",
    location: "San Antonio, TX",
    date: "1 month ago",
    rating: 1,
    targetStore: "san-antonio-ne",
    source: "Yelp",
    text: "this location had a messy set up and workers that were not interested in helping. will take my business elsewhere that appreciates the value of legos and has a cleaner selection.",
    isCritical: true
  },
  {
    author: "Tiffany M.",
    location: "San Antonio, TX",
    date: "2 months ago",
    rating: 2,
    targetStore: "san-antonio-ne",
    source: "Yelp",
    text: "I called to speak to someone before I went to this store because it was 30 minutes out of my way. I've sold to other B&M and had a great experience (Austin location). One of the staff was very nice, however, the staff member that gave me my offer was very nonchalant like they couldn't be bothered.",
    isCritical: true
  },
  {
    author: "Dorris L.",
    location: "TN",
    date: "2 months ago",
    rating: 1,
    targetStore: "austin",
    source: "Yelp",
    text: "Staff was extremely nonchalant like they couldn't be bothered or that it was a huge inconvenience that anyone was in the store to begin with. The price points are terrible and some of the used sets are missing significant amounts of pieces. All that along with their hard no refunds policy is bad.",
    isCritical: true
  },
  {
    author: "Khristian D.",
    location: "Tampa, FL",
    date: "2 months ago",
    rating: 1,
    targetStore: "lutz",
    source: "Yelp",
    text: "AVOID AT ALL COSTS! Do not shop here. I tried to bring my kids legos in to trade and maybe buy some new sets and they just lowball you and try to scam you out of every single dollar. It's a complete scam.",
    isCritical: true
  },
  {
    author: "Eric H.",
    location: "San Francisco, CA",
    date: "2 months ago",
    rating: 1,
    targetStore: "lutz",
    source: "Yelp",
    text: "trash store. told me they dont do consignments when i went in but they were literally doing a consignment for someone while i stood there. they didn't even try to hide it. very rude!",
    isCritical: true
  },
  {
    author: "Cynthia B.",
    location: "Oregon, WI",
    date: "2 months ago",
    rating: 1,
    targetStore: "fitchburg-madison",
    source: "Yelp",
    text: "Disappointed by how unwelcoming this store was to families with young children. This is a resale Lego, Duplo, and Primo store, so I expected it to be more child-friendly. My toddler had a few normal moments of fussiness while we were there, and a manager asked us to leave.",
    isCritical: true
  },
  {
    author: "Jesse B.",
    location: "The Loop, Chicago, IL",
    date: "2 months ago",
    rating: 1,
    targetStore: "carol-stream",
    source: "Yelp",
    text: "Horrible company. One of their franchises took a $200K LEGO Star Wars set from an elderly man on consignment, then closed the store instead of paying him. They also failed to notify families who had birthday parties scheduled, so people showed up with kids to a locked, closed location.",
    isCritical: true
  },
  {
    author: "Tom H.",
    location: "Skokie, IL",
    date: "2 months ago",
    rating: 1,
    targetStore: "carol-stream",
    source: "Yelp",
    text: "They say when you have nothing else good to say, don't say anything at all. This company stole from a dying man and when they lost in court, closed the store to avoid paying. I wouldn't leave your car unlocked if you decide to shop with this company.",
    isCritical: true
  },
  {
    author: "Pete W.",
    location: "San Francisco, CA",
    date: "2 months ago",
    rating: 1,
    targetStore: "albuquerque",
    source: "Yelp",
    text: "Do not consign with this shop unless you're okay with the possibility that they will steal your consignment and likely not pay you unless you go to court with them, and in that case they may just close the store instead of paying you.",
    isCritical: true
  },
  {
    author: "Kellen M.",
    location: "Soma, San Francisco, CA",
    date: "2 months ago",
    rating: 1,
    targetStore: "albuquerque",
    source: "Yelp",
    text: "They belong to a corporation that steals Legos from old people. Don't try to sell them your Legos, or if you do, make sure they pay you BEFORE you drop it off at the store.",
    isCritical: true
  },
  {
    author: "Brad K.",
    location: "Ferndale, MI",
    date: "2 months ago",
    rating: 1,
    targetStore: "orem",
    source: "Yelp",
    text: "Bricks & Minifigs Corporate is enabling the theft of entire private collections of Lego Starwars by Bricks and Minifigs franchise owners. Well documented video investigations have proven that under corporate direction franchise owners have stolen expensive collections left on consignment, and then deny any knowledge.",
    isCritical: true
  },
  {
    author: "Jason D.",
    location: "Alpharetta, GA",
    date: "2 months ago",
    rating: 1,
    targetStore: "orem",
    source: "Yelp",
    text: "I have not had good experiences with this company at my local store, and hearing about how they refuse to take accountability for their theft of a senior's entire Star Wars collection has made me never want to do business with this company EVER AGAIN. The LEGO community deserves better.",
    isCritical: true
  },
  {
    author: "JEREMY DALTON",
    location: "UK",
    date: "14 July, 2026",
    rating: 1,
    targetStore: "orem",
    source: "Trustindex",
    text: "They could improve by not stealing a quarter million worth of Legos from people than suing them when they try to get it back. They could improve by not stealing owners stores then saying sue me when they just stole their life savings. They lie to the police about people to try to get them arrested.",
    isCritical: true
  },
  {
    author: "Kelvin",
    location: "Global",
    date: "12 July, 2026",
    rating: 1,
    targetStore: "carol-stream",
    source: "Trustindex",
    text: "Truly dishonest business practices. Shopfront looks innocent with buckets of bricks and smiling characters. Look closer and those bricks all represent the honest work and dreams of good people crushed by their shady dealings.",
    isCritical: true
  },
  {
    author: "Valtteri",
    location: "Global",
    date: "18 July, 2026",
    rating: 1,
    targetStore: "orem",
    source: "Trustindex",
    text: "THEFTS!! AVOID! They stole my friends legos. And the CEO Ammon is lying in the Fox News. Luckily Reckless Ben also got in the Fox News to tell the truth.",
    isCritical: true
  },
  {
    author: "Robertus Australianus",
    location: "Australia",
    date: "10 July, 2026",
    rating: 1,
    targetStore: "san-antonio-ne",
    source: "Trustindex",
    text: "DO NOT SELL OR BUY FROM THIS STORE. This company tried to scam me out of my rare collectors miniatures. When I called them out on it they became verbally and physically abusive within the store, pushing me into another customer.",
    isCritical: true
  },
  {
    author: "Garrison Lyons",
    location: "Global",
    date: "10 July, 2026",
    rating: 1,
    targetStore: "orem",
    source: "Trustindex",
    text: "This is a company of scammers, liars, and thieves who've been taking advantage of people and abusing the system with their personal connections. This 'cartel' of toys should be shut down permanently and the CEO Ammon legally addressed.",
    isCritical: true
  }
];
