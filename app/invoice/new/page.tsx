/**
 * New Invoice Page
 */

'use client';

import { InvoiceForm } from '@/components/invoice/InvoiceForm';
import { InvoicePreview } from '@/components/invoice/InvoicePreview';
import { useInvoice } from '@/hooks/useInvoice';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewInvoicePage() {
    const { invoice } = useInvoice();
    const [showPreview, setShowPreview] = useState(false);

    if (!invoice) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="container py-8 px-4 md:px-6">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">New Invoice</h1>
                </div>

                {/* Mobile Preview Toggle */}
                <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowPreview(!showPreview)}
                >
                    {showPreview ? (
                        <>
                            <EyeOff className="h-4 w-4 mr-2" />
                            Hide Preview
                        </>
                    ) : (
                        <>
                            <Eye className="h-4 w-4 mr-2" />
                            Show Preview
                        </>
                    )}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Editor Column */}
                <div className={showPreview ? 'hidden lg:block' : 'block'}>
                    <InvoiceForm />
                </div>

                {/* Preview Column */}
                <div className={`lg:block ${showPreview ? 'block' : 'hidden'}`}>
                    <div className="sticky top-24">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Live Preview</h2>
                        </div>
                        <InvoicePreview invoice={invoice} />
                    </div>
                </div>
            </div>
        </div>
    );
}
