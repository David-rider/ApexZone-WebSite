/**
 * Translation Validation & Audit Tool
 * 
 * Use this to validate that all locales have complete translations
 * Run: npx ts-node src/scripts/validateTranslations.ts
 */

import fs from 'fs';
import path from 'path';

const LOCALES = ['en', 'zh-CN', 'zh-TW', 'es', 'ko', 'ja', 'ru', 'it'];
const MESSAGES_DIR = path.join(__dirname, '../../messages');

interface TranslationReport {
  locale: string;
  totalKeys: number;
  missingKeys: string[];
  extraKeys: string[];
  coverage: number;
}

/**
 * Get all keys from a translations object (flattened)
 */
function flattenKeys(obj: any, prefix = ''): Set<string> {
  const keys = new Set<string>();

  function traverse(current: any, p: string) {
    if (typeof current === 'object' && current !== null) {
      if (Array.isArray(current)) {
        // Array values, don't traverse
        keys.add(p);
      } else {
        for (const [key, value] of Object.entries(current)) {
          const newPrefix = p ? `${p}.${key}` : key;
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            traverse(value, newPrefix);
          } else {
            keys.add(newPrefix);
          }
        }
      }
    } else {
      keys.add(p);
    }
  }

  traverse(obj, prefix);
  return keys;
}

/**
 * Load translation file
 */
function loadTranslations(locale: string): Record<string, any> {
  try {
    const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Failed to load ${locale}.json:`, error);
    return {};
  }
}

/**
 * Validate all locales have same keys
 */
function validateTranslations(): TranslationReport[] {
  const reports: TranslationReport[] = [];
  const referenceKeys = flattenKeys(loadTranslations('en'));

  console.log(`\n🔍 Translation Validation Report\n`);
  console.log(`Reference locale: EN (${referenceKeys.size} keys)\n`);
  console.log(`─`.repeat(80));

  for (const locale of LOCALES) {
    if (locale === 'en') continue;

    const translations = loadTranslations(locale);
    const localeKeys = flattenKeys(translations);

    const missing = Array.from(referenceKeys).filter(k => !localeKeys.has(k));
    const extra = Array.from(localeKeys).filter(k => !referenceKeys.has(k));
    const coverage = ((referenceKeys.size - missing.length) / referenceKeys.size) * 100;

    const report: TranslationReport = {
      locale,
      totalKeys: referenceKeys.size,
      missingKeys: missing,
      extraKeys: extra,
      coverage,
    };

    reports.push(report);

    // Format output
    const statusIcon = coverage === 100 ? '✅' : '⚠️';
    const status = coverage === 100 ? 'COMPLETE' : `${coverage.toFixed(1)}%`;

    console.log(`\n${statusIcon} ${locale.padEnd(10)} | ${status.padEnd(12)} | Keys: ${localeKeys.size}/${referenceKeys.size}`);

    if (missing.length > 0) {
      console.log(`   Missing (${missing.length}): ${missing.slice(0, 3).join(', ')}${missing.length > 3 ? '...' : ''}`);
    }

    if (extra.length > 0) {
      console.log(`   Extra (${extra.length}): ${extra.slice(0, 3).join(', ')}${extra.length > 3 ? '...' : ''}`);
    }
  }

  return reports;
}

/**
 * Check for orphaned translations (keys in data files but not in messages)
 */
function checkOrphanedKeys(): void {
  console.log(`\n\n📋 Checking for orphaned translation keys...\n`);

  // Read the translation keys definitions
  const keysFile = path.join(__dirname, '../i18n/translationKeys.ts');
  const keysContent = fs.readFileSync(keysFile, 'utf-8');

  // Extract key references (basic parsing)
  const keyMatches = keysContent.match(/`portfolio\.projects\.\w+\.\w+`/g) || [];
  console.log(`Found ${keyMatches.length} key references in translationKeys.ts`);

  // Load English translations
  const enTranslations = loadTranslations('en');
  const enKeys = flattenKeys(enTranslations);

  let orphaned = 0;
  for (const match of keyMatches) {
    const key = match.replace(/`/g, '');
    if (!enKeys.has(key)) {
      console.log(`  ⚠️  Orphaned: ${key}`);
      orphaned++;
    }
  }

  if (orphaned === 0) {
    console.log(`✅ No orphaned keys found`);
  }
}

/**
 * Generate migration report
 */
function generateMigrationReport(reports: TranslationReport[]): void {
  console.log(`\n\n📊 Migration Summary\n`);
  console.log(`─`.repeat(80));

  const totalLocales = reports.length;
  const completeLocales = reports.filter(r => r.coverage === 100).length;
  const avgCoverage = (reports.reduce((sum, r) => sum + r.coverage, 0) / totalLocales).toFixed(1);

  console.log(`Total Locales Checked: ${totalLocales}`);
  console.log(`Complete Translations: ${completeLocales}/${totalLocales}`);
  console.log(`Average Coverage: ${avgCoverage}%`);

  const incompletLocales = reports.filter(r => r.coverage < 100);
  if (incompletLocales.length > 0) {
    console.log(`\n⚠️  Incomplete Locales:`);
    incompletLocales.forEach(r => {
      console.log(`  - ${r.locale}: ${r.coverage.toFixed(1)}% (${r.missingKeys.length} missing)`);
    });
  } else {
    console.log(`\n✅ All locales are 100% complete!`);
  }
}

/**
 * Main execution
 */
export function validateAll(): void {
  try {
    const reports = validateTranslations();
    checkOrphanedKeys();
    generateMigrationReport(reports);

    // Write detailed report to file
    const reportPath = path.join(__dirname, '../../translation-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(reports, null, 2));
    console.log(`\n📄 Detailed report saved to: translation-report.json\n`);
  } catch (error) {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  validateAll();
}

export { validateTranslations, checkOrphanedKeys, generateMigrationReport };
