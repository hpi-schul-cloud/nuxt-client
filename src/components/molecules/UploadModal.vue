<template>
	<vCustomDialog
		ref="uploadDialog"
		:is-open="isOpen"
		class="upload-dialog"
		has-buttons
		:buttons="modalButtons"
		:confirm-btn-title-key="uploadButtonName"
		@dialog-closed="cancel"
		@dialog-confirmed="confirmUpload"
	>
		<template slot="title">
			{{ $t("pages.rooms.uploadCourse.title") }}
		</template>
		<template slot="content">
			<v-file-input
				v-model="file"
				label="course-upload"
				accept=".imscc, .zip"
				clearable
				show-size
				outlined
				dense
			/>
		</template>
	</vCustomDialog>
</template>

<script lang="ts">
import { roomsModule } from "@/store";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
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
		const file = ref<File | undefined>(undefined);
		const modalButtons = computed(() => {
			return ["cancel", "confirm"];
		});
		const uploadButtonName = computed(() => {
			return "pages.rooms.uploadCourse.confirm";
		});
		const businessError = computed(() => {
			return roomsModule.getBusinessError;
		});

		function cancel(): void {
			emit("dialog-closed", false);
		}

		async function confirmUpload(): Promise<void> {
			if (file.value) {
				await roomsModule.uploadCourse(file.value);
			}
		}

		return {
			file,
			modalButtons,
			uploadButtonName,
			businessError,
			cancel,
			confirmUpload,
		};
	},
});
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
