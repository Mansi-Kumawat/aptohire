import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const FORBIDDEN_STRINGS = ['service_role', 'sb_secret', 'SUPABASE_SERVICE_ROLE_KEY'];

let hasError = false;

function scanDir(dir, isComponents = false) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      scanDir(fullPath, isComponents || fullPath.includes(path.join('src', 'components')));
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.js'))) {
      // Exclude check-secrets.js itself, tokens.css, and tailwind.config.ts from hex checks
      if (fullPath.includes('check-secrets.js')) continue;

      const content = fs.readFileSync(fullPath, 'utf8');

      // Check forbidden secret strings
      for (const secret of FORBIDDEN_STRINGS) {
        if (content.includes(secret)) {
          console.error(`[SECURITY ERROR] Forbidden secret string "${secret}" found in ${fullPath}`);
          hasError = true;
        }
      }

      // In components, check for hardcoded hex colors (should use tokens instead)
      if (isComponents) {
        // Regex for hex color like #fff or #123456, but ignore SVG stroke/fill if explicitly defined in Logo/SealMark or ProofRing SVG gradients
        const isBrandAsset = fullPath.includes('Logo.tsx') || fullPath.includes('SealMark.tsx') || fullPath.includes('ProofRing.tsx') || fullPath.includes('AliasGlyph.tsx');
        if (!isBrandAsset) {
          const hexMatch = content.match(/#[0-9a-fA-F]{3,8}\b/g);
          if (hexMatch) {
            console.error(`[STYLE ERROR] Hardcoded hex color(s) ${hexMatch.join(', ')} found in component ${fullPath}. Use design system tokens.`);
            hasError = true;
          }
        }
      }
    }
  }
}

console.log('Running static security and style checks...');
scanDir(path.join(projectRoot, 'src'));
if (fs.existsSync(path.join(projectRoot, 'dist'))) {
  scanDir(path.join(projectRoot, 'dist'));
}

if (hasError) {
  console.error('Static checks failed!');
  process.exit(1);
} else {
  console.log('Static checks passed: zero secrets and token compliance verified.');
}
