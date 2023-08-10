<template>
	<div class="d-flex flex-column">
		<p>TLDRAW</p>
		<a :href="`http://localhost:3046/${$route.params.id}`" target="_blank">
			NEW WINDOW
		</a>
		<iframe
			v-if="tldrawServerURL"
			:src="tldrawServerURL"
			width="600px"
			height="600px"
		></iframe>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tldrawServerURL: null,
		};
	},
	created() {
		this.fetchTldrawServerURL();
	},
	methods: {
		async fetchTldrawServerURL() {
			try {
				const response = await fetch(
					`${window.location.origin}/tldraw-client-runtime.config.json`
				);
				const data = await response.json();
				if (data.tldrawServerURL) {
					this.tldrawServerURL = data.tldrawServerURL;
				}
			} catch (error) {
				console.error("Error fetching tldrawServerURL:", error);
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
