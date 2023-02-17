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
	<!--
						v-if="isIFrameLoading"
						<v-progress-circular
						v-else
						class="loading"
						:size="150"
						indeterminate
					></v-progress-circular> -->
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
			const response = await this.$axios.get(
				`/v1/edu-sharing/player/${this.nodeId}`
			);
			this.iframeSrc = response.iframe_src;
			this.scriptSrc = response.script_src;
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
