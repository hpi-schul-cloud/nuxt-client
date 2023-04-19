<template>
	<div>
		<div class="d-flex justify-end">
			<v-checkbox
				v-model="task.completed"
				label="Aufgabe erledigt"
				@change="handleCompletion"
			/>
		</div>
		<article class="d-flex flex-column">
			<v-text-field :value="task.course" label="Kurs" filled disabled />
			<v-text-field
				:value="task.dueDate"
				:label="t('pages.taskCard.labels.dateInput')"
				filled
				disabled
			/>
			<title-card-element v-model="task.title" />
			<card-element-list v-model="task.elements" :editMode="false" />
		</article>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, onBeforeMount } from "vue";
import { useRoute } from "vue-router/composables";
import VueI18n from "vue-i18n";
import TaskCardModule from "@/store/task-card";
import TitleCardElement from "@/components/card-elements/TitleCardElement.vue";
import CardElementList from "@/components/card-elements/CardElementList.vue";
import { CardElementResponse } from "@/serverApi/v3";
import { printDateTimeFromStringUTC } from "@/plugins/datetime";

type Task = {
	id: string;
	title: string;
	elements?: Array<CardElementResponse>;
	course: string;
	dueDate: string;
	completed: boolean;
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
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!taskCardModule || !i18n) {
			throw new Error("Injection of dependencies failed");
		}

		const t = (key: string) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const route = useRoute();

		const task: Task = reactive({
			id: "",
			title: "",
			elements: [],
			course: "",
			dueDate: "",
			completed: false,
		});

		onBeforeMount(async () => {
			const taskCardId = route.params.id;
			await taskCardModule.findTaskCard(taskCardId);
			const taskCardData = taskCardModule.getTaskCardData;

			task.id = taskCardData.id;
			task.title = taskCardData.title;
			task.elements = taskCardData.cardElements;
			task.course = taskCardData.courseName;
			task.dueDate = printDateTimeFromStringUTC(taskCardData.dueDate, true);
			task.completed = taskCardModule.getCompletedForStudent;
		});

		const handleCompletion = () => {
			if (task.completed) {
				taskCardModule.completeTaskCard(task.id);
			} else {
				taskCardModule.undoCompletionForTaskCard(task.id);
			}
		};

		return {
			task,
			t,
			handleCompletion,
		};
	},
});
</script>
