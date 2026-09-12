import PropTypes from "prop-types";
import { formatPriceRange } from "../lib/formatPrice.js";

/**
 * TrustScore
 * Renders a 0-100 score as a labeled segmented bar + numeric badge.
 * Kept as its own component so it's easy to reuse elsewhere (search
 * results, vendor profile page) without dragging the whole card along.
 */
function TrustScore({ score }) {
  const clamped = Math.max(0, Math.min(100, score));
  const segments = 5;
  const filledSegments = Math.round((clamped / 100) * segments);

  const tone =
    clamped >= 80 ? "High trust" : clamped >= 50 ? "Building trust" : "New / limited history";

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex gap-0.5"
        role="img"
        aria-label={`Trust score ${clamped} out of 100, ${tone}`}
      >
        {Array.from({ length: segments }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-4 rounded-full sm:w-5 ${
              i < filledSegments ? "bg-gold" : "bg-cherry/10 dark:bg-cream/10"
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-cherry-dark dark:text-cream">{clamped}</span>
    </div>
  );
}

/**
 * VendorCard
 * A single vendor listing. Pass `vendor={null}` (or omit it) to render
 * the empty state — useful while data is loading or when a search
 * returns nothing.
 *
 * `priceRange` is a structured object rather than a pre-formatted string
 * so currency, locale, and units (e.g. "/ guest") stay data instead of
 * being baked into the string by whatever produced the vendor record.
 */
export default function VendorCard({ vendor, locale }) {
  if (!vendor) {
    return (
      <div
        className="flex h-full min-h-[220px] w-full max-w-sm flex-col items-center justify-center
                   rounded-2xl border border-dashed border-gold/40 bg-cream p-6 text-center
                   dark:border-gold/30 dark:bg-[#20141a]"
      >
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-cherry/5 dark:bg-cream/10">
          <svg
            className="h-5 w-5 text-cherry/40 dark:text-cream/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M12 21c-4-3.5-7-6.7-7-10.5A7 7 0 0 1 12 3a7 7 0 0 1 7 7.5c0 3.8-3 7-7 10.5Z" />
            <circle cx="12" cy="10.5" r="2.2" />
          </svg>
        </div>
        <p className="text-sm font-medium text-cherry-dark dark:text-cream">No vendor added yet</p>
        <p className="mt-1 text-xs text-cherry-dark/60 dark:text-cream/50">
          Vendor details will show up here once they're added.
        </p>
      </div>
    );
  }

  const { name, category, city, priceRange, trustScore } = vendor;

  return (
    <div
      className="flex h-full w-full max-w-sm flex-col gap-4 rounded-2xl border border-gold/20
                 bg-cream p-5 shadow-sm transition-shadow hover:shadow-md
                 dark:border-gold/20 dark:bg-[#20141a] dark:shadow-black/20"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-cherry-dark dark:text-cream">
            {name}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-cherry-dark/70 dark:text-cream/70">
            <svg
              className="h-3.5 w-3.5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M12 21c-4-3.5-7-6.7-7-10.5A7 7 0 0 1 12 3a7 7 0 0 1 7 7.5c0 3.8-3 7-7 10.5Z" />
              <circle cx="12" cy="10.5" r="2.2" />
            </svg>
            <span className="truncate">{city}</span>
          </div>
        </div>

        <span
          className="flex-shrink-0 whitespace-nowrap rounded-full bg-cherry px-2.5 py-1 text-xs
                     font-medium text-cream"
        >
          {category}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-gold/15 pt-3 dark:border-gold/20">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-cherry-dark/50 dark:text-cream/50">
            Price range
          </p>
          <p className="text-sm font-semibold text-gold">{formatPriceRange(priceRange, locale)}</p>
        </div>

        <div className="text-right">
          <p className="mb-1 text-[11px] uppercase tracking-wide text-cherry-dark/50 dark:text-cream/50">
            Trust score
          </p>
          <TrustScore score={trustScore} />
        </div>
      </div>
    </div>
  );
}

VendorCard.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    priceRange: PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number,
      currency: PropTypes.string,
      unit: PropTypes.string,
    }).isRequired,
    trustScore: PropTypes.number.isRequired,
  }),
  locale: PropTypes.string,
};

VendorCard.defaultProps = {
  vendor: null,
  locale: "en-US",
};
