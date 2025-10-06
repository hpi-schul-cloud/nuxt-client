<template>
	<GroupSelectionDialog
		v-model:is-open="isOpen"
		:description="$t('feature-course-sync.StartNewCourseSyncDialog.text')"
		@confirm="onConfirm"
		@cancel="closeDialog"
	/>
</template>

<script setup lang="ts">
import GroupSelectionDialog from "./GroupSelectionDialog.vue";
import { GroupResponse } from "@/serverApi/v3";
import { ModelRef } from "vue";

const isOpen: ModelRef<boolean> = defineModel("isOpen", {
	type: Boolean,
	required: true,
});

const onConfirm = async (selectedGroup: GroupResponse) => {
	window.location.assign(`/courses/add?syncedGroupId=${selectedGroup.id}`);
};

const closeDialog = () => {
	isOpen.value = false;
};
</script>
