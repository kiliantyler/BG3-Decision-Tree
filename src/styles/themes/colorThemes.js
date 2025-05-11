// Color palette definitions
// Base colors for the dark theme
const darkThemeColors = {
  // Background colors
  background: '#22212C',
  currentLine: '#44475A',
  selection: '#454158',
  nodeBackground: '#282A36',

  // Text colors
  foreground: '#F8F8F2',
  comment: '#7970A9',

  // Accent colors
  cyan: '#80FFEA',
  green: '#8AFF80',
  brightGreen: '#50FA7B',
  orange: '#FFCA80',
  pink: '#FF80BF',
  purple: '#9580FF',
  brightPurple: '#BD93F9',
  red: '#FF9580',
  yellow: '#FFFF80',

  // UI colors
  border: '#44475A',
  accent: '#6272A4',
};

export const themes = {
  light: {
    name: 'light',
    background: '#ffffff',
    currentLine: '#f8f8f8',
    selection: '#e0e0e0',
    foreground: '#213547',
    comment: '#6c757d',
    cyan: '#0dcaf0',
    green: '#198754',
    orange: '#fd7e14',
    pink: '#d63384',
    purple: '#6f42c1',
    red: '#dc3545',
    yellow: '#ffc107',
    border: '#ddd',
    nodeBackground: '#ffffff',
    sidebarBackground: '#f8f8f8',
    requiredNode: '#ffb84d',
    requiredBorder: '#ff9900',
    optionalNode: '#e0e0e0',
    optionalBorder: '#bebebe',
    completedNode: '#d4edda',
    completedBorder: '#c3e6cb',
    warningBackground: '#fff3cd',
    warningText: '#856404',
    warningBorder: '#ffeeba',
    successBackground: '#d4edda',
    successText: '#155724',
    successBorder: '#c3e6cb',
    dangerBackground: '#f8d7da',
    dangerText: '#721c24',
    dangerBorder: '#f5c6cb',
    infoBackground: '#d1ecf1',
    infoText: '#0c5460',
    infoBorder: '#bee5eb',
    buttonBackground: '#f8f9fa',
    buttonBorder: '#ddd',
    buttonText: '#212529',
    badgeBackground: '#6c757d',
    badgeText: '#ffffff',
    boxShadow: 'rgba(0, 0, 0, 0.1)',
    boxShadowDarker: 'rgba(0, 0, 0, 0.2)',
    overlayBackground: 'rgba(0, 0, 0, 0.5)',
    nodeOptionsBackground: 'rgba(255, 255, 255, 0.4)',
    nodeOptionBackground: 'rgba(255, 255, 255, 0.5)',
    nodeOptionHoverBackground: 'rgba(255, 255, 255, 0.8)',
    selectedOptionBackground: 'rgba(255, 255, 255, 0.6)',
    metaBorder: '#ccc',
    metaText: '#555',
    handleBackground: '#555',
    linkColor: '#646cff',
    linkHoverColor: '#535bf2',
    lightLinkHoverColor: '#747bff',
  },
  dark: {
    name: 'dark',
    // Base colors
    background: darkThemeColors.background,
    currentLine: darkThemeColors.currentLine,
    selection: darkThemeColors.selection,
    foreground: darkThemeColors.foreground,
    comment: darkThemeColors.comment,

    // Primary colors
    cyan: darkThemeColors.cyan,
    green: darkThemeColors.green,
    orange: darkThemeColors.orange,
    pink: darkThemeColors.pink,
    purple: darkThemeColors.purple,
    red: darkThemeColors.red,
    yellow: darkThemeColors.yellow,

    // UI elements
    border: darkThemeColors.border,
    nodeBackground: darkThemeColors.nodeBackground,
    sidebarBackground: darkThemeColors.nodeBackground,

    // Node types
    requiredNode: darkThemeColors.brightPurple,
    requiredBorder: darkThemeColors.purple,
    optionalNode: darkThemeColors.currentLine,
    optionalBorder: darkThemeColors.accent,
    completedNode: darkThemeColors.brightGreen,
    completedBorder: darkThemeColors.green,

    // Alert styles
    warningBackground: '#483C22',
    warningText: darkThemeColors.orange,
    warningBorder: '#6D5612',

    successBackground: '#253B29',
    successText: darkThemeColors.green,
    successBorder: darkThemeColors.brightGreen,

    dangerBackground: '#442434',
    dangerText: darkThemeColors.pink,
    dangerBorder: darkThemeColors.pink,

    infoBackground: '#253948',
    infoText: darkThemeColors.cyan,
    infoBorder: darkThemeColors.cyan,

    // Button styles
    buttonBackground: darkThemeColors.nodeBackground,
    buttonBorder: darkThemeColors.border,
    buttonText: darkThemeColors.foreground,

    // Other UI elements
    badgeBackground: darkThemeColors.accent,
    badgeText: darkThemeColors.foreground,
    boxShadow: 'rgba(0, 0, 0, 0.3)',
    boxShadowDarker: 'rgba(0, 0, 0, 0.4)',
    overlayBackground: 'rgba(0, 0, 0, 0.7)',

    // Node options
    nodeOptionsBackground: 'rgba(40, 42, 54, 0.6)',
    nodeOptionBackground: 'rgba(68, 71, 90, 0.7)',
    nodeOptionHoverBackground: 'rgba(68, 71, 90, 0.9)',
    selectedOptionBackground: 'rgba(68, 71, 90, 0.8)',

    // Meta elements
    metaBorder: darkThemeColors.border,
    metaText: darkThemeColors.comment,
    handleBackground: darkThemeColors.accent,

    // Links
    linkColor: darkThemeColors.purple,
    linkHoverColor: darkThemeColors.brightPurple,
    lightLinkHoverColor: darkThemeColors.brightPurple,
  },
};

export default themes;
