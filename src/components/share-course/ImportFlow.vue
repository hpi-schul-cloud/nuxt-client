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
			switch (newValue) {
				case 1: //
					isImportModalOpen.value = true;
					break;

				case 2: // importing
					isImportModalOpen.value = false;
					isLoadingDialogOpen.value = true;
					copyModule.copyByShareToken({ token: props.token, type:'course', newName: parentName.value })
						.then(() => step.value = 3);
					break;

				case 3: // result
					isLoadingDialogOpen.value = false;
					isCopyResultModalOpen.value = true;
					break;

				case 0: // initial or canceled
				default:
					isImportModalOpen.value = false;
					isLoadingDialogOpen.value = false;
					isCopyResultModalOpen.value = false;

			}
		})

		if (props.isActive === true) {
			copyModule.validateShareToken(props.token).then((result) => {
				parentName.value = result.parentName;
				step.value = 1;
			})

		}

		const onCopyResultModalClosed = () => {
			emit('success');
			copyModule.reset();
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
