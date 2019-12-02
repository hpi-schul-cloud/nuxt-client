<template>
	<div class="body-container">
		<div class="icon">
			<slot name="icon"></slot>
		</div>
		<!-- eslint-disable-next-line vue/no-v-html -->
		<h1 class="h4" v-html="text" />
	</div>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			default: "",
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.icon {
	font-size: var(--sidebar-item-height);
}
.body-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 220px;
	text-align: center;
}
</style>
