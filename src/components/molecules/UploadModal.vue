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
		<template slot="content">
			<h1>Upload</h1>
			<input
				type="file"
				name="file"
				accept=".imscc, .zip"
				@change="onFileChange($event)"
				capture
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
		const file = ref<File | null>(null);
		const modalButtons = computed(() => {
			return ["cancel", "confirm"];
		});
		const uploadButtonName = computed(() => {
			return "Upload";
		});
		const businessError = computed(() => {
			return roomsModule.getBusinessError;
		});

		function cancel(): void {
			emit("dialog-closed", false);
		}

		function onFileChange(event: Event): void {
			const target = event.target as HTMLInputElement;

			if (target && target.files && target.files[0]) {
				file.value = target.files[0];
			}
		}

		async function confirmUpload(): Promise<void> {
			console.log(file.value);

			if (file.value) {
				await roomsModule.uploadCourse(file.value);
			}
		}

		return {
			modalButtons,
			uploadButtonName,
			businessError,
			cancel,
			onFileChange,
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
