// If it's a private page and there's no payload, redirect.
export default function(context) {
	const { store, redirect, route } = context;
	const { auth } = store.state;

	if (
		auth &&
		auth.publicPages &&
		!auth.publicPages.includes(route.name) &&
		!auth.payload
	) {
		return redirect("/login");
	}
}
