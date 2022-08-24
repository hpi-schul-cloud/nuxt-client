import childProcess from "child_process";
import fs from "fs";
import getTheme from "../getTheme";

export default function buildDefines() {
	const usedTheme = getTheme();

	return {
		// "defines.env.APP_VERSION": JSON.stringify(
		// 	childProcess.execSync("./bin/version.sh").toString().replace("\n", "")
		// ),
		"defines.env.THEME": JSON.stringify(usedTheme),
		// "defines.env.THEME_VERSION": JSON.stringify(
		// 	childProcess
		// 		.execSync(
		// 			usedTheme
		// 				? `cd src/themes/${usedTheme} && ../../../bin/version.sh`
		// 				: "./bin/version.sh"
		// 		)
		// 		.toString()
		// 		.replace("\n", "")
		// ),
		"defines.env.COMMIT": JSON.stringify(
			(() => {
				try {
					return childProcess
						.execSync("git rev-parse --short HEAD")
						.toString()
						.replace("\n", "");
				} catch (error) {
					return "no commits available";
				}
			})()
				.toString()
				.replace("\n", "")
		),
		"defines.env.THEME_COMMIT": JSON.stringify(
			(() => {
				try {
					return usedTheme &&
						fs.existsSync(`./src/themes/${usedTheme}/config.json`)
						? childProcess
								.execSync(
									`cd src/themes/${usedTheme} && git rev-parse --short HEAD`
								)
								.toString()
								.replace("\n", "")
						: "";
				} catch (error) {
					return "no commits available";
				}
			})()
				.toString()
				.replace("\n", "")
		),
		"defines.env.BUILD": JSON.stringify(
			(() => {
				try {
					return childProcess
						.execSync(
							`
                  find src -type f -print0 | sort -z | xargs -0 sha1sum | sha1sum
                  `
						)
						.toString()
						.replace(" -", "");
				} catch (error) {
					return error;
				}
			})()
				.toString()
				.replace("\n", "")
		),
		"defines.env.BUILD_DATE": JSON.stringify(new Date()),
	};
}
