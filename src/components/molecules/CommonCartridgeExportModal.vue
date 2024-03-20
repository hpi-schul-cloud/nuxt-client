<template>
	<v-dialog
		ref="exportDialog"
		v-model="isExportModalOpen"
		:max-width="560"
		@click:outside="onCloseDialog"
		@keydown.esc="onCloseDialog"
		data-testid="export-dialog"
	>
		<v-card :ripple="false">
			<v-card-title>
				<div ref="textTitle" class="text-h4 my-2 px-6 text-break">
					{{ $t(title) }}
				</div>
			</v-card-title>
			<v-card-text class="text--primary">
				<div v-if="step === 0 && isExportModalOpen">
					<div class="">
						<v-radio-group v-model="radios">
							<v-radio
								:label="$t('pages.room.modal.course.export.version1.1')"
								id="1.1.0"
								value="1.1.0"
								color="primary"
							/>
							<v-radio
								:label="$t('pages.room.modal.course.export.version1.3')"
								id="1.3.0"
								value="1.3.0"
								color="primary"
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
							{{ $t(`components.molecules.export.options.info.point1`) }}
							<br />
							&middot;
							{{ $t(`components.molecules.export.options.info.point2`) }}
						</p>
					</div>
					<v-container class="pt-0">
						<v-checkbox
							class="check-options"
							v-model="allTopicsSelected"
							data-testid="all-topics-checkbox"
							:indeterminate="someTopicsSelected"
							@click="toggleAllTopics"
							:label="$t('pages.room.modal.course.export.options.topics')"
						/>
						<v-checkbox
							class="check-options ml-8"
							v-for="item in allTopics"
							v-model="item.isSelected"
							:key="item.id"
							:label="item.title"
						/>
						<v-checkbox
							class="check-options"
							v-model="allTasksSelected"
							data-testid="all-tasks-checkbox"
							:indeterminate="someTasksSelected"
							@click="toggleAllTasks"
							:label="$t('pages.room.modal.course.export.options.tasks')"
						/>
						<v-checkbox
							class="check-options ml-8"
							v-for="item in allTasks"
							v-model="item.isSelected"
							:key="item.id"
							:label="item.title"
						/>
					</v-container>
				</div>
			</v-card-text>
			<v-card-actions>
				<div class="button-section">
					<v-btn
						v-if="step === 1"
						data-testid="dialog-back-btn"
						depressed
						@click="onBack"
					>
						{{ $t("common.actions.back") }}
					</v-btn>
				</div>
				<v-spacer />
				<div class="button-section">
					<v-btn
						v-if="step === 1"
						data-testid="dialog-cancel-btn"
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
						color="primary"
						variant="flat"
						@click="onNext"
					>
						{{ $t("common.actions.continue") }}
					</v-btn>
					<v-btn
						v-if="step === 1"
						data-testid="dialog-export-btn"
						@click="onExport"
						color="primary"
						variant="flat"
					>
						{{ $t("common.actions.export") }}
					</v-btn>
				</div>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import {
	COMMON_CARTRIDGE_EXPORT_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { mdiInformation } from "@mdi/js";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const notifier = injectStrict(NOTIFIER_MODULE_KEY);
const commonCartridgeExportModule = injectStrict(
	COMMON_CARTRIDGE_EXPORT_MODULE_KEY
);
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
const allTopics = ref<
	Array<{ isSelected: boolean; title: string; id: string }>
>([
	{ isSelected: true, title: "Thema-title1", id: "topic-1" },
	{ isSelected: true, title: "Thema-title2", id: "topic-2" },
	{ isSelected: true, title: "Thema-title3", id: "topic-3" },
]);
const allTopicsSelected = computed(() => {
	return allTopics.value.every((topic) => topic.isSelected);
});
const allTasks = ref<Array<{ isSelected: boolean; title: string; id: string }>>(
	[
		{ isSelected: true, title: "Aufgabe-title1", id: "task-1" },
		{ isSelected: true, title: "Aufgabe-title2", id: "task-2" },
		{ isSelected: true, title: "Aufgabe-title3", id: "task-3" },
	]
);
const allTasksSelected = computed(() => {
	return allTasks.value.every((topic) => topic.isSelected);
});

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

function onCloseDialog(): void {
	emit("dialog-closed", false);
	commonCartridgeExportModule.resetExportFlow();
	step.value = 0;
	allTasks.value.forEach((task) => {
		task.isSelected = true;
	});
	allTopics.value.forEach((topic) => {
		topic.isSelected = true;
	});
}

function onNext(newValue: string): void {
	emit("next", false);
	commonCartridgeExportModule.setVersion(newValue);
	step.value++;
}

async function onExport(): Promise<void> {
	emit("dialog-confirmed", false);
	notifier.show({
		text: t("common.words.export"),
		status: "success",
		timeout: 10000,
	});
	await commonCartridgeExportModule.startExport(radios.value);
	onCloseDialog();
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
</script>

<style lang="scss" scoped>
.button-section {
	margin-bottom: calc(var(--space-base-vuetify) * 2);
}

.button-section > button {
	margin-left: calc(var(--space-base-vuetify) * 2);
}
.check-options {
	display: flex;
}
</style>
