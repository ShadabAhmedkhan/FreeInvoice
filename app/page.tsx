import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileText, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Professional Invoices in Second
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Create, manage, and export beautiful invoices. No login required.
                Free forever for freelancers and small businesses.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg" className="h-12 px-8 text-lg">
                <Link href="/invoice/new">
                  Create Invoice <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg">
                <Link href="/saved">View Saved</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <Zap className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold">Lightning Fast</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Real-time preview and auto-calculations. Generate invoices instantly without page reloads.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                <Shield className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold">Private & Secure</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Your data stays on your device. We use local storage and IndexedDB to keep your invoices safe.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                <FileText className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold">PDF Export</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Download print-ready PDFs with a single click. Professional templates that look great on paper.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Everything you need
              </h2>
              <p className="text-gray-500 dark:text-gray-400 md:text-lg">
                Built for speed and simplicity. No bloated features, just the essentials to get you paid faster.
              </p>
              <ul className="space-y-3">
                {[
                  "Customizable tax rates and labels",
                  "Multi-currency support",
                  "Company logo upload",
                  "Auto-save functionality",
                  "Dark mode support",
                  "Print-friendly layout",
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border bg-background">
              {/* Abstract representation of the app UI */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              <div className="absolute inset-4 rounded-lg border border-border bg-background/50 backdrop-blur p-4">
                <div className="h-4 w-1/3 bg-muted rounded mb-4" />
                <div className="h-32 w-full bg-muted/50 rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-muted/30 rounded" />
                  <div className="h-3 w-5/6 bg-muted/30 rounded" />
                  <div className="h-3 w-4/6 bg-muted/30 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
