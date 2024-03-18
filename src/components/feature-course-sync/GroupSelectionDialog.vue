<template>
	<vCustomDialog
		:is-open="isOpen"
		has-buttons
		:buttons="['close', 'next']"
		:next-btn-disabled="!selectedGroup"
		@next="onConfirm"
		@dialog-closed="closeDialog"
	>
		<template #title>
			<div class="text-h4 my-2 text-break">
				{{ $t("ui-course-sync.group-selection-dialog.title") }}
			</div>
		</template>

		<template #content>
			<p class="text-md mt-2">
				{{ $t("ui-course-sync.group-selection-dialog.text") }}
			</p>
			<VAutocomplete
				:label="$t('ui-course-sync.group-selection-dialog.selection.label')"
				:no-data-text="$t('common.nodata')"
				item-title="name"
				item-value="id"
				:items="groups"
				v-model="selectedGroup"
				v-model:search="searchGroupName"
				:loading="isLoading"
				return-object
				hide-selected
				clearable
				variant="underlined"
			>
				<template #append-item>
					<div v-intersect="onGroupListIntersect" />
				</template>
			</VAutocomplete>
		</template>
	</vCustomDialog>
</template>

<script setup lang="ts">
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { GroupEntryResponse } from "@/serverApi/v3";
import { useGroupListState } from "@data-group";
import { ModelRef, Ref, ref, watch } from "vue";

const isOpen: ModelRef<boolean> = defineModel("isOpen", {
	type: Boolean,
	required: true,
});

const closeDialog = () => {
	isOpen.value = false;
};

const onConfirm = async () => {
	if (selectedGroup.value) {
		closeDialog();

		window.location.assign(
			`/courses/add?syncWithGroup=${selectedGroup.value.id}`
		);
	}
};

const selectedGroup: Ref<GroupEntryResponse | undefined> = ref();
const searchGroupName: Ref<string> = ref("");

const { groups, total, skip, limit, isLoading, fetchGroups } =
	useGroupListState();

const onGroupListIntersect = async (isIntersecting: boolean) => {
	if (isIntersecting) {
		if (total.value > groups.value.length) {
			skip.value += limit.value;

			await loadGroups();
		}
	}
};

const loadGroups = async () => {
	await fetchGroups({
		name: searchGroupName.value,
		availableForSynchronization: true,
	});
};

watch(isOpen, async (newValue, oldValue) => {
	if (newValue !== oldValue && newValue) {
		await loadGroups();
	}
});
</script>

<style scoped lang="scss"></style>
