<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Task Card"
	>
		<v-form class="d-flex flex-column">
			<card-element-wrapper v-model="title.model" v-bind="title.props" />
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
				<card-element-wrapper
					v-for="(element, index) in elements"
					:key="index"
					v-model="element.model"
					v-bind="element.props"
					:disabled="dragInProgress"
					@delete-element="deleteElement(index)"
				/>
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
import { defineComponent, inject, ref, onBeforeMount, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router/composables";
import VueI18n from "vue-i18n";
import { taskCardModule, authModule } from "@/store";
import { useDrag } from "@/composables/drag";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import CardElementWrapper from "@/components/card-elements/CardElement.vue";
import {
	CardElement,
	CardElementComponentEnum,
} from "@/store/types/card-element";
import { CardElementResponseCardElementTypeEnum } from "@/serverApi/v3";
import { mdiPlus } from "@mdi/js";
import draggable from "vuedraggable";

// TODO - unit tests!
export default defineComponent({
	name: "TaskCard",
	components: {
		DefaultWireframe,
		CardElementWrapper,
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

		const title = ref<CardElement>({
			id: "",
			type: CardElementResponseCardElementTypeEnum.Title,
			model: "",
		});
		const elements = ref<CardElement[]>([]);
		const route = useRoute();

		onMounted(async () => {
			const taskCardId =
				route.name === "task-card-edit" ? route.params.id : undefined;
			if (taskCardId) {
				await taskCardModule.findTaskCard(taskCardId);
			}
			const taskCardData = taskCardModule.getTaskCardData;
			taskCardData.cardElements.forEach((cardElement) => {
				if (
					cardElement.cardElementType ===
					CardElementResponseCardElementTypeEnum.Title
				) {
					title.value = {
						id: cardElement.id,
						type: CardElementResponseCardElementTypeEnum.Title,
						model: cardElement.content.value,
						props: {
							component: CardElementComponentEnum.Title,
							placeholder: i18n.t("common.labels.title"),
							editable: true,
						},
					};
					return;
				}

				elements.value.push({
					id: cardElement.id,
					type: CardElementResponseCardElementTypeEnum.RichText,
					model: cardElement.content.value,
					props: {
						component: CardElementComponentEnum.RichText,
						placeholder: i18n.t("common.labels.description"),
						editable: true,
					},
				});
			});
		});

		const addElement = () => {
			elements.value.push({
				id: "",
				type: CardElementResponseCardElementTypeEnum.RichText,
				model: "",
				props: {
					component: CardElementComponentEnum.RichText,
					placeholder: i18n.t("common.labels.description"),
					editable: true,
				},
			});
		};

		const deleteElement = (index: number) => {
			elements.value.splice(index, 1);
		};

		const createTaskCard = () => {
			const cardElements = [];
			cardElements.push({
				content: {
					type: title.value.type,
					value: title.value.model,
				},
			});
			elements.value.forEach((element) => {
				if (element.model && element.model.length > 2) {
					cardElements.push({
						content: {
							type: element.type,
							value: element.model,
							inputFormat: "richtext_ck5",
						},
					});
				}
			});

			taskCardModule.createTaskCard({
				cardElements: cardElements,
			});
		};

		const updateTaskCard = () => {
			const cardElements = [];
			cardElements.push({
				id: title.value.id,
				content: {
					type: title.value.type,
					value: title.value.model,
				},
			});
			elements.value.forEach((element) => {
				if (element.model && element.model.length > 2) {
					cardElements.push({
						...(element.id && { id: element.id }),
						content: {
							type: element.type,
							value: element.model,
							inputFormat: "richtext_ck5",
						},
					});
				}
			});

			taskCardModule.updateTaskCard({
				cardElements: cardElements,
			});
		};

		const save = () => {
			if (route.name === "task-card-new") {
				createTaskCard();
			} else {
				updateTaskCard();
			}
			// TODO
			//router.go(-1);
		};

		const cancel = () => {
			router.go(-1);
		};

		const { touchDelay, startDragging, endDragging, dragInProgress } =
			useDrag();

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
	mounted() {
		document.title = this.$t("common.words.tasks") as string;
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
