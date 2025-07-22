import os from "os";
import { execSync } from "child_process";

const platform = os.platform();
const arch = os.arch();

let libc = "unknown";
if (platform === "linux") {
	try {
		const lddVersion = execSync("ldd --version").toString();
		if (lddVersion.toLowerCase().includes("musl")) {
			libc = "musl";
		} else if (lddVersion.toLowerCase().includes("glibc")) {
			libc = "glibc";
		}
	} catch {
		// fallback or unknown
	}
}

if (platform === "linux" && arch === "x64" && libc === "musl") {
	execSync(
		"npm install @rollup/rollup-linux-x64-musl sass-embedded-linux-musl-x64 --no-save"
	);
} else if (platform === "linux" && arch === "x64" && libc === "glibc") {
	execSync(
		"npm install @rollup/rollup-linux-x64-gnu sass-embedded-linux-x64 --no-save"
	);
} else if (platform === "linux" && arch === "arm64" && libc === "glibc") {
	execSync(
		"npm install @rollup/rollup-linux-arm64-gnu sass-embedded-linux-arm64 --no-save"
	);
} else if (platform === "darwin" && arch === "arm64") {
	execSync(
		"npm install @rollup/rollup-darwin-arm64 sass-embedded-darwin-arm64 --no-save"
	);
} else if (platform === "win32" && arch === "x64") {
	execSync(
		"npm install @rollup/rollup-win32-x64 sass-embedded-win32-x64 --no-save"
	);
} else {
	// eslint-disable-next-line no-console
	console.log(`No native binary needed for ${platform}-${arch}`);
}
