<template>
	<VList role="feed" lines="two">
		<VListSubheader v-if="title && isListFilled" class="text-subtitle-1 ml-n4 mx-sm-0"> {{ title }} </VListSubheader>

		<template v-if="showSkeleton">
			<VSkeletonLoader type="text" :max-width="'15%'" />
			<VSkeletonLoader v-for="task in 4" ref="skeleton" :key="task" type="list-item-avatar-two-line" />
		</template>

		<template v-else>
			<template v-for="(task, index) in tasks" :key="index">
				<template v-if="userRole === 'student'">
					<TasksListItemStudent v-if="isLastTaskItem(index)" v-intersect="loadMore" :task />
					<TasksListItemStudent v-else :task="task" role="article" />
				</template>

				<template v-if="userRole === 'teacher'">
					<TasksListItemTeacher
						v-if="isLastTaskItem(index)"
						v-intersect="loadMore"
						:task="task"
						@copy-task="onCopyTask"
						@share-task="onShareTask"
					/>
					<TasksListItemTeacher v-else :task role="article" @copy-task="onCopyTask" @share-task="onShareTask" />
				</template>

				<VDivider v-if="index < tasks.length - 1" />
			</template>
		</template>

		<div v-if="showSpinner" class="d-flex justify-center my-10">
			<VProgressCircular indeterminate />
		</div>
	</VList>
</template>

<script setup lang="ts">
import TasksListItemStudent from "./TasksListItemStudent.vue";
import TasksListItemTeacher from "./TasksListItemTeacher.vue";
import { CopyParams } from "@/store/copy";
import FinishedTasksModule from "@/store/finished-tasks";
import { TaskResponse } from "@api-server";
import { computed, inject } from "vue";

const props = withDefaults(
	defineProps<{
		tasks: TaskResponse[];
		title?: string;
		userRole: "student" | "teacher";
		hasPagination?: boolean;
		showSkeleton?: boolean;
	}>(),
	{
		title: undefined,
		hasPagination: false,
		showSkeleton: false,
	}
);

const emit = defineEmits<{
	"copy-task": [payload: CopyParams];
	"share-task": [taskId: string];
}>();

const finishedTasksModule = inject<FinishedTasksModule>("finishedTasksModule");

const isListFilled = computed(() => props.tasks.length > 0);
const showSpinner = computed(() => props.hasPagination && finishedTasksModule?.getIsInitialized);
const isLastTaskItem = (index: number) => props.hasPagination && index === props.tasks.length - 1;

const loadMore = (entries: IntersectionObserverEntry[]) => {
	if (entries[0].isIntersecting) {
		finishedTasksModule?.fetchFinishedTasks();
	}
};

const onCopyTask = (payload: CopyParams) => {
	emit("copy-task", payload);
};

const onShareTask = (taskId: string) => {
	emit("share-task", taskId);
};
</script>
