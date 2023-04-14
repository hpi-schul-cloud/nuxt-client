<template>
	<article class="d-flex flex-column">
		<v-text-field :value="task.course" label="Kurs" filled disabled />
		<v-text-field
			:value="task.dueDate"
			label="Fälligkeitsdatum"
			filled
			disabled
		/>
		<title-card-element v-model="task.title" />
		<card-element-list v-model="task.elements" :editMode="false" />
	</article>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, onBeforeMount } from "vue";
import { useRoute } from "vue-router/composables";
import TaskCardModule from "@/store/task-card";
import TitleCardElement from "@/components/card-elements/TitleCardElement.vue";
import CardElementList from "@/components/card-elements/CardElementList.vue";
import { CardElementResponse } from "@/serverApi/v3";
import { printDateTimeFromStringUTC } from "@/plugins/datetime";

type Task = {
	title: string;
	elements?: Array<CardElementResponse>;
	course: string;
	dueDate: string;
};

// TODO - unit tests!
export default defineComponent({
	name: "TaskStudentView",
	components: {
		TitleCardElement,
		CardElementList,
	},
	setup() {
		const taskCardModule: TaskCardModule | undefined =
			inject<TaskCardModule>("taskCardModule");
		if (!taskCardModule) {
			throw new Error("Injection of dependencies failed");
		}

		const route = useRoute();

		const task: Task = reactive({
			title: "",
			elements: [],
			course: "",
			dueDate: "",
		});

		onBeforeMount(async () => {
			const taskCardId = route.params.id;
			await taskCardModule.findTaskCard(taskCardId);
			const taskCardData = taskCardModule.getTaskCardData;

			task.title = taskCardData.title;
			task.elements = taskCardData.cardElements;
			task.course = taskCardData.courseName;
			task.dueDate = printDateTimeFromStringUTC(taskCardData.dueDate, true);
		});

		return {
			task,
		};
	},
});
</script>
