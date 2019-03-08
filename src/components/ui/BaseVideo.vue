
<template>
  <video-player :configuration="JSON.stringify(configuration)"></video-player>
</template>

<script>
import "./video-player-helper";
import "video-player";

export default {
	props: {
		streams: Array,
	},
	computed: {
		configuration() {
			return {
				streams: this.streams,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
</style>
