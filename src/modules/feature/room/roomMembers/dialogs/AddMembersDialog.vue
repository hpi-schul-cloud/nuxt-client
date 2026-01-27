<template>
	<Dialog
		v-model="isOpen"
		data-testid="dialog-add-participants"
		title="pages.rooms.members.add"
		cancel-btn-lang-key="common.actions.cancel"
		confirm-btn-lang-key="common.actions.add"
		@cancel="onClose"
		@confirm="onAddMembers"
	>
		<template #content>
			<InfoAlert>{{ t("pages.rooms.members.add.infoText") }}</InfoAlert>
			<VAutocomplete
				ref="autoCompleteSchool"
				v-model="selectedSchool"
				data-testid="add-participant-school"
				density="comfortable"
				class="mt-8"
				item-title="name"
				item-value="id"
				:items="schoolItems"
				:label="t('global.sidebar.item.school')"
				:disabled="isSchoolSelectionDisabled && !isAdminMode"
				v-bind="isAdminMode ? { menuIcon: '', readonly: true } : undefined"
				@update:model-value="onValueChange"
				@update:menu="onItemListToggle"
			/>

			<VSelect
				ref="selectRole"
				v-model="selectedSchoolRole"
				class="mt-4"
				density="comfortable"
				item-title="name"
				item-value="id"
				:item-props="schoolRoleListItemProps"
				:items="schoolRoles"
				:label="t('pages.rooms.members.tableHeader.schoolRole')"
				:disabled="isItemListDisabled && !isAdminMode"
				:readonly="schoolRoles.length === 1"
				:data-testid="`role-item-${selectedSchoolRole}`"
				v-bind="isAdminMode ? { menuIcon: '', readonly: true } : undefined"
				@update:model-value="onValueChange"
				@update:menu="onItemListToggle"
			>
				<template #selection="{ item }">
					<VIcon class="mr-1" :icon="item.raw.icon" />
					{{ item.title }}
				</template>
			</VSelect>

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

			<VAutocomplete
				ref="autoCompleteUsers"
				v-model="selectedUsers"
				class="mt-4"
				data-testid="add-participant-name"
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
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { useSafeFocusTrap } from "@/composables/safeFocusTrap";
import { RoleName } from "@/serverApi/v3";
import { useRoomAuthorization, useRoomMembersStore } from "@data-room";
import { mdiAccountOutline, mdiAccountSchoolOutline } from "@icons/material";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { Dialog } from "@ui-dialog";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { type VAutocomplete, type VCard, type VSelect } from "vuetify/components";

interface SchoolRoleItem {
	id: RoleName;
	name: string;
	icon: string;
}

enum StudentAlertTypeEnum {
	StudentAdmin = "STUDENT_ADMIN",
	StudentVisibility = "STUDENT_VISIBILITY",
}

const props = withDefaults(
	defineProps<{
		isAdminMode?: boolean;
	}>(),
	{
		isAdminMode: false,
	}
);

const isOpen = defineModel({
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	(e: "close"): void;
}>();

const { t } = useI18n();

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

const schoolRoleStudent: SchoolRoleItem = {
	id: RoleName.Student,
	name: t("common.labels.student.neutral"),
	icon: mdiAccountOutline,
};

const schoolRoleTeacher: SchoolRoleItem = {
	id: RoleName.Teacher,
	name: t("common.labels.teacher.neutral"),
	icon: mdiAccountSchoolOutline,
};

const schoolRoles = computed(() => (props.isAdminMode ? [schoolRoleTeacher] : [schoolRoleStudent, schoolRoleTeacher]));

const schoolRoleListItemProps = (item: SchoolRoleItem) => ({
	title: item.name,
	prependIcon: item.icon,
});

const selectedSchoolRole = ref<RoleName>(schoolRoles.value[0].id);
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
