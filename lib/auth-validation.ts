export type FieldErrors<T extends string> = Partial<Record<T, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const MIN_PASSWORD_LENGTH = 8

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return "Email is required."
  if (!EMAIL_PATTERN.test(value.trim())) return "Enter a valid email address."
}

export function validatePassword(value: string): string | undefined {
  if (!value) return "Password is required."
  if (value.length < MIN_PASSWORD_LENGTH)
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
}

export type LoginValues = { email: string; password: string }
export type LoginField = keyof LoginValues

export function validateLogin(values: LoginValues): FieldErrors<LoginField> {
  return compact({
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  })
}

export type SignupValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}
export type SignupField = keyof SignupValues

export function validateSignup(values: SignupValues): FieldErrors<SignupField> {
  return compact({
    name: values.name.trim().length < 2 ? "Enter your full name." : undefined,
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    confirmPassword: !values.confirmPassword
      ? "Please confirm your password."
      : values.confirmPassword !== values.password
        ? "Passwords do not match."
        : undefined,
    terms: values.terms ? undefined : "You must accept the terms to continue.",
  })
}

function compact<T extends string>(errors: Record<T, string | undefined>): FieldErrors<T> {
  return Object.fromEntries(
    Object.entries(errors).filter(([, message]) => Boolean(message)),
  ) as FieldErrors<T>
}
