<template>
	<video-player :configuration="configurationString"></video-player>
</template>

<script>
import "./video-player-helper";
import "video-player";

export default {
	props: {
		/**
		 * Documentation: https://github.com/openHPI/video-player/blob/master/docs/configuration.md
		 */
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
