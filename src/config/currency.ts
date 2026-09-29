import type { CostLevel, Currency } from '../types';

/**
 * Exchange rate constant: 1 USD = 300 LKR (approximate current rate).
 * 
 * NOTE: This rate should be periodically updated or eventually pulled from a live
 * exchange rate API (such as Central Bank of Sri Lanka CBSL or open exchange rate feed)
 * to keep pricing accurate over time.
 */
export const USD_TO_LKR_RATE = 300;

export interface CostTier {
  minLKR: number;
  maxLKR: number;
  label: string;
}

/**
 * Approximate price bands per serving in Sri Lankan Rupees (LKR)
 * based on realistic Sri Lankan grocery/pola market prices:
 * - Level 1 ($): Rs 150–350 per serving (Student budget: dhal, rice, eggs, kadala, noodles)
 * - Level 2 ($$): Rs 350–700 per serving (Everyday: chicken, tuna, dairy, mixed vegetables)
 * - Level 3 ($$$): Rs 700–1200 per serving (Splurge: beef, seafood, imported cheeses, premium nuts)
 */
export const COST_TIERS: Record<CostLevel, CostTier> = {
  1: {
    minLKR: 150,
    maxLKR: 350,
    label: 'Student Budget',
  },
  2: {
    minLKR: 350,
    maxLKR: 700,
    label: 'Everyday Value',
  },
  3: {
    minLKR: 700,
    maxLKR: 1200,
    label: 'Splurge / Special',
  },
};

/**
 * Format the approximate price range per serving in the selected currency.
 * - LKR: "Rs 150–350"
 * - USD: "$0.50–$1.20"
 */
export function formatPriceRange(costLevel: CostLevel, currency: Currency): string {
  const tier = COST_TIERS[costLevel] || COST_TIERS[1];
  if (currency === 'LKR') {
    return `Rs ${tier.minLKR}–${tier.maxLKR}`;
  }
  // Convert LKR to USD by dividing by the exchange rate
  const minUSD = (tier.minLKR / USD_TO_LKR_RATE).toFixed(2);
  const maxUSD = (tier.maxLKR / USD_TO_LKR_RATE).toFixed(2);
  return `$${minUSD}–$${maxUSD}`;
}

/**
 * Full description with "/ serving"
 */
export function formatPricePerServing(costLevel: CostLevel, currency: Currency): string {
  return `${formatPriceRange(costLevel, currency)} / serving`;
}

/**
 * Format label for form select or options (e.g. "Rs 150–350 (Student Budget)")
 */
export function formatCostOptionLabel(costLevel: CostLevel, currency: Currency): string {
  const tier = COST_TIERS[costLevel] || COST_TIERS[1];
  return `${formatPriceRange(costLevel, currency)} (${tier.label})`;
}

/**
 * Calculate weekly grocery spending based on planned recipes and active currency.
 */
export function calculateWeeklyCost(recipes: { cost_level: CostLevel }[], currency: Currency): {
  amountFormatted: string;
  subtext: string;
} {
  const totalLKR = recipes.reduce((sum, r) => {
    const tier = COST_TIERS[r.cost_level] || COST_TIERS[1];
    const midpoint = (tier.minLKR + tier.maxLKR) / 2;
    return sum + midpoint;
  }, 0);

  if (currency === 'LKR') {
    const usdEquiv = (totalLKR / USD_TO_LKR_RATE).toFixed(2);
    return {
      amountFormatted: `Rs ${Math.round(totalLKR).toLocaleString()}`,
      subtext: `~ $${usdEquiv} USD`,
    };
  } else {
    const totalUSD = (totalLKR / USD_TO_LKR_RATE).toFixed(2);
    return {
      amountFormatted: `$${totalUSD}`,
      subtext: `~ Rs ${Math.round(totalLKR).toLocaleString()} LKR`,
    };
  }
}
