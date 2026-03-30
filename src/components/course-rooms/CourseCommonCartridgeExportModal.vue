<template>
	<VDialog
		ref="exportDialog"
		:model-value="isOpen"
		:max-width="560"
		data-testid="export-dialog"
		@update:model-value="emit('update:isOpen')"
		@click:outside="onCloseDialog"
		@keydown.esc="onCloseDialog"
	>
		<VCard :ripple="false">
			<template #title>
				<h2 class="mt-2 text-break">
					{{ t(title) }}
				</h2>
			</template>
			<template #text>
				<div v-if="step === 'VersionSelection'">
					<div
						data-testid="fixed-export-options-warning-info-point3"
						class="d-flex flex-row pa-2 mb-4 rounded blue bg-blue-lighten-5"
					>
						<div class="mx-2">
							<VIcon color="info">{{ mdiInformation }}</VIcon>
						</div>
						<p>
							{{ t(`components.molecules.export.options.info.point3`) }}
						</p>
					</div>
					<div data-testid="version-radio-group">
						<VRadioGroup v-model="version">
							<VRadio
								id="1.1.0"
								data-testid="version-110-radio-button"
								:label="t('pages.room.modal.course.export.version1.1')"
								value="1.1.0"
							/>
							<VRadio
								id="1.3.0"
								data-testid="version-130-radio-button"
								:label="t('pages.room.modal.course.export.version1.3')"
								value="1.3.0"
							/>
						</VRadioGroup>
					</div>
				</div>
				<div v-if="step === 'ContentSelection'">
					<div class="d-flex flex-row pa-2 mb-4 rounded blue bg-blue-lighten-5">
						<div class="mx-2">
							<VIcon color="info">{{ mdiInformation }}</VIcon>
						</div>
						<p>
							{{ t(`components.molecules.export.options.info`) }}
							<br />
							&middot;
							{{ t(`components.molecules.export.options.info.point2`) }}
							<span v-if="version === '1.1.0'" data-testid="export-options-info-point3">
								<br />
								&middot;
								{{ t(`components.molecules.export.options.info.point3`) }}
							</span>
							<br />
						</p>
					</div>
					<VContainer class="pt-0">
						<VCheckbox
							v-model="allTasksSelected"
							class="d-flex"
							data-testid="all-tasks-checkbox"
							:indeterminate="someTasksSelected"
							:disabled="allTasks.length === 0"
							:label="t('pages.room.modal.course.export.options.tasks')"
							density="compact"
							@click="toggleAllTasks"
						/>
						<VCheckbox
							v-for="item in allTasks"
							:key="item.id"
							v-model="item.isSelected"
							class="d-flex ml-8"
							:label="item.title"
							density="compact"
						/>
						<VCheckbox
							v-model="allTopicsSelected"
							class="d-flex"
							data-testid="all-topics-checkbox"
							:indeterminate="someTopicsSelected"
							:disabled="allTopics.length === 0"
							:label="t('pages.room.modal.course.export.options.topics')"
							density="compact"
							@click="toggleAllTopics"
						/>
						<VCheckbox
							v-for="item in allTopics"
							:key="item.id"
							v-model="item.isSelected"
							class="d-flex ml-8"
							:label="item.title"
							density="compact"
						/>
						<VCheckbox
							v-model="allColumnBoardsSelected"
							class="d-flex"
							data-testid="all-column-boards-checkbox"
							:indeterminate="someColumnBoardsSelected"
							:disabled="allColumnBoards.length === 0"
							:label="t('pages.room.modal.course.export.options.columnBoards')"
							density="compact"
							@click="toggleAllColumnBoards"
						/>
						<VCheckbox
							v-for="item in allColumnBoards"
							:key="item.id"
							v-model="item.isSelected"
							class="d-flex ml-8"
							:label="item.title"
							density="compact"
						/>
					</VContainer>
				</div>
			</template>
			<template #actions>
				<div class="mb-2">
					<VBtn v-if="step === 'ContentSelection'" data-testid="dialog-back-btn" class="ml-2" depressed @click="onBack">
						{{ t("common.actions.back") }}
					</VBtn>
				</div>
				<VSpacer />
				<div class="mb-2">
					<VBtn
						v-if="step === 'ContentSelection'"
						data-testid="dialog-cancel-btn"
						class="ml-2"
						depressed
						@click="onCloseDialog"
					>
						{{ t("common.actions.cancel") }}
					</VBtn>
					<VBtn v-if="step === 'VersionSelection'" data-testid="dialog-cancel-btn" depressed @click="onCloseDialog">
						{{ t("common.actions.cancel") }}
					</VBtn>
					<VBtn
						v-if="step === 'VersionSelection'"
						data-testid="dialog-next-btn"
						class="ml-2"
						color="primary"
						variant="flat"
						@click="onNext"
					>
						{{ t("common.actions.continue") }}
					</VBtn>
					<VBtn
						v-if="step === 'ContentSelection'"
						data-testid="dialog-export-btn"
						class="ml-2"
						color="primary"
						variant="flat"
						@click="onExport"
					>
						{{ t("common.actions.export") }}
					</VBtn>
				</div>
			</template>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import {
	BoardColumnBoard,
	BoardElement,
	BoardElementType,
	BoardLesson,
	BoardTask,
} from "@/types/course-room/CourseRoom";
import { COURSE_ROOM_DETAILS_MODULE_KEY, injectStrict } from "@/utils/inject";
import { notifyError, notifySuccess } from "@data-app";
import { CommonCartridgeVersion, useCommonCartridgeExport } from "@data-common-cartridge";
import { mdiInformation } from "@icons/material";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

