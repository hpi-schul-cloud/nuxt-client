// src/polyfills/global.ts
// Polyfill für global (CSP-konform)
if (typeof global === "undefined") {
	(window as unknown as { global: typeof globalThis }).global = globalThis;
}
