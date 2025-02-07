<template>
	<v-checkbox
		v-model="shareOptions.isSchoolInternal"
		data-testId="isSchoolInternal"
		:label="t('components.molecules.share.options.schoolInternally')"
		:hide-details="true"
		density="comfortable"
	/>
	<v-checkbox
		v-model="shareOptions.hasExpiryDate"
		data-testId="hasExpiryDate"
		:label="t('components.molecules.share.options.expiresInDays')"
		:hide-details="true"
		density="comfortable"
	/>
</template>

<script setup>
import { reactive, watch } from "vue";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3/api";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["share-options-change"]);
defineProps({
	type: {
		type: String,
		required: true,
		validator: (type) =>
			Object.values(ShareTokenBodyParamsParentTypeEnum).includes(type),
	},
});

const { t } = useI18n();

const shareOptions = reactive({
	isSchoolInternal: true,
	hasExpiryDate: true,
});

watch(shareOptions, (newValue) => {
	emit("share-options-change", newValue);
});

emit("share-options-change", shareOptions);
</script>
