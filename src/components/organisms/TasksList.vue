<template>
	<v-list subheader two-line>
		<v-subheader v-if="title && isListFilled" class="subtitle-1">
			{{ title }}
		</v-subheader>
		<template v-if="status === 'pending'">
			<v-skeleton-loader type="text" :max-width="'15%'" />
			<v-skeleton-loader
				v-for="task of 4"
				ref="skeleton"
				:key="task"
				:type="'list-item-avatar-two-line'"
			/>
		</template>
		<template v-for="(task, index) of tasks" v-else-if="type === 'student'">
			<v-task-item-student :key="index" :task="task" />
			<v-divider v-if="index < tasks.length - 1" :key="`divider-${index}`" />
		</template>
		<template v-for="(task, index) of tasks" v-else-if="type === 'teacher'">
			<v-task-item-teacher :key="index" :task="task" />
			<v-divider v-if="index < tasks.length - 1" :key="`divider-${index}`" />
		</template>
	</v-list>
</template>

<script>
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
		type: {
			type: String,
			required: true,
			validator: (value) => ["student", "teacher"].includes(value),
		},
	},
	computed: {
		status: () => TaskModule.getStatus,
		isListFilled: function () {
			return this.status === "completed" && this.tasks.length > 0;
		},
	},
};
</script>
