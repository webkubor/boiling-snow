import { cpSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { refreshGuard } from 'vite-plugin-refresh-guard';

const staticDirs = ['data', 'js', 'assets'];

function copyRuntimeAssets() {
  return {
    name: 'copy-runtime-assets',
    writeBundle() {
      const rootDir = process.cwd();
      const outDir = resolve(rootDir, 'dist');

      for (const dir of staticDirs) {
        const from = resolve(rootDir, dir);
        const to = resolve(outDir, dir);

        if (!existsSync(from)) continue;
        cpSync(from, to, { recursive: true });
      }
    },
  };
}

export default defineConfig({
  plugins: [copyRuntimeAssets(), refreshGuard({ changelog: false })],
});
