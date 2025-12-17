"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SlideUpProps extends HTMLMotionProps<"div"> {
    duration?: number;
    delay?: number;
    yOffset?: number;
    className?: string;
}

export function SlideUp({
    children,
    duration = 0.5,
    delay = 0,
    yOffset = 20,
    className,
    ...props
}: SlideUpProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: yOffset }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}
