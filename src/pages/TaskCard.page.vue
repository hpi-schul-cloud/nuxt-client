<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		:headline="t('pages.rooms.fab.add.betatask')"
	>
		<v-form
			v-if="isEditMode && !isLoading"
			class="d-flex flex-column"
			ref="form"
		>
			<v-select
				v-model="course"
				:items="courses"
				item-value="id"
				item-text="title"
				filled
				:disabled="isCourseSelectDisabled"
				:label="$t('common.labels.course')"
				validate-on-blur
				:rules="[rules.required]"
			/>
			<v-select
				v-model="isVisible"
				:items="visibilityOptions"
				item-value="value"
				item-text="text"
				filled
				disabled
				:label="$t('common.labels.visibility')"
				validate-on-blur
				:rules="[rules.required]"
			/>
			<date-time-picker
				class="mb-4"
				required
				:allow-past="false"
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
			<div class="d-flex">
				<v-btn color="primary" depressed @click="save" data-testid="save-btn">
					{{ $t("common.actions.save") }}
				</v-btn>
				<v-btn
					class="ml-2"
					color="secondary"
					outlined
					@click="cancel"
					data-testid="cancel-btn"
				>
					{{ $t("common.actions.cancel") }}
				</v-btn>
				<v-btn
					v-if="isDeletable"
					class="ml-auto"
					color="secondary"
					outlined
					@click="openDeleteDialog()"
					data-testid="delete-btn"
				>
					{{ $t("common.actions.remove") }}
				</v-btn>
			</div>
			<v-custom-dialog
				ref="delete-dialog"
				v-model="deleteDialog.isOpen"
				data-testid="delete-beta-task-dialog"
				:size="375"
				has-buttons
				confirm-btn-title-key="common.actions.remove"
				@dialog-confirmed="deleteElement()"
				:is-open="false"
			>
				<h2 slot="title" class="text-h4 my-2">
					{{ $t("pages.taskCard.deleteTaskCard.title") }}
				</h2>
				<template slot="content">
					<p class="text-md mt-2">
						{{ $t("pages.taskCard.deleteTaskCard.text", { title }) }}
					</p>
				</template>
			</v-custom-dialog>
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
import { notifierModule } from "@/store";
import AuthModule from "@/store/auth";
import RoomsModule from "@/store/rooms";
import RoomModule from "@/store/room";
import SchoolsModule from "@/store/schools";
import TaskCardModule from "@/store/task-card";
import Theme from "@/theme.config";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import TitleCardElement from "@/components/card-elements/TitleCardElement.vue";
import CardElementList from "@/components/card-elements/CardElementList.vue";
import {
	CardElement,
	CardElementComponentEnum,
} from "@/store/types/card-element";
import { AlertMessage } from "@/store/types/alert-payload";
import {
	CardElementResponse,
	CardElementResponseCardElementTypeEnum,
	RichTextCardElementParamInputFormatEnum,
	CardElementParams,
	CardRichTextElementResponseInputFormatEnum,
} from "@/serverApi/v3";
import DateTimePicker from "@/components/date-time-picker/DateTimePicker.vue";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";

import { ApiValidationError, ErrorDetails } from "@/store/types/commons";

interface VForm extends HTMLFormElement {
	validate(): boolean;
}

