<template>
	<iframe
		v-if="!loading"
		:src="iframeSrc"
		class="player-iframe"
		allowfullscreen="allowfullscreen"
		frameborder="0"
		scrolling="no"
		@load="setIsIFrameLoading"
	></iframe>
	<base-spinner v-else class="spinner" size="xlarge"/>
	<!--
						v-if="isIFrameLoading"
						<v-progress-circular
						v-else
						class="loading"
						:size="150"
						indeterminate
					></v-progress-circular> -->
</template>

<script
	:src="scriptSrc"
	charset="UTF-8"
></script>

<script>
import BaseSpinner from "@components/base/BaseSpinner";

export default {
	components: {
		BaseSpinner
	},
	props: {
		nodeId: String,
	},
	data() {
		return {
			loading: true,
			iframeSrc: '',
			scriptSrc: ''
		};
	},
	async mounted() {
		await this.getPlayer();
	},
	methods: {
		async getPlayer() {
			console.log('getPlayer()', 'id =', this.nodeId);
			this.iframeSrc, this.scriptSrc = await this.$axios.$get(`/v1/edu-sharing/player/${this.nodeId}`);
			this.loading = false;
		}
	}
}
</script>

<style>
</style>
