<template>
	<div class="body-container">
		<div class="icon">
			<slot name="icon" />
		</div>
		<h1 class="ma-0">
			<slot name="title">
				{{ title }}
			</slot>
		</h1>
		<p class="mt-4">
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
	display: inline-block;
	width: 1em;
	height: 1em;
	vertical-align: baseline;
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
}
</style>
