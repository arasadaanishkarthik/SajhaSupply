"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button-animated-gradient-utils/button";
import { cn } from "@/lib/utils";

//  ------------------------------ | BUTTON ANIMATED GRADIENT | ------------------------------  //

/**
 * Animated pill CTA button with sliding gradient fill and directional text/icon shift.
 * Renders as a React Router Link when `to` is provided, or as a standard button otherwise.
 */
export default function ButtonAnimatedGradient({
  children,
  label = "Explore",
  icon = <ArrowRight className="size-4 shrink-0" />,
  to,
  onClick,
  type = "button",
  className,
  wrapperClassName,
  gradientClassName,
  ...props
}) {
  const buttonClasses = cn(
    "relative h-auto overflow-hidden rounded-full border border-border px-8 py-4 text-xs font-semibold tracking-wider text-foreground transition-all duration-300 hover:border-transparent hover:bg-transparent hover:text-white",
    className
  );

  const innerContent = (
    <>
      {/* Gradient sliding background */}
      <motion.span
        aria-hidden="true"
        className={cn(
          "via-primary-200 absolute inset-0 z-0 rounded-full bg-gradient-to-r from-primary to-cyan-500",
          gradientClassName
        )}
        variants={{
          rest: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        style={{ originX: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        <motion.span
          variants={{
            rest: { x: 4 },
            hover: { x: 0 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {children ?? label}
        </motion.span>

        <motion.span
          variants={{
            rest: { x: 0 },
            hover: { x: 8 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {icon}
        </motion.span>
      </span>
    </>
  );

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={{
        rest: { scale: 1 },
        tap: { scale: 0.98 },
      }}
      className={cn("relative inline-block overflow-hidden rounded-full", wrapperClassName)}
    >
      {to ? (
        <Button asChild variant="ghost" className={buttonClasses} {...props}>
          <Link to={to}>{innerContent}</Link>
        </Button>
      ) : (
        <Button
          type={type}
          variant="ghost"
          onClick={onClick}
          className={buttonClasses}
          {...props}
        >
          {innerContent}
        </Button>
      )}
    </motion.div>
  );
}
