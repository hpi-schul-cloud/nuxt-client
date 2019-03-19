<template>
	<audio controls>
		<source
			src="https://html5tutorial.info/media/vincent.mp3"
			type="audio/ogg"
		/>
		<source
			src="https://html5tutorial.info/media/vincent.mp3"
			type="audio/mpeg"
		/>Your browser does not support the audio element.
	</audio>
</template>
<script>
export default {
	name: "BaseAudio",
	props: {
		src: String,
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
</style>
