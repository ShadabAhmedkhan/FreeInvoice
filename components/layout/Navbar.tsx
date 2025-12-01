/**
 * Navigation Bar Component
 */

'use client';

import Link from 'next/link';
import { FileText, Home, Save } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                        <FileText className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        InvoiceGen
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/" className="flex items-center space-x-2">
                            <Home className="h-4 w-4" />
                            <span className="hidden sm:inline">Home</span>
                        </Link>
                    </Button>

                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/invoice/new" className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">New Invoice</span>
                        </Link>
                    </Button>

                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/saved" className="flex items-center space-x-2">
                            <Save className="h-4 w-4" />
                            <span className="hidden sm:inline">Saved</span>
                        </Link>
                    </Button>

                    <div className="ml-2">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
