import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // Toda requisição que começar com /api será repassada para o Spring Boot
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            }
        }
    }
})