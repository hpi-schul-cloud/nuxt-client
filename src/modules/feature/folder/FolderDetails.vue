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
import { useFolderState } from "@data-folder";
//import { useFolderState } from "@data-folder";

import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { isLoading, isEmpty } = useFolderState();

//const isLoading = ref(false);
//const isEmpty = ref(true);
onMounted(() => {
	//fetchRooms();
});
</script>
