<template>
	<v-textarea
		v-model="modelValue"
		data-testid="file-caption-input"
		rows="1"
		auto-grow
		:label="$t('components.cardElement.fileElement.caption')"
		:hide-details="true"
		@click.stop
	/>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
	name: "CaptionText",
	props: {
		caption: {
			type: String,
			default: undefined,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: ["update:caption"],
	setup(props, { emit }) {
		const modelValue = ref("");

		onMounted(() => {
			if (props.caption !== undefined) {
				modelValue.value = props.caption;
			}
		});

		watch(modelValue, (newValue) => {
			if (newValue !== props.caption) {
				emit("update:caption", newValue);
			}
		});

		return { modelValue };
	},
});
</script>
