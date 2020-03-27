const path = require("path");

const universalPath = (p) => path.normalize(p);
const codeRootDir = universalPath("src/");
const snapshotRootDir = universalPath("tests/unit/__snapshots__/");

// all snapshots should be located at snapshotRootDir

module.exports = {
	testPathForConsistencyCheck: universalPath("src/mixins/print.unit.js"),

	/** resolves from test to snapshot path */
	resolveSnapshotPath: (testPath, snapshotExtension) => {
		const snapshotPath =
			universalPath(testPath).replace(codeRootDir, snapshotRootDir) +
			snapshotExtension;
		return snapshotPath;
	},

	/** resolves from snapshot to test path */
	resolveTestPath: (snapshotFilePath, snapshotExtension) => {
		const testPath = universalPath(snapshotFilePath)
			.replace(snapshotRootDir, codeRootDir)
			.slice(0, -snapshotExtension.length);
		return testPath;
	},
};
