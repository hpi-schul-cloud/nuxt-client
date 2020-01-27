<template>
	<div class="body-container">
		<div class="icon">
			<slot name="icon"></slot>
		</div>
		<h1 class="h4">
			<slot name="title">
				{{ title }}
			</slot>
		</h1>
		<p>
			<slot name="description">
				{{ description }}
			</slot>
		</p>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "",
		},
		description: {
			type: String,
			default: "",
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
