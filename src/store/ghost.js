import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
	url: "https://headless.hpi-schul-cloud.de",
	key: "dbb2b07bb370c4264bbadebbc1",
	version: "v2",
});

const module = {
	actions: {
		async getSinglePost(postSlug) {
			return await api.posts.read({
				slug: postSlug,
			});
		},
		async getPosts() {
			return await api.posts.browse({
				limit: "all",
			});
		},
		async getSinglePage(ctx, pageSlug) {
			return await api.pages.read({
				slug: pageSlug,
			});
		},
		async getPages() {
			return await api.pages.browse({
				limit: "all",
			});
		},
	},
};

export default module;
