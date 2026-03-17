<template>
	<VSheet>
		<h2 data-testid="dashboard-tasks-title">{{ title }}</h2>

		<div class="d-flex flex-column" data-testid="task-courses">
			<VCard v-for="item in tasks" :key="item._id" :href="item.url">
				<VCardText>
					<div class="d-flex justify-space-between text-medium-emphasis">
						<span v-if="item.courseId" data-testid="task-course-name">
							<!-- eslint-disable-next-line vue/no-v-html -->
							<span v-html="stripOnlyScript(item.courseId.name)" />
						</span>

						<span class="d-flex align-center ga-1" data-testid="task-due-date">
							<!-- eslint-disable-next-line vue/no-v-html -->
							<span v-html="stripOnlyScript(item.secondaryTitle)" />
							<span v-if="item.stats?.userCount" class="d-none d-sm-inline" data-testid="task-submitted">
								| {{ $t("dashboard.text.handedIn") }} {{ item.stats.submissionCount }}/{{ item.stats.userCount }}
							</span>
						</span>
					</div>

					<div class="d-flex justify-space-between align-center mt-1">
						<span class="title w-100" data-testid="task-name">
							<!-- eslint-disable-next-line vue/no-v-html -->
							<span v-html="stripOnlyScript(item.name)" />
						</span>
						<span
							v-if="item.stats?.userCount"
							class="d-none d-sm-inline text-medium-emphasis text-body-2 pl-2 flex-shrink-0"
							data-testid="task-graded"
						>
							{{ $t("dashboard.text.graded") }}
							{{ item.stats.gradeCount }}/{{ item.stats.submissionCount }}
						</span>
					</div>
				</VCardText>
			</VCard>

			<div class="d-flex justify-end mt-2">
				<VBtn variant="text" :href="href" size="small">
					{{ $t("dashboard.link.moreTasks") }}
				</VBtn>
			</div>
		</div>
	</VSheet>
</template>
<script setup lang="ts">
import { DashBoardTask } from "./dashboard.types";

defineProps<{
	title: string;
	href: string;
	tasks?: DashBoardTask[];
}>();

function stripOnlyScript(value: string): string {
	return value?.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") ?? "";
}
</script>
