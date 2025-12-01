/**
 * Invoice Item Row Component
 */

'use client';

import { Trash2 } from 'lucide-react';
import { InvoiceItem } from '@/types/invoice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface InvoiceItemRowProps {
    item: InvoiceItem;
    currencySymbol: string;
    onUpdate: (field: keyof InvoiceItem, value: any) => void;
    onRemove: () => void;
}

export function InvoiceItemRow({
    item,
    currencySymbol,
    onUpdate,
    onRemove,
}: InvoiceItemRowProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="grid grid-cols-12 gap-2 items-center"
        >
            {/* Description */}
            <div className="col-span-12 sm:col-span-5">
                <Input
                    type="text"
                    placeholder="Item description"
                    value={item.description}
                    onChange={(e) => onUpdate('description', e.target.value)}
                />
            </div>

            {/* Quantity */}
            <div className="col-span-4 sm:col-span-2">
                <Input
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => onUpdate('quantity', parseFloat(e.target.value) || 0)}
                />
            </div>

            {/* Rate */}
            <div className="col-span-4 sm:col-span-2">
                <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Rate"
                    value={item.rate}
                    onChange={(e) => onUpdate('rate', parseFloat(e.target.value) || 0)}
                />
            </div>

            {/* Amount (calculated) */}
            <div className="col-span-3 sm:col-span-2">
                <div className="flex h-10 items-center rounded-md border border-input bg-muted px-3 text-sm">
                    {currencySymbol}{item.amount.toFixed(2)}
                </div>
            </div>

            {/* Delete Button */}
            <div className="col-span-1">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onRemove}
                    className="h-10 w-10 text-destructive hover:bg-destructive/10"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </motion.div>
    );
}
