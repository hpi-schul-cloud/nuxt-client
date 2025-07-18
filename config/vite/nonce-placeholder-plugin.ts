import type { Plugin } from "vite";

function setTagCspNonce(tag: string, nonce: string): string {
	// Remove any existing nonce attribute and add the new one
	const cleaned = tag.replace(/\snonce=["'][^"']*["']/i, "");
	// Insert nonce after the tag name
	return cleaned.replace(/^<(\w+)/, `<$1 nonce="${nonce}"`);
}

const CspNoncePlaceholder = (nonce: string): Plugin => {
	return {
		name: "csp-nonce-placeholder",
		transformIndexHtml(html) {
			// Set nonce in <script> tags
			html = html.replace(/<script[^>]*>/gi, (match) =>
				setTagCspNonce(match, nonce)
			);
			// Set nonce in <style> tags
			html = html.replace(/<style[^>]*>/gi, (match) =>
				setTagCspNonce(match, nonce)
			);
			// Set nonce in <link rel="stylesheet"> tags
			html = html.replace(
				/<link([^>]*rel=["']stylesheet["'][^>]*)>/gi,
				(match) => setTagCspNonce(match, nonce)
			);
			return html;
		},
	};
};

export { CspNoncePlaceholder };
