export default function (req, res, next) {
	const redirects = [
		{
			from: "/homework/",
			to: "/homework/overview",
		},
		{
			from: "/homework/asked/",
			to: "/homework/overview",
		},
		{
			from: "/homework/private/",
			to: "/homework/overview",
		},
		{
			from: "/homework/archive/",
			to: "/homework/overview",
		},
		{
			from: "/tasks/assigned",
			to: "/homework/overview",
		},
		{
			from: "/tasks/open",
			to: "/homework/overview",
		},
	];

	console.log(req.url);
	const redirect = redirects.find((r) => r.from === req.url);
	console.log(redirect);
	/* const redirect = redirects.find(
		(r) => req.url.match(r.from) && req.url !== r.to
	); */
	if (redirect) {
		res.writeHead(301, { Location: redirect.to });
		res.end();
	} else {
		next();
	}
}
