import type { Preview } from '@storybook/react-vite'
import { ThemeProvider } from '../src/components/theme-provider'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider defaultTheme="system">
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default preview
