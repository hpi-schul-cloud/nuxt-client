export default function ({ $axios, store }) {
	$axios.onRequest((config) => {
		if (store.state.auth.accessToken) {
			config.headers.common["Authorization"] =
				"Bearer " + store.state.auth.accessToken;
		}
	});
}
