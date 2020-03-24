<template>
<audio controls v-bind="$attrs">
<source
v-for="streamsrc in sources"
:key="streamsrc"
:src="streamsrc"
:type="getType(streamsrc)"
/>
<p>
Your browser does not support the audio element. Here is a
<a :href="streamsrc">link to the audio</a> instead.
</p>
</audio>
</template>
<script>
const KNOWN_TYPES = {
	mp3: "audio/mpeg",
	ogg: "audio/ogg",
	wav: "audio/wav",
};
export default {
	props: {
		/**
		 * url
		 */
		src: {
			type: [String, Array],
			required: true,
			// TODO validate that type is unique
		},
	},
	computed: {
		sources() {
			return Array.isArray(this.src) ? this.src : [this.src];
		},
	},
	methods: {
		getType(src) {
			const [ext] = src.split(".").reverse();
			return KNOWN_TYPES[ext];
		},
	},
};
</script>
