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
	title: "Nuxt-Client Docs",
	port: "4002",
	description: "documentation",
	themeConfig: {
		// https://vuepress.vuejs.org/default-theme-config/
		sidebar: listFiles(baseDir),
		logo: "/cloud-transparent.png",
		lastUpdated: "Last Updated",
		repo: "schul-cloud/nuxt-client",
		docsDir: "/docs",
		editLinks: true,
		editLinkText: "Improve this page!",
		algolia: {
			apiKey: process.env.ALGOLIA_API_KEY,
			indexName: process.env.ALGOLIA_NAME,
		},
	},
	plugins: {
		"@vuepress/pwa": {
			serviceWorker: true,
			updatePopup: true,
		},
	},
	configureWebpack: {
		resolve: {
			alias: require("../../aliases.config").webpack,
		},
	},
	extendMarkdown: {
		lineNumbers: true,
		toc: { includeLevel: [2, 3] },
	},
	evergreen: true, // https://vuepress.vuejs.org/config/#evergreen
};
