const express = require("express");
const session = require("express-session");
const consola = require("consola");
const path = require("path");
const handlebars = require("handlebars");
const layouts = require("handlebars-layouts");
const handlebarsWax = require("handlebars-wax");
const { Nuxt, Builder } = require("nuxt");
const app = express();
const themeName = process.env.SC_THEME || "default";

const sessionStore = new session.MemoryStore();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(
	session({
		cookie: { maxAge: 60000 },
		store: sessionStore,
		saveUninitialized: true,
		resave: "true",
		secret: "secret",
	})
);

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 4000;

// Set this path to the legacy schulcloud-client
const legacyClientRoot = path.join(__dirname, "../legacy-client");

const handlebarsHelper = require(path.join(
	legacyClientRoot,
	"./helpers/handlebars"
));

app.use(handlebarsHelper.middleware);

// console.log(path.join(legacyClientRoot, './helpers/handlebars'))
const wax = handlebarsWax(handlebars)
	.partials(path.join(legacyClientRoot, "./views/**/*.{hbs,js}"))
	.helpers(layouts)
	.helpers(handlebarsHelper.helpers);

wax.partials(
	path.join(legacyClientRoot, `./theme/${themeName}/views/**/*.{hbs,js}`)
);

const viewDirs = [path.join(legacyClientRoot, "./views")];
viewDirs.unshift(path.join(legacyClientRoot, `./theme/${themeName}/views/`));

app.set("views", viewDirs);
app.engine("hbs", wax.engine);
app.set("view engine", "hbs");
app.use(express.static(path.join(legacyClientRoot, "./build/" + themeName)));
app.set("port", port);

// Import and Set Nuxt.js options
let config = require("../../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

// The legacy routings go here
setLegacyControllers([
	"about",
	"account",
	"administration",
	"calendar",
	"community",
	"content",
	"coursegroups",
	"courses",
	"dashboard",
	"files",
	"firstLogin",
	"help",
	"helpdesk",
	"homework",
	{
		route: "files",
		controller: "files",
	},
	{
		route: "impressum",
		controller: "imprint",
	},
	"imprint",
	"index",
	"link",
	"login",
	"logs",
	"my-material",
	"news",
	"notification",
	"partner",
	"pwrecovery",
	"registration",
	"rocketChat",
	"schools",
	"team",
	"teams",
	"tools",
	"topics",
	"users",
	"welcome",
]);

function setLegacyControllers(names) {
	for (const name of names) {
		if (typeof name === "object") {
			app.use(
				`/${name.route}/`,
				require(path.join(legacyClientRoot, `./controllers/${name.controller}`))
			);
		} else {
			app.use(
				`/${name}/`,
				require(path.join(legacyClientRoot, `./controllers/${name}`))
			);
		}
	}
}

async function start() {
	// Init Nuxt.js
	const nuxt = new Nuxt(config);

	// Build only in dev mode
	if (config.dev) {
		const builder = new Builder(nuxt);
		await builder.build();
	}

	// Give nuxt middleware to express
	app.use(nuxt.render);

	// Listen the server
	app.listen(port, host);

	// eslint-disable-next-line no-console
	consola.ready({
		message: `Server listening on http://${host}:${port}`,
		badge: true,
	});
}
start();
