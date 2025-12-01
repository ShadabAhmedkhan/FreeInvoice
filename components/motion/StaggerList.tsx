"use client";

import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerListProps extends HTMLMotionProps<"div"> {
    staggerDelay?: number;
    className?: string;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: (staggerDelay: number) => ({
        opacity: 1,
        transition: {
            staggerChildren: staggerDelay,
        },
    }),
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export function StaggerList({
    children,
    staggerDelay = 0.1,
    className,
    ...props
}: StaggerListProps) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            custom={staggerDelay}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className,
    ...props
}: HTMLMotionProps<"div">) {
    return (
        <motion.div variants={itemVariants} className={cn(className)} {...props}>
            {children}
        </motion.div>
    );
}
