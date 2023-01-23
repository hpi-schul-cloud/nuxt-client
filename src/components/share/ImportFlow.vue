<template>
	<div>
		<import-modal
			:is-open="isImportModalOpen"
			:parent-name="parentName"
			:parent-type="parentType"
			@import="onImport"
			@cancel="onCancel"
		></import-modal>
		<copy-result-modal
			:is-open="isCopyResultModalOpen"
			:copy-result-items="copyResultModalItems"
			:copy-result-root-item-type="copyResultRootItemType"
			@dialog-closed="onCopyResultModalClosed"
		></copy-result-modal>
	</div>
</template>

<script type="ts">
import ImportModal from "@components/share/ImportModal.vue";
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
			default: ""
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
		const parentType = ref("");

		const isImportModalOpen = ref(false);

		const isCopyResultModalOpen = computed({
			get: () => copyModule.getIsResultModalOpen,
			set: (bool) => copyModule.setResultModalOpen(bool)
		});

		const copyResultModalItems = computed(() => copyModule.getCopyResultFailedItems);
		const copyResultRootItemType = computed(() => copyModule.getCopyResult?.type);

		const { isLoadingDialogOpen } = useLoadingState(i18n?.t("components.molecules.import.options.loadingMessage"))

		const openModal = (modalName) => {
			isImportModalOpen.value = modalName === 'import';
			isLoadingDialogOpen.value = modalName === 'loading';
			isCopyResultModalOpen.value = modalName === 'result';
		}

		const closeModals = () => openModal('none');

		// notifiers

		const showFailureBackend = (name) => {
			notifier?.show({
				text: i18n?.t("components.molecules.import.options.failure.backendError", { name }),
				status: "error",
				timeout: 10000,
			})
			closeModals();
		}

		const showFailureInvalidToken = () => {
			notifier?.show({
				text: i18n?.t("components.molecules.import.options.failure.invalidToken"),
				status: "error",
				timeout: 10000,
			})
			closeModals();
		}

		const showFailurePermission = () => {
			notifier?.show({
				text: i18n?.t("components.molecules.import.options.failure.permissionError"),
				status: "error",
				timeout: 10000,
			})
			closeModals();
		}

		// business logic

		if (props.isActive) {
			validateShareToken();
		}

		async function validateShareToken() {
			try {
				const validateResult = await copyModule.validateShareToken(props.token);
				parentName.value = validateResult.parentName;
				parentType.value = validateResult.parentType.slice(0, -1);
				openModal('import');
			} catch (error) {
				if (error.response?.status === 403) {
					showFailurePermission();
				} else {
					showFailureInvalidToken();
				}
				return;
			}
		}

		async function startImport(newName) {
			openModal('loading');
			try {
				await copyModule.copyByShareToken({ token: props.token, type: parentType.value, newName , destinationCourseId: '63ca720cd0900148bc091731' }); //TODO Fix hardcode
				openModal('result');
			} catch (error) {
				showFailureBackend(newName);
			}
		}

		// event handlers

		const onImport = (courseName) => startImport(courseName);
		const onCancel = () => closeModals();
		const onCopyResultModalClosed = () => {
			emit('success');
			copyModule.reset();
		}

		return {
			isImportModalOpen,
			isCopyResultModalOpen,
			copyResultModalItems,
			copyResultRootItemType,
			parentName,
			parentType,
			onCopyResultModalClosed,
			onImport,
			onCancel
		}
	}
})
</script>
