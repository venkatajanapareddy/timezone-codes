import { defineConfig } from 'tsup';
import { mkdir } from 'fs/promises';

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    };
  },
  async onSuccess() {
    // Copy timezones.json to dist and to dist/data
    const { copyFile } = await import('fs/promises');

    // Ensure the dist/data directory exists
    await mkdir('dist/data', { recursive: true });

    // Copy to both locations for compatibility
    await copyFile('src/data/timezones.json', 'dist/timezones.json');
    await copyFile('src/data/timezones.json', 'dist/data/timezones.json');
  },
});
