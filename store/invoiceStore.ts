/**
 * Zustand store for invoice state management
 */

import { create } from 'zustand';
import { Invoice, InvoiceStore } from '@/types/invoice';
import { generateId, generateInvoiceNumber } from '@/utils/formatters';
import { calculateTotals } from '@/utils/calculations';
import { saveInvoice as saveToDb, getAllInvoices, deleteInvoice as deleteFromDb } from '@/lib/db';

/**
 * Create a default empty invoice
 */
function createDefaultInvoice(): Invoice {
    const now = new Date().toISOString();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    return {
        id: generateId(),
        invoiceNumber: generateInvoiceNumber(),
        createdAt: now,
        dueDate: dueDate.toISOString(),
        businessDetails: {
            name: '',
            email: '',
            phone: '',
            address: '',
            logo: undefined,
        },
        clientDetails: {
            name: '',
            email: '',
            phone: '',
            address: '',
        },
        items: [],
        settings: {
            currency: 'USD',
            taxRate: 0,
            taxLabel: 'Tax',
            discountType: 'percentage',
            discountValue: 0,
        },
        totals: {
            subtotal: 0,
            taxAmount: 0,
            discountAmount: 0,
            total: 0,
        },
        notes: '',
        status: 'draft',
    };
}

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
    currentInvoice: null,
    invoices: [],

    setCurrentInvoice: (invoice) => set({ currentInvoice: invoice }),

    createInvoice: () => {
        const newInvoice = createDefaultInvoice();
        set({ currentInvoice: newInvoice });
    },

    updateInvoice: (invoice) => {
        // Recalculate totals
        const totals = calculateTotals(invoice.items, invoice.settings);
        const updatedInvoice = { ...invoice, totals };
        set({ currentInvoice: updatedInvoice });
    },

    deleteInvoice: async (id) => {
        await deleteFromDb(id);
        const invoices = get().invoices.filter((inv) => inv.id !== id);
        set({ invoices });

        // Clear current invoice if it's the one being deleted
        if (get().currentInvoice?.id === id) {
            set({ currentInvoice: null });
        }
    },

    loadInvoice: async (id) => {
        const invoices = get().invoices;
        const invoice = invoices.find((inv) => inv.id === id);
        if (invoice) {
            set({ currentInvoice: invoice });
        }
    },

    saveInvoice: async () => {
        const invoice = get().currentInvoice;
        if (!invoice) return;

        await saveToDb(invoice);

        // Update invoices list
        const invoices = get().invoices;
        const index = invoices.findIndex((inv) => inv.id === invoice.id);

        if (index >= 0) {
            invoices[index] = invoice;
            set({ invoices: [...invoices] });
        } else {
            set({ invoices: [...invoices, invoice] });
        }
    },

    loadAllInvoices: async () => {
        const invoices = await getAllInvoices();
        set({ invoices });
    },
}));
