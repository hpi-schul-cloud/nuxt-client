<template>
	<div>
		<select-course-modal
			:is-open="isSelectCourseModalOpen"
			:parent-name="parentName"
			:parent-type="parentType"
			:courses="courses"
			@next="onCourseSelected"
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
			@dialog-closed="onCopyResultModalClosed"
		/>
	</div>
</template>

<script setup>
import ImportModal from "@/components/share/ImportModal.vue";
import { useLoadingState } from "@/composables/loadingState";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3/api";
import {
	COPY_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { computed, inject, ref } from "vue";
import CopyResultModal from "../copy-result-modal/CopyResultModal.vue";
import SelectCourseModal from "./SelectCourseModal.vue";
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
	courses: {
		type: Array,
		required: true,
	},
});
const emit = defineEmits(["success"]);

const { t } = useI18n();
const copyModule = injectStrict(COPY_MODULE_KEY);
const notifier = injectStrict(NOTIFIER_MODULE_KEY);
const loadingStateModule = inject("loadingStateModule");

const parentName = ref("");
const parentType = ref("lessons");
const newName = ref("");

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
const copyResultRootItemType = computed(() => copyModule.getCopyResult?.type);

const { isLoadingDialogOpen } = useLoadingState(
	t("components.molecules.import.options.loadingMessage")
);

const openModal = (modalName) => {
	isSelectCourseModalOpen.value = modalName === "selectCourse";
	isImportModalOpen.value = modalName === "import";
	isLoadingDialogOpen.value = modalName === "loading";
	isCopyResultModalOpen.value = modalName === "result";
};

const closeModals = () => openModal("none");

// notifiers

const showFailureBackend = (name) => {
	notifier.show({
		text: t("components.molecules.import.options.failure.backendError", {
			name,
		}),
		status: "error",
		timeout: 5000,
	});
	closeModals();
};

const showFailureInvalidToken = () => {
	notifier.show({
		text: t("components.molecules.import.options.failure.invalidToken"),
		status: "error",
		timeout: 5000,
	});
	closeModals();
};

const showFailurePermission = () => {
	notifier.show({
		text: t("components.molecules.import.options.failure.permissionError"),
		status: "error",
		timeout: 5000,
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
		parentType.value = validateResult.parentType;
		openModal(
			parentType.value === ShareTokenBodyParamsParentTypeEnum.Courses
				? "import"
				: "selectCourse"
		);
	} catch (error) {
		if (error.response?.status === 403) {
			showFailurePermission();
		} else {
			showFailureInvalidToken();
		}
		return;
	}
}

async function startImport(name) {
	newName.value = name;
	openModal("loading");
	try {
		await copyModule.copyByShareToken({
			token: props.token,
			type: parentType.value,
			newName: newName.value,
			destinationCourseId: destinationCourseId.value,
		});
		if (copyResultModalItems.value.length === 0) {
			loadingStateModule.close();
			emit("success", newName.value, destinationCourseId.value);
			copyModule.reset();
		} else {
			openModal("result");
		}
	} catch (error) {
		showFailureBackend(newName.value);
	}
}

// event handlers

const onCourseSelected = (courseId) => {
	destinationCourseId.value = courseId;
	openModal("import");
};
const onImport = (newName) => startImport(newName);
const onCancel = () => closeModals();
const onCopyResultModalClosed = () => {
	emit("success", newName.value);
	copyModule.reset();
};
</script>
