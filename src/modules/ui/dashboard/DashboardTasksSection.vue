<template>
	<VSheet>
		<h2 data-testid="dashboard-tasks-title">{{ title }}</h2>

		<div class="d-flex flex-column" data-testid="task-courses">
			<VCard v-for="item in tasks" :key="item._id" class="mb-4" :href="item.url" @dragstart.prevent>
				<VCardText>
					<VIcon size="14" class="mr-1" :icon="mdiFormatListChecks" />
					<span v-if="item.courseId" data-testid="task-course-name"> {{ item.courseId.name }} | </span>
					<span>{{ item.secondaryTitle }}</span>

					<div class="d-flex flex-wrap ga-4 mt-2">
						<h3 class="text-h4 my-1" data-testid="task-name">
							{{ item.name }}
						</h3>
						<div class="d-flex ga-2 mt-2">
							<VChip v-if="item.stats?.userCount" size="small" variant="tonal" data-testid="task-submitted">
								{{ t("pages.room.taskCard.teacher.label.submitted") }} {{ item.stats.submissionCount }}/{{
									item.stats.userCount
								}}
							</VChip>
							<VChip v-if="item.stats?.userCount" size="small" variant="tonal" data-testid="task-graded">
								{{ t("pages.room.taskCard.label.graded") }}
								{{ item.stats.gradeCount }}/{{ item.stats.submissionCount }}
							</VChip>
						</div>
					</div>
				</VCardText>
			</VCard>

			<div class="d-flex mt-2">
				<VBtn variant="text" to="/tasks">
					{{ t("common.labels.tasks.more") }}
				</VBtn>
			</div>
		</div>
	</VSheet>
</template>
<script setup lang="ts">
import { DashBoardTask } from "./dashboard.types";
import { mdiFormatListChecks } from "@icons/material";
import { useI18n } from "vue-i18n";

defineProps<{
	title: string;
	tasks?: DashBoardTask[];
}>();

const { t } = useI18n();
</script>
