/**
 * Formats a min/max price range using Intl.NumberFormat so currency
 * symbols, thousands separators, and decimal conventions follow the
 * given locale/currency instead of being hardcoded into vendor data.
 *
 * @param {Object} price
 * @param {number} price.min
 * @param {number} price.max
 * @param {string} [price.currency="USD"] - ISO 4217 code, e.g. "USD", "EUR"
 * @param {string} [price.unit] - optional suffix, e.g. "/ guest", "/ hr"
 * @param {string} [locale="en-US"]
 */
export function formatPriceRange(price, locale = "en-US") {
  if (!price) return "";

  const { min, max, currency = "USD", unit } = price;

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  const low = formatter.format(min);
  const high = typeof max === "number" ? formatter.format(max) : null;

  const range = high ? `${low} – ${high}` : low;
  return unit ? `${range} ${unit}` : range;
}
