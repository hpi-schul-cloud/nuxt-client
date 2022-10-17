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
import { computed, defineComponent, inject, ref, watch } from "@vue/composition-api";
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

		const step = ref(0);
		const parentName = ref("");

		const isImportModalOpen = ref(false);

		const isCopyResultModalOpen = computed({
			get: () => copyModule.getIsResultModalOpen,
			set: (bool) => copyModule.setResultModalOpen(bool)
		});

		const copyResultModalItems = computed(() => copyModule.getCopyResultFailedItems);

		const { isLoadingDialogOpen } = useLoadingState(i18n?.t("components.molecules.importCourse.options.loadingMessage")) // wip

		const onImport = (courseName) => {
			step.value = 2;
			parentName.value = courseName;
		};

		const onCancel = () => {
			step.value = 0;
		};

		watch(step, (newValue) => {
			if (newValue === 1) {
				isImportModalOpen.value = true
				return;
			}
			if (newValue === 2) {
				copyCourse();
				return;
			}
			if (newValue === 3) {
				isLoadingDialogOpen.value = false;
				isCopyResultModalOpen.value = true;
				return;
			}

			isImportModalOpen.value = false;
			isLoadingDialogOpen.value = false;
			isCopyResultModalOpen.value = false;
		})

		if (props.isActive === true) {
			validateShareToken();
			// copyModule.validateShareToken(props.token).then((result) => {
			// 	parentName.value = result.parentName;
			// 	step.value = 1;
			// })

			// check error for the validation
			// 404 result would come after failing

		}

		const copyCourse = async() => {
			isImportModalOpen.value = false;
			isLoadingDialogOpen.value = true;
			const copyResult = await copyModule.copyByShareToken({ token: props.token, type:'course', newName: parentName.value });
			step.value = 3;

			// check errors for copying
			// check if 404 would be returned
			console.log(copyResult);
		}

		const onCopyResultModalClosed = () => {
			emit('success');
			copyModule.reset();
		}

		async function validateShareToken() {
			const validateResult = await copyModule.validateShareToken(props.token);
			debugger;
			if (validateResult.code === 404) {
				isImportModalOpen.value = false;
				notifier?.show({
					text: "The token has expired or never existed",
					status: "success",
					timeout: 10000,
				})
				return;
			}
			parentName.value = validateResult.parentName;
			step.value = 1;
		}

		return {
			isImportModalOpen,
			isCopyResultModalOpen,
			copyResultModalItems,
			parentName,
			step,
			onCopyResultModalClosed,
			onImport,
			onCancel
		}
	}
})
</script>
