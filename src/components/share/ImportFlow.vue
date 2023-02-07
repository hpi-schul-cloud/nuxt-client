<template>
	<div>
		<select-course-modal
			:is-open="isSelectCourseModalOpen"
			:parent-name="parentName"
			:parent-type="parentType"
			:courses="courses"
			@next="onCourseSelected"
			@cancel="onCancel"
		></select-course-modal>
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

<script>
import ImportModal from "@/components/share/ImportModal.vue";
import { useLoadingState } from "@/composables/loadingState";
import { computed, defineComponent, inject, ref } from "vue";
import CopyResultModal from "../copy-result-modal/CopyResultModal.vue";
import SelectCourseModal from "./SelectCourseModal.vue";
// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ImportFlow",
	components: {
		ImportModal,
		CopyResultModal,
		SelectCourseModal,
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
		courses: {
			type: Array,
			required: true,
		},
	},
	setup(props, { emit }) {
		console.log("DUPA");
		const i18n = inject("i18n");
		const copyModule = inject("copyModule");
		const notifier = inject("notifierModule");

		const parentName = ref("");
		const parentType = ref("lesson");

		const destinationCourseId = ref(undefined);
		const isSelectCourseModalOpen = ref(false);

		const isImportModalOpen = ref(false);

		const isCopyResultModalOpen = computed({
			get: () => copyModule.getIsResultModalOpen,
			set: (bool) => copyModule.setResultModalOpen(bool),
		});

		const copyResultModalItems = computed(
			() => copyModule.getCopyResultFailedItems
		);
		const copyResultRootItemType = computed(
			() => copyModule.getCopyResult?.type
		);

		const { isLoadingDialogOpen } = useLoadingState(
			i18n?.t("components.molecules.import.options.loadingMessage")
		);

		const openModal = (modalName) => {
			isSelectCourseModalOpen.value = modalName === "selectCourse";
			isImportModalOpen.value = modalName === "import";
			isLoadingDialogOpen.value = modalName === "loading";
			isCopyResultModalOpen.value = modalName === "result";
		};

		const closeModals = () => openModal("none");

		// notifiers

		const showSuccess = (name) => {
			notifier?.show({
				text: i18n?.t("components.molecules.import.options.success", { name }),
				status: "success",
				timeout: 10000,
			});
			closeModals();
		};

		const showFailureBackend = (name) => {
			notifier?.show({
				text: i18n?.t(
					"components.molecules.import.options.failure.backendError",
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
					"components.molecules.import.options.failure.invalidToken"
				),
				status: "error",
				timeout: 10000,
			});
			closeModals();
		};

		const showFailurePermission = () => {
			notifier?.show({
				text: i18n?.t(
					"components.molecules.import.options.failure.permissionError"
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
				parentType.value = validateResult.parentType.slice(0, -1);
				openModal(parentType.value === "course" ? "import" : "selectCourse");
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
				await copyModule.copyByShareToken({
					token: props.token,
					type: parentType.value,
					newName,
					destinationCourseId: destinationCourseId.value,
				});
				openModal("result");
			} catch (error) {
				showFailureBackend(newName);
			}
		}

		// event handlers

		const onCourseSelected = (courseId) => {
			destinationCourseId.value = courseId;
			openModal("import");
		};
		const onImport = (courseName) => startImport(courseName);
		const onCancel = () => closeModals();
		const onCopyResultModalClosed = () => {
			emit("success");
			copyModule.reset();
		};

		return {
			isSelectCourseModalOpen,
			isImportModalOpen,
			isCopyResultModalOpen,
			copyResultModalItems,
			copyResultRootItemType,
			parentName,
			parentType,
			onCopyResultModalClosed,
			onCourseSelected,
			onImport,
			onCancel,
		};
	},
});
</script>
