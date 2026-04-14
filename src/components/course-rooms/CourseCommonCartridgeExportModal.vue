<template>
	<SvsDialog v-model="isExportModalOpen" :title="title" data-testid="export-dialog" @after-leave="resetDialog">
		<template #content>
			<template v-if="step === 0">
				<InfoAlert data-testid="cartridge-export-folder-info" class="mb-4">
					{{ t(`components.molecules.export.options.info.point3`) }}
				</InfoAlert>
				<VRadioGroup v-model="radios" data-testid="version-radio-group">
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
			<template v-if="step === 1">
				<InfoAlert data-testid="cartridge-export-content-info" class="mb-4">
					{{ t(`components.molecules.export.options.info`) }}

					<ul class="ml-6">
						<li>{{ t(`components.molecules.export.options.info.point2`) }}</li>
						<li v-if="radios && radios == '1.1.0'">{{ t(`components.molecules.export.options.info.point3`) }}</li>
						<li>
							{{ t(`components.molecules.export.options.info.point4`) }}
							<ul class="ml-6">
								<li>{{ t(`components.molecules.export.options.info.point4.sub1`) }}</li>
								<li>{{ t(`components.molecules.export.options.info.point4.sub2`) }}</li>
								<li>{{ t(`components.molecules.export.options.info.point4.sub3`) }}</li>
								<li v-if="radios && radios == '1.1.0'" data-testid="export-options-info-point4-sub4">
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
			<VBtn v-if="step === 1" data-testid="dialog-back-btn" class="mr-auto" @click="onBack">
				{{ t("common.actions.back") }}
			</VBtn>
			<SvsDialogBtnCancel data-testid="dialog-cancel-btn" @click="onCloseDialog" />
			<SvsDialogBtnConfirm
				v-if="step === 0"
				data-testid="dialog-next-btn"
				text-lang-key="common.actions.continue"
				@click="onNext"
			/>
			<SvsDialogBtnConfirm
				v-if="step === 1"
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
import { COMMON_CARTRIDGE_EXPORT_MODULE_KEY, COURSE_ROOM_DETAILS_MODULE_KEY, injectStrict } from "@/utils/inject";
import { notifyError, notifySuccess } from "@data-app";
import { InfoAlert } from "@ui-alert";
import { SvsDialog, SvsDialogBtnCancel, SvsDialogBtnConfirm } from "@ui-dialog";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

type Selection = {
	isSelected: boolean;
	title: string;
	id: string;
};

const { t } = useI18n();
const commonCartridgeExportModule = injectStrict(COMMON_CARTRIDGE_EXPORT_MODULE_KEY);
const courseRoomDetailsModule = injectStrict(COURSE_ROOM_DETAILS_MODULE_KEY);

const emit = defineEmits(["update:isExportModalOpen"]);

const isExportModalOpen = computed({
	get: () => commonCartridgeExportModule.getIsExportModalOpen,
	set: (value: boolean) => {
		emit("update:isExportModalOpen", commonCartridgeExportModule.setIsExportModalOpen(value));
	},
});

const radios = ref("1.1.0");
const step = ref(0);

const allTopics = ref<Array<Selection>>([]);
const allTopicsSelected = computed(() => allTopics.value.every((topic) => topic.isSelected));

const allTasks = ref<Array<Selection>>([]);
const allTasksSelected = computed(() => allTasks.value.every((task) => task.isSelected));

const allColumnBoards = ref<Array<Selection>>([]);
const allColumnBoardsSelected = computed(() => allColumnBoards.value.every((columnBoard) => columnBoard.isSelected));

watch(
	() => courseRoomDetailsModule.getRoomData.elements,
	(newValue) => {
		allTopics.value = [];
		allTasks.value = [];
		allColumnBoards.value = [];

		newValue.forEach((element: BoardElement) => {
			if (element.type === BoardElementType.LESSON) {
				allTopics.value.push({
					isSelected: true,
					title: (element.content as BoardLesson).name,
					id: element.content.id,
				});
			}

			if (element.type === BoardElementType.TASK) {
				allTasks.value.push({
					isSelected: true,
					title: (element.content as BoardTask).name,
					id: element.content.id,
				});
			}

			if (element.type === BoardElementType.COLUMN_BOARD) {
				allColumnBoards.value.push({
					isSelected: true,
					title: (element.content as BoardColumnBoard).title,
					id: element.content.id,
				});
			}
		});
	}
);

const title = computed(() =>
	step.value === 0 ? t("pages.room.modal.course.export.header") : t("pages.room.modal.course.export.options.header")
);

const someTopicsSelected = computed(
	() => allTopics.value.some((topic) => topic.isSelected) && !allTopicsSelected.value
);

const someTasksSelected = computed(() => allTasks.value.some((task) => task.isSelected) && !allTasksSelected.value);

const someColumnBoardsSelected = computed(
	() => allColumnBoards.value.some((columnBoard) => columnBoard.isSelected) && !allColumnBoardsSelected.value
);

const onCloseDialog = () => {
	isExportModalOpen.value = false;
};

function resetDialog(): void {
	radios.value = "1.1.0";
	commonCartridgeExportModule.resetExportFlow();
	step.value = 0;
	allTasks.value.forEach((task) => {
		task.isSelected = true;
	});
	allTopics.value.forEach((topic) => {
		topic.isSelected = true;
	});
	allColumnBoards.value.forEach((columnBoard) => {
		columnBoard.isSelected = true;
	});
}

function onNext(): void {
	commonCartridgeExportModule.setVersion(radios.value);
	step.value++;
}

async function onExport() {
	notifySuccess(t("common.words.export"));

	const topicIds: string[] = allTopics.value.filter((topic) => topic.isSelected).map((topic) => topic.id);
	const taskIds = allTasks.value.filter((task) => task.isSelected).map((task) => task.id);
	const columnBoardIds = allColumnBoards.value
		.filter((columnBoard) => columnBoard.isSelected)
		.map((columnBoard) => columnBoard.id);

	commonCartridgeExportModule.setTopics(topicIds);
	commonCartridgeExportModule.setTasks(taskIds);
	commonCartridgeExportModule.setColumnBoards(columnBoardIds);

	onCloseDialog();
	await commonCartridgeExportModule.startExport();

	if (courseRoomDetailsModule.getBusinessError?.statusCode !== "") {
		notifyError(t("pages.rooms.ccExportCourse.error"));
	}

	resetDialog();
}

function onBack(): void {
	step.value = 0;
	allTasks.value.forEach((task) => {
		task.isSelected = true;
	});
	allTopics.value.forEach((topic) => {
		topic.isSelected = true;
	});
	// AI next 3 lines
	allColumnBoards.value.forEach((columnBoard) => {
		columnBoard.isSelected = true;
	});
	commonCartridgeExportModule.setIsExportModalOpen(true);
}

function toggleAllTopics(): void {
	const newValue = !allTopicsSelected.value;

	allTopics.value.forEach((topic) => {
		topic.isSelected = newValue;
	});
}

function toggleAllTasks(): void {
	const newValue = !allTasksSelected.value;

	allTasks.value.forEach((task) => {
		task.isSelected = newValue;
	});
}

function toggleAllColumnBoards(): void {
	// AI next 5 lines
	const newValue = !allColumnBoardsSelected.value;

	allColumnBoards.value.forEach((columnBoard) => {
		columnBoard.isSelected = newValue;
	});
}
</script>
