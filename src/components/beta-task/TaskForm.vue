<template>
	<v-form class="d-flex flex-column" ref="form">
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
			:menu-props="{ bottom: true, offsetY: true }"
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
			:menu-props="{ bottom: true, offsetY: true }"
		/>
		<date-time-picker
			class="mb-4"
			required
			:allow-past="false"
			:date-time="dueDate"
			:date-input-label="t('pages.taskCard.labels.dateInput')"
			:minDate="minDate"
			:maxDate="dueDateMax"
			:time-input-label="t('components.organisms.FormNews.label.time')"
			@input="handleDateTimeInput"
		/>
		<title-card-element
			v-model="title"
			:placeholder="t('components.cardElement.titleElement.placeholder')"
			editable
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
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted, Ref, PropType } from "vue";
import { useRouter, useRoute } from "vue-router/composables";
import VueI18n from "vue-i18n";
import TaskCardModule from "@/store/task-card";
import NotifierModule from "@/store/notifier";
import {
	CardElement,
	CardElementComponentEnum,
} from "@/store/types/beta-task/card-element";
import { AlertMessage } from "@/store/types/alert-payload";
import {
	CardElementResponseCardElementTypeEnum,
	RichTextCardElementParamInputFormatEnum,
	CardElementParams,
} from "@/serverApi/v3";
import { ApiValidationError, ErrorDetails } from "@/store/types/commons";
import DateTimePicker from "@/components/date-time-picker/DateTimePicker.vue";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import TitleCardElement from "@/components/card-elements/TitleCardElement.vue";
import CardElementList from "@/components/card-elements/CardElementList.vue";
import { TaskCard } from "@/store/types/beta-task/beta-task";

interface VForm extends HTMLFormElement {
	validate(): boolean;
}

// TODO - unit tests!
export default defineComponent({
	name: "TaskForm",
	components: {
		TitleCardElement,
		CardElementList,
		DateTimePicker,
		vCustomDialog,
	},
	props: {
		isEditMode: {
			type: Boolean,
			required: true,
		},
		courses: {
			type: Array,
			required: true,
		},
		dueDateMax: {
			type: String,
			default: "",
		},
		task: {
			type: Object as PropType<TaskCard>,
			default: null,
		},
	},
	setup(props) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const taskCardModule: TaskCardModule | undefined =
			inject<TaskCardModule>("taskCardModule");
		const notifierModule: NotifierModule | undefined =
			inject<NotifierModule>("notifierModule");
		if (!i18n || !taskCardModule || !notifierModule) {
			throw new Error("Injection of dependencies failed");
		}

		const t = (key: string) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const router = useRouter();
		const route = useRoute();
		const minDate = new Date().toISOString();
		const isCourseSelectDisabled = route.name === "beta-task-view-edit";
		const rules = {
			required: (value: string) => !!value || t("common.validation.required"),
		};
		const visibilityOptions = [
			{
				text: t("common.labels.visible"),
				value: true,
			},
			{
				text: t("common.labels.notVisible"),
				value: false,
			},
		];

		const form = ref<VForm | null>(null);
		const errorMessage = ref("");

		const course = ref(props.task?.courseId || "");
		const isVisible: Ref<boolean> = ref(
			props.task?.task.status.isDraft || true
		);
		const dueDate = ref(props.task?.dueDate || props.dueDateMax);
		const title = ref(props.task?.title || "");
		const elements = ref<CardElement[]>(
			props.task?.cardElements || [
				{
					id: "",
					type: CardElementResponseCardElementTypeEnum.RichText,
					model: "",
					props: {
						component: CardElementComponentEnum.RichText,
						placeholder: i18n.t(
							"components.cardElement.richTextElement.placeholder"
						) as string,
						editable: props.isEditMode,
					},
				},
			]
		);
		const isDeletable = ref(!!props.task?.id || false);
		const deleteDialog = ref({
			isOpen: false,
			taskCardId: "",
		});

		onMounted(() => {
			if (route.name === "rooms-beta-task-new") {
				course.value = route.params.id;
			}
		});

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

		const deleteTaskCard = async (taskCardId: string) => {
			await taskCardModule.deleteTaskCard(taskCardId);

			if (taskCardModule.getStatus === "error") {
				showServerError();
			} else {
				router.go(-1);
			}
		};

		const save = async () => {
			if (form.value) {
				const valid = form.value.validate();
				if (!valid) {
					return;
				}
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
				showServerError();
			} else {
				router.go(-1);
			}
		};

		const showServerError = () => {
			const error = taskCardModule.getBusinessError;
			if (error.statusCode === 400) {
				const validationError = error?.error as ApiValidationError;
				const validationErrors = validationError?.validationErrors;
				if (validationErrors) {
					notifierModule.show({
						messages: createServerErrorMessages(validationErrors),
						status: "error",
					});
				} else {
					notifierModule.show({
						text: validationError.message,
						status: "error",
					});
				}
			} else {
				notifierModule.show({
					text: error.message,
					status: "error",
				});
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

		const cancel = () => {
			router.go(-1);
		};

		const handleDateTimeInput = (dateTime: string) => {
			dueDate.value = dateTime;
		};

		const openDeleteDialog = () => {
			deleteDialog.value.isOpen = true;
			deleteDialog.value.taskCardId = route.params.id;
		};

		const deleteElement = async () => {
			await deleteTaskCard(deleteDialog.value.taskCardId);
			deleteDialog.value.isOpen = false;
			deleteDialog.value.taskCardId = "";
		};

		return {
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
			course,
			minDate,
			errorMessage,
			rules,
			isVisible,
			visibilityOptions,
			form,
			isDeletable,
			isCourseSelectDisabled,
		};
	},
});
</script>
