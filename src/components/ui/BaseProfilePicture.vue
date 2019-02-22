<template>
	<div class="profilePicture">
		<img :src="image" :class="size" />
	</div>
</template>
<script>
export default {
	name: "BaseProfilePicture",
	props: {
		image: {
			type: String,
			default:
				"https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg",
		},
		size: {
			type: String,
			default: "small",
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

img:hover {
	box-shadow: $shadow-5;
	transition: box-shadow 0.3s;
}
.small {
	width: 64px;
	height: 64px;
	border-radius: 32px;
}
.medium {
	width: 128px;
	height: 128px;
	border-radius: 64px;
}
.large {
	width: 256px;
	height: 256px;
	border-radius: 256px;
}
</style>
