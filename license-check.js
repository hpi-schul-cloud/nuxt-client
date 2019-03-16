/* eslint-disable no-console */

const crawler = require("npm-license-crawler");
const allowedLicenses = require("./compatible-licenses.js");
const pkg = require("./package.json");
const colors = require("colors");

const options = {
	start: ["."],
	production: true,
	onlyDirectDependencies: true,
};

const allowedLicensesList = Object.values(allowedLicenses).reduce(
	(list, licenses) => list.concat(licenses),
	[]
);

function isCompatible(license) {
	return allowedLicensesList.includes(license.replace(/[\(\)]/, "").trim());
}

console.log("Checking dependency-licenses for compatibility...");
crawler.dumpLicenses(options, function(error, dependencies) {
	if (error) {
		console.error(error);
		return;
	}

	const incompatibleDependencies = Object.keys(dependencies).filter(
		(dependency) => {
			const licenses = dependencies[dependency].licenses;
			/*
			if (licenses.includes("AND")) {
				return !licenses.split(/AND/).every(isCompatible);
			}
			if (licenses.includes("OR")) {
				return !licenses.split(/OR/).some(isCompatible);
			}
			*/
			return !isCompatible(licenses);
		}
	);

	if (incompatibleDependencies.length !== 0) {
		incompatibleDependencies.forEach((dependency) => {
			console.error(
				colors.red(
					`The License ("${
						dependencies[dependency].licenses
					}") of ${dependency} is incompatible with ${pkg.license}`
				)
			);
		});
	} else {
		console.error(
			colors.green(
				`All dependency licenses seem to be compatible with ${pkg.license}.`
			)
		);
	}
});
