"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  variant?: "default" | "glass" | "elevated";
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

const paddingStyles = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

function Card({
  className,
  variant = "default",
  hover = true,
  padding = "md",
  children,
}: CardProps) {
  const baseStyles = cn(
    "rounded-2xl transition-all duration-300",
    paddingStyles[padding],
    {
      "bg-bg-surface border border-border shadow-[var(--shadow-sm)]":
        variant === "default",
      "glass shadow-[var(--shadow-md)]":
        variant === "glass",
      "bg-bg-surface border border-border shadow-[var(--shadow-md)]":
        variant === "elevated",
    },
    hover &&
      "hover:shadow-[var(--shadow-lg)] hover:border-border-hover hover:-translate-y-0.5",
    className
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={baseStyles}
    >
      {children}
    </motion.div>
  );
}

export { Card };
export type { CardProps };
