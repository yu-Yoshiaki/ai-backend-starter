import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'fs';
import * as ts from 'typescript';

const tsPath = new URL('../src/mastra/middleware/auth.ts', import.meta.url);
const tsSource = readFileSync(tsPath, 'utf8');
const jsSource = ts.transpileModule(tsSource, {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 }
}).outputText;
const moduleUrl = 'data:text/javascript;base64,' + Buffer.from(jsSource).toString('base64');
const { isDevelopment } = await import(moduleUrl);

test('returns true when NODE_ENV=development', () => {
  process.env.NODE_ENV = 'development';
  delete process.env.APP_URL;
  assert.equal(isDevelopment(), true);
});

test('returns true when APP_URL port is 4111', () => {
  process.env.NODE_ENV = 'production';
  process.env.APP_URL = 'http://localhost:4111';
  assert.equal(isDevelopment(), true);
});

test('returns false for production without dev port', () => {
  process.env.NODE_ENV = 'production';
  process.env.APP_URL = 'http://localhost:3000';
  assert.equal(isDevelopment(), false);
});
