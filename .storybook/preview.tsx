import { Decorator, Preview } from '@storybook/react-vite'
import { useEffect } from 'react'
import { ThemeProvider, useTheme } from '../src/components/theme-provider'
import '../src/index.css'

const preview: Preview = {
  initialGlobals: {
    theme: 'dark',
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'dark', title: 'Dark' },
        { value: 'light', title: 'Light' },
        { value: 'system', title: 'System' },
      ],
    },
  },
}

export const initialGlobals = {
  theme: 'dark',
}

const UseThemeProvider: Decorator = (Story, context) => {
  const { theme } = context.globals

  return (
    <ThemeProvider defaultTheme={theme} storageKey="storyboard-ui-theme">
      <ThemeUpdater theme={theme}>
        <Story {...context} />
      </ThemeUpdater>
    </ThemeProvider>
  )
}

// This component ensures theme updates happen inside the ThemeProvider context
const ThemeUpdater = ({ theme, children }: { theme: string; children: React.ReactNode }) => {
  const themeContext = useTheme()

  useEffect(() => {
    themeContext.setTheme(theme as 'dark' | 'light' | 'system')
  }, [theme, themeContext])

  return <>{children}</>
}

export const decorators = [UseThemeProvider]

export default preview
