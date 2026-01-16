<template>
	<InfoAlert v-if="isTeacherOrStudent" :alert-title="t('pages.lernstore.info.banner.title')">
		<ul class="mt-1 pl-5">
			<li>{{ t("pages.lernstore.info.banner.item.0") }}</li>
			<li>{{ t("pages.lernstore.info.banner.item.1") }}</li>
			<i18n-t keypath="pages.lernstore.info.banner.item.2" tag="li" scope="global">
				<template #helpLink>
					<a target="_blank" :href="helpPageUrl">{{ t("pages.lernstore.info.banner.helpLinkText") }}</a>
				</template>
			</i18n-t>
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
