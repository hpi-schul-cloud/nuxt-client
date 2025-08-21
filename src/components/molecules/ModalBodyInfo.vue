<template>
	<div class="body-container">
		<div class="icon">
			<slot name="icon" />
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

<script setup lang="ts">
type Props = {
	title?: string;
	description?: string;
};

withDefaults(defineProps<Props>(), {
	title: "",
	description: "",
});
</script>

<style lang="scss" scoped>
.icon {
	font-size: 60px;
	margin-bottom: 16px;
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
		margin-top: 16px;
	}
}
</style>
