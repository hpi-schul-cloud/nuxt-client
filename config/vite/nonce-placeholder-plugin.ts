import type { Plugin } from "vite";

const CspNoncePlaceholder = (nonce: string): Plugin => {
	return {
		name: "csp-nonce-placeholder",
		transformIndexHtml(html) {
			// Add nonce to <script> tags
			html = html.replace(/<script(\s|>)/g, `<script nonce="${nonce}"$1`);
			// Add nonce to <style> tags
			html = html.replace(/<style(\s|>)/g, `<style nonce="${nonce}"$1`);
			// Add nonce to <link rel="stylesheet"> tags
			html = html.replace(
				/<link([^>]*rel=["']stylesheet["'][^>]*)>/g,
				(match) => {
					if (/nonce=/.test(match)) return match; // Don't double-add
					return match.replace(">", ` nonce="${nonce}">`);
				}
			);
			return html;
		},
	};
};

export { CspNoncePlaceholder };
