#!/usr/bin/env node

const arg = require("arg");
const { exec } = require("child_process");
const { log, error } = console;

// by default, run this script against the server
const DEFAULT_URL = "http://localhost:3030/api/v3/docs-json/";
const DEFAULT_PATH = "src/serverApi/v3";

const args = arg(
	{
		"--help": Boolean,
		"-h": "--help",

		"--url": String,
		"-u": "--url",

		"--path": String,
		"-p": "--path",

		"--config": String,
		"-c": "--config",
	},
	{
		argv: process.argv.slice(2),
	}
);

if ("--help" in args) {
	log(`Usage: node generate-client.js [opts]
OPTIONS:
	--help (-h)		Show this help.
	--path (-p)		Path to the newly created client's directory.
                        default: ${DEFAULT_PATH}
	--url (-u)		URL/path to the spec file in yml/json format.
                        default: ${DEFAULT_URL}
	--config (-c)	path to the additional-properties config file in yml/json format
`);
	process.exit(0);
}

const params = {
	/** url to load the open-api definition from */
	url: args._[0] || args["--url"] || DEFAULT_URL,
	/** folder to save the open-api client */
	path: args._[1] || args["--path"] || DEFAULT_PATH,

	config: args._[2] || args["--config"] || "",
};

const errorMessageContains = (includedString, error) => {
	return (
		error &&
		error.message &&
		typeof error.message === "string" &&
		error.message.includes(includedString)
	);
};

const generateClient = () => {
	const cmd = getOpenApiCommand(params);
	log(
		`Try updating the openapi client in the folder ${params.path} from ${params.url} ...`
	);
	asyncExec(cmd)
		.then((stdout) => log(stdout))
		.catch((stderr) => {
			if (errorMessageContains("ConnectException", stderr)) {
				error(
					`Failed to connect to ${params.url}, is the server started at this url?`
				);
			} else error(stderr.message);
		});
};

const getOpenApiCommand = (params) => {
	const { url, path, config } = params;
	const configFile = config ? `-c ${config}` : "";
	const command = `openapi-generator-cli generate -i ${url} -g typescript-axios -o ${path} ${configFile} --skip-validate-spec`;

	return command;
};

const asyncExec = (command) =>
	new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				return reject(error);
			}
			return resolve(stdout || stderr);
		});
	});

const main = () => {
	generateClient();
};

main();
