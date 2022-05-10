export default function (req, res, next) {
	const redirects = [];

	const redirect = redirects.find((r) => req.url.match(r.from));

	if (redirect) {
		res.writeHead(301, { Location: redirect.to });
		res.end();
	} else {
		next();
	}
}
