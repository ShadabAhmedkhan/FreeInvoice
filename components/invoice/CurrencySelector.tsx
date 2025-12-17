/**
 * Currency Selector Component
 */

'use client';

import { CURRENCIES } from '@/types/invoice';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface CurrencySelectorProps {
    value: string;
    onChange: (value: string) => void;
}

export function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                    {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                            <span className="flex items-center space-x-2">
                                <span className="font-medium">{currency.symbol}</span>
                                <span>{currency.code}</span>
                                <span className="text-muted-foreground">- {currency.name}</span>
                            </span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
