<template>
	<div>
		<v-custom-dialog
			ref="uploadDialog"
			:is-open="isOpen"
			class="upload-dialog"
			has-buttons
			:buttons="modalButtons"
			:confirm-btn-title-key="uploadButtonName"
			@dialog-closed="cancel"
			@dialog-confirmed="upload"
		>
			<template slot="title">
				{{ $t("pages.rooms.uploadCourse.title") }}
			</template>
			<template slot="content">
				<v-file-input
					v-model="file"
					:label="$t(fileInputLabel)"
					accept=".imscc, .zip"
					clearable
					show-size
					outlined
					dense
				/>
			</template>
		</v-custom-dialog>
	</div>
</template>

<script lang="ts">
import { loadingStateModule, notifierModule, roomsModule } from "@/store";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { computed, ref } from "vue";
import { I18N_KEY, injectStrict } from "@/utils/inject";

export default {
	name: "UploadModal",
	components: {
		vCustomDialog,
	},
	model: {
		prop: "isOpen",
		event: "dialog-closed",
	},
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
	},
	setup: (_props, { emit }) => {
		const i18n = injectStrict(I18N_KEY);
		const file = ref<File | undefined>(undefined);
		const modalButtons = computed(() => {
			if (file.value) {
				return ["cancel", "confirm"];
			}
			return ["cancel"];
		});
		const uploadButtonName = computed(() => {
			return "pages.rooms.uploadCourse.confirm";
		});
		const fileInputLabel = computed(() => {
			return "pages.rooms.uploadCourse.fileInputLabel";
		});

		function cancel(): void {
			emit("dialog-closed", false);
			file.value = undefined;
		}

		async function upload(): Promise<void> {
			if (!file.value) {
				return;
			}

			loadingStateModule.open({
				text: i18n.tc("pages.rooms.uploadCourse.loading"),
			});
			await roomsModule.uploadCourse(file.value);
			emit("dialog-closed", false);
			emit("update-rooms", false);
			loadingStateModule.close();
			notifierModule.show({
				status: roomsModule.getAlertData.status,
				text: i18n.tc(roomsModule.getAlertData.text as string),
				autoClose: roomsModule.getAlertData.autoClose,
				timeout: roomsModule.getAlertData.timeout,
			});
			file.value = undefined;
		}

		return {
			file,
			modalButtons,
			uploadButtonName,
			fileInputLabel,
			cancel,
			upload,
		};
	},
};
</script>

<style lang="scss" scoped>
.v-dialog--active {
	overflow-y: hidden !important;
}

.cancel-confirm-button {
	text-align: right;
}

.step-sections {
	min-height: var(--sidebar-width);
	font-size: var(--space-md);
	color: var(--v-black-base);
}

.step {
	cursor: pointer;
}

.v-icon__svg {
	width: 90%;
	height: 90%;
}
</style>
