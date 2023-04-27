<template>
	<div>
		<div class="d-flex justify-end mb-4">
			<v-checkbox
				v-model="mappedTask.completed"
				:label="t('pages.betaTask.studentView.taskCompleted')"
				:disabled="isExpired"
				@change="handleCompletion"
			/>
		</div>
		<article class="d-flex flex-column">
			<p>
				<b>{{ t("pages.taskCard.labels.dateInput") }}</b>
				<br />
				{{ mappedTask.dueDate }}
			</p>
			<title-card-element :value="mappedTask.title" />
			<card-element-list :value="mappedTask.elements" />
		</article>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, PropType } from "vue";
import VueI18n from "vue-i18n";
import TaskCardModule from "@/store/task-card";
import TitleCardElement from "@/components/beta-task/card-elements/TitleCardElement.vue";
import CardElementList from "@/components/beta-task/card-elements/CardElementList.vue";
import { printDateTimeFromStringUTC } from "@/plugins/datetime";
import { TaskCard } from "@/store/types/beta-task/beta-task";
import { CardElement } from "@/store/types/beta-task/card-element";

type Task = {
	id: string;
	title: string;
	elements?: Array<CardElement>;
	course: string;
	dueDate: string;
	completed: boolean;
};

export default defineComponent({
	name: "TaskStudentView",
	components: {
		TitleCardElement,
		CardElementList,
	},
	props: {
		task: {
			type: Object as PropType<TaskCard>,
			required: true,
		},
	},
	setup(props) {
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

		const mappedTask: Task = reactive({
			id: props.task.id,
			title: props.task.title,
			elements: props.task.cardElements,
			course: props.task.courseName,
			dueDate: printDateTimeFromStringUTC(props.task.dueDate, true),
			completed: taskCardModule.getCompletedForStudent,
		});

		const handleCompletion = () => {
			if (mappedTask.completed) {
				taskCardModule.completeTaskCard(mappedTask.id);
			} else {
				taskCardModule.undoCompletionForTaskCard(mappedTask.id);
			}
		};

		const isExpired = taskCardModule.isExpired;

		return {
			mappedTask,
			t,
			handleCompletion,
			isExpired,
		};
	},
});
</script>