type Selection = {
	isSelected: boolean;
	title: string;
	id: string;
};

type Steps = "VersionSelection" | "ContentSelection";

const { t } = useI18n();
const courseRoomDetailsModule = injectStrict(COURSE_ROOM_DETAILS_MODULE_KEY);
const { startExport } = useCommonCartridgeExport();

defineProps<{
	isOpen: boolean;
}>();

const emit = defineEmits(["update:isOpen"]);

const version = ref<CommonCartridgeVersion>("1.1.0");
const step = ref<Steps>("VersionSelection");

const allTopics = ref<Selection[]>([]);
const allTopicsSelected = computed(() => allTopics.value.every((topic) => topic.isSelected));

const allTasks = ref<Selection[]>([]);
const allTasksSelected = computed(() => allTasks.value.every((task) => task.isSelected));

const allColumnBoards = ref<Selection[]>([]);
const allColumnBoardsSelected = computed(() => allColumnBoards.value.every((columnBoard) => columnBoard.isSelected));

const isColumnBoard = (element: BoardElement): element is BoardElement & { content: BoardColumnBoard } =>
	element.type === BoardElementType.COLUMN_BOARD;

const isLesson = (element: BoardElement): element is BoardElement & { content: BoardLesson } =>
	element.type === BoardElementType.LESSON;

const isTask = (element: BoardElement): element is BoardElement & { content: BoardTask } =>
	element.type === BoardElementType.TASK;

const toSelectionItem = (element: BoardElement): Selection => ({
	isSelected: true,
	title: "name" in element.content ? element.content.name : element.content.title,
	id: element.content.id,
});

watch(
	() => courseRoomDetailsModule.getRoomData.elements,
	(newValue) => {
		allTopics.value = [];
		allTasks.value = [];
		allColumnBoards.value = [];

		allTopics.value = newValue.filter(isLesson).map(toSelectionItem);
		allTasks.value = newValue.filter(isTask).map(toSelectionItem);
		allColumnBoards.value = newValue.filter(isColumnBoard).map(toSelectionItem);
	}
);

const title = computed(() =>
	step.value === "VersionSelection"
		? t("pages.room.modal.course.export.header")
		: t("pages.room.modal.course.export.options.header")
);

const someTopicsSelected = computed(
	() => allTopics.value.some((topic) => topic.isSelected) && !allTopicsSelected.value
);

const someTasksSelected = computed(() => allTasks.value.some((task) => task.isSelected) && !allTasksSelected.value);

const someColumnBoardsSelected = computed(
	() => allColumnBoards.value.some((columnBoard) => columnBoard.isSelected) && !allColumnBoardsSelected.value
);

const onCloseDialog = (): void => {
	emit("update:isOpen", false);
	resetDialog();
};

const setSelectedOnAllItems = (items: Selection[], newValue: boolean): void => {
	items.forEach((item) => {
		item.isSelected = newValue;
	});
};

const resetDialog = (): void => {
	step.value = "VersionSelection";
	setSelectedOnAllItems(allTasks.value, true);
	setSelectedOnAllItems(allTopics.value, true);
	setSelectedOnAllItems(allColumnBoards.value, true);
};

const onNext = (): void => {
	step.value = "ContentSelection";
};

const onExport = async (): Promise<void> => {
	notifySuccess(t("common.words.export"));

	const topicIds = allTopics.value.filter((topic) => topic.isSelected).map((topic) => topic.id);
	const taskIds = allTasks.value.filter((task) => task.isSelected).map((task) => task.id);
	const columnBoardIds = allColumnBoards.value
		.filter((columnBoard) => columnBoard.isSelected)
		.map((columnBoard) => columnBoard.id);

	await startExport(version.value, topicIds, taskIds, columnBoardIds);

	if (courseRoomDetailsModule.getBusinessError?.statusCode !== "") {
		notifyError(t("pages.rooms.ccExportCourse.error"));
	}

	onCloseDialog();
};

const onBack = (): void => {
	step.value = "VersionSelection";
	setSelectedOnAllItems(allTasks.value, true);
	setSelectedOnAllItems(allTopics.value, true);
	setSelectedOnAllItems(allColumnBoards.value, true);
};

const toggleAllTopics = (): void => {
	const newValue = !allTopicsSelected.value;
	setSelectedOnAllItems(allTopics.value, newValue);
};

const toggleAllTasks = (): void => {
	const newValue = !allTasksSelected.value;
	setSelectedOnAllItems(allTasks.value, newValue);
};

const toggleAllColumnBoards = (): void => {
	const newValue = !allColumnBoardsSelected.value;
	setSelectedOnAllItems(allColumnBoards.value, newValue);
};
</script>
