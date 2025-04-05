import * as React from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface CloseButtonProps extends Omit<HTMLMotionProps<"button">, "onClose"> {
  variant?: "default" | "light" | "dark"
  size?: "sm" | "md" | "lg"
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  onClose?: () => void
}

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(({ 
  className, 
  variant = "default", 
  size = "md", 
  position = "top-right", 
  onClose,
  "aria-label": ariaLabel = "Close",
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-2.5"
  }

  const variantClasses = {
    default: "bg-background/80 hover:bg-background/90 text-foreground",
    light: "bg-white/80 hover:bg-white/90 text-gray-800",
    dark: "bg-black/80 hover:bg-black/90 text-white"
  }

  const positionClasses = {
    "top-right": "top-2 right-2",
    "top-left": "top-2 left-2",
    "bottom-right": "bottom-2 right-2",
    "bottom-left": "bottom-2 left-2"
  }

  return (
    <AnimatePresence mode="wait">
      <motion.button
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          "rounded-full backdrop-blur-sm transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "absolute z-50",
          positionClasses[position],
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        onClick={(e) => {
          e.stopPropagation()
          onClose?.()
        }}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
        {...props}
      >
        <X
          className={cn(
            "text-current",
            size === "sm" && "h-3 w-3",
            size === "md" && "h-4 w-4",
            size === "lg" && "h-5 w-5"
          )}
          aria-hidden="true"
        />
      </motion.button>
    </AnimatePresence>
  )
})

CloseButton.displayName = "CloseButton"

export { CloseButton, type CloseButtonProps }