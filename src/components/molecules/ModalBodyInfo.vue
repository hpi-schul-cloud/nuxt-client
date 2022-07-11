<template>
	<div class="body-container">
		<div class="icon">
			<slot name="icon"></slot>
		</div>
		<h1 class="h4 modal-title">
			<slot name="title">
				{{ title }}
			</slot>
		</h1>
		<p class="modal-description">
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
	data() {
		// This solely exists to appear in the coverage report
		return {};
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

	.modal-title {
		margin: 0;
	}

	.modal-description {
		margin-top: var(--space-md);
	}
}
</style>
