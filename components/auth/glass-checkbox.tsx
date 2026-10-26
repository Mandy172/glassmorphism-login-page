"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

type GlassCheckboxProps = {
  id: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  children: React.ReactNode
  error?: string
}

export function GlassCheckbox({ id, checked, onCheckedChange, children, error }: GlassCheckboxProps) {
  const errorId = `${id}-error`
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-2.5">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(value) => onCheckedChange(value === true)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "mt-0.5 size-4.5 rounded-md border-white/40 bg-white/10 text-[#2d1b69]",
            "focus-visible:border-white/70 focus-visible:ring-white/30",
            "data-checked:border-white data-checked:bg-white data-checked:text-[#2d1b69]",
            "aria-invalid:border-rose-300/80",
          )}
        />
        <label htmlFor={id} className="text-sm leading-snug text-white/80 select-none">
          {children}
        </label>
      </div>
      {error && (
        <p id={errorId} role="alert" className="pl-7 text-sm text-rose-100">
          {error}
        </p>
      )}
    </div>
  )
}
