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
			<date-time-picker
				class="mb-4"
				required
				:date-time="dueDate"
				:date-input-label="t('pages.taskCard.labels.dateInput')"
				:time-input-label="t('components.organisms.FormNews.label.time')"
				@input="handleDateTimeInput"
				@error="onError"
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
import { taskCardModule, roomModule, schoolsModule } from "@/store";
import AuthModule from "@/store/auth";
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
import DateTimePicker from "@/components/date-time-picker/DateTimePicker.vue";

// TODO - unit tests!
export default defineComponent({
	name: "TaskCard",
	components: {
		DefaultWireframe,
		CardElementWrapper,
		CardElementList,
		DateTimePicker,
	},
	setup() {
		const router = useRouter();

		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const authModule: AuthModule | undefined = inject<AuthModule>("authModule");
		if (!i18n || !authModule) {
			throw new Error("Injection of dependencies failed");
		}
		const t = (key: string) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

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
		const dueDate = ref("");
		const elements = ref<CardElement[]>([]);
		const route = useRoute();

		onMounted(async () => {
			const taskCardData = taskCardModule.getTaskCardData;

			const endOfSchoolYear = new Date(schoolsModule.getCurrentYear.endDate);
			endOfSchoolYear.setHours(12);
			dueDate.value = taskCardData.dueDate || endOfSchoolYear.toISOString();

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
				dueDate: dueDate.value,
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
				dueDate: dueDate.value,
				courseId: course.value,
				cardElements: cardElements,
			});
		};

		const save = () => {
			if (hasErrors.value) {
				return;
			}

			if (route.name === "rooms-task-card-new") {
				createTaskCard();
			} else {
				updateTaskCard();
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
			course,
			courses,
			onError,
		};
	},
	mounted() {
		document.title = `${this.$t("common.words.tasks")} - ${
			this.$theme.short_name
		}`;
	},
});
</script>
