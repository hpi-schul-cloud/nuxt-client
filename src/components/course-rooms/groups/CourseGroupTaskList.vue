<template>
	<section :data-testid="`course-group-tasks-${type}`">
		<h2 class="text-h4 mb-2">{{ title }}</h2>
		<VRow v-if="tasks.length">
			<VCol v-for="task in tasks" :key="task.homeworkId" cols="12" sm="6" lg="4">
				<VCard
					:href="task.url"
					:style="color ? { borderTop: `4px solid ${color}` } : undefined"
					variant="outlined"
					class="h-100"
					data-testid="course-group-task"
				>
					<VCardTitle class="text-wrap">
						{{ t("pages.courseRoomDetails.groups.details.tasks.title", { name: task.name }) }}
					</VCardTitle>
					<VCardSubtitle v-if="formattedDate(task)">{{ formattedDate(task) }}</VCardSubtitle>
					<VCardText v-if="task.description">{{ task.description }}</VCardText>
					<VCardActions>
						<span class="text-primary text-body-2 px-2">
							{{ t("pages.courseRoomDetails.groups.details.tasks.link") }}
						</span>
					</VCardActions>
				</VCard>
			</VCol>
		</VRow>
		<p v-else class="text-medium-emphasis" data-testid="course-group-tasks-empty">{{ emptyText }}</p>
	</section>
</template>

<script setup lang="ts">
import { formatUtc } from "@/utils/date-time.utils";
import { CourseGroupTask } from "@data-course-group";
import { PropType } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	type: {
		type: String as PropType<"done" | "open">,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	emptyText: {
		type: String,
		required: true,
	},
	tasks: {
		type: Array as PropType<CourseGroupTask[]>,
		required: true,
	},
	color: {
		type: String,
		default: undefined,
	},
});

const { t } = useI18n();

const formattedDate = (task: CourseGroupTask) => {
	const date = formatUtc(task.date, "dateTimeYY");
	if (!date) return undefined;

	return props.type === "done"
		? t("pages.courseRoomDetails.groups.details.tasks.submittedOn", { date })
		: t("pages.courseRoomDetails.groups.details.tasks.dueTo", { date });
};
</script>
