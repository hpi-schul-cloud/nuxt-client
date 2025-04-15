<template>
	<template v-if="isLoading">
		<VContainer class="loader">
			<VSkeletonLoader
				ref="skeleton-loader"
				type="table-thead, table-tbody"
				class="mt-6"
			/>
		</VContainer>
	</template>
	<template v-else-if="isEmpty">
		<VCustomEmptyState
			ref="folder-empty-state"
			image="folder-empty-state"
			:title="t('pages.folder.emptyState')"
			class="mt-16"
		/>
	</template>
	<template v-else> Mount your component here </template>
</template>

<script setup lang="ts">
import VCustomEmptyState from "@/components/molecules/vCustomEmptyState.vue";
import { defineProps, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Define props for the component
const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	isEmpty: {
		type: Boolean,
		required: true,
	},
});

// Remove the destructuring of isLoading and isEmpty from useFolderState
// const { isLoading, isEmpty } = useFolderState();

onMounted(() => {
	//fetchRooms();
});
</script>
