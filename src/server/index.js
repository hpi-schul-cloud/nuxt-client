/* eslint-disable */

const express = require("express");
const session = require("express-session");
const consola = require("consola");
const path = require("path");
const bodyParser = require("body-parser");
const compression = require("compression");
const handlebars = require("handlebars");
const layouts = require("handlebars-layouts");
const handlebarsWax = require("handlebars-wax");

// Init Nuxt.js
const { Nuxt, Builder } = require("nuxt");
// Import and Set Nuxt.js options
const config = require("../../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

const app = express();
const legacyRoutes = require("./routes");
const themeName = process.env.SC_THEME || "default";

const sessionStore = new session.MemoryStore();
const cookieParser = require("cookie-parser");

app.use(compression());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(cookieParser());

app.use(
	session({
		cookie: {
			maxAge: 60000,
		},
		store: sessionStore,
		saveUninitialized: true,
		resave: "true",
		secret: "secret",
	})
);

const host = process.env.HOST || "localhost";
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

app.use(require(path.join(legacyClientRoot, `./controllers/login`)));
app.use(require(path.join(legacyClientRoot, `./controllers/registration`)));

function setLegacyControllers() {
	for (const route of legacyRoutes) {
		if (typeof route === "object") {
			app.use(
				`/${route.route}/`,
				require(path.join(
					legacyClientRoot,
					`./controllers/${route.controller}`
				))
			);

			if (route.routesExcluded) {
				excludeRoutes(route.route, route.routesExcluded);
			}
		} else {
			app.use(
				`/${route}/`,
				require(path.join(legacyClientRoot, `./controllers/${route}`))
			);
		}
	}
}

function excludeRoutes(controllerName, routesToExclude) {
	app._router.stack.forEach((route) => {
		const xp = route.regexp.toString();

		if (xp.includes(controllerName)) {
			let idx = app._router.stack.indexOf(route);
			route.handle.stack.forEach((layer) => {
				if (
					layer.route &&
					routesToExclude.includes(layer.route.path) &&
					(layer.route.methods._all || layer.route.methods.get)
				) {
					idx = route.handle.stack.indexOf(layer);
					route.handle.stack.splice(idx, 1);
				}
			});
		}
	});
}

// The legacy routings go here
setLegacyControllers();

async function start() {
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

	consola.ready({
		message: `Server listening on http://${host}:${port}`,
		badge: true,
	});
}
start();
