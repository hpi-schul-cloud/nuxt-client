<template>
	<VSheet>
		<h2 data-testid="dashboard-tasks-title">{{ title }}</h2>

		<div class="d-flex flex-column" data-testid="task-courses">
			<VCard v-for="item in tasks" :key="item._id" class="mb-4" :href="item.url">
				<VCardText>
					<div class="d-flex justify-space-between text-medium-emphasis">
						<span v-if="item.courseId" data-testid="task-course-name">
							{{ item.courseId.name }}
						</span>

						<span class="d-flex align-center ga-1" data-testid="task-due-date">
							<span>{{ item.secondaryTitle }}</span>
							<span v-if="item.stats?.userCount" class="d-none d-sm-inline" data-testid="task-submitted">
								| {{ t("pages.room.taskCard.teacher.label.submitted") }} {{ item.stats.submissionCount }}/{{
									item.stats.userCount
								}}
							</span>
						</span>
					</div>

					<div class="d-flex justify-space-between align-center mt-1">
						<span class="title w-100" data-testid="task-name">
							{{ item.name }}
						</span>
						<span
							v-if="item.stats?.userCount"
							class="d-none d-sm-inline text-medium-emphasis text-body-2 pl-2 flex-shrink-0"
							data-testid="task-graded"
						>
							{{ t("pages.room.taskCard.label.graded") }}
							{{ item.stats.gradeCount }}/{{ item.stats.submissionCount }}
						</span>
					</div>
				</VCardText>
			</VCard>

			<div class="d-flex justify-end mt-2">
				<VBtn variant="text" to="/tasks" size="small">
					{{ t("common.labels.tasks.more") }}
				</VBtn>
			</div>
		</div>
	</VSheet>
</template>
<script setup lang="ts">
import { DashBoardTask } from "./dashboard.types";
import { useI18n } from "vue-i18n";

defineProps<{
	title: string;
	tasks?: DashBoardTask[];
}>();

const { t } = useI18n();
</script>