// TODO - unit tests!
export default defineComponent({
	name: "TaskCard",
	components: {
		DefaultWireframe,
		TitleCardElement,
		CardElementList,
		DateTimePicker,
		vCustomDialog,
	},
	setup() {
		const router = useRouter();

		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const authModule: AuthModule | undefined = inject<AuthModule>("authModule");
		const roomModule: RoomModule | undefined = inject<RoomModule>("roomModule");
		const roomsModule: RoomsModule | undefined =
			inject<RoomsModule>("roomsModule");
		const schoolsModule: SchoolsModule | undefined =
			inject<SchoolsModule>("schoolsModule");
		const taskCardModule: TaskCardModule | undefined =
			inject<TaskCardModule>("taskCardModule");
		if (
			!i18n ||
			!authModule ||
			!roomsModule ||
			!roomModule ||
			!schoolsModule ||
			!taskCardModule
		) {
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

		const deleteDialog = ref({
			isOpen: false,
			taskCardId: "",
		});

		const openDeleteDialog = () => {
			deleteDialog.value.isOpen = true;
			deleteDialog.value.taskCardId = route.params.id;
		};

		const deleteElement = async () => {
			await deleteTaskCard(deleteDialog.value.taskCardId);
			deleteDialog.value.isOpen = false;
			deleteDialog.value.taskCardId = "";
		};

		const breadcrumbs = ref<object[]>([]);

		const isLoading = ref(true);

		const form = ref<VForm | null>(null);
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

		const isDeletable: Ref<boolean> = ref(false);

		onMounted(async () => {
			const endOfSchoolYear = new Date(schoolsModule.getCurrentYear.endDate);
			endOfSchoolYear.setHours(12);
			maxDate.value = endOfSchoolYear.toISOString();

			if (route.name === "rooms-beta-task-new") {
				course.value = route.params.id || "";
				await roomModule.fetchContent(course.value);
				const roomData = roomModule.getRoomData;
				courses.value = [
					{
						id: roomData.roomId,
						title: roomData.title,
					},
				];
				const initialCardElements = [
					{
						id: "",
						cardElementType: CardElementResponseCardElementTypeEnum.RichText,
						content: {
							value: "",
							inputFormat:
								CardRichTextElementResponseInputFormatEnum.RichtextCk5,
						},
					},
				];

				dueDate.value = endOfSchoolYear.toISOString();
				initElements(initialCardElements);
				isLoading.value = false;
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

			if (route.name === "beta-task-view-edit") {
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
				if (taskCardData.id !== "") {
					isDeletable.value = !!taskCardData.id;
				}
				isVisible.value = !taskCardData.task.status.isDraft;
				dueDate.value = taskCardData.dueDate;

				initElements(taskCardData.cardElements);
				isLoading.value = false;

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

			if (route.name === "tasks-beta-task-new") {
				await roomsModule.fetchAllElements();
				courses.value = roomsModule.getAllElements;
				const initialCardElements = [
					{
						id: "",
						cardElementType: CardElementResponseCardElementTypeEnum.RichText,
						content: {
							value: "",
							inputFormat:
								CardRichTextElementResponseInputFormatEnum.RichtextCk5,
						},
					},
				];

				dueDate.value = endOfSchoolYear.toISOString();
				initElements(initialCardElements);
				isLoading.value = false;
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

		const createTaskCard = async () => {
			const cardElements: Array<CardElementParams> = [];
			elements.value.forEach((element) => {
				const cardElement: CardElementParams = {
					content: {
						type: element.type,
						value: element.model,
						inputFormat: RichTextCardElementParamInputFormatEnum.RichtextCk5,
					},
				};
				cardElements.push(cardElement);
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
			if (form.value) {
				const valid = form.value.validate();
				if (!valid) {
					return;
				}
			}

			if (hasErrors.value) {
				return;
			}
			if (
				route.name === "rooms-beta-task-new" ||
				route.name === "tasks-beta-task-new"
			) {
				await createTaskCard();
			} else {
				await updateTaskCard();
			}

			if (taskCardModule.getStatus === "error") {
				const validationError = taskCardModule.getBusinessError
					.error as ApiValidationError;
				const validationErrors = validationError?.validationErrors;

				notifierModule.show({
					messages: createServerErrorMessages(validationErrors),
					status: "error",
				});
			} else {
				router.go(-1);
			}
		};

		const createServerErrorMessages = (errors: Array<ErrorDetails>) => {
			const errorMessages: Array<AlertMessage> = [];
			errors.forEach((validationError: ErrorDetails) => {
				const msg: AlertMessage = { title: "", text: "" };
				msg.title = validationError.field[0] + ":";

				let errorText = "";
				validationError.errors.forEach((error: string, index: number) => {
					if (index === 0) {
						errorText = errorText + error;
					} else {
						errorText = errorText + ", " + error;
					}
				});

				msg.text = errorText;
				errorMessages.push(msg);
			});

			return errorMessages;
		};

		const rules = {
			required: (value: string) => !!value || t("common.validation.required"),
		};

		const deleteTaskCard = async (taskCardId: string) => {
			await taskCardModule.deleteTaskCard(taskCardId);
			if (taskCardModule.getStatus === "error") {
				const error = taskCardModule.getBusinessError;
				if (error.statusCode === 400) {
					const validationError = error?.error as ApiValidationError;
					notifierModule.show({
						messages: createServerErrorMessages(
							validationError.validationErrors
						),
						status: "error",
					});
				} else {
					notifierModule.show({
						text: error.message,
						status: "error",
					});
				}
			} else {
				router.go(-1);
			}
		};

		const hasErrors = ref(false);
		const errorMessage = ref("");
		const onError = () => {
			hasErrors.value = true;
		};

		const cancel = () => {
			router.go(-1);
		};

		const handleDateTimeInput = (dateTime: string) => {
			dueDate.value = dateTime;
		};
		const getUserPermissions = ref(authModule.getUserPermissions);

		const isEditMode = computed(() => {
			return getUserPermissions.value.includes("task_card_edit");
		});

		const isCourseSelectDisabled = computed(() => {
			if (route.name === "tasks-beta-task-new") {
				return false;
			}
			return !!course.value;
		});

		return {
			breadcrumbs,
			title,
			deleteDialog,
			deleteElement,
			openDeleteDialog,
			dueDate,
			elements,
			save,
			cancel,
			deleteTaskCard,
			t,
			handleDateTimeInput,
			isEditMode,
			isCourseSelectDisabled,
			course,
			courses,
			onError,
			minDate,
			maxDate,
			errorMessage,
			rules,
			isVisible,
			visibilityOptions,
			isLoading,
			form,
			isDeletable,
		};
	},
});
</script>
