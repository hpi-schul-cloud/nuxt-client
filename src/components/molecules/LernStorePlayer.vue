<template>
	<iframe
		v-if="!loading"
		:src="iframeSrc"
		class="player-iframe"
		allowfullscreen="allowfullscreen"
		frameborder="0"
		scrolling="yes"
	></iframe>
	<div v-else class="d-flex justify-center align-center min-height-screen">
		<v-progress-circular indeterminate color="secondary" size="115" />
	</div>
</template>

<script :src="scriptSrc" charset="UTF-8"></script>

<script>
export default {
	components: {},
	props: {
		nodeId: String,
	},
	data() {
		return {
			loading: true,
			iframeSrc: "",
			scriptSrc: "",
		};
	},
	async mounted() {
		await this.getPlayer();
	},
	methods: {
		async getPlayer() {
			await this.$axios
				.get(`/v1/edu-sharing/player/${this.nodeId}`)
				.then(
					(response) => (
						(this.iframeSrc = response.data.iframe_src),
						(this.scriptSrc = response.data.script_src)
					)
				);
			console.log("iframeSrc: " + this.iframeSrc);
			console.log("scriptSrc: " + this.scriptSrc);
			this.loading = false;
		},
	},
};
</script>

<style>
.spinner {
	top: 0 !important;
}

.player-iframe {
	width: 100%;
	border: none;
}
</style>
