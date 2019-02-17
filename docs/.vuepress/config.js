const baseDir = "./docs";
const { lstatSync, readdirSync } = require("fs");
const { join } = require("path");
const _ = require("lodash");

const blacklist = [".vuepress"];

function extractName(filepath) {
	const isFile = filepath.includes(".md");
	let name = "";
	if (isFile) {
		name = filepath.replace(/^.*[\\\/]/, "").replace(".md", "");
	} else {
		name = filepath.replace(/^.*[\\\/]/, "");
	}
	name = name.replace(/[0-9]+/, "");
	return _.startCase(name);
}

const isDirectory = (source) => lstatSync(source).isDirectory();
function listFiles(dir) {
	let files = [];
	readdirSync(dir)
		.sort((a, b) => {
			return a.toUpperCase().localeCompare(b.toUpperCase());
		})
		.forEach((file) => {
			if (blacklist.includes(file)) {
				return;
			}

			const filepath = join(dir, file).replace(join(baseDir), "");
			if (isDirectory(join(dir, file))) {
				files.push({
					title: extractName(filepath),
					children: listFiles(join(dir, file)),
					collapsable: false,
				});
			} else if (filepath.includes(".md") && !filepath.includes("README")) {
				const cleanFilepath = filepath
					.replace(/\\/g, "/")
					.replace("README.md", "");
				files.push([cleanFilepath, extractName(filepath)]);
			}
		});
	return files;
}

module.exports = {
	title: "SC-Nuxt-Client Docs",
	description: "documentation",
	themeConfig: {
		sidebar: listFiles(baseDir),
	},
	configureWebpack: {
		resolve: {
			alias: require("../../aliases.config").webpack,
		},
	},
	permalink: "/:year/:month/:day/:slug",
	markdown: {
		lineNumbers: true,
		anchor: { permalink: true },
		toc: { includeLevel: [2] },
	},
};
