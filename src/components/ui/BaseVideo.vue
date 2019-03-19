<template>
	<video-player :configuration="JSON.stringify($props)"></video-player>
</template>

<script>
import "./video-player-helper";
import "video-player";

export default {
	props: {
		streams: {
			type: Array,
			required: true,
		},
		fallbackStream: {
			type: Object,
			required: false,
		},
		language: {
			type: String,
			required: false,
		},
		initialState: {
			type: Object,
			required: false,
		},
		userPreferences: {
			type: Object,
		},
		foregroundColor: {
			type: String,
		},
		accentColor: {
			type: String,
		},
		fontColorOnAccentColor: {
			type: String,
		},
		backgroundColor: {
			type: String,
		},
		secondaryBackgroundColor: {
			type: String,
		},
		theme: {
			type: String,
		},
		videoPreload: {
			type: Boolean,
		},
		trimVideo: {
			type: Object,
		},
		chapters: {
			type: Array,
		},
		captions: {
			type: Array,
		},
		slides: {
			type: Array,
		},
		quiz: {
			type: Array,
		},
		relatedVideos: {
			type: Array,
		},
		playlist: {
			type: Object,
		},
		videoObject: {
			type: Object,
		},
		liveDvr: {
			type: Boolean,
		},
		positionInUrlFragment: {
			type: Boolean,
		},
		mobileMenu: {
			type: Boolean,
		},
		noteApi: {
			type: String,
		},
		downloadUri: {
			type: String,
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
</style>
