<template>
	<v-dialog
		ref="commonCartridgeImportDialog"
		:value="isOpen"
		:max-width="maxWidth"
		@click:outside="$emit('dialog-closed', false)"
		@keydown.esc="$emit('dialog-closed', false)"
		data-testid="common-cartridge-import-dialog"
	>
		<v-card :ripple="false">
			<v-card-title>
				<div ref="textTitle" class="text-h4 my-2 text-break">
					{{ $t("pages.rooms.ccImportCourse.title") }}
				</div>
			</v-card-title>
			<v-card-text class="text--primary">
				<v-file-input
					:v-model="file"
					:label="$t('pages.rooms.ccImportCourse.fileInputLabel')"
					:prepend-icon="mdiTrayArrowUp"
					accept=".imscc, .zip"
					clearable
					show-size
				/>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<div class="button-section">
					<v-btn data-testId="dialog-cancel-btn" depressed @click="cancel">
						{{ $t("common.labels.close") }}
					</v-btn>
				</div>
				<div class="button-section">
					<v-btn
						data-testId="dialog-confirm-btn"
						color="primary"
						:disabled="importButtonDisabled"
						@click="confirm"
					>
						{{ $t("pages.rooms.ccImportCourse.confirm") }}
					</v-btn>
				</div>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import {
	LOADING_STATE_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	ROOMS_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { mdiTrayArrowUp } from "@mdi/js";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "CommonCartridgeImportModal",
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
			default: 480,
		},
	},
	emits: {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		"dialog-closed": (value: boolean): boolean => true,
	},
	setup: (_, { emit }) => {
		const i18n = useI18n();
		const loadingStateModule = injectStrict(LOADING_STATE_MODULE_KEY);
		const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
		const roomsModule = injectStrict(ROOMS_MODULE_KEY);
		const file = ref<File | undefined>(undefined);
		const importButtonDisabled = computed(() => {
			return !file.value;
		});

		function cancel(): void {
			emit("dialog-closed", false);
			file.value = undefined;
		}

		async function confirm(): Promise<void> {
			if (!file.value) {
				return;
			}

			loadingStateModule.open({
				text: i18n.t("pages.rooms.ccImportCourse.loading").toString(),
			});
			await roomsModule.uploadCourse(file.value);
			await roomsModule.fetchAllElements();
			emit("dialog-closed", false);
			loadingStateModule.close();

			const [newCourse] = roomsModule.getAllElements;

			notifierModule.show({
				status: roomsModule.getAlertData.status,
				text: i18n
					.t(roomsModule.getAlertData.text as string, { name: newCourse.title })
					.toString(),
				autoClose: roomsModule.getAlertData.autoClose,
				timeout: roomsModule.getAlertData.timeout,
			});
			file.value = undefined;
		}

		return {
			file,
			importButtonDisabled,
			mdiTrayArrowUp,
			cancel,
			confirm,
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
