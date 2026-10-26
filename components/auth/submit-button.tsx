import { Loader2 } from "lucide-react"

type SubmitButtonProps = {
  loading: boolean
  children: React.ReactNode
  loadingLabel: string
}

export function SubmitButton({ loading, children, loadingLabel }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      aria-busy={loading}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ee6aa0] to-[#f5b85c] font-semibold text-[#2d1b69] shadow-lg shadow-[#ee6aa0]/30 transition-all duration-200 outline-none hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#ee6aa0]/50 focus-visible:ring-4 focus-visible:ring-white/50 active:translate-y-0 disabled:pointer-events-none disabled:opacity-80"
    >
      {loading ? (
        <>
          <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </button>
  )
}
