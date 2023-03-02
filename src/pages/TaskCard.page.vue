<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Beta Aufgabe"
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
			<title-card-element
				v-model="title"
				:placeholder="$t('components.cardElement.titleElement.placeholder')"
				:editable="true"
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
			<title-card-element v-model="title" editable="false" />
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
import TitleCardElement from "@/components/card-elements/TitleCardElement.vue";
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
		TitleCardElement,
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
		const title = ref("");
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
				title.value = taskCardData.title;
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

		// TODO improve with regular frontend validation, needed for now to satisfy backend validation
		const validate = (content: string) => {
			return content.length > 2;
		};

		const createTaskCard = () => {
			const cardElements: Array<CardElementParams> = [];
			elements.value.forEach((element) => {
				if (validate(element.model)) {
					const cardElement: CardElementParams = {
						content: {
							type: element.type,
							value: element.model,
							inputFormat: RichTextCardElementParamInputFormatEnum.RichtextCk5,
						},
					};
					cardElements.push(cardElement);
				}
			});
			taskCardModule.createTaskCard({
				courseId: course.value,
				title: title.value,
				cardElements: cardElements,
			});
		};

		const updateTaskCard = () => {
			const cardElements: Array<CardElementParams> = [];
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
				title: title.value,
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
			return getUserPermissions.value.includes("task_card_edit");
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
