<template>
	<div class="pa-2">
		<v-textarea
			v-if="isEditMode"
			data-testid="file-caption-input"
			rows="1"
			auto-grow
			v-model="modelValue"
			:label="$t('components.cardElement.fileElement.caption')"
		/>
		<v-card-text
			v-if="!isEditMode"
			v-show="descriptionText != ''"
			class="pa-0 subtitle-1"
			data-testid="file-caption-input"
			>{{ descriptionText }}
		</v-card-text>
	</div>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent } from "vue";
export default defineComponent({
	name: "CaptionText",
	props: {
		caption: {
			type: String,
			required: false,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: ["update:caption", "update:descriptionText"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "caption", emit);
		const descriptionText = useVModel(props, "caption", emit);

		return { modelValue, descriptionText };
	},
});
</script>
