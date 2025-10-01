import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
	url: "https://headless.hpi-schul-cloud.de",
	key: "dbb2b07bb370c4264bbadebbc1",
	version: "v2",
});

const module = {
	actions: {
		async getSinglePost({ commit }, postSlug) {
			const post = await api.posts.read({
				slug: postSlug,
			});
			commit("setCurrentPost", post);
		},
		async getPosts({ commit }) {
			const posts = await api.posts.browse({
				limit: "all",
			});
			commit("setPosts", posts);
		},
		async getSinglePage({ commit }, pageSlug) {
			const page = await api.pages.read({
				slug: pageSlug,
			});
			commit("setCurrentPage", page);
		},
		async getPages({ commit }) {
			const pages = await api.pages.browse({
				limit: "all",
			});
			commit("setPages", pages);
		},
	},
	mutations: {
		setPosts(state, payload) {
			state.posts = payload;
		},
		setCurrentPost(state, payload) {
			state.currentPost = payload;
		},
		setPages(state, payload) {
			state.pages = payload;
		},
		setCurrentPage(state, payload) {
			state.currentPage = payload;
		},
	},
	getters: {
		getCurrentPage(state) {
			return state.currentPage;
		},
	},
	state: () => ({
		posts: [],
		currentPost: {},
		pages: [],
		currentPage: {},
	}),
};

export default module;
