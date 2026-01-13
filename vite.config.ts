import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Custom plugin to handle figma:asset imports
function figmaAssetsPlugin() {
  return {
    name: 'figma-assets',
    resolveId(source: string) {
      if (source.startsWith('figma:asset/')) {
        const assetName = source.replace('figma:asset/', '');
        return path.resolve(__dirname, './src/assets', assetName);
      }
      return null;
    }
  };
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    figmaAssetsPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
})
