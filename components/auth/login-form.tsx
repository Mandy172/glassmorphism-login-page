"use client"

import { useState } from "react"

import { GlassCheckbox } from "@/components/auth/glass-checkbox"
import { GlassField } from "@/components/auth/glass-field"
import { SubmitButton } from "@/components/auth/submit-button"
import { useAuthForm } from "@/components/auth/use-auth-form"
import { validateLogin } from "@/lib/auth-validation"

export function LoginForm() {
  const [remember, setRemember] = useState(true)
  const { values, errors, loading, status, setField, handleSubmit } = useAuthForm({
    initialValues: { email: "", password: "" },
    validate: validateLogin,
    successMessage: "Welcome back! You're signed in.",
  })

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5" aria-label="Log in">
      <GlassField
        id="login-email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={values.email}
        onChange={(event) => setField("email", event.target.value)}
        error={errors.email}
      />
      <GlassField
        id="login-password"
        label="Password"
        revealable
        autoComplete="current-password"
        placeholder="Enter your password"
        value={values.password}
        onChange={(event) => setField("password", event.target.value)}
        error={errors.password}
      />

      <div className="flex items-center justify-between gap-4">
        <GlassCheckbox id="login-remember" checked={remember} onCheckedChange={setRemember}>
          Remember me
        </GlassCheckbox>
        <a
          href="#"
          className="rounded text-sm font-medium text-white underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-white/60"
        >
          Forgot password?
        </a>
      </div>

      <SubmitButton loading={loading} loadingLabel="Logging in...">
        Log in
      </SubmitButton>
      <StatusMessage message={status} />
    </form>
  )
}

export function StatusMessage({ message }: { message: string | null }) {
  return (
    <p role="status" aria-live="polite" className="min-h-0 text-center text-sm text-white/90 empty:hidden">
      {message}
    </p>
  )
}
