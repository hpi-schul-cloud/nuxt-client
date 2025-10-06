<template>
	<VDialog
		v-model="isOpen"
		:width="xs ? 'auto' : 480"
		data-testid="dialog-add-participants"
		max-width="480"
		persistent
		@keydown.esc="onClose"
	>
		<VCard ref="addMembersContent">
			<template #title>
				<h2 class="mt-2">
					{{ t("pages.rooms.members.add") }}
				</h2>
			</template>

			<template #text>
				<InfoAlert>{{ t("pages.rooms.members.add.infoText") }}</InfoAlert>
				<div class="mt-8" data-testid="add-participant-school">
					<VAutocomplete
						ref="autoCompleteSchool"
						v-model="selectedSchool"
						density="comfortable"
						item-title="name"
						item-value="id"
						:items="schoolItems"
						:label="t('global.sidebar.item.school')"
						:disabled="isSchoolSelectionDisabled"
						:aria-disabled="isSchoolSelectionDisabled"
						v-bind="isAdminMode ? { menuIcon: '', readonly: true } : undefined"
						@update:model-value="onValueChange"
						@update:menu="onItemListToggle"
					/>
				</div>

				<div class="mt-4" data-testid="add-participant-role">
					<VSelect
						ref="selectRole"
						v-model="selectedSchoolRole"
						density="comfortable"
						item-title="name"
						item-value="id"
						:item-props="schoolRoleListItemProps"
						:items="schoolRoles"
						:label="t('pages.rooms.members.tableHeader.schoolRole')"
						:disabled="isItemListDisabled"
						:aria-disabled="isItemListDisabled"
						:data-testid="`role-item-${selectedSchoolRole}`"
						@update:model-value="onValueChange"
						@update:menu="onItemListToggle"
					>
						<template #selection="{ item }">
							<VIcon class="mr-1" :icon="item.raw.icon" />
							{{ item.title }}
						</template>
					</VSelect>
				</div>

				<InfoAlert
					v-if="!isAdminMode && determineStudentAlertType === StudentAlertTypeEnum.StudentVisibility"
					data-testid="student-visibility-info-alert"
				>
					{{ t("pages.rooms.members.add.students.forbidden") }}
				</InfoAlert>

				<InfoAlert
					v-else-if="determineStudentAlertType === StudentAlertTypeEnum.StudentAdmin"
					data-testid="student-admin-info-alert"
				>
					{{ t("pages.rooms.members.add.students.studentAdmins") }}
				</InfoAlert>

				<WarningAlert v-if="isStudentSelectionDisabled">
					{{ t("pages.rooms.members.add.warningText") }}
				</WarningAlert>

				<div class="mt-4" data-testid="add-participant-name">
					<v-autocomplete
						ref="autoCompleteUsers"
						v-model="selectedUsers"
						chips
						clear-on-select
						closable-chips
						item-value="userId"
						item-title="fullName"
						multiple
						:disabled="isStudentSelectionDisabled"
						:items="potentialRoomMembers"
						:label="t('common.labels.name')"
						@update:menu="onItemListToggle"
					/>
				</div>
			</template>

			<template #actions>
				<VSpacer />
				<div class="mr-4 mb-3">
					<VBtn
						ref="cancelButton"
						class="ms-auto mr-2"
						color="primary"
						:text="t('common.actions.cancel')"
						data-testid="add-participant-cancel-btn"
						@click="onClose"
					/>
					<VBtn
						ref="addButton"
						class="ms-auto"
						color="primary"
						variant="flat"
						:text="t('common.actions.add')"
						data-testid="add-participant-save-btn"
						@click="onAddMembers"
					/>
				</div>
			</template>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { useSafeFocusTrap } from "@/composables/safeFocusTrap";
import { RoleName } from "@/serverApi/v3";
import { useRoomAuthorization, useRoomMembersStore } from "@data-room";
import { mdiAccountOutline, mdiAccountSchoolOutline } from "@icons/material";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import type { VAutocomplete, VCard, VSelect } from "vuetify/components";
interface SchoolRoleItem {
	id: RoleName;
	name: string;
	icon: string;
}

