import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:3000',
  //   },
  // }
  // we can use the proxy option to proxy requests to the backend server running on port 3000.
  plugins: [react()],
})
