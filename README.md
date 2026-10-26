# Glassmorphism Login Page

A frosted-glass login and sign-up page built with Next.js 16, React 19, and Tailwind CSS v4. The card tilts toward your cursor like a pane of glass, and a light glare follows the pointer.

## Features

- **Glass UI**: a translucent, blurred card over an animated gradient background
- **Interactive tilt**: the card leans in 3D toward the cursor and catches a moving highlight. The effect turns off on touch devices and for users who prefer reduced motion.
- **Login and sign-up tabs**: switch between the two forms in a single card
- **Client-side validation**: checks email format, password length, and that passwords match, with accessible inline error messages
- **Social sign-in buttons**: Google and GitHub buttons, styled to match the glass card
- **Responsive and accessible**: works on mobile, uses semantic markup, and has proper labels and focus states

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- TypeScript

## Getting started

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.tsx            Root layout, fonts, and metadata
  page.tsx              Renders the auth card on the glass background
  globals.css           Theme tokens and glass utilities
components/auth/
  auth-card.tsx         Tabbed login/sign-up card with tilt
  use-glass-tilt.ts     Hook for the cursor-driven 3D tilt and glare
  glass-background.tsx  Animated gradient backdrop
  login-form.tsx        Login form
  signup-form.tsx       Sign-up form
  use-auth-form.ts      Shared form state and submit handling
  glass-field.tsx       Glass-styled input with label and error
  glass-checkbox.tsx    Glass-styled checkbox
  submit-button.tsx     Submit button with loading state
  social-buttons.tsx    Google and GitHub buttons
lib/
  auth-validation.ts    Validation rules for the forms
  utils.ts              The `cn` class-name helper
```

## Note

This is a front-end UI. The form submission is simulated, so no real authentication backend is connected yet. To add real accounts, hook the forms up to an auth provider such as Better Auth, Supabase, or Clerk.

## Deploy

Deploy it with [Vercel](https://vercel.com/new) by importing this repository.
Live Website Link - https://glassmorphism-login-page-ten.vercel.app/
