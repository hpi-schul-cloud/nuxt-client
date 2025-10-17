<template>
	<v-btn
		v-tooltip="{
			text: label,
			location: 'top',
			disabled: !isLabelTruncated,
			offset: -16,
		}"
		variant="text"
		size="large"
		:height="85"
		:width="125"
	>
		<div class="d-flex flex-column justify-center button-max-width">
			<v-icon size="x-large" class="mx-auto">{{ icon }}</v-icon>
			<span ref="textElement" class="subtitle mt-1 text-truncate">
				{{ label }}
			</span>
		</div>
	</v-btn>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

defineProps({
	icon: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
});

const textElement = ref<HTMLDivElement | undefined>(undefined);
const isLabelTruncated = ref(false);

onMounted(() => {
	if (textElement.value) {
		isLabelTruncated.value = textElement.value.offsetWidth < textElement.value.scrollWidth;
	}
});
</script>

<style scoped>
.button-max-width {
	max-width: 125px;
}
</style>
