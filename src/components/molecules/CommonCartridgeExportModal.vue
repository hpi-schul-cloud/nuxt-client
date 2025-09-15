<template>
	<v-dialog
		ref="exportDialog"
		v-model="isExportModalOpen"
		:max-width="560"
		data-testid="export-dialog"
		@click:outside="onCloseDialog"
		@keydown.esc="onCloseDialog"
	>
		<v-card :ripple="false">
			<template #title>
				<h2 class="mt-2">
					{{ $t(title) }}
				</h2>
			</template>
			<template #text>
				<div v-if="step === 0 && isExportModalOpen">
					<div class="">
						<v-radio-group v-model="radios">
							<v-radio
								id="1.1.0"
								:label="$t('pages.room.modal.course.export.version1.1')"
								value="1.1.0"
							/>
							<v-radio
								id="1.3.0"
								:label="$t('pages.room.modal.course.export.version1.3')"
								value="1.3.0"
							/>
						</v-radio-group>
					</div>
				</div>
				<div v-if="step === 1 && isExportModalOpen">
					<div class="d-flex flex-row pa-2 mb-4 rounded blue bg-blue-lighten-5">
						<div class="mx-2">
							<v-icon color="info">{{ mdiInformation }}</v-icon>
						</div>
						<p>
							{{ $t(`components.molecules.export.options.info`) }}
							<br />
							&middot;
							{{ $t(`components.molecules.export.options.info.point2`) }}
						</p>
					</div>
					<v-container class="pt-0">
						<v-checkbox
							v-model="allTasksSelected"
							class="d-flex"
							data-testid="all-tasks-checkbox"
							:indeterminate="someTasksSelected"
							:disabled="allTasks.length === 0"
							:label="$t('pages.room.modal.course.export.options.tasks')"
							density="compact"
							@click="toggleAllTasks"
						/>
						<v-checkbox
							v-for="item in allTasks"
							:key="item.id"
							v-model="item.isSelected"
							class="d-flex ml-8"
							:label="item.title"
							density="compact"
						/>
						<v-checkbox
							v-model="allTopicsSelected"
							class="d-flex"
							data-testid="all-topics-checkbox"
							:indeterminate="someTopicsSelected"
							:disabled="allTopics.length === 0"
							:label="$t('pages.room.modal.course.export.options.topics')"
							density="compact"
							@click="toggleAllTopics"
						/>
						<v-checkbox
							v-for="item in allTopics"
							:key="item.id"
							v-model="item.isSelected"
							class="d-flex ml-8"
							:label="item.title"
							density="compact"
						/>
						<v-checkbox
							v-model="allColumnBoardsSelected"
							class="d-flex"
							data-testid="all-column-boards-checkbox"
							:indeterminate="someColumnBoardsSelected"
							:disabled="allColumnBoards.length === 0"
							:label="$t('pages.room.modal.course.export.options.columnBoards')"
							density="compact"
							@click="toggleAllColumnBoards"
						/>
						<v-checkbox
							v-for="item in allColumnBoards"
							:key="item.id"
							v-model="item.isSelected"
							class="d-flex ml-8"
							:label="item.title"
							density="compact"
						/>
					</v-container>
				</div>
			</template>
			<template #actions>
				<div class="mb-2">
					<v-btn
						v-if="step === 1"
						data-testid="dialog-back-btn"
						class="ml-2"
						depressed
						@click="onBack"
					>
						{{ $t("common.actions.back") }}
					</v-btn>
				</div>
				<v-spacer />
				<div class="mb-2">
					<v-btn
						v-if="step === 1"
						data-testid="dialog-cancel-btn"
						class="ml-2"
						depressed
						@click="onCloseDialog"
					>
						{{ $t("common.actions.cancel") }}
					</v-btn>
					<v-btn
						v-if="step === 0"
						data-testid="dialog-cancel-btn"
						depressed
						@click="onCloseDialog"
					>
						{{ $t("common.actions.cancel") }}
					</v-btn>
					<v-btn
						v-if="step === 0"
						data-testid="dialog-next-btn"
						class="ml-2"
						color="primary"
						variant="flat"
						@click="onNext"
					>
						{{ $t("common.actions.continue") }}
					</v-btn>
					<v-btn
						v-if="step === 1"
						data-testid="dialog-export-btn"
						class="ml-2"
						color="primary"
						variant="flat"
						@click="onExport"
					>
						{{ $t("common.actions.export") }}
					</v-btn>
				</div>
			</template>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import {
	BoardColumnBoard,
	BoardElement,
	BoardElementType,
	BoardLesson,
	BoardTask,
} from "@/types/course-room/CourseRoom";
import {
	COMMON_CARTRIDGE_EXPORT_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
	COURSE_ROOM_DETAILS_MODULE_KEY,
} from "@/utils/inject";
import { mdiInformation } from "@icons/material";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

