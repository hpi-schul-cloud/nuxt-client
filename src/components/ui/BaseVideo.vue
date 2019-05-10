<template>
	<video v-bind="attributes" :preload="preload" v-on="$listeners">
		<source
			v-for="source in sources"
			:key="source.type"
			:src="source.src"
			:type="source.type"
		/>
		<track
			v-for="track in tracks"
			:key="track.type"
			:src="track.src"
			:kind="track.kind"
			:srclang="track.srclang"
			:label="track.label"
		/>
		Your browser does not support the video tag. Please Update.
	</video>
</template>

<script>
export default {
	props: {
		sources: {
			type: Array,
			required: true,
			validator: (sources) =>
				sources.length && sources.every((source) => source.src && source.type),
		},
		tracks: {
			type: Array,
			default: () => [],
			validator: (tracks) =>
				tracks.every(
					(track) => track.src && track.kind && track.srclang && track.label
				),
		},
		preload: {
			type: String,
			default: "metadata",
		},
		noControls: {
			type: Boolean,
		},
	},
	computed: {
		attributes() {
			return this.noControls ? this.$attrs : { controls: true, ...this.$attrs };
		},
	},
};
</script>
