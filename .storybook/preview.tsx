import '@/index.css'
import type { Preview } from '@storybook/react'
import React from 'react'
import { ThemeProvider } from '../src/components/theme-provider'

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