type Selection = {
	isSelected: boolean;
	title: string;
	id: string;
};

const { t } = useI18n();
const notifier = injectStrict(NOTIFIER_MODULE_KEY);
const commonCartridgeExportModule = injectStrict(
	COMMON_CARTRIDGE_EXPORT_MODULE_KEY
);
const courseRoomDetailsModule = injectStrict(COURSE_ROOM_DETAILS_MODULE_KEY);

const emit = defineEmits([
	"update:isExportModalOpen",
	"dialog-closed",
	"dialog-confirmed",
	"next",
	"back",
]);

const isExportModalOpen = computed({
	get: () => commonCartridgeExportModule.getIsExportModalOpen,
	set: (value: boolean) => {
		emit(
			"update:isExportModalOpen",
			commonCartridgeExportModule.setIsExportModalOpen(value)
		);
	},
});

const radios = ref("1.1.0");
const step = ref(0);

const allTopics = ref<Array<Selection>>([]);
const allTopicsSelected = computed(() => {
	return allTopics.value.every((topic) => topic.isSelected);
});

const allTasks = ref<Array<Selection>>([]);
const allTasksSelected = computed(() => {
	return allTasks.value.every((task) => task.isSelected);
});

const allColumnBoards = ref<Array<Selection>>([]);
const allColumnBoardsSelected = computed(() => {
	return allColumnBoards.value.every((columnBoard) => columnBoard.isSelected);
});

watch(
	() => courseRoomDetailsModule.getRoomData.elements,
	(newValue) => {
		allTopics.value = [];
		allTasks.value = [];
		allColumnBoards.value = [];

		newValue.forEach((element: BoardElement) => {
			if (element.type === BoardElementType.Lesson) {
				allTopics.value.push({
					isSelected: true,
					title: (element.content as BoardLesson).name,
					id: element.content.id,
				});
			}

			if (element.type === BoardElementType.Task) {
				allTasks.value.push({
					isSelected: true,
					title: (element.content as BoardTask).name,
					id: element.content.id,
				});
			}

			if (element.type === BoardElementType.ColumnBoard) {
				allColumnBoards.value.push({
					isSelected: true,
					title: (element.content as BoardColumnBoard).title,
					id: element.content.id,
				});
			}
		});
	}
);

const title = computed(() => {
	return step.value === 0
		? t("pages.room.modal.course.export.header")
		: t("pages.room.modal.course.export.options.header");
});

const someTopicsSelected = computed(() => {
	return (
		allTopics.value.some((topic) => topic.isSelected) &&
		!allTopicsSelected.value
	);
});

const someTasksSelected = computed(() => {
	return (
		allTasks.value.some((task) => task.isSelected) && !allTasksSelected.value
	);
});

const someColumnBoardsSelected = computed(() => {
	return (
		allColumnBoards.value.some((columnBoard) => columnBoard.isSelected) &&
		!allColumnBoardsSelected.value
	);
});

function onCloseDialog(): void {
	closeDialog();
	resetDialog();
}

function closeDialog() {
	emit("dialog-closed", false);
	isExportModalOpen.value = false;
}

function resetDialog(): void {
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
	emit("next", false);
	commonCartridgeExportModule.setVersion(radios.value);
	step.value++;
}

async function onExport(): Promise<void> {
	emit("dialog-confirmed", false);
	notifier.show({
		text: t("common.words.export"),
		status: "success",
		timeout: 5000,
	});

	const topicIds: string[] = allTopics.value
		.filter((topic) => topic.isSelected)
		.map((topic) => topic.id);
	const taskIds = allTasks.value
		.filter((task) => task.isSelected)
		.map((task) => task.id);
	const columnBoardIds = allColumnBoards.value
		.filter((columnBoard) => columnBoard.isSelected)
		.map((columnBoard) => columnBoard.id);

	commonCartridgeExportModule.setTopics(topicIds);
	commonCartridgeExportModule.setTasks(taskIds);
	commonCartridgeExportModule.setColumnBoards(columnBoardIds);

	closeDialog();
	await commonCartridgeExportModule.startExport();

	if (courseRoomDetailsModule.getBusinessError?.statusCode !== "") {
		notifier.show({
			status: "error",
			text: t("pages.rooms.ccExportCourse.error"),
			autoClose: true,
		});
	}

	resetDialog();
}

function onBack(): void {
	emit("back", false);
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
