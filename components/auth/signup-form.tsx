"use client"

import { GlassCheckbox } from "@/components/auth/glass-checkbox"
import { GlassField } from "@/components/auth/glass-field"
import { StatusMessage } from "@/components/auth/login-form"
import { SubmitButton } from "@/components/auth/submit-button"
import { useAuthForm } from "@/components/auth/use-auth-form"
import { validateSignup, type SignupValues } from "@/lib/auth-validation"

const linkClass =
  "rounded font-medium text-white underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-white/60"

export function SignupForm() {
  const { values, errors, loading, status, setField, handleSubmit } = useAuthForm<SignupValues>({
    initialValues: { name: "", email: "", password: "", confirmPassword: "", terms: false },
    validate: validateSignup,
    successMessage: "Account created! Check your inbox to verify your email.",
  })

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5" aria-label="Sign up">
      <GlassField
        id="signup-name"
        label="Full name"
        autoComplete="name"
        placeholder="Ada Lovelace"
        value={values.name}
        onChange={(event) => setField("name", event.target.value)}
        error={errors.name}
      />
      <GlassField
        id="signup-email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={values.email}
        onChange={(event) => setField("email", event.target.value)}
        error={errors.email}
      />
      <div className="flex flex-col gap-5">
        <GlassField
          id="signup-password"
          label="Password"
          revealable
          autoComplete="new-password"
          placeholder="8+ characters"
          value={values.password}
          onChange={(event) => setField("password", event.target.value)}
          error={errors.password}
        />
        <GlassField
          id="signup-confirm"
          label="Confirm password"
          revealable
          autoComplete="new-password"
          placeholder="Repeat password"
          value={values.confirmPassword}
          onChange={(event) => setField("confirmPassword", event.target.value)}
          error={errors.confirmPassword}
        />
      </div>

      <GlassCheckbox
        id="signup-terms"
        checked={values.terms}
        onCheckedChange={(checked) => setField("terms", checked)}
        error={errors.terms}
      >
        {"I agree to the "}
        <a href="#" className={linkClass}>
          Terms of Service
        </a>
        {" and "}
        <a href="#" className={linkClass}>
          Privacy Policy
        </a>
        .
      </GlassCheckbox>

      <SubmitButton loading={loading} loadingLabel="Creating account...">
        Create account
      </SubmitButton>
      <StatusMessage message={status} />
    </form>
  )
}
