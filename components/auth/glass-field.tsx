"use client"

import { useState } from "react"
import { CircleAlert, Eye, EyeOff } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export const glassInputClass =
  "h-11 rounded-xl border-white/20 bg-white/10 px-3.5 text-base text-white placeholder:text-white/60 md:text-sm focus-visible:border-white/50 focus-visible:ring-4 focus-visible:ring-white/25 focus-visible:shadow-[0_0_20px_rgba(255,255,255,0.25)] aria-invalid:border-rose-300/70 aria-invalid:ring-rose-300/20 dark:bg-white/10"

type GlassFieldProps = Omit<React.ComponentProps<"input">, "id"> & {
  id: string
  label: string
  error?: string
  revealable?: boolean
}

export function GlassField({
  id,
  label,
  error,
  revealable = false,
  type = "text",
  className,
  ...props
}: GlassFieldProps) {
  const [revealed, setRevealed] = useState(false)
  const errorId = `${id}-error`
  const inputType = revealable ? (revealed ? "text" : "password") : type

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-white/90">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={inputType}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(glassInputClass, revealable && "pr-11", className)}
          {...props}
        />
        {revealable && (
          <button
            type="button"
            onClick={() => setRevealed((value) => !value)}
            aria-label={revealed ? "Hide password" : "Show password"}
            aria-pressed={revealed}
            aria-controls={id}
            className="absolute inset-y-0 right-1 my-auto flex size-9 items-center justify-center rounded-lg text-white/70 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-white/60"
          >
            {revealed ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
      </div>
      {error && (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-sm text-rose-100">
          <CircleAlert aria-hidden="true" className="size-3.5 shrink-0 text-rose-300" />
          {error}
        </p>
      )}
    </div>
  )
}
