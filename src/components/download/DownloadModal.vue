<template>
	<v-dialog
		ref="downloadDialog"
		:value="isOpen"
		:max-width="maxWidth"
		@click:outside="onCloseDialog"
		@keydown.esc="onCloseDialog"
		data-testid="download-dialog"
	>
		<v-card :ripple="false">
			<v-card-title>
				<div ref="textTitle" class="text-h4 my-2 text-break">
					{{ $t(title) }}
				</div>
			</v-card-title>
			<v-card-text class="text--primary">
				<div v-if="step === 0 && isOpen">
					<div class="">
						<v-radio-group v-model="radios">
							<v-radio
								label="Common Cartridge Version 1.1   (z.B kompatibel mit Moodle)"
								id="1.1.0"
								value="1.1.0"
							/>
							<v-radio
								label="Common Cartridge Version 1.3"
								id="1.3.0"
								value="1.3.0"
							/>
						</v-radio-group>
					</div>
				</div>
				<div v-if="step === 1 && isOpen">
					<div
						class="d-flex flex-row pa-2 mb-4 rounded blue lighten-5 background"
					>
						<div class="mx-2">
							<v-icon color="info">{{ mdiInformation }}</v-icon>
						</div>
						<p>
							<strong>
								{{ $t(`components.molecules.download.options.info`) }}
							</strong>
							<br />
							&middot;
							{{ $t(`components.molecules.download.options.info.point1`) }}
							<br />
							&middot;
							{{ $t(`components.molecules.download.options.info.point2`) }}
						</p>
					</div>
					<v-container fluid>
						<v-checkbox
							:value="allTopicsSelected"
							:indeterminate="someTopicsSelected"
							@click="toggleAllTopics"
							label="Themen:"
						/>

						<v-checkbox
							v-for="item in allTopics"
							v-model="item.isSelected"
							:key="item.id"
							:label="item.title"
							class="mt-2 ml-8"
						/>
						<v-checkbox
							:value="allTasksSelected"
							:indeterminate="someTasksSelected"
							@click="toggleAllTasks"
							label="Aufgaben:"
						/>

						<v-checkbox
							v-for="item in allTasks"
							v-model="item.isSelected"
							:key="item.id"
							:label="item.title"
							class="mt-2 ml-8"
						/>
					</v-container>
				</div>
			</v-card-text>
			<v-card-actions>
				<div class="button-section">
					<v-btn
						v-if="isOpen"
						data-testid="dialog-cancel-btn"
						@click="onCloseDialog"
					>
						{{ $t("common.actions.cancel") }}
					</v-btn>
				</div>
				<v-spacer />
				<div class="button-section">
					<v-btn
						v-if="step === 0 && isOpen"
						data-testid="dialog-next-btn"
						color="primary"
						@click="onNext"
					>
						{{ $t("common.actions.continue") }}
					</v-btn>
					<v-btn
						v-if="step === 1 && isOpen"
						data-testid="dialog-back-btn"
						@click="onBack"
					>
						{{ $t("common.actions.back") }}
					</v-btn>
					<v-btn
						v-if="step === 1 && isOpen"
						data-testid="dialog-export-btn"
						@click="onDownload"
						color="primary"
					>
						{{ $t("common.actions.export") }}
					</v-btn>
				</div>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import {
	I18N_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
	DOWNLOAD_MODULE_KEY,
} from "@/utils/inject";
import { mdiInformation } from "@mdi/js";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
	name: "DownloadModal",
	components: {},
	model: {
		prop: "isOpen",
		event: "dialog-closed",
	},
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
		maxWidth: {
			type: Number,
			default: 560,
		},
	},
	setup(_, { emit }) {
		const i18n = injectStrict(I18N_KEY);
		const notifier = injectStrict(NOTIFIER_MODULE_KEY);
		const downloadModule = injectStrict(DOWNLOAD_MODULE_KEY);
		const radios = ref("1.1.0");
		const step = ref(0);
		const allTopics = ref<
			Array<{ isSelected: boolean; title: string; id: string }>
		>([
			{ isSelected: false, title: "Thema-title1", id: "topic-1" },
			{ isSelected: false, title: "Thema-title2", id: "topic-2" },
			{ isSelected: false, title: "Thema-title3", id: "topic-3" },
		]);
		const allTopicsSelected = computed(() => {
			return allTopics.value.every((topic) => topic.isSelected);
		});
		const allTasks = ref<
			Array<{ isSelected: boolean; title: string; id: string }>
		>([
			{ isSelected: false, title: "Aufgabe-title1", id: "task-1" },
			{ isSelected: false, title: "Aufgabe-title2", id: "task-2" },
			{ isSelected: false, title: "Aufgabe-title3", id: "task-3" },
		]);
		const allTasksSelected = computed(() => {
			return allTasks.value.every((topic) => topic.isSelected);
		});

		const title = computed(() => {
			return step.value === 0
				? "pages.room.modal.course.export.header"
				: "pages.room.modal.course.export.options.header";
		});

		const someTopicsSelected = computed(() => {
			return (
				allTopics.value.some((topic) => topic.isSelected) &&
				!allTopicsSelected.value
			);
		});

		const someTasksSelected = computed(() => {
			return (
				allTasks.value.some((task) => task.isSelected) &&
				!allTasksSelected.value
			);
		});

		function onCloseDialog(): void {
			emit("dialog-closed", false);
			downloadModule.resetDownloadFlow();
			step.value = 0;
			allTasks.value.forEach((task) => {
				task.isSelected = false;
			});
			allTopics.value.forEach((topic) => {
				topic.isSelected = false;
			});
		}

		function onNext(newValue: string): void {
			// choose version then open download options
			downloadModule.setVersion(newValue);
			step.value++;
		}

		async function onDownload(): Promise<void> {
			// download
			notifier.show({
				text: i18n.tc("common.words.export").toString(),
				status: "success",
				timeout: 10000,
			});
			await downloadModule.startDownload(radios.value);
		}

		function onBack(): void {
			// go back to choose version
			step.value--;
			downloadModule.setVersion("");
			downloadModule.setIsDownloadModalOpen(true);
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

		return {
			title,
			onNext,
			onBack,
			onDownload,
			toggleAllTopics,
			toggleAllTasks,
			onCloseDialog,
			step,
			mdiInformation,
			radios,
			allTopics,
			allTasks,
			allTopicsSelected,
			allTasksSelected,
			someTopicsSelected,
			someTasksSelected,
		};
	},
});
</script>

<style lang="scss" scoped>
.button-section {
	margin-bottom: calc(var(--space-base-vuetify) * 2);
}

.button-section > button {
	margin-left: calc(var(--space-base-vuetify) * 2);
}
</style>
