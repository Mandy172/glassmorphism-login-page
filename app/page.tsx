import { AuthCard } from "@/components/auth/auth-card"
import { GlassBackground } from "@/components/auth/glass-background"

export default function Page() {
  return (
    <main className="relative isolate flex min-h-dvh items-center justify-center px-3 py-10 sm:px-6">
      <GlassBackground />
      <AuthCard />
    </main>
  )
}
