<template>
	<div class="profilePicture">
		<img :src="image" class="borderradius" :class="size" />
	</div>
</template>
<script>
export default {
	name: "BaseProfilePicture",
	props: {
		image: {
			type: String,
			default:
				"https://avataaars.io/?avatarStyle=Circle&topType=LongHairBun&accessoriesType=Round&hairColor=BlondeGolden&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=Hoodie&clotheColor=Heather&eyeType=Squint&eyebrowType=UpDown&mouthType=Smile&skinColor=Pale",
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
