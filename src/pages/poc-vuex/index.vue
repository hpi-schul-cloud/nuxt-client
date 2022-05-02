<template>
	<default-wireframe headline="Inject task module" :full-width="false">
		<div class="d-flex">
			Number of tasks: <span class="task-count">{{ tasks.length }}</span>
		</div>
	</default-wireframe>
</template>

<script lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import TaskModule from "@/store/tasks";
import {
	computed,
	defineComponent,
	inject,
	onMounted,
} from "@nuxtjs/composition-api";

export default defineComponent({
	components: {
		DefaultWireframe,
	},
	layout: "defaultVuetify",
	head() {
		return {
			title: "Provide/Inject POC",
		};
	},
	setup() {
		const taskModule = inject<TaskModule>("taskModule", new TaskModule({}));

		onMounted(() => {
			taskModule.fetchAllTasks();
		});

		const tasks = computed(() => taskModule.getTasks);

		return {
			tasks,
		};
	},
});
</script>
