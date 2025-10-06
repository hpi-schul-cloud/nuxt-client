<template>
	<div>
		<SelectDestinationModal
			:is-open="isSelectCourseModalOpen"
			:parent-name="parentName"
			:parent-type="parentType"
			:destinations="destinations"
			:destination-type="destinationType"
			@next="onReferenceSelected"
			@cancel="onCancel"
		/>
		<import-modal
			:is-open="isImportModalOpen"
			:parent-name="parentName"
			:parent-type="parentType"
			@import="onImport"
			@cancel="onCancel"
		/>
		<copy-result-modal
			:is-open="isCopyResultModalOpen"
			:copy-result-items="copyResultModalItems"
			:copy-result-root-item-type="copyResultRootItemType"
			@copy-dialog-closed="onCopyResultModalClosed"
		/>
	</div>
</template>

<script setup lang="ts">
import CopyResultModal from "../copy-result-modal/CopyResultModal.vue";
import SelectDestinationModal from "./SelectDestinationModal.vue";
import ImportModal from "@/components/share/ImportModal.vue";
import { useLoadingState } from "@/composables/loadingState";
import { BoardExternalReferenceType, ShareTokenInfoResponseParentTypeEnum } from "@/serverApi/v3/api";
import { ImportDestinationItem } from "@/store/types/rooms";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { COPY_MODULE_KEY, injectStrict, LOADING_STATE_MODULE_KEY } from "@/utils/inject";
import { notifyError } from "@data-app";
import { computed, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	token: {
		type: String,
		default: () => "",
	},
	isActive: {
		type: Boolean,
		required: true,
	},
	destinations: {
		type: Array as PropType<ImportDestinationItem[]>,
		required: true,
	},
	destinationType: {
		type: String as PropType<BoardExternalReferenceType>,
		required: true,
	},
});
const emit = defineEmits<{
	(e: "success", newName: string, destinationId?: string): void;
}>();

const { t } = useI18n();
const copyModule = injectStrict(COPY_MODULE_KEY);
const loadingStateModule = injectStrict(LOADING_STATE_MODULE_KEY);

const parentName = ref("");
const parentType = ref<ShareTokenInfoResponseParentTypeEnum>(ShareTokenInfoResponseParentTypeEnum.Lessons);
const newName = ref("");

const destinationId = ref<string>();
const isSelectCourseModalOpen = ref(false);

const isImportModalOpen = ref(false);

const isCopyResultModalOpen = computed({
	get: () => copyModule.getIsResultModalOpen,
	set: (bool) => copyModule.setResultModalOpen(bool),
});

const copyResultModalItems = computed(() => copyModule.getCopyResultFailedItems);
const copyResultRootItemType = computed(() => copyModule.getCopyResult?.type);

const { isLoadingDialogOpen } = useLoadingState(t("components.molecules.import.options.loadingMessage"));

const openModal = (modalName: string) => {
	isSelectCourseModalOpen.value = modalName === "selectCourse";
	isImportModalOpen.value = modalName === "import";
	isLoadingDialogOpen.value = modalName === "loading";
	isCopyResultModalOpen.value = modalName === "result";
};

const closeModals = () => openModal("none");

// notifiers

const showFailureBackend = (name: string) => {
	notifyError(
		t("components.molecules.import.options.failure.backendError", {
			name,
		})
	);
	closeModals();
};

const showFailureInvalidToken = () => {
	notifyError(t("components.molecules.import.options.failure.invalidToken"));
	closeModals();
};

const showFailurePermission = () => {
	notifyError(t("components.molecules.import.options.failure.permissionError"));
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
		parentType.value = validateResult.parentType;
		openModal(
			parentType.value === ShareTokenInfoResponseParentTypeEnum.Courses ||
				parentType.value === ShareTokenInfoResponseParentTypeEnum.Room
				? "import"
				: "selectCourse"
		);
	} catch (error: unknown) {
		const apiError = mapAxiosErrorToResponseError(error);

		if (apiError.code === 403) {
			showFailurePermission();
		} else {
			showFailureInvalidToken();
		}
		return;
	}
}

async function startImport(name: string) {
	newName.value = name;
	openModal("loading");
	try {
		await copyModule.copyByShareToken({
			token: props.token,
			type: parentType.value,
			newName: newName.value,
			destinationId: destinationId.value,
		});
		if (copyResultModalItems.value.length === 0) {
			loadingStateModule.close();
			emit("success", newName.value, destinationId.value);
			copyModule.reset();
		} else {
			openModal("result");
		}
	} catch {
		showFailureBackend(newName.value);
	}
}

// event handlers

const onReferenceSelected = (referenceId: string) => {
	destinationId.value = referenceId;
	openModal("import");
};
const onImport = (newName: string) => startImport(newName);
const onCancel = () => closeModals();
const onCopyResultModalClosed = () => {
	emit("success", newName.value, destinationId.value);
	copyModule.reset();
};
</script>
