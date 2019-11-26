import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
	url: "https://headless.schul-cloud.org",
	key: "dbb2b07bb370c4264bbadebbc1",
	version: "v2",
});

const module = {
	actions: {
		async getSinglePost(postSlug) {
			return await api.posts
				.read({
					slug: postSlug,
				})
				.catch((err) => {
					console.error(err);
				});
		},
		async getPosts() {
			return await api.posts
				.browse({
					limit: "all",
				})
				.catch((err) => {
					console.error(err);
				});
		},
		async getSinglePage(ctx, pageSlug) {
			return await api.pages
				.read({
					slug: pageSlug,
				})
				.catch((err) => {
					console.error(err);
				});
		},
		async getPages() {
			return await api.pages
				.browse({
					limit: "all",
				})
				.catch((err) => {
					console.error(err);
				});
		},
	},
};

export default module;
