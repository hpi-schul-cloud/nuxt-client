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

<script setup lang="ts">
import { PropType, reactive, watch } from "vue";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3/api";
import { useI18n } from "vue-i18n";
import { ShareOptions } from "@/store/share";

const emit = defineEmits<{
	(e: "share-options-change", shareOptions: ShareOptions): void;
}>();

defineProps({
	type: {
		type: String as PropType<ShareTokenBodyParamsParentTypeEnum>,
		required: true,
		validator: (type) =>
			Object.values(ShareTokenBodyParamsParentTypeEnum).includes(
				type as ShareTokenBodyParamsParentTypeEnum
			),
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
