export function GlassBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#2d1b69_0%,#5b5fc7_55%,#7b8fd4_100%)]" />
      <div className="animate-float-slow absolute -top-24 -left-24 size-[22rem] rounded-full bg-[#ee6aa0] opacity-70 blur-3xl md:size-[30rem]" />
      <div className="animate-float-slower absolute -right-20 -bottom-28 size-[20rem] rounded-full bg-[#f5b85c] opacity-60 blur-3xl md:size-[28rem]" />
      <div className="animate-float-slow absolute top-1/3 right-1/4 size-56 rounded-full bg-[#ee6aa0] opacity-40 blur-3xl [animation-delay:-6s]" />
    </div>
  )
}
