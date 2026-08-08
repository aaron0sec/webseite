"use client";

import { motion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
} & Omit<ComponentProps<typeof motion.div>, "children">;

export function Reveal({ children, delay = 0, ...props }: RevealProps) {
  return (
    <motion.div
      {...props}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
