/**
 * Utility functions for formatting data
 */

import { format } from 'date-fns';

/**
 * Generate a unique invoice number
 */
export function generateInvoiceNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `INV-${timestamp}-${random}`;
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
    return format(new Date(date), 'MMM dd, yyyy');
}

/**
 * Format date for input field
 */
export function formatDateForInput(date: string | Date): string {
    return format(new Date(date), 'yyyy-MM-dd');
}

/**
 * Format currency with symbol
 */
export function formatCurrency(amount: number, symbol: string): string {
    return `${symbol}${amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

/**
 * Parse currency string to number
 */
export function parseCurrency(value: string): number {
    const cleaned = value.replace(/[^0-9.-]/g, '');
    return parseFloat(cleaned) || 0;
}
