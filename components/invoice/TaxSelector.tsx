/**
 * Tax Selector Component
 */

'use client';

import { useState } from 'react';
import { TAX_PRESETS } from '@/types/invoice';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface TaxSelectorProps {
    value: number;
    onChange: (value: number) => void;
    label?: string;
    onLabelChange?: (label: string) => void;
}

export function TaxSelector({ value, onChange, label, onLabelChange }: TaxSelectorProps) {
    const [isCustom, setIsCustom] = useState(
        !TAX_PRESETS.some((preset) => preset.value === value)
    );

    const handlePresetChange = (presetValue: string) => {
        const numValue = parseFloat(presetValue);
        if (numValue === -1) {
            setIsCustom(true);
            onChange(0);
        } else {
            setIsCustom(false);
            onChange(numValue);
        }
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="tax">Tax</Label>
            <div className="flex space-x-2">
                <Select
                    value={isCustom ? '-1' : value.toString()}
                    onValueChange={handlePresetChange}
                >
                    <SelectTrigger id="tax" className="flex-1">
                        <SelectValue placeholder="Select tax" />
                    </SelectTrigger>
                    <SelectContent>
                        {TAX_PRESETS.map((preset) => (
                            <SelectItem key={preset.value} value={preset.value.toString()}>
                                {preset.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {isCustom && (
                    <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={value}
                        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                        className="w-24"
                        placeholder="%"
                    />
                )}
            </div>

            {onLabelChange && (
                <Input
                    type="text"
                    value={label}
                    onChange={(e) => onLabelChange(e.target.value)}
                    placeholder="Tax label (e.g., VAT, GST)"
                    className="mt-2"
                />
            )}
        </div>
    );
}
