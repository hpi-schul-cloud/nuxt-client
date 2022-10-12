<template>
	<div>
		<import-modal
			:is-open="isImportModalOpen"
			@import="onImport"
		></import-modal>
		<copy-result-modal
			:is-open="isCopyResultModalOpen"
			:copy-result-items="copyResultModalItems"
		></copy-result-modal>
	</div>
</template>

<script type="ts">
import ImportModal from "@/components/share-course/ImportModal.vue";
import { useLoadingState } from "@/composables/loadingState";
import { defineComponent, inject, reactive, ref, watch } from "@vue/composition-api";
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
			default: () => 'ABC'
		},
		isActive: {
			type: Boolean,
			required: true
		}
	},
	setup(props) {

		// const shareCourseModule = inject("shareCourseModule");
		const copyModule = inject("copyModule");
		const step = ref(0);

		const isImportModalOpen = ref(false);
		const isCopyResultModalOpen = ref(false);
		const copyResultModalItems = reactive([]);
		const { isLoadingDialogOpen } = useLoadingState('Kurs importieren läuft...') // wip

		const onImport = () => {
			step.value = 2;
		};

		watch(step, (newValue) => {
			switch (newValue) {
				case 1:
					isImportModalOpen.value = true;
					break;
				case 2:
					isImportModalOpen.value = false;
					isLoadingDialogOpen.value = true;
					copyModule.copyByShareToken({ token: props.token, type:'course' })
						.then((result) => {
							console.log("result", result);
							copyResultModalItems.value = result;
							step.value = 3;
						});
					break;
				case 3:
					isLoadingDialogOpen.value = false;
					isCopyResultModalOpen.value = true;
					default:
			}
		})

		if (props.isActive === true) {
			step.value = 1;
		}

		return {
			isImportModalOpen,
			isCopyResultModalOpen,
			copyResultModalItems,
			step,
			onImport
		}
	}
})
</script>
