<template>
	<vCustomDialog
		v-model:is-open="isOpen"
		has-buttons
		:buttons="['cancel', 'next']"
		:next-btn-disabled="!selectedGroup || !hasTeacher(selectedGroup)"
		@next="onConfirm"
		@dialog-canceled="$emit('cancel')"
	>
		<template #title>
			<div class="text-h4 my-2 text-break">
				{{ $t("feature-course-sync.GroupSelectionDialog.title") }}
			</div>
		</template>

		<template #content>
			<p class="text-md mt-2" data-testid="group-dialog-info-text">
				{{ description }}
			</p>
			<VAutocomplete
				v-model="selectedGroup"
				v-model:search="searchGroupName"
				:label="$t('feature-course-sync.GroupSelectionDialog.selection.label')"
				:no-data-text="$t('common.nodata')"
				item-title="name"
				item-value="id"
				:items="groups"
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
				<span data-testid="no-teacher-warning-text">
					<i18n-t
						keypath="feature-course-sync.GroupSelectionDialog.noTeacher"
						scope="global"
					>
						<template #groupName>
							{{ selectedGroup.name }}
						</template>
						<template #teacher>
							<ul class="mb-3 pl-4">
								<li>
									{{ t("common.labels.teacher") }}
								</li>
							</ul>
						</template>
					</i18n-t>
				</span>
			</WarningAlert>
		</template>
	</vCustomDialog>
</template>

<script setup lang="ts">
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { GroupResponse, GroupUserResponse, RoleName } from "@/serverApi/v3";
import { useGroupListState } from "@data-group";
import { WarningAlert } from "@ui-alert";
import { useDebounceFn } from "@vueuse/core";
import { ModelRef, Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

defineProps({
	description: {
		type: String,
		required: true,
	},
});

const { t } = useI18n();

const isOpen: ModelRef<boolean> = defineModel("isOpen", {
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	(e: "confirm", selectedGroup: GroupResponse): void;
	(e: "cancel"): void;
}>();

const selectedGroup: Ref<GroupResponse | undefined> = ref();
const searchGroupName: Ref<string> = ref("");

const onConfirm = async () => {
	if (selectedGroup.value) {
		emit("confirm", selectedGroup.value);
	}
};

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

const loadGroupsThrottled = useDebounceFn(() => loadGroups(), 1000, {
	maxWait: 1000,
});

watch(isOpen, async (newValue: boolean, oldValue: boolean) => {
	if (newValue !== oldValue && newValue) {
		await loadGroups();
	}
});

watch(searchGroupName, (newValue: string, oldValue: string) => {
	if (newValue !== oldValue) {
		skip.value = 0;
		loadGroupsThrottled();
	}
});
</script>
