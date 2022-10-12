<template>
	<import-modal @import="onImport"></import-modal>
</template>

<script type="ts">
import ImportModal from "@/components/share-course/ImportModal.vue";
import { defineComponent } from "@vue/composition-api";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: 'ImportFlow',
	components: {
		ImportModal
	},
	setup() {
		const onImport = () => {
			console.log('starting to import')
		};

		return {
			onImport
		}
	}
})
</script>
