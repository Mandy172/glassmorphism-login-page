"use client"

import { useRef, useState } from "react"
import { Sparkles } from "lucide-react"

import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { OrDivider, SocialButtons } from "@/components/auth/social-buttons"
import { cn } from "@/lib/utils"

type Mode = "login" | "signup"

const tabs: { mode: Mode; label: string }[] = [
  { mode: "login", label: "Log in" },
  { mode: "signup", label: "Sign up" },
]

const copy: Record<Mode, { title: string; subtitle: string }> = {
  login: { title: "Welcome back", subtitle: "Log in to pick up right where you left off." },
  signup: { title: "Create your account", subtitle: "Join in seconds. No credit card required." },
}

export function AuthCard() {
  const [mode, setMode] = useState<Mode>("login")
  const tabRefs = useRef<Record<Mode, HTMLButtonElement | null>>({ login: null, signup: null })

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
    event.preventDefault()
    const next: Mode = mode === "login" ? "signup" : "login"
    setMode(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section
      aria-labelledby="auth-title"
      className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/30 bg-white/10 p-6 shadow-[0_24px_80px_-12px_rgba(20,10,60,0.55),inset_0_1px_0_0_rgba(255,255,255,0.45)] backdrop-blur-xl sm:p-9"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
      />

      <header className="mb-7 flex flex-col items-center text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-white/30 bg-white/15 shadow-inner">
          <Sparkles aria-hidden="true" className="size-5 text-white" />
        </div>
        <h1 id="auth-title" className="text-3xl font-bold tracking-tight text-balance text-white">
          {copy[mode].title}
        </h1>
        <p className="mt-2 text-sm text-pretty text-white/70">{copy[mode].subtitle}</p>
      </header>

      <div
        role="tablist"
        aria-label="Authentication mode"
        onKeyDown={handleTabKeyDown}
        className="relative mb-7 grid grid-cols-2 rounded-xl border border-white/20 bg-white/10 p-1"
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-white shadow-md transition-transform duration-300 ease-out",
            mode === "signup" && "translate-x-full",
          )}
        />
        {tabs.map((tab) => {
          const selected = mode === tab.mode
          return (
            <button
              key={tab.mode}
              ref={(node) => {
                tabRefs.current[tab.mode] = node
              }}
              id={`tab-${tab.mode}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${tab.mode}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setMode(tab.mode)}
              className={cn(
                "relative z-10 h-10 rounded-lg text-sm font-semibold transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                selected ? "text-[#2d1b69]" : "text-white/80 hover:text-white",
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div
        key={mode}
        id={`panel-${mode}`}
        role="tabpanel"
        aria-labelledby={`tab-${mode}`}
        className="animate-in duration-500 fade-in slide-in-from-bottom-2"
      >
        {mode === "login" ? <LoginForm /> : <SignupForm />}
      </div>

      <div className="mt-7 flex flex-col gap-5">
        <OrDivider />
        <SocialButtons />
      </div>

      <p className="mt-7 text-center text-sm text-white/70">
        {mode === "login" ? "New here? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="rounded font-semibold text-white underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-white/60"
        >
          {mode === "login" ? "Create an account" : "Log in"}
        </button>
      </p>
    </section>
  )
}
