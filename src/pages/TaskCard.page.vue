<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Task Card"
	>
		<v-form v-if="isEditMode" class="d-flex flex-column">
			<v-select
				v-model="course"
				:items="courses"
				item-value="id"
				item-text="title"
				filled
				disabled
				:label="$t('common.labels.course')"
			/>
			<card-element-wrapper
				v-model="title.model"
				v-bind="title.props"
				:editMode="true"
			/>
			<card-element-list v-model="elements" :editMode="true" />
			<div>
				<v-btn
					color="secondary"
					outlined
					@click="cancel"
					data-testid="cancel-btn"
				>
					{{ $t("common.actions.cancel") }}
				</v-btn>
				<v-btn
					class="float-right"
					color="primary"
					depressed
					@click="save"
					data-testid="save-btn"
				>
					{{ $t("common.actions.save") }}
				</v-btn>
			</div>
		</v-form>
		<article v-else class="d-flex flex-column">
			<card-element-wrapper
				v-model="title.model"
				v-bind="title.props"
				:editMode="false"
			/>
			<card-element-list v-model="elements" :editMode="false" />
		</article>
	</default-wireframe>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router/composables";
import VueI18n from "vue-i18n";
import { taskCardModule, roomModule } from "@/store";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import CardElementWrapper from "@/components/card-elements/CardElementWrapper.vue";
import CardElementList from "@/components/card-elements/CardElementList.vue";
import {
	CardElement,
	CardElementComponentEnum,
} from "@/store/types/card-element";
import {
	CardElementResponse,
	CardElementResponseCardElementTypeEnum,
	RichTextCardElementParamInputFormatEnum,
	CardElementParams,
} from "@/serverApi/v3";
import AuthModule from "@/store/auth";

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

		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const authModule: AuthModule | undefined = inject<AuthModule>("authModule");
		if (!i18n || !authModule) {
			throw new Error("Injection of dependencies failed");
		}
		const breadcrumbs = ref([
			{
				text: i18n.t("pages.courses.index.title"),
				to: router.resolve({
					name: "rooms-overview",
				}).href,
			},
		]);

		const course = ref("");
		const courses = ref<object[]>([]);
		const title = ref<CardElement>({
			id: "",
			type: CardElementResponseCardElementTypeEnum.Title,
			model: "",
		});
		const elements = ref<CardElement[]>([]);
		const route = useRoute();

		onMounted(async () => {
			if (route.name === "rooms-task-card-new") {
				course.value = route.params.id || "";
				await roomModule.fetchContent(course.value);
				const roomData = roomModule.getRoomData;
				courses.value = [
					{
						id: roomData.roomId,
						title: roomData.title,
					},
				];
				const taskCardData = taskCardModule.getTaskCardData;
				taskCardModule.setCourseId(course.value);
				initElements(taskCardData.cardElements);

				breadcrumbs.value.push({
					text: roomData.title,
					to: router.resolve({
						name: "rooms-id",
					}).href,
				});
			}

			if (route.name === "task-card-view-edit") {
				const taskCardId = route.params.id;
				await taskCardModule.findTaskCard(taskCardId);

				const taskCardData = taskCardModule.getTaskCardData;
				course.value = taskCardData.courseId || "";
				courses.value = [
					{
						id: taskCardData.courseId || "",
						title: taskCardData.courseName || "",
					},
				];
				initElements(taskCardData.cardElements);

				breadcrumbs.value.push({
					text: taskCardData.courseName || "",
					to: router.resolve({
						name: "rooms-id",
						params: {
							id: taskCardData.courseId || "",
						},
					}).href,
				});
			}
		});

		const initElements = (cardElements: Array<CardElementResponse>) => {
			cardElements.forEach((cardElement) => {
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
							placeholder: i18n.t(
								"components.cardElement.titleElement.placeholder"
							) as string,
							editable: isEditMode.value,
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
						placeholder: i18n.t(
							"components.cardElement.richTextElement.placeholder"
						) as string,
						editable: isEditMode.value,
					},
				});
			});
		};

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
				courseId: course.value,
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
				courseId: course.value,
				cardElements: cardElements,
			});
		};

		const save = () => {
			if (route.name === "rooms-task-card-new") {
				createTaskCard();
			} else {
				updateTaskCard();
			}

			router.go(-1);
		};

		const cancel = () => {
			router.go(-1);
		};

		const getUserPermissions = ref(authModule.getUserPermissions);

		const isEditMode = computed(() => {
			if (getUserPermissions.value.includes("task_card_edit")) return true;
			return false;
		});

		return {
			breadcrumbs,
			title,
			elements,
			save,
			cancel,
			isEditMode,
			course,
			courses,
		};
	},
	mounted() {
		document.title = this.$t("common.words.tasks") as string;
	},
});
</script>
