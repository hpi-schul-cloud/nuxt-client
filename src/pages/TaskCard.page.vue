<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Task Card"
	>
		<v-form class="d-flex flex-column">
			<card-element-wrapper v-model="title.model" v-bind="title.props" />
			<card-element-list v-model="elements" />
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
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import CardElementWrapper from "@/components/card-elements/CardElementWrapper.vue";
import CardElementList from "@/components/card-elements/CardElementList.vue";
import {
	CardElement,
	CardElementComponentEnum,
} from "@/store/types/card-element";
import {
	CardElementResponseCardElementTypeEnum,
	RichTextCardElementParamInputFormatEnum,
	CardElementParams,
} from "@/serverApi/v3";

// TODO - unit tests!
export default defineComponent({
	name: "TaskCard",
	components: {
		DefaultWireframe,
		CardElementWrapper,
		CardElementList,
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
				route.name === "task-edit" ? route.params.id : undefined;
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
							placeholder: "common.labels.title",
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
						placeholder: "common.labels.description",
						editable: true,
					},
				});
			});
		});

		const createTaskCard = () => {
			const cardElements: Array<CardElementParams> = [];
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
							inputFormat: RichTextCardElementParamInputFormatEnum.RichtextCk5,
						},
					});
				}
			});

			taskCardModule.createTaskCard({
				cardElements: cardElements,
			});
		};

		const updateTaskCard = () => {
			const cardElements: Array<CardElementParams> = [];
			cardElements.push({
				id: title.value.id,
				content: {
					type: title.value.type,
					value: title.value.model,
				},
			});
			elements.value.forEach((element) => {
				const cardElement: CardElementParams = {
					content: {
						type: element.type,
						value: element.model,
						inputFormat: RichTextCardElementParamInputFormatEnum.RichtextCk5,
					},
				};
				if (element.id) {
					cardElement.id = element.id;
				}
				cardElements.push(cardElement);
			});

			taskCardModule.updateTaskCard({
				cardElements: cardElements,
			});
		};

		const save = () => {
			if (route.name === "task-new") {
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

		return {
			breadcrumbs,
			title,
			elements,
			save,
			cancel,
		};
	},
	mounted() {
		document.title = this.$t("common.words.tasks") as string;
	},
});
</script>
