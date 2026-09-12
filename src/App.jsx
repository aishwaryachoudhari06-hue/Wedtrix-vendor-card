import { useState } from "react";
import VendorCard from "./components/VendorCard.jsx";

const vendors = [
  {
    name: "Lakeside Lens Studio",
    category: "Photographer",
    city: "Austin, TX",
    priceRange: { min: 1500, max: 3200, currency: "USD" },
    trustScore: 92,
  },
  {
    name: "Bloom & Vine Florals",
    category: "Florist",
    city: "Lyon, France",
    priceRange: { min: 550, max: 1300, currency: "EUR" },
    trustScore: 68,
  },
  {
    name: "Union Hall Catering",
    category: "Caterer",
    city: "Portland, OR",
    priceRange: { min: 45, max: 90, currency: "USD", unit: "/ guest" },
    trustScore: 34,
  },
];

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-cream-dark px-4 py-10 transition-colors dark:bg-[#150d10] sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="mb-1 text-2xl font-semibold text-cherry-dark dark:text-cream">
                Vendor Card
              </h1>
              <p className="text-sm text-cherry-dark/60 dark:text-cream/60">
                Populated cards, plus the empty state shown when a listing has no data yet.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              className="flex-shrink-0 rounded-full border border-gold/40 bg-cream px-4 py-2 text-xs
                         font-medium text-cherry-dark shadow-sm transition-colors hover:bg-gold/10
                         dark:border-gold/30 dark:bg-[#20141a] dark:text-cream dark:hover:bg-gold/10"
            >
              {isDark ? "Light mode" : "Dark mode"}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.name} vendor={vendor} />
            ))}
            <VendorCard />
          </div>
        </div>
      </div>
    </div>
  );
}
