import os from "os";
import { execSync } from "child_process";

const platform = os.platform();
const arch = os.arch();

if (platform === "linux" && arch === "x64") {
	execSync("npm install @rollup/rollup-linux-x64-musl --no-save");
} else if (platform === "darwin" && arch === "arm64") {
	execSync("npm install @rollup/rollup-darwin-arm64 --no-save");
} else if (platform === "win32" && arch === "x64") {
	execSync("npm install @rollup/rollup-win32-x64 --no-save");
} else {
	// eslint-disable-next-line no-console
	console.log(`No native binary needed for ${platform}-${arch}`);
}
