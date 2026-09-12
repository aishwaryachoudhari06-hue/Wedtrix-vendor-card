# WedTrix — Vendor Card (Frontend Trial Task)

A small, reusable `VendorCard` React component built with Tailwind, matching the
WedTrix palette (cherry `#8B1E3F`, gold `#C08A2E`, cream `#FBF6EE`).

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed localhost URL. `src/App.jsx` renders three populated
cards plus the empty state in a responsive grid so you can see both states
side by side, at mobile (390px) and desktop widths.

## Where things live

- `src/components/VendorCard.jsx` — the component itself (default export).
  Accepts a single `vendor` prop; pass `null`/omit it to get the empty state.
- `src/App.jsx` — demo usage only, not part of the deliverable.
- `tailwind.config.js` — palette registered as `cherry`, `gold`, `cream` so
  the component code reads by name instead of hex codes.

## Usage

```jsx
import VendorCard from "./components/VendorCard";

<VendorCard
  vendor={{
    name: "Lakeside Lens Studio",
    category: "Photographer",
    city: "Austin, TX",
    priceRange: { min: 1500, max: 3200, currency: "USD" },
    trustScore: 92,
  }}
/>

// with a per-unit price (e.g. catering priced per guest)
<VendorCard
  vendor={{
    name: "Union Hall Catering",
    category: "Caterer",
    city: "Portland, OR",
    priceRange: { min: 45, max: 90, currency: "USD", unit: "/ guest" },
    trustScore: 34,
  }}
/>

// empty state
<VendorCard />
```

`priceRange` is a small object (`min`, `max`, `currency`, optional `unit`)
rather than a pre-formatted string, and is rendered through
`src/lib/formatPrice.js`, which wraps `Intl.NumberFormat`. That keeps currency
symbols, thousands separators, and decimal rules correct per-locale instead of
being baked into whatever produced the vendor record — a vendor priced in EUR
or JPY renders correctly without any component changes. Pass a `locale` prop
to `VendorCard` (defaults to `"en-US"`) to render in a different locale.

### Dark mode

`tailwind.config.js` has `darkMode: "class"` enabled, and `VendorCard` carries
a `dark:` variant for every color utility. Add a `dark` class to any ancestor
element to switch themes — `App.jsx` demonstrates this with a toggle button
that adds/removes `dark` on a wrapping div. The dark palette keeps the same
brand colors (cherry accents, gold highlights) against a very dark warm
background rather than introducing grey, so it still reads as "WedTrix" and
not a generic dark-mode default.

## Notes on decisions / what I'd improve with more time

I split the trust indicator into its own `TrustScore` sub-component and used a
5-segment bar rather than a raw progress bar — it reads faster at a glance and
holds up better at small sizes than a thin continuous bar. I kept the empty
state at the same min-height as a populated card so it doesn't cause layout
shift in a grid, and used dashed borders + muted copy to distinguish "no data"
from "an error." Price data is modeled as a structured object and formatted
via `Intl.NumberFormat` rather than a plain string, so currency/locale
handling is correct instead of hardcoded, and I added an opt-in dark theme
using Tailwind's class strategy to show the component holds up as a reusable
piece rather than a one-off. With more time I'd add a loading/skeleton variant
distinct from the empty state, and a hook for click-through to the vendor's
full profile.
