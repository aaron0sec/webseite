import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva("inline-flex items-center justify-center rounded-full text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:pointer-events-none disabled:opacity-50", { variants: { variant: { default: "bg-[var(--text)] px-5 py-3 text-[var(--bg)]", outline: "border border-[var(--border)] px-5 py-3" } } , defaultVariants: { variant: "default" } });
export function Button({ className, variant, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) { return <button className={cn(buttonVariants({ variant, className }))} {...props} />; }
