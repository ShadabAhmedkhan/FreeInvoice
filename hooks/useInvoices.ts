/**
 * Custom hook for managing the list of all invoices
 */

import { useEffect, useState } from 'react';
import { useInvoiceStore } from '@/store/invoiceStore';
import { Invoice } from '@/types/invoice';

export function useInvoices() {
    const { invoices, loadAllInvoices, deleteInvoice } = useInvoiceStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);

    // Load all invoices on mount
    useEffect(() => {
        loadAllInvoices();
    }, [loadAllInvoices]);

    // Filter invoices based on search query
    useEffect(() => {
        if (!searchQuery) {
            setFilteredInvoices(invoices);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = invoices.filter(
            (invoice) =>
                invoice.invoiceNumber.toLowerCase().includes(query) ||
                invoice.clientDetails.name.toLowerCase().includes(query) ||
                invoice.status.toLowerCase().includes(query)
        );
        setFilteredInvoices(filtered);
    }, [invoices, searchQuery]);

    return {
        invoices: filteredInvoices,
        allInvoices: invoices,
        searchQuery,
        setSearchQuery,
        deleteInvoice,
        refreshInvoices: loadAllInvoices,
    };
}
