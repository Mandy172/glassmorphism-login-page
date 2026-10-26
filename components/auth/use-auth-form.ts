"use client"

import { useState } from "react"

import type { FieldErrors } from "@/lib/auth-validation"

type UseAuthFormOptions<T extends Record<string, string | boolean>> = {
  initialValues: T
  validate: (values: T) => FieldErrors<Extract<keyof T, string>>
  successMessage: string
}

const SIMULATED_REQUEST_MS = 1400

export function useAuthForm<T extends Record<string, string | boolean>>({
  initialValues,
  validate,
  successMessage,
}: UseAuthFormOptions<T>) {
  type Field = Extract<keyof T, string>
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FieldErrors<Field>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  function setField<K extends Field>(field: K, value: T[K]) {
    const next = { ...values, [field]: value }
    setValues(next)
    setStatus(null)
    if (submitted) setErrors(validate(next))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      event.currentTarget.querySelector<HTMLElement>(`[aria-invalid="true"]`)?.focus()
      return
    }

    setLoading(true)
    setStatus(null)
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_REQUEST_MS))
    setLoading(false)
    setStatus(successMessage)
  }

  return { values, errors, loading, status, setField, handleSubmit }
}
