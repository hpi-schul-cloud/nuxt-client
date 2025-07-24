import { Plugin } from "vite";

// This plugin strips <style> blocks from Vue single-file components (.vue files).
// There is an issue with Vitest regarding the generated source maps
// when <style> blocks are present in single file components leading to incorrect
// line number reporting.
const StripVueStyles = (): Plugin => {
	return {
		name: "strip-vue-styles",
		enforce: "pre",
		transform(code: string, id: string) {
			if (id.endsWith(".vue") && process.env.VITEST) {
				// Remove <style>...</style> blocks
				return code.replace(/<style[\s\S]*?<\/style>/gi, "");
			}
		},
	};
};

export { StripVueStyles };
