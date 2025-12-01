/**
 * Custom hook for managing a single invoice
 */

import { useEffect, useCallback } from 'react';
import { useInvoiceStore } from '@/store/invoiceStore';
import { Invoice, InvoiceItem } from '@/types/invoice';
import { generateId } from '@/utils/formatters';
import { calculateItemAmount } from '@/utils/calculations';

export function useInvoice(invoiceId?: string) {
    const {
        currentInvoice,
        setCurrentInvoice,
        createInvoice,
        updateInvoice,
        saveInvoice,
        loadInvoice,
    } = useInvoiceStore();

    // Load invoice on mount if ID is provided
    useEffect(() => {
        if (invoiceId) {
            loadInvoice(invoiceId);
        } else {
            createInvoice();
        }
    }, [invoiceId]);

    // Update invoice field
    const updateField = useCallback(
        (field: keyof Invoice, value: any) => {
            if (!currentInvoice) return;
            updateInvoice({ ...currentInvoice, [field]: value });
        },
        [currentInvoice, updateInvoice]
    );

    // Update business details
    const updateBusinessDetails = useCallback(
        (field: string, value: string) => {
            if (!currentInvoice) return;
            updateInvoice({
                ...currentInvoice,
                businessDetails: {
                    ...currentInvoice.businessDetails,
                    [field]: value,
                },
            });
        },
        [currentInvoice, updateInvoice]
    );

    // Update client details
    const updateClientDetails = useCallback(
        (field: string, value: string) => {
            if (!currentInvoice) return;
            updateInvoice({
                ...currentInvoice,
                clientDetails: {
                    ...currentInvoice.clientDetails,
                    [field]: value,
                },
            });
        },
        [currentInvoice, updateInvoice]
    );

    // Update settings
    const updateSettings = useCallback(
        (field: string, value: any) => {
            if (!currentInvoice) return;
            updateInvoice({
                ...currentInvoice,
                settings: {
                    ...currentInvoice.settings,
                    [field]: value,
                },
            });
        },
        [currentInvoice, updateInvoice]
    );

    // Add new item
    const addItem = useCallback(() => {
        if (!currentInvoice) return;
        const newItem: InvoiceItem = {
            id: generateId(),
            description: '',
            quantity: 1,
            rate: 0,
            amount: 0,
        };
        updateInvoice({
            ...currentInvoice,
            items: [...currentInvoice.items, newItem],
        });
    }, [currentInvoice, updateInvoice]);

    // Update item
    const updateItem = useCallback(
        (itemId: string, field: keyof InvoiceItem, value: any) => {
            if (!currentInvoice) return;
            const items = currentInvoice.items.map((item) => {
                if (item.id === itemId) {
                    const updatedItem = { ...item, [field]: value };
                    // Recalculate amount if quantity or rate changed
                    if (field === 'quantity' || field === 'rate') {
                        updatedItem.amount = calculateItemAmount(
                            updatedItem.quantity,
                            updatedItem.rate
                        );
                    }
                    return updatedItem;
                }
                return item;
            });
            updateInvoice({ ...currentInvoice, items });
        },
        [currentInvoice, updateInvoice]
    );

    // Remove item
    const removeItem = useCallback(
        (itemId: string) => {
            if (!currentInvoice) return;
            const items = currentInvoice.items.filter((item) => item.id !== itemId);
            updateInvoice({ ...currentInvoice, items });
        },
        [currentInvoice, updateInvoice]
    );

    // Auto-save functionality
    const handleSave = useCallback(async () => {
        await saveInvoice();
    }, [saveInvoice]);

    return {
        invoice: currentInvoice,
        updateField,
        updateBusinessDetails,
        updateClientDetails,
        updateSettings,
        addItem,
        updateItem,
        removeItem,
        saveInvoice: handleSave,
    };
}
