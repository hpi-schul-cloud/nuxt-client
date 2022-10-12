<template>
	<import-modal @import="onImport"></import-modal>
</template>

<script type="ts">
import ImportModal from "@/components/share-course/ImportModal.vue";
import { defineComponent, inject } from "@vue/composition-api";
import { useLoadingState } from "@/composables/loadingState";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: 'ImportFlow',
	components: {
		ImportModal
	},
	setup() {

    const shareCourseModule = inject("shareCourseModule");

    const { isLoadingDialogOpen } = useLoadingState('Kurs importieren läuft...') // wip
		const onImport = () => {
      // dispatch to api
      isLoadingDialogOpen.value = true;

      // useCopy() composable to copy/ import a course
      // name, token
		};

		return {
			onImport
		}
	}
})
</script>
