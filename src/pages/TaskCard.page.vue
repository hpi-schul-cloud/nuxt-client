<template>
	<default-wireframe :full-width="false" :breadcrumbs="breadcrumbs">
		<div slot="header" class="d-flex flex-row align-end">
			<v-icon size="20" class="mr-2 mb-4 pb-1">$tasks</v-icon>
			<h1 class="h6 mt-10">
				{{ t("pages.rooms.fab.add.betatask") }}
			</h1>
		</div>
		<v-form v-if="isEditMode" class="d-flex flex-column">
			<v-select
				v-model="course"
				:items="courses"
				item-value="id"
				item-text="title"
				filled
				:disabled="isCreationMode ? false : !!course"
				:label="$t('common.labels.course')"
			/>
			<v-select
				v-model="isVisible"
				:items="visibilityOptions"
				item-value="value"
				item-text="text"
				filled
				disabled
				:label="$t('common.labels.visibility')"
			/>
			<date-time-picker
				class="mb-4"
				required
				:date-time="dueDate"
				:date-input-label="t('pages.taskCard.labels.dateInput')"
				:minDate="minDate"
				:maxDate="maxDate"
				:time-input-label="t('components.organisms.FormNews.label.time')"
				@input="handleDateTimeInput"
				@error="onError"
			/>
			<title-card-element
				v-model="title"
				:placeholder="t('components.cardElement.titleElement.placeholder')"
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
			<title-card-element v-model="title" :editable="false" />
			<card-element-list v-model="elements" :editMode="false" />
		</article>
	</default-wireframe>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted, computed, Ref } from "vue";
import { useTitle } from "@vueuse/core";
import { useRouter, useRoute } from "vue-router/composables";
import VueI18n from "vue-i18n";
import { taskCardModule, roomModule, schoolsModule } from "@/store";
import AuthModule from "@/store/auth";
import Theme from "@/theme.config";
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
import DateTimePicker from "@/components/date-time-picker/DateTimePicker.vue";
import RoomsModule from "@/store/rooms";

// TODO - unit tests!
export default defineComponent({
	name: "TaskCard",
	components: {
		DefaultWireframe,
		TitleCardElement,
		CardElementList,
		DateTimePicker,
	},
	setup() {
		const router = useRouter();

		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const authModule: AuthModule | undefined = inject<AuthModule>("authModule");
		const roomsModule: RoomsModule | undefined =
			inject<RoomsModule>("roomsModule");
		if (!i18n || !authModule || !roomsModule) {
			throw new Error("Injection of dependencies failed");
		}
		const t = (key: string) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		useTitle(
			`${i18n.t("pages.rooms.fab.add.betatask").toString()} - ${
				Theme.short_name
			}`
		);

		const breadcrumbs = ref<object[]>([]);

		const course = ref("");
		const courses = ref<object[]>([]);
		const isVisible: Ref<boolean> = ref(true);
		const visibilityOptions = ref<object[]>([
			{
				text: t("common.labels.visible"),
				value: true,
			},
			{
				text: t("common.labels.notVisible"),
				value: false,
			},
		]);
		const title = ref("");
		const dueDate = ref("");
		const elements = ref<CardElement[]>([]);
		const route = useRoute();

		const minDate = new Date().toISOString();
		const maxDate = ref("");

		onMounted(async () => {
			const endOfSchoolYear = new Date(schoolsModule.getCurrentYear.endDate);
			endOfSchoolYear.setHours(12);
			maxDate.value = endOfSchoolYear.toISOString();

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
				dueDate.value = endOfSchoolYear.toISOString();
				initElements(taskCardData.cardElements);

				breadcrumbs.value.push(
					{
						text: i18n.t("pages.courses.index.title"),
						to: {
							name: "rooms-overview",
						},
					},
					{
						text: roomData.title,
						to: {
							name: "rooms-id",
						},
					}
				);
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
				isVisible.value = !taskCardData.task.status.isDraft;
				dueDate.value = taskCardData.dueDate;
				initElements(taskCardData.cardElements);

				breadcrumbs.value.push(
					{
						text: i18n.t("pages.courses.index.title"),
						to: {
							name: "rooms-overview",
						},
					},
					{
						text: taskCardData.courseName || "",
						to: {
							name: "rooms-id",
							params: {
								id: taskCardData.courseId || "",
							},
						},
					}
				);
			}

			if (route.name === "tasks-task-card-new") {
				await roomsModule.fetchAllElements();
				courses.value = roomsModule.getAllElements;

				const taskCardData = taskCardModule.getTaskCardData;
				dueDate.value = endOfSchoolYear.toISOString();
				initElements(taskCardData.cardElements);

				breadcrumbs.value.push({
					text: i18n.t("common.words.tasks"),
					to: {
						name: "tasks",
					},
				});
			}
		});

		const initElements = (cardElements: Array<CardElementResponse> = []) => {
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

		const createTaskCard = async () => {
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

			await taskCardModule.createTaskCard({
				courseId: course.value,
				title: title.value,
				cardElements: cardElements,
				dueDate: dueDate.value,
			});
		};

		const updateTaskCard = async () => {
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

			await taskCardModule.updateTaskCard({
				dueDate: dueDate.value,
				courseId: course.value,
				title: title.value,
				cardElements: cardElements,
			});
		};

		const save = async () => {
			if (hasErrors.value) {
				return;
			}

			if (
				route.name === "rooms-task-card-new" ||
				route.name === "tasks-task-card-new"
			) {
				await createTaskCard();
			} else {
				await updateTaskCard();
			}

			router.go(-1);
		};

		const hasErrors = ref(false);
		const onError = () => {
			hasErrors.value = true;
		};

		const cancel = () => {
			router.go(-1);
		};

		const handleDateTimeInput = (dateTime: string) => {
			hasErrors.value = false;
			dueDate.value = dateTime;
		};
		const getUserPermissions = ref(authModule.getUserPermissions);

		const isEditMode = computed(() => {
			return getUserPermissions.value.includes("task_card_edit");
		});

		const isCreationMode = computed(() => {
			return route.name === "tasks-task-card-new";
		});

		return {
			breadcrumbs,
			title,
			dueDate,
			elements,
			save,
			cancel,
			t,
			handleDateTimeInput,
			isEditMode,
			isCreationMode,
			course,
			courses,
			onError,
			minDate,
			maxDate,
			isVisible,
			visibilityOptions,
		};
	},
});
</script>
