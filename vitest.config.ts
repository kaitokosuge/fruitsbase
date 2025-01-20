/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        setupFiles: ['./vitest-setup.ts'],
        environment: 'jsdom',
        coverage: {
            reporter: ['text', 'json-summary', 'html'],
            provider: 'v8',
            exclude: [
                'lib/**/*',
                '**/*.test.tsx',
                '.next',
                'next.config.js',
                'postcss.config.js',
                'tailwind.config.ts',
                'vitest.config.ts',
            ],
            reportOnFailure: true,
        },
    },
});
