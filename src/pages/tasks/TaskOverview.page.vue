<template>
	<DefaultWireframe :headline="$t('common.words.tasks')" max-width="native" :fab-items="fabItems">
		<TasksOverviewStudent v-if="isStudent" />
		<TasksOverviewTeacher v-else-if="isTeacher" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import TasksOverviewStudent from "@/components/tasks/TasksOverviewStudent.vue";
import TasksOverviewTeacher from "@/components/tasks/TasksOverviewTeacher.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { Permission } from "@api-server";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { mdiPlus } from "@icons/material";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { isStudent, isTeacher } = useAppStoreRefs();
const { t } = useI18n();

useTitle(buildPageTitle(t("common.words.tasks")));

const appStore = useAppStore();

const fabItems = computed(() => {
	if (!isStudent.value && appStore.userPermissions.includes(Permission.HOMEWORK_CREATE)) {
		return [
			{
				icon: mdiPlus,
				label: t("components.organisms.TasksDashboardMain.fab.createTask"),
				href: "/homework/new?returnUrl=tasks",
				dataTestId: "add-task",
			},
		];
	}

	return undefined;
});
</script>
