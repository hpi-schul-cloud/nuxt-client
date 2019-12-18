#! /usr/bin/env node

/* eslint-disable no-console */

const { exec } = require("child_process");
const stripAnsi = require("strip-ansi");

const myArgs = process.argv.slice(2);
const DATE_REGEX = new RegExp(myArgs[0] || "[2-9]+ months ago", "i");

function executeCmd(command) {
	return new Promise((resolve, reject) => {
		exec(command, function(error, stdout) {
			error
				? reject(stripAnsi(error).trim())
				: resolve(stripAnsi(stdout).trim());
		});
	});
}

async function getDeploys() {
	const OUTPUT = await executeCmd("surge list");
	const LINES = stripAnsi(OUTPUT)
		.trim()
		.split("\n")
		.map((l) => l.trim());
	const DEPLOYS = LINES.map((line) => {
		deploy = line.split("  ").map((a) => a.trim());
		const [id, domain] = deploy[0].split(" ");
		const [, timestamp, provider, host, plan] = deploy;
		return {
			id,
			domain,
			timestamp,
			provider,
			host,
			plan,
		};
	});
	return DEPLOYS;
}

async function teardownProject(domain) {
	return executeCmd(`surge teardown ${domain}`);
}

async function teardown() {
	const deploys = await getDeploys();
	const toTearDown = deploys.filter((deploy) =>
		deploy.timestamp.match(DATE_REGEX)
	);
	console.log(`search for projects with matching date ${DATE_REGEX}`);
	console.log(`found ${toTearDown.length} projects for teardown`);
	Promise.all(
		toTearDown.map((project) => {
			console.log(
				"teardown",
				project.domain,
				`(lastly updated ${project.timestamp})`
			);
			teardownProject(project.domain)
				.then(() => {
					console.log("removed", project.domain);
				})
				.catch(console.error);
		})
	);
}
teardown();
