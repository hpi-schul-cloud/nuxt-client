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
			<v-card-title data-testid="dialog-title">
				{{ $t("pages.rooms.ccImportCourse.title") }}
			</v-card-title>
			<v-card-text class="text--primary">
				<v-file-input
					v-model="file"
					:label="$t('pages.rooms.ccImportCourse.fileInputLabel')"
					:prepend-icon="mdiUpload"
					accept=".imscc, .zip"
					clearable
					show-size
				/>
			</v-card-text>
			<v-card-actions>
				<div class="button-section button-left">
					<v-btn data-testid="dialog-cancel-btn" depressed @click="cancel">
						{{ $t("common.labels.close") }}
					</v-btn>
				</div>
				<v-spacer />
				<div class="button-section button-right">
					<v-btn
						data-testid="dialog-confirm-btn"
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
	I18N_KEY,
	LOADING_STATE_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	ROOMS_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { mdiUpload } from "@mdi/js";

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
		"update-rooms": (): boolean => true,
	},
	setup: (_, { emit }) => {
		const i18n = injectStrict(I18N_KEY);
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
				text: i18n.tc("pages.rooms.ccImportCourse.loading"),
			});
			await roomsModule.uploadCourse(file.value);
			emit("dialog-closed", false);
			emit("update-rooms");
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
			mdiUpload,
			cancel,
			confirm,
		};
	},
});
</script>

<style lang="scss" scoped>
.button-left {
	width: 25%;
	text-align: left;
}

.button-right {
	display: inline-block;
	width: 75%;
	text-align: right;
}
.button-section {
	margin-bottom: calc(var(--space-base-vuetify) * 2);
}

.button-section > button {
	margin-left: calc(var(--space-base-vuetify) * 2);
}
</style>