enum StudentAlertTypeEnum {
	StudentAdmin = "STUDENT_ADMIN",
	StudentVisibility = "STUDENT_VISIBILITY",
}

interface AddMembersDialogProps {
	isAdminMode?: boolean;
}

const props = withDefaults(defineProps<AddMembersDialogProps>(), {
	isAdminMode: false,
});

const isOpen = defineModel({
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	(e: "close"): void;
}>();

const { t } = useI18n();
const { xs } = useDisplay();

const roomMembersStore = useRoomMembersStore();
const { isCurrentUserStudent, potentialRoomMembers, schools } = storeToRefs(roomMembersStore);
const { addMembers, getPotentialMembers, resetPotentialMembers } = roomMembersStore;

const schoolItems = computed(() => {
	if (props.isAdminMode) {
		return schools.value.slice(0, 1);
	} else {
		return schools.value;
	}
});

const { canAddAllStudents } = useRoomAuthorization();

const selectedSchool = ref(schools.value[0].id);

const schoolRoles: SchoolRoleItem[] = [
	{
		id: RoleName.Student,
		name: t("common.labels.student.neutral"),
		icon: mdiAccountOutline,
	},
	{
		id: RoleName.Teacher,
		name: t("common.labels.teacher.neutral"),
		icon: mdiAccountSchoolOutline,
	},
];

const schoolRoleListItemProps = (item: SchoolRoleItem) => ({
	title: item.name,
	prependIcon: item.icon,
});

const selectedSchoolRole = ref<RoleName>(schoolRoles[0].id);
const selectedUsers = ref<string[]>([]);

const addMembersContent = ref<VCard>();
const { pause, unpause } = useSafeFocusTrap(isOpen, addMembersContent);

const isSchoolSelectionDisabled = computed(() => {
	if (props.isAdminMode) return false;
	return isCurrentUserStudent.value || isItemListDisabled.value;
});

const isStudentSelectionDisabled = computed(() => {
	const isExternalSchoolSelected = selectedSchool.value !== schools.value[0].id;
	const isStudentRoleSelected = selectedSchoolRole.value === RoleName.Student;
	return isExternalSchoolSelected && isStudentRoleSelected;
});

const isRestrictedStudentVisibilityCase = computed(
	() => selectedSchoolRole.value === RoleName.Student && !canAddAllStudents.value
);

const determineStudentAlertType = computed<StudentAlertTypeEnum | null>(() => {
	if (selectedSchoolRole.value === RoleName.Student && isCurrentUserStudent.value) {
		return StudentAlertTypeEnum.StudentAdmin;
	}

	if (isRestrictedStudentVisibilityCase.value && !isStudentSelectionDisabled.value) {
		return StudentAlertTypeEnum.StudentVisibility;
	}

	return null;
});

const autoCompleteSchool = ref<VAutocomplete>();
const autoCompleteUsers = ref<VAutocomplete>();
const selectRole = ref<VSelect>();

const onItemListToggle = () => {
	const refs = [autoCompleteSchool, autoCompleteUsers, selectRole];

	const isAnyItemListOpen = refs.some((itemList) => itemList.value?.menu);

	if (isAnyItemListOpen) {
		pause();
	} else {
		unpause();
	}
};

const onValueChange = async () => {
	resetPotentialMembers();
	selectedUsers.value = [];
	await getPotentialMembers(selectedSchoolRole.value, selectedSchool.value);
};

const onAddMembers = async () => {
	await addMembers(selectedUsers.value);
	onClose();
};

const onClose = () => {
	resetPotentialMembers();
	selectedUsers.value = [];
	emit("close");
};

watch(isOpen, async (isDialogOpen) => {
	if (isDialogOpen) {
		await getPotentialMembers(selectedSchoolRole.value, selectedSchool.value);
	}
});

const isItemListDisabled = computed(() => selectedUsers.value.length > 0);
</script>
<style lang="scss" scoped>
// show focus indicator for chips on safari
:deep(.v-chip) {
	overflow: unset !important;
}
</style>
