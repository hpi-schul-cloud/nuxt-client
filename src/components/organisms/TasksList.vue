<template>
	<v-list role="feed" subheader two-line>
		<v-subheader v-if="title && isListFilled" class="subtitle-1 mx-n4 mx-sm-0">
			{{ title }}
		</v-subheader>
		<template v-if="showSkeleton">
			<v-skeleton-loader type="text" :max-width="'15%'" />
			<v-skeleton-loader
				v-for="task of 4"
				ref="skeleton"
				:key="task"
				:type="'list-item-avatar-two-line'"
			/>
		</template>
		<template v-for="(task, index) of tasks" v-else>
			<template v-if="role === 'student'">
				<v-task-item-student
					v-if="isLastTaskItem(index)"
					:key="index"
					v-intersect="loadMore"
					:task="task"
					role="article"
				/>
				<v-task-item-student v-else :key="index" :task="task" role="article" />
				<v-divider v-if="index < tasks.length - 1" :key="`divider-${index}`" />
			</template>
			<template v-if="role === 'teacher'">
				<v-task-item-teacher
					v-if="isLastTaskItem(index)"
					:key="index"
					v-intersect="loadMore"
					:task="task"
					role="article"
				/>
				<v-task-item-teacher v-else :key="index" :task="task" role="article" />
				<v-divider v-if="index < tasks.length - 1" :key="`divider-${index}`" />
			</template>
		</template>
		<div v-if="showSpinner" class="d-flex justify-center my-10">
			<v-progress-circular
				indeterminate
				color="secondary"
			></v-progress-circular>
		</div>
	</v-list>
</template>

<script>
import FinishedTaskModule from "@/store/finished-tasks";
import TaskModule from "@/store/tasks";
import VTaskItemStudent from "@components/molecules/vTaskItemStudent";
import VTaskItemTeacher from "@components/molecules/vTaskItemTeacher";

export default {
	components: { VTaskItemStudent, VTaskItemTeacher },
	props: {
		tasks: {
			type: Array,
			required: false,
			default: () => [],
		},
		title: {
			type: String,
			required: false,
			default: null,
		},
		role: {
			type: String,
			required: true,
			validator: (value) => ["student", "teacher"].includes(value),
		},
		type: {
			type: String,
			required: false,
			validator: (value) => ["current", "finished"].includes(value),
			default: "current",
		},
		hasPagination: {
			type: Boolean,
			required: false,
		},
	},
	computed: {
		currentTaskStatus: () => TaskModule.getStatus,
		finishedTasksStatus: () => FinishedTaskModule.getStatus,
		finishedTasksInitialized: () => FinishedTaskModule.getInitialized,
		status: function () {
			return this.type === "current"
				? this.currentTaskStatus
				: this.finishedTasksStatus;
		},
		showSkeleton: function () {
			if (!this.hasPagination) {
				return this.status === "pending";
			} else {
				return !this.finishedTasksInitialized && this.status === "pending";
			}
		},
		showSpinner: function () {
			return (
				this.hasPagination &&
				this.finishedTasksInitialized &&
				this.status === "pending"
			);
		},
		isListFilled: function () {
			return this.status === "completed" && this.tasks.length > 0;
		},
	},
	methods: {
		loadMore(entries) {
			if (entries[0].isIntersecting && this.status !== "pending") {
				FinishedTaskModule.fetchMoreTasks();
			}
		},
		isLastTaskItem: function (index) {
			return this.hasPagination && index === this.tasks.length - 1
		}
	},
};
</script>
