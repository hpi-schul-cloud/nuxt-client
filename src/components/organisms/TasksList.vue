<template>
	<v-list role="feed" lines="two">
		<v-list-subheader v-if="title && isListFilled" class="text-subtitle-1 ml-n4 mx-sm-0">
			{{ title }}
		</v-list-subheader>
		<template v-if="showSkeleton">
			<v-skeleton-loader type="text" :max-width="'15%'" />
			<v-skeleton-loader v-for="task of 4" ref="skeleton" :key="task" :type="'list-item-avatar-two-line'" />
		</template>
		<template v-for="(task, index) of tasks" v-else :key="index">
			<template v-if="userRole === 'student'">
				<task-item-student v-if="isLastTaskItem(index)" :key="index" v-intersect="loadMore" :task="task" />
				<task-item-student v-else :task="task" role="article" />
				<v-divider v-if="index < tasks.length - 1" />
			</template>
			<template v-if="userRole === 'teacher'">
				<task-item-teacher
					v-if="isLastTaskItem(index)"
					:key="index"
					v-intersect="loadMore"
					:task="task"
					@copy-task="onCopyTask"
					@share-task="onShareTask"
				/>
				<task-item-teacher v-else :task="task" role="article" @copy-task="onCopyTask" @share-task="onShareTask" />
				<v-divider v-if="index < tasks.length - 1" />
			</template>
		</template>
		<div v-if="showSpinner" class="d-flex justify-center my-10">
			<v-progress-circular indeterminate />
		</div>
	</v-list>
</template>

<script>
import TaskItemStudent from "@/components/molecules/TaskItemStudent.vue";
import TaskItemTeacher from "@/components/molecules/TaskItemTeacher.vue";

export default {
	components: { TaskItemStudent, TaskItemTeacher },
	inject: ["tasksModule", "finishedTasksModule"],
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
		userRole: {
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
	emits: ["copy-task", "share-task"],
	computed: {
		currentTaskStatus() {
			return this.tasksModule.getStatus;
		},
		finishedTasksStatus() {
			return this.finishedTasksModule.getStatus;
		},
		finishedTasksIsInitialized() {
			return this.finishedTasksModule.getIsInitialized;
		},
		status: function () {
			return this.type === "current" ? this.currentTaskStatus : this.finishedTasksStatus;
		},
		showSkeleton: function () {
			if (!this.hasPagination) {
				return this.status === "pending";
			} else {
				return !this.finishedTasksIsInitialized && this.status === "pending";
			}
		},
		showSpinner: function () {
			return this.hasPagination && this.finishedTasksIsInitialized && this.status === "pending";
		},
		isListFilled: function () {
			return this.status === "completed" && this.tasks.length > 0;
		},
	},
	methods: {
		loadMore(entries) {
			if (entries[0].isIntersecting && this.status !== "pending") {
				this.finishedTasksModule.fetchFinishedTasks();
			}
		},
		isLastTaskItem: function (index) {
			return this.hasPagination && index === this.tasks.length - 1;
		},
		onCopyTask(payload) {
			this.$emit("copy-task", payload);
		},
		onShareTask(taskId) {
			this.$emit("share-task", taskId);
		},
	},
};
</script>
