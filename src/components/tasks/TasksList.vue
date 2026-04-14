<template>
	<VList role="feed" lines="two">
		<VListSubheader v-if="title && isListFilled" class="text-subtitle-1 ml-n4 mx-sm-0">
			{{ title }}
		</VListSubheader>
		<template v-if="showSkeleton">
			<v-skeleton-loader type="text" :max-width="'15%'" />
			<v-skeleton-loader v-for="task of 4" ref="skeleton" :key="task" :type="'list-item-avatar-two-line'" />
		</template>
		<template v-for="(task, index) of tasks" v-else :key="index">
			<template v-if="userRole === 'student'">
				<TasksListItemStudent v-if="isLastTaskItem(index)" :key="index" v-intersect="loadMore" :task="task" />
				<TasksListItemStudent v-else :task="task" role="article" />
				<v-divider v-if="index < tasks.length - 1" />
			</template>
			<template v-if="userRole === 'teacher'">
				<TasksListItemTeacher
					v-if="isLastTaskItem(index)"
					:key="index"
					v-intersect="loadMore"
					:task="task"
					@copy-task="onCopyTask"
					@share-task="onShareTask"
				/>
				<TasksListItemTeacher v-else :task="task" role="article" @copy-task="onCopyTask" @share-task="onShareTask" />
				<v-divider v-if="index < tasks.length - 1" />
			</template>
		</template>
		<div v-if="showSpinner" class="d-flex justify-center my-10">
			<v-progress-circular indeterminate />
		</div>
	</VList>
</template>

<script>
import TasksListItemStudent from "./TasksListItemStudent.vue";
import TasksListItemTeacher from "./TasksListItemTeacher.vue";

export default {
	components: { TasksListItemStudent, TasksListItemTeacher },
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
		showSkeleton: {
			type: Boolean,
		},
	},
	emits: ["copy-task", "share-task"],
	computed: {
		finishedTasksIsInitialized() {
			return this.finishedTasksModule.getIsInitialized;
		},
		showSpinner: function () {
			return this.hasPagination && this.finishedTasksIsInitialized;
		},
		isListFilled: function () {
			return this.tasks.length > 0;
		},
	},
	methods: {
		loadMore(entries) {
			if (entries[0].isIntersecting) {
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
