<template>
	<base href="/" />
	<main class="main-container">
		<form class="search-form" :onsubmit="onSubmit">
			<input
				name="searchString"
				class="search-input"
				type="text"
				placeholder="Search"
			/>
		</form>
		<edu-sharing-app />
	</main>
</template>

<script>
export default {
	name: "EduSharingApp",
	components: {},
	mounted() {
		// Provide the backend URL for edu-sharing.
		//
		// For testing with development builds use '/edu-sharing/rest' for a proxy to the URL
		// configured the `.env` file.
		//
		window.__env = {
			// EDU_SHARING_API_URL: "/edu-sharing/rest",
			EDU_SHARING_API_URL:
				"https://repo.test.mediathek.dev.dbildungsplattform.de/edu-sharing/rest",
		};

		const runtime = document.createElement("script");
		runtime.setAttribute(
			"src",
			process.env.BASE_URL + "vendor/edu-sharing/runtime.js"
		);
		runtime.setAttribute("type", "module");
		document.body.appendChild(runtime);

		const polyfills = document.createElement("script");
		polyfills.setAttribute(
			"src",
			process.env.BASE_URL + "vendor/edu-sharing/polyfills.js"
		);
		polyfills.setAttribute("type", "module");
		document.body.appendChild(polyfills);

		// <!-- Alternatively to loading `scripts.js`, provide your own versions of jQuery.  -->
		const scripts = document.createElement("script");
		scripts.setAttribute(
			"src",
			process.env.BASE_URL + "vendor/edu-sharing/scripts.js"
		);
		scripts.setAttribute("defer", "");
		document.body.appendChild(scripts);

		const main = document.createElement("script");
		main.setAttribute(
			"src",
			process.env.BASE_URL + "vendor/edu-sharing/main.js"
		);
		main.setAttribute("type", "module");
		document.body.appendChild(main);

		//   <!-- Only for dev builds. Could also set `vendorChunk: false` in `angular.json` to omit altogether. -->
		const vendor = document.createElement("script");
		vendor.setAttribute(
			"src",
			process.env.BASE_URL + "vendor/edu-sharing/vendor.js"
		);
		vendor.setAttribute("type", "module");
		document.body.appendChild(vendor);

		const styles = document.createElement("link");
		styles.setAttribute(
			"href",
			process.env.BASE_URL + "vendor/edu-sharing/styles.css"
		);
		styles.setAttribute("rel", "stylesheet");
		document.body.appendChild(styles);
	},
	methods: {
		onSubmit(event) {
			event.preventDefault();
			const data = new FormData(event.target);
			const searchString = data.get("searchString");
			const eduSharingApp = document.getElementsByTagName("edu-sharing-app")[0];
			eduSharingApp.setAttribute("search-string", searchString);
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container {
	min-height: 0;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	gap: 20px;
}
.search-form {
	flex-shrink: 0;
}
edu-sharing-app {
	flex-grow: 1;
}
</style>
