<template>
	<div class="profilePicture">
		<img v-if="image" :src="image" class="borderradius" :class="size" />
	</div>
</template>
<script>
export default {
	props: {
		image: {
			type: String,
			required: true,
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
	transition: box-shadow $duration-animation-medium;
}

.borderradius {
	border-radius: 50%;
}
.small {
	width: 64px;
	height: 64px;
}
.medium {
	width: 128px;
	height: 128px;
}
.large {
	width: 256px;
	height: 256px;
}
</style>
