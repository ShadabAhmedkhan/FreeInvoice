/**
 * Utility functions for invoice calculations
 */

import { InvoiceItem, InvoiceSettings, InvoiceTotals } from '@/types/invoice';

/**
 * Calculate the subtotal from all invoice items
 */
export function calculateSubtotal(items: InvoiceItem[]): number {
    return items.reduce((sum, item) => sum + item.amount, 0);
}

/**
 * Calculate tax amount based on subtotal and tax rate
 */
export function calculateTax(subtotal: number, taxRate: number): number {
    return (subtotal * taxRate) / 100;
}

/**
 * Calculate discount amount
 */
export function calculateDiscount(
    subtotal: number,
    discountType: 'percentage' | 'fixed',
    discountValue: number
): number {
    if (discountType === 'percentage') {
        return (subtotal * discountValue) / 100;
    }
    return discountValue;
}

/**
 * Calculate all invoice totals
 */
export function calculateTotals(
    items: InvoiceItem[],
    settings: InvoiceSettings
): InvoiceTotals {
    const subtotal = calculateSubtotal(items);
    const taxAmount = calculateTax(subtotal, settings.taxRate);
    const discountAmount = calculateDiscount(
        subtotal,
        settings.discountType,
        settings.discountValue
    );
    const total = subtotal + taxAmount - discountAmount;

    return {
        subtotal,
        taxAmount,
        discountAmount,
        total: Math.max(0, total), // Ensure total is never negative
    };
}

/**
 * Calculate amount for a single invoice item
 */
export function calculateItemAmount(quantity: number, rate: number): number {
    return quantity * rate;
}

/**
 * Format currency value
 */
export function formatCurrency(amount: number, currencySymbol: string): string {
    return `${currencySymbol}${amount.toFixed(2)}`;
}
