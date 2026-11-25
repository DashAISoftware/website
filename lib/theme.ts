// Colour theme: light by default; the visitor's choice is stored and set as
// data-theme on <html> (see the script in app/layout.tsx).
export type Theme = 'light' | 'dark'

export const THEME_KEY = 'dashai-theme'

// Runs in <head> before the page paints, so a stored dark theme never flashes light.
export const THEME_SCRIPT = `try{var t=localStorage.getItem('${THEME_KEY}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // storage blocked: the choice lasts for this page only
  }
}
