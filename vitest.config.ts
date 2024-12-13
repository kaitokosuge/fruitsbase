import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
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
