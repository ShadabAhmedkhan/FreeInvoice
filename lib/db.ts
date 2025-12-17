/**
 * IndexedDB setup using Dexie.js for local data persistence
 */

import Dexie, { Table } from 'dexie';
import { Invoice } from '@/types/invoice';

export class InvoiceDatabase extends Dexie {
    invoices!: Table<Invoice, string>;

    constructor() {
        super('InvoiceGeneratorDB');

        this.version(1).stores({
            invoices: 'id, invoiceNumber, createdAt, status',
        });
    }
}

// Create a singleton instance
export const db = new InvoiceDatabase();

/**
 * Save an invoice to the database
 */
export async function saveInvoice(invoice: Invoice): Promise<void> {
    await db.invoices.put(invoice);
}

/**
 * Get an invoice by ID
 */
export async function getInvoice(id: string): Promise<Invoice | undefined> {
    return await db.invoices.get(id);
}

/**
 * Get all invoices
 */
export async function getAllInvoices(): Promise<Invoice[]> {
    return await db.invoices.toArray();
}

/**
 * Delete an invoice by ID
 */
export async function deleteInvoice(id: string): Promise<void> {
    await db.invoices.delete(id);
}

/**
 * Search invoices by invoice number or client name
 */
export async function searchInvoices(query: string): Promise<Invoice[]> {
    const lowerQuery = query.toLowerCase();
    return await db.invoices
        .filter(
            (invoice) =>
                invoice.invoiceNumber.toLowerCase().includes(lowerQuery) ||
                invoice.clientDetails.name.toLowerCase().includes(lowerQuery)
        )
        .toArray();
}
