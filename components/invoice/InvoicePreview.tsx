/**
 * Invoice Preview Component - Print-ready invoice display
 */

'use client';

import { Invoice, CURRENCIES } from '@/types/invoice';
// import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { formatDate } from '@/utils/formatters';
import { generatePDF, printInvoice } from '@/lib/pdf-generator';
import { SlideUp } from '@/components/motion/SlideUp';
import { motion } from 'framer-motion';

interface InvoicePreviewProps {
    invoice: Invoice;
}

export function InvoicePreview({ invoice }: InvoicePreviewProps) {
    const currencySymbol =
        CURRENCIES.find((c) => c.code === invoice.settings.currency)?.symbol || '$';

    const formatAmount = (amount: number) => {
        return `${currencySymbol}${amount.toFixed(2)}`;
    };

    const handleDownloadPDF = async () => {
        await generatePDF('invoice-preview', `${invoice.invoiceNumber}.pdf`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <div className="space-y-4">
            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 print:hidden">
                <Button variant="outline" size="sm" onClick={printInvoice}>
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                </Button>
            </div>

            {/* Invoice Preview */}
            <SlideUp id="invoice-preview" className="p-8 sm:p-12 bg-white dark:bg-[#111827] print:shadow-none rounded-xl border shadow-sm">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between mb-8">
                    {/* Business Details */}
                    <div className="mb-6 sm:mb-0">
                        {invoice.businessDetails.logo && (
                            <img
                                src={invoice.businessDetails.logo}
                                alt="Company Logo"
                                className="h-16 w-auto mb-4"
                            />
                        )}
                        <h2 className="text-2xl font-bold text-[#111827] dark:text-white">
                            {invoice.businessDetails.name || 'Your Business'}
                        </h2>
                        <div className="mt-2 text-sm text-[#4b5563] dark:text-[#9ca3af] space-y-1">
                            {invoice.businessDetails.email && <p>{invoice.businessDetails.email}</p>}
                            {invoice.businessDetails.phone && <p>{invoice.businessDetails.phone}</p>}
                            {invoice.businessDetails.address && <p>{invoice.businessDetails.address}</p>}
                        </div>
                    </div>

                    {/* Invoice Info */}
                    <div className="text-left sm:text-right">
                        <h1 className="text-3xl font-bold text-[#111827] dark:text-white mb-2">
                            INVOICE
                        </h1>
                        <div className="text-sm space-y-1">
                            <p className="text-[#4b5563] dark:text-[#9ca3af]">
                                <span className="font-medium">Invoice #:</span> {invoice.invoiceNumber}
                            </p>
                            <p className="text-[#4b5563] dark:text-[#9ca3af]">
                                <span className="font-medium">Issue Date:</span> {formatDate(invoice.createdAt)}
                            </p>
                            <p className="text-[#4b5563] dark:text-[#9ca3af]">
                                <span className="font-medium">Due Date:</span> {formatDate(invoice.dueDate)}
                            </p>
                        </div>
                    </div>
                </div>

                <Separator className="my-6" />

                {/* Bill To */}
                <div className="mb-8">
                    <h3 className="text-sm font-semibold text-[#6b7280] dark:text-[#9ca3af] uppercase mb-2">
                        Bill To
                    </h3>
                    <div className="text-[#111827] dark:text-white">
                        <p className="font-semibold text-lg">{invoice.clientDetails.name || 'Client Name'}</p>
                        <div className="mt-1 text-sm text-[#4b5563] dark:text-[#9ca3af] space-y-1">
                            {invoice.clientDetails.email && <p>{invoice.clientDetails.email}</p>}
                            {invoice.clientDetails.phone && <p>{invoice.clientDetails.phone}</p>}
                            {invoice.clientDetails.address && <p>{invoice.clientDetails.address}</p>}
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <div className="mb-8">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-[#d1d5db] dark:border-[#374151]">
                                <th className="text-left py-3 text-sm font-semibold text-[#374151] dark:text-[#d1d5db]">
                                    Description
                                </th>
                                <th className="text-right py-3 text-sm font-semibold text-[#374151] dark:text-[#d1d5db]">
                                    Qty
                                </th>
                                <th className="text-right py-3 text-sm font-semibold text-[#374151] dark:text-[#d1d5db]">
                                    Rate
                                </th>
                                <th className="text-right py-3 text-sm font-semibold text-[#374151] dark:text-[#d1d5db]">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <motion.tbody
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                        >
                            {invoice.items.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-[#6b7280]">
                                        No items added
                                    </td>
                                </tr>
                            ) : (
                                invoice.items.map((item) => (
                                    <motion.tr
                                        key={item.id}
                                        variants={itemVariants}
                                        className="border-b border-[#e5e7eb] dark:border-[#1f2937]"
                                    >
                                        <td className="py-3 text-[#111827] dark:text-white">{item.description}</td>
                                        <td className="py-3 text-right text-[#111827] dark:text-white">{item.quantity}</td>
                                        <td className="py-3 text-right text-[#111827] dark:text-white">
                                            {formatAmount(item.rate)}
                                        </td>
                                        <td className="py-3 text-right text-[#111827] dark:text-white">
                                            {formatAmount(item.amount)}
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </motion.tbody>
                    </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end mb-8">
                    <div className="w-full sm:w-80 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-[#4b5563] dark:text-[#9ca3af]">Subtotal</span>
                            <span className="text-[#111827] dark:text-white font-medium">
                                {formatAmount(invoice.totals.subtotal)}
                            </span>
                        </div>

                        {invoice.totals.taxAmount > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-[#4b5563] dark:text-[#9ca3af]">
                                    {invoice.settings.taxLabel} ({invoice.settings.taxRate}%)
                                </span>
                                <span className="text-[#111827] dark:text-white font-medium">
                                    {formatAmount(invoice.totals.taxAmount)}
                                </span>
                            </div>
                        )}

                        {invoice.totals.discountAmount > 0 && (
                            <div className="flex justify-between text-sm text-[#16a34a]">
                                <span>Discount</span>
                                <span className="font-medium">-{formatAmount(invoice.totals.discountAmount)}</span>
                            </div>
                        )}

                        <Separator />

                        <div className="flex justify-between text-lg font-bold pt-2">
                            <span className="text-[#111827] dark:text-white">Total</span>
                            <span className="text-[#111827] dark:text-white">
                                {formatAmount(invoice.totals.total)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                {invoice.notes && (
                    <div className="mt-8 pt-6 border-t border-[#e5e7eb] dark:border-[#1f2937]">
                        <h3 className="text-sm font-semibold text-[#6b7280] dark:text-[#9ca3af] uppercase mb-2">
                            Notes
                        </h3>
                        <p className="text-sm text-[#4b5563] dark:text-[#9ca3af] whitespace-pre-wrap">
                            {invoice.notes}
                        </p>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-[#e5e7eb] dark:border-[#1f2937] text-center">
                    <p className="text-xs text-[#6b7280] dark:text-[#9ca3af]">
                        Thank you for your business!
                    </p>
                </div>
            </SlideUp>
        </div>
    );
}
