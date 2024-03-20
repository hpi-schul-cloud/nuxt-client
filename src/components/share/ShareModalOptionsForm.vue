<template>
	<v-checkbox
		v-model="shareOptions.isSchoolInternal"
		data-testid="isSchoolInternal"
		:label="$t('components.molecules.share.options.schoolInternally')"
		:hide-details="true"
		density="comfortable"
	/>
	<v-checkbox
		v-model="shareOptions.hasExpiryDate"
		data-testid="hasExpiryDate"
		:label="$t('components.molecules.share.options.expiresInDays')"
		:hide-details="true"
		density="comfortable"
	/>
</template>

<script>
import { defineComponent, reactive, watch } from "vue";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3/api";
import { mdiCheck } from "@mdi/js";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ShareModalOptionsForm",
	emits: ["share-options-change"],
	props: {
		type: {
			type: String,
			required: true,
			validator: (type) =>
				Object.values(ShareTokenBodyParamsParentTypeEnum).includes(type),
		},
	},
	setup(props, { emit }) {
		const shareOptions = reactive({
			isSchoolInternal: true,
			hasExpiryDate: true,
		});

		watch(shareOptions, (newValue) => {
			emit("share-options-change", newValue);
		});

		emit("share-options-change", shareOptions);

		return {
			shareOptions,
			mdiCheck,
		};
	},
});
</script>
