# How to make fallback routes to the old client?

This project is running in a parallel mode with the old client:

[https://github.com/schul-cloud/schulcloud-client](https://github.com/schul-cloud/schulcloud-client)

This client is located in `src/legacy-client` and represents the `master` branch of the client.

## Creating a fallback

You have the possibility to include controllers from the old client in this file:

`./src/server/routes`

## Basic fallback

If you just want to include an controller, which has also the same /route/ as the controller name, simply put the name as a string:

Example:

```js
	"courses",
	"dashboard",
	"files",
```

## Custom Route and Controller Name

If on the other hand you have a custom route name, provide the controller and route name extra:

Example:

```js
	{
		route: "impressum",
		controller: "imprint",
	}
```

## Exclude specific routes

So if you want to exclude speficic routes, you can do this with the `routesExcluded` attribute. It only supports GET routes because these are the routes we want to have for a fallback.

The route strings you can get directly from the controller.

Example:

```js
	{
		route: "teams",
		controller: "teams",
		routesExcluded: ["/:teamId/members"],
	},
```

The controller is located here. `src/legacy-client/controllers/teams.js`

The excluded route is taken from this file on line `754`:

```js
router.get('/:teamId/members', async (req, res, next) => {
	const action = `/teams/${req.params.teamId}`;
	const { teamId } = req.params;
```

Just enter the route 1-to-1 in the `routesExcluded` array.
