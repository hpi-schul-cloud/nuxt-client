<template>
	<vCustomDialog
		:is-open="isOpen"
		has-buttons
		:buttons="['close', 'next']"
		:next-btn-disabled="!selectedGroup || !hasTeacher(selectedGroup)"
		@next="onConfirm"
		@dialog-closed="closeDialog"
	>
		<template #title>
			<div class="text-h4 my-2 text-break">
				{{ $t("feature-course-sync.GroupSelectionDialog.title") }}
			</div>
		</template>

		<template #content>
			<p class="text-md mt-2" data-testid="group-dialog-info-text">
				{{ $t("feature-course-sync.GroupSelectionDialog.text") }}
			</p>
			<VAutocomplete
				:label="$t('feature-course-sync.GroupSelectionDialog.selection.label')"
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
				data-testid="group-selection"
			>
				<template #append-item>
					<div
						v-intersect="onGroupListIntersect"
						data-testid="group-selection-item"
					/>
				</template>
			</VAutocomplete>
			<WarningAlert
				v-if="selectedGroup && !hasTeacher(selectedGroup)"
				data-testid="no-teacher-warning"
			>
				<RenderHTML
					component="span"
					:html="
						$t('feature-course-sync.GroupSelectionDialog.noTeacher', {
							groupName: selectedGroup.name,
						})
					"
					data-testid="no-teacher-warning-text"
				/>
			</WarningAlert>
		</template>
	</vCustomDialog>
</template>

<script setup lang="ts">
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { GroupResponse, GroupUserResponse, RoleName } from "@/serverApi/v3";
import { useGroupListState } from "@data-group";
import { RenderHTML } from "@feature-render-html";
import { WarningAlert } from "@ui-alert";
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
		window.location.assign(
			`/courses/add?syncedGroupId=${selectedGroup.value.id}`
		);
	}
};

const selectedGroup: Ref<GroupResponse | undefined> = ref();
const searchGroupName: Ref<string> = ref("");

const { groups, total, skip, limit, isLoading, fetchGroups } =
	useGroupListState();

const hasTeacher = (group: GroupResponse): boolean => {
	return group.users.some(
		(user: GroupUserResponse) => user.role === RoleName.Teacher
	);
};

const onGroupListIntersect = async (isIntersecting: boolean) => {
	if (isIntersecting && total.value > groups.value.length) {
		skip.value += limit.value;

		await loadGroups({ append: true });
	}
};

const loadGroups = async (options?: { append: boolean }) => {
	await fetchGroups(
		{
			name: searchGroupName.value,
			availableForSynchronization: true,
		},
		options
	);
};

watch(isOpen, async (newValue: boolean, oldValue: boolean) => {
	if (newValue !== oldValue && newValue) {
		await loadGroups();
	}
});

watch(searchGroupName, async (newValue: string, oldValue: string) => {
	if (newValue !== oldValue) {
		skip.value = 0;
		await loadGroups();
	}
});
</script>
