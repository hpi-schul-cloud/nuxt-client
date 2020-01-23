<template>
	<div class="base">
		<div class="container">
			<div class="img-container">
				<img :src="image" :alt="alt" class="image" />
			</div>
			<div class="description">
				<slot name="description" />
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		image: {
			type: String,
			required: true,
		},
		alt: {
			type: String,
			required: true
		}
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.base {
	display: flex;
	justify-content: center;
}

.container {
	width: var(--size-content-width-min);
}

.img-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.description {
	margin-top: var(--space-md);
	font-size: var(--text-sm);
	color: var(--color-gray);
	text-align: center;
}

.image {
	width: 70%;
}
</style>
