import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		exclude: ['**/node_modules/**', '**/lib/*.test.js'],
		environment: './test/environment.ts',
		coverage: {
			provider: 'istanbul',
			include: ['src/**'],
		},
	},
});
