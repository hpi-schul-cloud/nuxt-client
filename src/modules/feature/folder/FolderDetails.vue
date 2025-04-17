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
		<EmptyState :title="t('pages.folder.emptyState')">
			<template v-slot:media>
				<EmptyFolderSvg />
			</template>
		</EmptyState>
	</template>
	<template v-else> Mount your component here </template>
</template>

<script setup lang="ts">
import { EmptyState } from "@ui-empty-state";
import { defineProps, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import EmptyFolderSvg from "./EmptyFolderSvg.vue";

const { t } = useI18n();

// Define props for the component
defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	isEmpty: {
		type: Boolean,
		required: true,
	},
});

onMounted(() => {
	//fetchRooms();
});
</script>
