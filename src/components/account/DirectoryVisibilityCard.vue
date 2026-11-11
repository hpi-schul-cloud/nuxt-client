<template>
	<VCard variant="outlined" class="pa-6 rounded-lg mb-6">
		<div class="text-h6 font-weight-bold mb-2 d-flex align-center">
			<VIcon :icon="mdiAccountEye" size="small" class="me-2 text-primary" />
			{{ t("pages.account.visibility.headline") }}
		</div>
		<div class="text-body-2 text-medium-emphasis mb-4">
			{{ t("pages.account.visibility.description") }}
		</div>

		<VCheckbox
			v-model="discoverableModel"
			v-input-attrs="{ 'data-testid': 'checkbox-show-in-directory' }"
			:label="t('pages.account.visibility.checkboxLabel')"
			:disabled="loading"
			density="compact"
			data-test-id="checkbox_directory_visibility"
			class="mb-4"
		/>

		<div class="d-flex justify-end">
			<VBtn color="primary" :loading="loading" data-testid="submit_visibility_settings_btn" @click="handleSave">
				{{ t("pages.account.visibility.saveButton") }}
			</VBtn>
		</div>
	</VCard>
</template>

<script setup lang="ts">
import { vInputAttrs } from "@/directives/inputAttrs.directive";
import { mdiAccountEye } from "@icons/material";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	initialDiscoverable: {
		type: Boolean,
		default: false,
	},
	loading: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits<{
	(e: "submit", discoverable: boolean): void;
}>();

const { t } = useI18n();
const discoverableModel = ref(false);

watch(
	() => props.initialDiscoverable,
	(val) => {
		discoverableModel.value = val;
	},
	{ immediate: true }
);

const handleSave = () => {
	emit("submit", discoverableModel.value);
};
</script>
