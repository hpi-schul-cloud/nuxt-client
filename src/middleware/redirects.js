export default function (req, res, next) {
	const redirects = [
		{
			from: /homework\/*/,
			to: "/homework/",
		},
	];
	
	const redirect = redirects.find((r) => req.url.match(r.from) && req.url !== r.to);
	if (redirect) {
		res.writeHead(301, { Location: redirect.to });
		res.end();
	} else {
		next();
	}
}
