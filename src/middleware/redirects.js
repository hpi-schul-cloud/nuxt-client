export default function (req, res, next) {
	const redirects = [
		// {
		// 	from: /\/homework\/?/,
		// 	to: "/tasks",
		// },
		// {
		// 	from: /\/homework\/asked\/?/,
		// 	to: "/tasks",
		// },
		// {
		// 	from: /\/homework\/private\/?/,
		// 	to: "/tasks",
		// },
		// {
		// 	from: /\/homework\/archive\/?/,
		// 	to: "/tasks",
		// },
		{
			from: /\/tasks\/assigned\/?/,
			to: "/tasks",
		},
		{
			from: /\/tasks\/open\/?/,
			to: "/tasks",
		},
	];

	const redirect = redirects.find((r) => req.url.match(r.from));

	if (redirect) {
		res.writeHead(301, { Location: redirect.to });
		res.end();
	} else {
		next();
	}
}
