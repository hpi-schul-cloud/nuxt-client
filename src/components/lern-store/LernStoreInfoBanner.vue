<template>
	<InfoAlert v-if="isTeacherOrStudent" :alert-title="t('pages.lernstore.info.banner.title')">
		<ul class="mt-1 pl-5">
			<li>{{ t("pages.rooms.infoAlert.welcome.collaboration") }}</li>
			<li>{{ t("pages.rooms.infoAlert.welcome.teamsAndCourses") }}</li>
		</ul>
	</InfoAlert>
</template>

<script setup lang="ts">
import { useAppStore } from "@data-app";
import { InfoAlert } from "@ui-alert";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { isTeacher, isStudent } = storeToRefs(useAppStore());

const isTeacherOrStudent = computed(() => isTeacher.value || isStudent.value);

const { t } = useI18n();
</script>
