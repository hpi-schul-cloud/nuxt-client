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

<script lang="ts">
import ImportModal from "@/components/share-course/ImportModal.vue";
import { useLoadingState } from "@/composables/loadingState";
import { computed, defineComponent, inject, ref } from "vue";
import CopyResultModal from "../copy-result-modal/CopyResultModal.vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ImportFlow",
	components: {
		ImportModal,
		CopyResultModal,
	},
	props: {
		token: {
			type: String,
			default: () => "",
		},
		isActive: {
			type: Boolean,
			required: true,
		},
	},
	setup(props, { emit }) {
		const i18n = inject("i18n");
		const copyModule = inject("copyModule");
		const notifier = inject("notifierModule");

		const parentName = ref("");

		// modals

		const isImportModalOpen = ref(false);

		const isCopyResultModalOpen = computed({
			get: () => copyModule.getIsResultModalOpen,
			set: (bool) => copyModule.setResultModalOpen(bool),
		});

		const copyResultModalItems = computed(
			() => copyModule.getCopyResultFailedItems
		);

		const { isLoadingDialogOpen } = useLoadingState(
			i18n?.t("components.molecules.importCourse.options.loadingMessage")
		);

		const openModal = (modalName) => {
			isImportModalOpen.value = modalName === "import";
			isLoadingDialogOpen.value = modalName === "loading";
			isCopyResultModalOpen.value = modalName === "result";
		};

		const closeModals = () => openModal("none");

		// notifiers

		const showSuccess = () => {
			notifier?.show({
				text: i18n?.t("components.molecules.importCourse.options.success", {
					type: i18n.t("common.labels.course"),
				}),
				status: "success",
				timeout: 10000,
			});
			closeModals();
		};

		const showFailureBackend = (name) => {
			notifier?.show({
				text: i18n?.t(
					"components.molecules.importCourse.options.failure.backendError",
					{ name }
				),
				status: "error",
				timeout: 10000,
			});
			closeModals();
		};

		const showFailureInvalidToken = () => {
			notifier?.show({
				text: i18n?.t(
					"components.molecules.importCourse.options.failure.invalidToken"
				),
				status: "error",
				timeout: 10000,
			});
			closeModals();
		};

		const showFailurePermission = () => {
			notifier?.show({
				text: i18n?.t(
					"components.molecules.importCourse.options.failure.permissionError"
				),
				status: "error",
				timeout: 10000,
			});
			closeModals();
		};

		// business logic

		if (props.isActive) {
			validateShareToken();
		}

		async function validateShareToken() {
			try {
				const validateResult = await copyModule.validateShareToken(props.token);
				parentName.value = validateResult.parentName;
				openModal("import");
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
			openModal("loading");
			try {
				const copyResultFailedItems = await copyModule.copyByShareToken({
					token: props.token,
					type: "course",
					newName,
				});
				if (copyResultFailedItems.length === 0) {
					showSuccess();
					emit("success");
				} else {
					openModal("result");
				}
			} catch (error) {
				showFailureBackend(newName);
			}
		}

		// event handlers

		const onImport = (courseName) => startImport(courseName);
		const onCancel = () => closeModals();
		const onCopyResultModalClosed = () => {
			emit("success");
			copyModule.reset();
		};

		return {
			isImportModalOpen,
			isCopyResultModalOpen,
			copyResultModalItems,
			parentName,
			onCopyResultModalClosed,
			onImport,
			onCancel,
		};
	},
});
</script>
