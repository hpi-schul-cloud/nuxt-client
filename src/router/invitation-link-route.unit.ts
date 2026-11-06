import { routes } from "./routes";
import { isVueClient } from "./vue-client-route";
import { createMemoryHistory, createRouter } from "vue-router";

describe("invitation link routing", () => {
	const router = createRouter({
		history: createMemoryHistory(),
		routes: routes.filter((route) => route.name === "rooms-invitation-link-id"),
	});

	it.each(["507f1f77bcf86cd799439011", `Ab0_-${"x".repeat(38)}`])(
		"routes invitation credential %s to the Vue invitation page",
		(credential) => {
			for (const suffix of ["", "/"]) {
				const path = `/rooms/invitation-link/${credential}${suffix}`;
				const resolved = router.resolve(path);

				expect(isVueClient(path)).toBe(true);
				expect(resolved.name).toBe("rooms-invitation-link-id");
				expect(resolved.params.id).toBe(credential);

				const invitationRoute = routes.find((route) => route.name === "rooms-invitation-link-id");
				if (typeof invitationRoute?.props !== "function") {
					throw new Error("Invitation route must map its credential to page props");
				}
				expect(invitationRoute.props({ ...resolved, name: "rooms-invitation-link-id" })).toEqual({
					invitationLinkId: credential,
				});
			}
		}
	);

	it.each(["", "x".repeat(42), "x".repeat(44), `${"x".repeat(42)}!`, `${"x".repeat(43)}/extra`])(
		"does not allow invalid invitation credential %s through the Vue allowlist",
		(credential) => {
			expect(isVueClient(`/rooms/invitation-link/${credential}`)).toBe(false);
		}
	);
});
