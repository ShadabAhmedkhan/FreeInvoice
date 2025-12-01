/**
 * Logo Uploader Component
 */

'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface LogoUploaderProps {
    value?: string;
    onChange: (logo: string | undefined) => void;
}

export function LogoUploader({ value, onChange }: LogoUploaderProps) {
    const [preview, setPreview] = useState<string | undefined>(value);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('File size must be less than 2MB');
            return;
        }

        // Convert to base64
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setPreview(base64);
            onChange(base64);
        };
        reader.readAsDataURL(file);
    };

    const handleRemove = () => {
        setPreview(undefined);
        onChange(undefined);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            <Label>Company Logo</Label>

            {preview ? (
                <div className="relative inline-block">
                    <img
                        src={preview}
                        alt="Company logo"
                        className="h-24 w-auto rounded-lg border object-contain"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                        onClick={handleRemove}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div
                    className="flex h-24 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-muted-foreground/50"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <div className="flex flex-col items-center space-y-2 text-muted-foreground">
                        <Upload className="h-6 w-6" />
                        <span className="text-sm">Click to upload logo</span>
                    </div>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
            <p className="text-xs text-muted-foreground">
                PNG, JPG, or SVG. Max 2MB.
            </p>
        </div>
    );
}
