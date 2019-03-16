/* eslint-disable no-console */

const crawler = require("npm-license-crawler");
const licenses = require("./compatible-licenses.js");
const pkg = require("./package.json");
const colors = require("colors");

// SETUP

const scanOptions = {
	start: ["."],
	production: true,
	onlyDirectDependencies: true,
};

// HELPER METHODS

function licenseCategory(license) {
	return licenses.hierarchie.find((category) =>
		licenses.licenses[category].includes(license)
	);
}

function compatibleLicenses(license) {
	const category = licenseCategory(license);
	categoryHierarchieIndex = licenses.hierarchie.indexOf(category);
	return Object.keys(licenses.licenses)
		.filter((category, index) => index <= categoryHierarchieIndex)
		.reduce((list, category) => list.concat(licenses.licenses[category]), []);
}

function isCompatible(license) {
	return compatibleLicenses(pkg.license).includes(
		license.replace(/[\(\)]/, "").trim()
	);
}

// SCAN & CHECK

crawler.dumpLicenses(scanOptions, function(error, dependencies) {
	if (error) {
		console.error(error);
		return;
	}

	const incompatibleDependencies = Object.keys(dependencies).filter(
		(dependency) => {
			const licenses = dependencies[dependency].licenses;
			if (licenses.includes("AND")) {
				return !licenses.split(/AND/).every(isCompatible);
			}
			if (licenses.includes("OR")) {
				return !licenses.split(/OR/).some(isCompatible);
			}
			return !isCompatible(licenses);
		}
	);

	// LOG RESULT
	console.log(`\nYour package-license: ${pkg.license}`);
	console.log("Checking dependency licenses for compatibility...\n");

	if (incompatibleDependencies.length !== 0) {
		incompatibleDependencies.forEach((dependency) => {
			console.error(
				colors.red(
					`❌\tThe License ("${
						dependencies[dependency].licenses
					}") of ${dependency} is incompatible.`
				)
			);
		});
		process.exit(1);
	} else {
		console.log(
			colors.green(
				`✅\tAll dependency licenses seem to be compatible with "${
					pkg.license
				}".`
			)
		);
	}
});
