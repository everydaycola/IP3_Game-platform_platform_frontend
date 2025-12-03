import {defineConfig} from "vitest/config";
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),
    ],
    test:{
        include: ['test/**/*.test.{ts,tsx}'],
        exclude: ['node_modules', 'dist'],
        environment:"jsdom"
    }
})