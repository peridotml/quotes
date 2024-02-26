import { createTheme, rem } from '@mantine/core';
import '@fontsource/eb-garamond'; // Defaults to weight 400
import '@fontsource/eb-garamond/600.css'; // Specify weight

export const theme = createTheme({
  fontFamily: 'EB Garamond, serif',
  defaultRadius: 'sm', // Optional: Adjust as needed for your design system
  fontSizes: {
    xs: rem(16), // Example adjustments, increase the base size
    sm: rem(18),
    md: rem(22), // You might use this as your body text size
    lg: rem(22),
    xl: rem(26),
  },
});
