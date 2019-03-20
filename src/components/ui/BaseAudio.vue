<template>
	<audio controls>
		<source
			v-for="src in sources"
			:key="src"
			:src="src"
			:type="getType(src)"
		/>Your browser does not support the audio element.
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
		src: {
			type: [String, Array],
			required: true,
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
