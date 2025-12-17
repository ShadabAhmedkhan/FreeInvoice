/**
 * Totals Card Component - Displays invoice calculations
 */

'use client';

import { InvoiceTotals } from '@/types/invoice';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface TotalsCardProps {
    totals: InvoiceTotals;
    currencySymbol: string;
    taxLabel: string;
}

export function TotalsCard({ totals, currencySymbol, taxLabel }: TotalsCardProps) {
    const formatAmount = (amount: number) => {
        return `${currencySymbol}${amount.toFixed(2)}`;
    };

    return (
        <Card className="w-full sm:w-80">
            <CardContent className="p-6 space-y-3">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatAmount(totals.subtotal)}</span>
                </div>

                {/* Tax */}
                {totals.taxAmount > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{taxLabel}</span>
                        <span className="font-medium">{formatAmount(totals.taxAmount)}</span>
                    </div>
                )}

                {/* Discount */}
                {totals.discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                        <span>Discount</span>
                        <span className="font-medium">-{formatAmount(totals.discountAmount)}</span>
                    </div>
                )}

                <Separator />

                {/* Total */}
                <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {formatAmount(totals.total)}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
