import childProcess from "child_process";
import buildDefines from "../buildDefines";

export default function metadata(rest) {
	return {
		// this name will show up in warnings and errors
		name: "rollup-plugin-metadata",
		writeBundle: (options) => {
			const metadata = {
				...buildDefines(),
				...rest,
			};

			// save metadata as file
			childProcess.execSync(
				`echo ${JSON.stringify(metadata)} > ${options.dir}/build.txt`
			);
		},
	};
}
