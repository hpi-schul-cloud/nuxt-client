<template>
	<section class="mb-8" data-testid="directory-visibility-section">
		<h2>{{ t("pages.account.visibility.headline") }}</h2>
		<p class="font-weight-bold mb-1">{{ t("pages.account.visibility.subheadline") }}</p>
		<p class="text-medium-emphasis">
			{{ t("pages.account.visibility.hint", { themeTitle }) }}
		</p>

		<VCheckbox
			v-model="discoverableModel"
			v-input-attrs="{ 'data-testid': 'checkbox-show-in-directory' }"
			:label="t('pages.account.visibility.checkboxLabel')"
			:disabled="loading"
			hide-details
			data-test-id="checkbox_directory_visibility"
			class="mb-4"
		/>

		<div class="d-flex justify-end">
			<VBtn
				color="primary"
				variant="flat"
				:loading="loading"
				data-testid="submit_visibility_settings_btn"
				@click="emit('submit', discoverableModel)"
			>
				{{ t("pages.account.visibility.saveButton") }}
			</VBtn>
		</div>
	</section>
</template>

<script setup lang="ts">
import { vInputAttrs } from "@/directives/inputAttrs.directive";
import { useEnvConfig } from "@data-env";
import { computed, ref, watch } from "vue";
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
const themeTitle = computed(() => useEnvConfig().value.SC_TITLE);
const discoverableModel = ref(false);

watch(
	() => props.initialDiscoverable,
	(val) => {
		discoverableModel.value = val;
	},
	{ immediate: true }
);
</script>
