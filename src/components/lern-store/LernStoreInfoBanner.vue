<template>
	<InfoAlert v-if="isTeacherOrStudent" :alert-title="t('pages.lernstore.info.banner.title')">
		<ul class="mt-1 pl-5">
			<i18n-t :keypath="translationKeyItem0" tag="li" scope="global">
				<template #helpLinkText>
					<a target="_blank" :href="helpPageUrl">{{ t("pages.lernstore.info.banner.helpLinkText") }}</a>
				</template>
			</i18n-t>
			<li>{{ t("pages.lernstore.info.banner.item.1") }}</li>
		</ul>
	</InfoAlert>
</template>

<script setup lang="ts">
import { SchulcloudTheme } from "@/serverApi/v3";
import { useAppStore } from "@data-app";
import { useEnvConfig } from "@data-env";
import { InfoAlert } from "@ui-alert";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { isTeacher, isStudent } = storeToRefs(useAppStore());

const isTeacherOrStudent = computed(() => isTeacher.value || isStudent.value);

const { t } = useI18n();

const translationKeyItem0 = computed(() => {
	switch (useEnvConfig().value.SC_THEME) {
		case SchulcloudTheme.Brb:
			return "pages.lernstore.info.banner.item.0.brb";
		case SchulcloudTheme.N21:
			return "pages.lernstore.info.banner.item.0.n21";
		case SchulcloudTheme.Thr:
			return "pages.lernstore.info.banner.item.0.thr";
		case SchulcloudTheme.Default:
			return "pages.lernstore.info.banner.item.0.n21";
		default:
			return "pages.lernstore.info.banner.item.0.n21";
	}
});

const helpPageUrl = computed(() => {
	switch (useEnvConfig().value.SC_THEME) {
		case SchulcloudTheme.Brb:
			return "https://brandenburg.cloud/help/confluence/44073000";
		case SchulcloudTheme.N21:
			return "https://niedersachsen.cloud/help/confluence/44073000";
		case SchulcloudTheme.Thr:
			return "https://schulcloud-thueringen.de/help/confluence/44073000";
		case SchulcloudTheme.Default:
			return "https://dbildungscloud.de/help/confluence/44073000";
		default:
			return "https://dbildungscloud.de/help/confluence/44073000";
	}
});
</script>
