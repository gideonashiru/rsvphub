"use client"

import { useTheme } from "next-themes"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <label className="inline-flex items-center gap-2">
      <span className="sr-only">Color theme</span>
      <select
        aria-label="Color theme"
        value={theme ?? "system"}
        onChange={(event) => setTheme(event.currentTarget.value)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  )
}
