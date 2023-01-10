<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Task Form"
	>
		<v-form class="d-flex flex-column">
			<component
				:is="title.component"
				v-bind="title.props"
				v-model="title.model"
			/>
			<draggable
				v-model="elements"
				:animation="400"
				:delay="touchDelay"
				handle=".handle"
				ghost-class="ghost"
				chosen-class="chosen"
				drag-class="drag"
				force-fallback="true"
				@start="startDragging"
				@end="endDragging"
			>
				<task-content-element
					v-for="(element, index) in elements"
					:key="index"
					@delete-element="deleteElement(index)"
				>
					<component
						:is="element.component"
						v-bind="element.props"
						v-model="element.model"
						:disabled="dragInProgress"
					/>
				</task-content-element>
			</draggable>
			<v-btn fab color="primary" class="align-self-center" @click="addElement">
				<v-icon>{{ mdiPlus }}</v-icon>
			</v-btn>
			<div>
				<v-btn color="secondary" outlined @click="cancel">
					{{ $t("common.actions.cancel") }}
				</v-btn>
				<v-btn class="float-right" color="primary" depressed @click="save">
					{{ $t("common.actions.save") }}
				</v-btn>
			</div>
		</v-form>
	</default-wireframe>
</template>

<script lang="ts">
import {
	defineComponent,
	inject,
	ref,
	onBeforeMount,
	onMounted,
} from "@vue/composition-api";
import { useRouter, useRoute } from "@nuxtjs/composition-api";
import VueI18n from "vue-i18n";
import { taskModule, authModule } from "@/store";
import {
	CreateTaskCardParams,
	UpdateTaskCardParams,
	CardElementUpdateParams,
	CardElementResponseCardElementTypeEnum,
} from "../serverApi/v3/api";
import { useDrag } from "@/composables/drag";
import draggable from "vuedraggable";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import TaskTitleElement from "@/components/task-form/TaskTitleElement.vue";
import TaskContentElement from "@/components/task-form/TaskContentElement.vue";
import TaskTextElement from "@/components/task-form/TaskTextElement.vue";
import { mdiPlus } from "@mdi/js";
import { Element, ElementComponentEnum } from "@/store/types/task";

// TODO - unit tests!
export default defineComponent({
	name: "TaskForm",
	components: {
		DefaultWireframe,
		TaskContentElement,
		TaskTitleElement,
		TaskTextElement,
		draggable,
	},
	setup() {
		const router = useRouter();

		// TODO - FIX THIS, can this be a navigation guard?
		onBeforeMount(() => {
			if (
				!authModule.getUserPermissions.includes("HOMEWORK_CREATE".toLowerCase())
			) {
				router.go(-1);
			}
		});

		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}
		const breadcrumbs = [
			{
				text: i18n.t("common.words.tasks"),
				to: "/tasks",
			},
		];

		const title = ref<Element>({
			component: ElementComponentEnum.Title,
			id: "",
			model: "",
		});
		const elements = ref<Element[]>([]);
		const route = useRoute().value;

		onMounted(async () => {
			const taskId = route.name === "task-edit" ? route.params.id : undefined;
			if (taskId) {
				await taskModule.findTask(taskId);
			}

			const taskData = taskModule.getTaskData;

			taskData.cardElements.forEach((cardElement) => {
				if (
					cardElement.cardElementType ===
					CardElementResponseCardElementTypeEnum.Title
				) {
					title.value = {
						component: ElementComponentEnum.Title,
						id: cardElement.id,
						model: cardElement.content.value,
						props: {
							placeholder: i18n.t("common.labels.title"),
							editable: true,
						},
					};
					return;
				}

				createElement(cardElement.id, cardElement.content.value);
			});
		});

		const createElement = (id: string, desc: string) => {
			const element: Element = {
				component: ElementComponentEnum.RichText,
				id: id,
				model: desc,
				props: {
					placeholder: i18n.t("common.labels.description"),
					editable: true,
				},
			};

			elements.value.push(element);
		};

		const addElement = () => {
			createElement("", "");
		};

		const deleteElement = (index: number) => {
			elements.value.splice(index, 1);
		};

		const save = () => {
			if (route.name === "task-new") {
				const text: Array<string> = [];
				elements.value.forEach((element) => {
					text.push(element.model);
				});
				const newTaskData: CreateTaskCardParams = {
					title: title.value.model,
					text: text,
				};

				taskModule.createTask(newTaskData);
			} else {
				const cardElements: Array<CardElementUpdateParams> = [];
				cardElements.push({
					id: title.value.id,
					content: {
						type: new String("title"),
						value: title.value.model,
					},
				});
				elements.value.forEach((element) => {
					cardElements.push({
						id: element.id,
						content: {
							type: new String("richText"),
							value: element.model,
						},
					});
				});
				const updateTaskData: UpdateTaskCardParams = {
					cardElements: cardElements,
				};

				taskModule.updateTask(updateTaskData);
			}

			//router.go(-1);
		};

		const cancel = () => {
			router.go(-1);
		};

		const { touchDelay, startDragging, endDragging, dragInProgress } =
			useDrag();

		// TODO - why is length not reactive when children is reactive not ref

		return {
			mdiPlus,
			breadcrumbs,
			title,
			elements,
			save,
			cancel,
			addElement,
			deleteElement,
			touchDelay,
			startDragging,
			endDragging,
			dragInProgress,
		};
	},
	// TODO - should not use this, because it's nuxt
	// @ts-ignore
	head() {
		return {
			title: this.$t("common.words.tasks"),
		};
	},
});
</script>

<style lang="scss" scoped>
.chosen,
.drag {
	box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14),
		0 1px 8px 0 rgba(0, 0, 0, 0.12) !important;
	opacity: 1 !important;
}

.ghost {
	opacity: 0 !important;
}
</style>
