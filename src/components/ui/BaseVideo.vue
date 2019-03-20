<template>
	<video-player :configuration="configurationString"></video-player>
</template>

<script>
import "./video-player-helper";
import "video-player";

export default {
	props: {
		configuration: {
			type: Object,
			required: true,
		},
	},
	computed: {
		configurationString() {
			return JSON.stringify(this.configuration);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
</style>
