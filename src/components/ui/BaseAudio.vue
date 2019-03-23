<template>
	<audio controls :loop="loop" :autoplay="autoplay" :preload="preload">
		<source v-for="src in sources" :key="src" :src="src" :type="getType(src)" />
		<p>
			Your browser does not support the audio element. Here is a
			<a :href="src">link to the audio</a> instead
		</p>
	</audio>
</template>
<script>
const KNOWN_TYPES = Object.assign(Object.create(null), {
	mp3: "audio/mpeg",
	ogg: "audio/ogg",
	wav: "audio/wav",
});
export default {
	name: "BaseAudio",
	props: {
		/**
		 * url
		 */
		src: {
			type: [String, Array],
			required: true,
		},
		autoplay: {
			type: Boolean,
		},
		loop: {
			type: Boolean,
		},
		/**
		 * none / metadata / auto
		 */
		preload: {
			type: String,
		},
	},
	computed: {
		sources() {
			return Array.isArray(this.src) ? this.src : [this.src];
		},
	},
	methods: {
		getType(src) {
			const ext = src.slice(src.lastIndexOf(".") + 1);
			return KNOWN_TYPES[ext];
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
</style>
