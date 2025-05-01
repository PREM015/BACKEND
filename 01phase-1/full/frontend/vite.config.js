  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react-swc'

  export default defineConfig({
    server: {
      proxy: {
        '/hello': 'http://localhost:3000',  // 👈 correct proxy
      },
    },
    plugins: [react()],
  })
