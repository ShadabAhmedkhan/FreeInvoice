/**
 * Core TypeScript interfaces for the Invoice Generator application
 */

export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
}

export interface BusinessDetails {
    name: string;
    email: string;
    phone: string;
    address: string;
    logo?: string; // Base64 encoded image
}

export interface ClientDetails {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface InvoiceSettings {
    currency: string;
    taxRate: number;
    taxLabel: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
}

export interface InvoiceTotals {
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    total: number;
}

export interface Invoice {
    id: string;
    invoiceNumber: string;
    createdAt: string;
    dueDate: string;
    businessDetails: BusinessDetails;
    clientDetails: ClientDetails;
    items: InvoiceItem[];
    settings: InvoiceSettings;
    totals: InvoiceTotals;
    notes?: string;
    status: 'draft' | 'sent' | 'paid' | 'overdue';
}

export interface InvoiceStore {
    currentInvoice: Invoice | null;
    invoices: Invoice[];

    // Actions
    setCurrentInvoice: (invoice: Invoice | null) => void;
    createInvoice: () => void;
    updateInvoice: (invoice: Invoice) => void;
    deleteInvoice: (id: string) => void;
    loadInvoice: (id: string) => void;
    saveInvoice: () => Promise<void>;
    loadAllInvoices: () => Promise<void>;
}

export type Currency = {
    code: string;
    symbol: string;
    name: string;
};

export const CURRENCIES: Currency[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
];

export const TAX_PRESETS = [
    { label: 'No Tax', value: 0 },
    { label: 'VAT 5%', value: 5 },
    { label: 'VAT 10%', value: 10 },
    { label: 'VAT 18%', value: 18 },
    { label: 'VAT 20%', value: 20 },
    { label: 'Custom', value: -1 },
];
