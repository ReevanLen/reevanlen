'use client'

export const ProfessionalBackground = () => {
  return (
    <>
      {/* Global background patterns */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.02]"
        xmlns="http://www.w3.org/2000/svg"
        width="1200"
        height="1200"
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" fill="hsl(199, 89%, 48%)" />
          </pattern>
          <pattern id="lines" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 200 200 M 200 0 L 0 200" stroke="hsl(199, 89%, 48%)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lines)" />
      </svg>

      {/* Corner accent elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl pointer-events-none" />
    </>
  )
}
