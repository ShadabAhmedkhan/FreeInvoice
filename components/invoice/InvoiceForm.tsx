/**
 * Invoice Form Component - Main invoice editor
 */

'use client';

import { Plus } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useInvoice } from '@/hooks/useInvoice';
import { CURRENCIES } from '@/types/invoice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InvoiceItemRow } from './InvoiceItemRow';
import { TotalsCard } from './TotalsCard';
import { LogoUploader } from './LogoUploader';
import { CurrencySelector } from './CurrencySelector';
import { TaxSelector } from './TaxSelector';
import { formatDateForInput } from '@/utils/formatters';

interface InvoiceFormProps {
    invoiceId?: string;
}

export function InvoiceForm({ invoiceId }: InvoiceFormProps) {
    const {
        invoice,
        updateField,
        updateBusinessDetails,
        updateClientDetails,
        updateSettings,
        addItem,
        updateItem,
        removeItem,
        saveInvoice,
    } = useInvoice(invoiceId);

    if (!invoice) {
        return <div>Loading...</div>;
    }

    const currencySymbol =
        CURRENCIES.find((c) => c.code === invoice.settings.currency)?.symbol || '$';

    return (
        <div className="space-y-6">
            {/* Invoice Metadata */}
            <Card>
                <CardHeader>
                    <CardTitle>Invoice Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="invoiceNumber">Invoice Number</Label>
                            <Input
                                id="invoiceNumber"
                                value={invoice.invoiceNumber}
                                onChange={(e) => updateField('invoiceNumber', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="createdAt">Issue Date</Label>
                            <Input
                                id="createdAt"
                                type="date"
                                value={formatDateForInput(invoice.createdAt)}
                                onChange={(e) => updateField('createdAt', new Date(e.target.value).toISOString())}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input
                                id="dueDate"
                                type="date"
                                value={formatDateForInput(invoice.dueDate)}
                                onChange={(e) => updateField('dueDate', new Date(e.target.value).toISOString())}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Business Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Your Business Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <LogoUploader
                        value={invoice.businessDetails.logo}
                        onChange={(logo) => updateBusinessDetails('logo', logo || '')}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="businessName">Business Name</Label>
                            <Input
                                id="businessName"
                                value={invoice.businessDetails.name}
                                onChange={(e) => updateBusinessDetails('name', e.target.value)}
                                placeholder="Your Company Inc."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="businessEmail">Email</Label>
                            <Input
                                id="businessEmail"
                                type="email"
                                value={invoice.businessDetails.email}
                                onChange={(e) => updateBusinessDetails('email', e.target.value)}
                                placeholder="hello@company.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="businessPhone">Phone</Label>
                            <Input
                                id="businessPhone"
                                type="tel"
                                value={invoice.businessDetails.phone}
                                onChange={(e) => updateBusinessDetails('phone', e.target.value)}
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="businessAddress">Address</Label>
                            <Input
                                id="businessAddress"
                                value={invoice.businessDetails.address}
                                onChange={(e) => updateBusinessDetails('address', e.target.value)}
                                placeholder="123 Main St, City, State 12345"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Client Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Client Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="clientName">Client Name</Label>
                            <Input
                                id="clientName"
                                value={invoice.clientDetails.name}
                                onChange={(e) => updateClientDetails('name', e.target.value)}
                                placeholder="Client Company LLC"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clientEmail">Email</Label>
                            <Input
                                id="clientEmail"
                                type="email"
                                value={invoice.clientDetails.email}
                                onChange={(e) => updateClientDetails('email', e.target.value)}
                                placeholder="client@company.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clientPhone">Phone</Label>
                            <Input
                                id="clientPhone"
                                type="tel"
                                value={invoice.clientDetails.phone}
                                onChange={(e) => updateClientDetails('phone', e.target.value)}
                                placeholder="+1 (555) 987-6543"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clientAddress">Address</Label>
                            <Input
                                id="clientAddress"
                                value={invoice.clientDetails.address}
                                onChange={(e) => updateClientDetails('address', e.target.value)}
                                placeholder="456 Oak Ave, City, State 67890"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Invoice Items */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Invoice Items</CardTitle>
                    <Button type="button" size="sm" onClick={addItem}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Header */}
                    <div className="hidden sm:grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground">
                        <div className="col-span-5">Description</div>
                        <div className="col-span-2">Quantity</div>
                        <div className="col-span-2">Rate</div>
                        <div className="col-span-2">Amount</div>
                        <div className="col-span-1"></div>
                    </div>

                    {/* Items */}
                    {invoice.items.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No items added yet. Click "Add Item" to get started.
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <AnimatePresence initial={false} mode="popLayout">
                                {invoice.items.map((item) => (
                                    <InvoiceItemRow
                                        key={item.id}
                                        item={item}
                                        currencySymbol={currencySymbol}
                                        onUpdate={(field, value) => updateItem(item.id, field, value)}
                                        onRemove={() => removeItem(item.id)}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Settings & Totals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <CurrencySelector
                            value={invoice.settings.currency}
                            onChange={(value) => updateSettings('currency', value)}
                        />

                        <TaxSelector
                            value={invoice.settings.taxRate}
                            onChange={(value) => updateSettings('taxRate', value)}
                            label={invoice.settings.taxLabel}
                            onLabelChange={(value) => updateSettings('taxLabel', value)}
                        />

                        <div className="space-y-2">
                            <Label htmlFor="discount">Discount (%)</Label>
                            <Input
                                id="discount"
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                value={invoice.settings.discountValue}
                                onChange={(e) =>
                                    updateSettings('discountValue', parseFloat(e.target.value) || 0)
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Totals */}
                <div className="flex items-start justify-center lg:justify-end">
                    <TotalsCard
                        totals={invoice.totals}
                        currencySymbol={currencySymbol}
                        taxLabel={invoice.settings.taxLabel}
                    />
                </div>
            </div>

            {/* Notes */}
            <Card>
                <CardHeader>
                    <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={invoice.notes}
                        onChange={(e) => updateField('notes', e.target.value)}
                        placeholder="Additional notes or payment terms..."
                        rows={4}
                    />
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button size="lg" onClick={saveInvoice} className="min-w-32">
                    Save Invoice
                </Button>
            </div>
        </div>
    );
}
