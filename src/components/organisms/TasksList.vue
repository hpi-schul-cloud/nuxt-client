<template>
	<v-list subheader two-line>
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
			<template v-if="type === 'student'">
				<v-task-item-student :key="index" :task="task" />
				<v-divider v-if="index < tasks.length - 1" :key="`divider-${index}`" />
			</template>
			<template v-if="type === 'teacher'">
				<v-task-item-teacher :key="index" :task="task" />
				<v-divider v-if="index < tasks.length - 1" :key="`divider-${index}`" />
			</template>
		</template>
		<!-- <div v-if="showSpinner" class="d-flex justify-center my-10">
			<v-progress-circular
				indeterminate
				color="secondary"
			></v-progress-circular>
		</div> -->
	</v-list>
</template>

<script>
import FinishedTaskModule from "@/store/finished-tasks";
import VTaskItemStudent from "@components/molecules/vTaskItemStudent";
import VTaskItemTeacher from "@components/molecules/vTaskItemTeacher";
import { mapGetters } from "vuex";

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
		type: {
			type: String,
			required: true,
			validator: (value) => ["student", "teacher"].includes(value),
		},
		hasPagination: {
			type: Boolean,
			required: false,
		},
	},
	data() {
		return {
			isLoading: false,
		};
	},
	computed: {
		console: () => console,
		...mapGetters("tasks", {
			status: "getStatus",
		}),
		finishedTasksStatus: () => FinishedTaskModule.getStatus,
		finishedTasksInitialized: () => FinishedTaskModule.getInitialized,
		finishedTasksOffset: () => FinishedTaskModule.getTasksOffset,
		showSkeleton: function () {
			if (!this.hasPagination) {
				return this.status === "pending";
			} else {
				return (
					!this.finishedTasksInitialized &&
					this.finishedTasksStatus === "pending"
				);
			}
		},
		showSpinner: function () {
			return this.hasPagination && this.isLoading;
		},
		showTasksList: function () {
			return !this.showSkeleton && !this.showSpinner;
		},
		isListFilled: function () {
			return this.status === "completed" && this.tasks.length > 0;
		},
	},
	watch: {
		finishedTasksStatus: async function (newStatus, oldStatus) {
			if (newStatus === "pending") {
				this.isLoading = true;
			}
			if (oldStatus === "pending" && newStatus === "completed") {
				await new Promise((resolve) => setTimeout(resolve, 3000));
				this.isLoading = false;
			}
		},
	},
};
</script>
