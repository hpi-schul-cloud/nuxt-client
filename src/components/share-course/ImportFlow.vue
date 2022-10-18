<template>
	<div>
		<import-modal
			:is-open="isImportModalOpen"
			:parent-name="parentName"
			@import="onImport"
			@cancel="onCancel"
		></import-modal>
		<copy-result-modal
			:is-open="isCopyResultModalOpen"
			:copy-result-items="copyResultModalItems"
			@dialog-closed="onCopyResultModalClosed"
		></copy-result-modal>
	</div>
</template>

<script type="ts">
import ImportModal from "@/components/share-course/ImportModal.vue";
import { useLoadingState } from "@/composables/loadingState";
import { computed, defineComponent, inject, ref } from "@vue/composition-api";
import CopyResultModal from "../copy-result-modal/CopyResultModal.vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: 'ImportFlow',
	components: {
		ImportModal,
		CopyResultModal
	},
	props: {
		token: {
			type: String,
			default: () => ''
		},
		isActive: {
			type: Boolean,
			required: true
		}
	},
	setup(props, { emit }) {
		const i18n = inject("i18n");
		const copyModule = inject("copyModule");
		const notifier = inject("notifierModule");

		const parentName = ref("");

		const isImportModalOpen = ref(false);

		const isCopyResultModalOpen = computed({
			get: () => copyModule.getIsResultModalOpen,
			set: (bool) => copyModule.setResultModalOpen(bool)
		});

		const copyResultModalItems = computed(() => copyModule.getCopyResultFailedItems);

		const { isLoadingDialogOpen } = useLoadingState(i18n?.t("components.molecules.importCourse.options.loadingMessage")) // wip

		const onImport = (courseName) => startImport(courseName);
		const onCancel = () => resetFlow();
		const onCopyResultModalClosed = () => {
			emit('success');
			copyModule.reset();
		}

		if (props.isActive === true) {
			validateShareToken();
		}

		const showImportModal = () => {
			isImportModalOpen.value = true;
		}

		const startImport = async (newName) => {
			isImportModalOpen.value = false;
			isLoadingDialogOpen.value = true;
			await copyCourse(newName);
		}

		const showImportSuccess = () => {
			notifier?.show({
				text: "great it worked", // wip
				status: "success",
				timeout: 10000,
			})
			resetFlow();
		}

		const showResultModal = () => {
			isLoadingDialogOpen.value = false;
			isCopyResultModalOpen.value = true;
		}

		const showImportFailure = () => {
			notifier?.show({
				text: "Importing the course failed", // wip
				status: "error",
				timeout: 10000,
			})
			resetFlow();
		}

		const resetFlow = () => {
			isImportModalOpen.value = false;
			isLoadingDialogOpen.value = false;
			isCopyResultModalOpen.value = false;
		}

		async function validateShareToken() {
			try {
				const validateResult = await copyModule.validateShareToken(props.token);
				parentName.value = validateResult.parentName;
				showImportModal();
			} catch (error) {
				isImportModalOpen.value = false;
				notifier?.show({
					text: "The token has expired or never existed", // wip
					status: "error",
					timeout: 10000,
				})
				return;
			}
		}

		const copyCourse = async(newName) => {
			try {
				const copyResultFailedItems = await copyModule.copyByShareToken({ token: props.token, type:'course', newName });
				if (copyResultFailedItems.length === 0) {
					isImportModalOpen.value = false;
					showImportSuccess();
				} else {
					showResultModal();
				}
			} catch (error) {
				isImportModalOpen.value = false;
				showImportFailure();
			}
		}

		return {
			isImportModalOpen,
			isCopyResultModalOpen,
			copyResultModalItems,
			parentName,
			onCopyResultModalClosed,
			onImport,
			onCancel
		}
	}
})
</script>
