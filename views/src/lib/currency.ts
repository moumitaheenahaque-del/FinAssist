import { useAuthStore } from "./store";

// Currency configuration mapping
export const CURRENCIES = {
    USD: { symbol: "$", name: "US Dollar", position: "before" as const },
    EUR: { symbol: "€", name: "Euro", position: "before" as const },
    GBP: { symbol: "£", name: "British Pound", position: "before" as const },
    BDT: { symbol: "৳", name: "Bangladeshi Taka", position: "before" as const },
    INR: { symbol: "₹", name: "Indian Rupee", position: "before" as const },
    JPY: { symbol: "¥", name: "Japanese Yen", position: "before" as const },
    AUD: { symbol: "A$", name: "Australian Dollar", position: "before" as const },
    CAD: { symbol: "C$", name: "Canadian Dollar", position: "before" as const },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

/**
 * Get currency information for a given currency code
 */
export function getCurrencyInfo(code: string = "USD") {
    const currency = CURRENCIES[code as CurrencyCode];
    return currency || CURRENCIES.USD;
}

/**
 * Format a number as currency using the user's selected currency
 * @param amount - The amount to format
 * @param currencyCode - Optional currency code, defaults to user's currency from store
 * @param options - Formatting options
 */
export function formatCurrency(
    amount: number,
    currencyCode?: string,
    options?: {
        showDecimals?: boolean;
        minimumFractionDigits?: number;
        maximumFractionDigits?: number;
    }
): string {
    const user = useAuthStore.getState().user;
    const code = currencyCode || user?.currency || "USD";
    const currency = getCurrencyInfo(code);
    const { showDecimals = true, minimumFractionDigits = 0, maximumFractionDigits = 2 } = options || {};

    const formattedAmount = showDecimals
        ? amount.toLocaleString(undefined, {
              minimumFractionDigits,
              maximumFractionDigits,
          })
        : amount.toLocaleString();

    return currency.position === "before"
        ? `${currency.symbol}${formattedAmount}`
        : `${formattedAmount} ${currency.symbol}`;
}

/**
 * Hook to get the current user's currency
 */
export function useCurrency() {
    const user = useAuthStore((state) => state.user);
    const currencyCode = user?.currency || "USD";
    const currency = getCurrencyInfo(currencyCode);

    return {
        code: currencyCode,
        symbol: currency.symbol,
        name: currency.name,
        format: (amount: number, options?: Parameters<typeof formatCurrency>[2]) =>
            formatCurrency(amount, currencyCode, options),
    };
}





