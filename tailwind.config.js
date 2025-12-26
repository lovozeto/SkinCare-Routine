/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Importante para controlar el tema desde el botón de la App
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // La pila de fuentes nativa de Apple para que se sienta integrado
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"San Francisco"',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        // Colores extraídos de iOS 17 Design Guidelines
        ios: {
          blue: '#007AFF',
          gray: '#8E8E93',
          bg: {
            light: '#F2F2F7', // El gris clarito de fondo de iOS
            dark: '#000000',  // Negro puro (OLED)
          },
          card: {
            light: '#FFFFFF',
            dark: '#1C1C1E', // El gris oscuro de las tarjetas en modo noche
          },
          separator: {
            light: '#C6C6C8',
            dark: '#38383A',
          }
        }
      },
      // Esto permite usar clases como "pt-safe-top" para respetar el Notch
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      // Utilidades personalizadas para padding compuesto
      padding: {
        'safe-offset-4': 'calc(env(safe-area-inset-bottom) + 1rem)',
      }
    },
  },
  plugins: [],
}