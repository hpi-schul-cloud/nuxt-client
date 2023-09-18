<template>
	<div>
		<v-card-text v-if="isEditMode">
			<v-textarea
				rows="1"
				auto-grow
				v-model="modelValue"
				:label="$t('components.cardElement.fileElement.caption')"
			/>
		</v-card-text>
		<v-card-text v-else>
			<v-card-subtitle class="text--secondary subtitle-1 pa-0">{{
				$t("components.cardElement.fileElement.caption")
			}}</v-card-subtitle>
			<v-card-text class="pa-0">{{ modelValue }}</v-card-text>
		</v-card-text>
	</div>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent } from "vue";

export default defineComponent({
	name: "CaptionText",
	props: {
		text: {
			type: String,
			required: false,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: ["update:text"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "text", emit);

		return {
			modelValue,
		};
	},
});
</script>
