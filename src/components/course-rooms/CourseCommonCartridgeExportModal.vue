<template>
	<SvsDialog :model-value="props.isOpen" :title="title" data-testid="export-dialog" @after-leave="resetDialog">
		<template #content>
			<template v-if="step === 'VersionSelection'">
				<InfoAlert data-testid="cartridge-export-folder-info" class="mb-4">
					{{ t(`components.molecules.export.options.info.point3`) }}
				</InfoAlert>
				<VRadioGroup v-model="version" data-testid="version-radio-group">
					<VRadio
						id="1.1.0"
						data-testid="version-110-radio-button"
						:label="$t('pages.room.modal.course.export.version1.1')"
						value="1.1.0"
					/>
					<VRadio
						id="1.3.0"
						data-testid="version-130-radio-button"
						:label="$t('pages.room.modal.course.export.version1.3')"
						value="1.3.0"
					/>
				</VRadioGroup>
			</template>
			<template v-if="step === 'ContentSelection'">
				<InfoAlert data-testid="cartridge-export-content-info" class="mb-4">
					{{ t(`components.molecules.export.options.info`) }}

					<ul class="ml-6">
						<li>{{ t(`components.molecules.export.options.info.point2`) }}</li>
						<li v-if="version === '1.1.0'">{{ t(`components.molecules.export.options.info.point3`) }}</li>
						<li>
							{{ t(`components.molecules.export.options.info.point4`) }}
							<ul class="ml-6">
								<li>{{ t(`components.molecules.export.options.info.point4.sub1`) }}</li>
								<li>{{ t(`components.molecules.export.options.info.point4.sub2`) }}</li>
								<li>{{ t(`components.molecules.export.options.info.point4.sub3`) }}</li>
								<li v-if="version === '1.1.0'" data-testid="export-options-info-point4-sub4">
									{{ t(`components.molecules.export.options.info.point4.sub4`) }}
								</li>
								<li>{{ t(`components.molecules.export.options.info.point4.sub5`) }}</li>
								<li>{{ t(`components.molecules.export.options.info.point4.sub6`) }}</li>
							</ul>
						</li>
					</ul>
				</InfoAlert>
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
			</template>
		</template>
		<template #actions>
			<VBtn v-if="step === 'ContentSelection'" data-testid="dialog-back-btn" class="mr-auto" @click="onPreviousStep">
				{{ t("common.actions.back") }}
			</VBtn>
			<SvsDialogBtnCancel data-testid="dialog-cancel-btn" @click="closeDialog" />
			<SvsDialogBtnConfirm
				v-if="step === 'VersionSelection'"
				data-testid="dialog-next-btn"
				text-lang-key="common.actions.continue"
				@click="onNextStep"
			/>
			<SvsDialogBtnConfirm
				v-if="step === 'ContentSelection'"
				data-testid="dialog-export-btn"
				text-lang-key="common.actions.export"
				@click="onExport"
			/>
		</template>
	</SvsDialog>
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
import { type CommonCartridgeVersion, startExport } from "@data-common-cartridge";
import { InfoAlert } from "@ui-alert";
import { SvsDialog, SvsDialogBtnCancel, SvsDialogBtnConfirm } from "@ui-dialog";
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

const props = defineProps<{
	isOpen: boolean;
	roomId: string;
}>();

const emit = defineEmits<{
	"update:isOpen": [value: boolean];
}>();

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
	},
	{ immediate: true }
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

const setSelectedOnAllItems = (items: Selection[], newValue: boolean): void => {
	items.forEach((item) => {
		item.isSelected = newValue;
	});
};

const closeDialog = (): void => {
	emit("update:isOpen", false);
};

const resetDialog = (): void => {
	step.value = "VersionSelection";
	setSelectedOnAllItems(allTasks.value, true);
	setSelectedOnAllItems(allTopics.value, true);
	setSelectedOnAllItems(allColumnBoards.value, true);
};

const onPreviousStep = (): void => resetDialog();

const onNextStep = (): void => {
	step.value = "ContentSelection";
};

const onExport = async (): Promise<void> => {
	const topicIds = allTopics.value.filter((topic) => topic.isSelected).map((topic) => topic.id);
	const taskIds = allTasks.value.filter((task) => task.isSelected).map((task) => task.id);
	const columnBoardIds = allColumnBoards.value.filter((board) => board.isSelected).map((board) => board.id);

	await startExport(version.value, props.roomId, topicIds, taskIds, columnBoardIds);
	notifySuccess(t("pages.rooms.ccExportCourse.started"));

	if (courseRoomDetailsModule.getBusinessError.statusCode !== "") {
		notifyError(t("pages.rooms.ccExportCourse.error"));
	}

	closeDialog();
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
