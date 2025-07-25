<template>
	<v-card ref="addMembersContent">
		<template #title>
			<h2 class="text-h4 mt-2">
				{{ t("pages.rooms.members.add") }}
			</h2>
		</template>

		<template #text>
			<InfoAlert>{{ t("pages.rooms.members.add.infoText") }}</InfoAlert>
			<div class="mt-8" data-testid="add-participant-school">
				<v-autocomplete
					ref="autoCompleteSchool"
					v-model="selectedSchool"
					density="comfortable"
					item-title="name"
					item-value="id"
					:items="schools"
					:label="t('global.sidebar.item.school')"
					:disabled="isItemListDisabled || (isSchoolSelectionDisabled ?? false)"
					:aria-disabled="isItemListDisabled"
					@update:model-value="onValueChange"
					@update:menu="onItemListToggle"
				/>
			</div>

			<div class="mt-4" data-testid="add-participant-role">
				<v-select
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
				</v-select>
			</div>

			<InfoAlert
				v-if="
					determineStudentAlertType === StudentAlertTypeEnum.StudentVisibility
				"
				data-testid="student-visibility-info-alert"
			>
				{{ t("pages.rooms.members.add.students.forbidden") }}
			</InfoAlert>

			<InfoAlert
				v-if="determineStudentAlertType === StudentAlertTypeEnum.StudentAdmin"
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
			<v-spacer />
			<div class="mr-4 mb-3">
				<v-btn
					ref="cancelButton"
					class="ms-auto mr-2"
					color="primary"
					:text="t('common.actions.cancel')"
					data-testid="add-participant-cancel-btn"
					@click="onClose"
				/>
				<v-btn
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
	</v-card>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, onMounted, ref } from "vue";
import { RoleName } from "@/serverApi/v3";
import { useRoomAuthorization, useRoomMembersStore } from "@data-room";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import type { VAutocomplete, VCard, VSelect } from "vuetify/components";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { storeToRefs } from "pinia";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { mdiAccountOutline, mdiAccountSchoolOutline } from "@icons/material";

interface SchoolRoleItem {
	id: RoleName;
	name: string;
	icon: string;
}

enum StudentAlertTypeEnum {
	StudentAdmin = "STUDENT_ADMIN",
	StudentVisibility = "STUDENT_VISIBILITY",
}

const emit = defineEmits<{
	(e: "close"): void;
}>();

const { t } = useI18n();

const roomMembersStore = useRoomMembersStore();
const { isCurrentUserStudent, potentialRoomMembers, schools } =
	storeToRefs(roomMembersStore);
const { addMembers, getPotentialMembers, resetPotentialMembers } =
	roomMembersStore;

const { canAddRoomMembers, canSeeAllStudents } = useRoomAuthorization();
const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const { FEATURE_ROOM_ADD_STUDENTS_ENABLED } = envConfigModule.getEnv;

const canAddAllStudents = computed(() => {
	return canAddRoomMembers.value && canSeeAllStudents.value;
});

const selectedSchool = ref(schools.value[0].id);

const schoolRoles: SchoolRoleItem[] = [
	{
		id: RoleName.Teacher,
		name: t("common.labels.teacher.neutral"),
		icon: mdiAccountSchoolOutline,
	},
];

if (FEATURE_ROOM_ADD_STUDENTS_ENABLED) {
	schoolRoles.unshift({
		id: RoleName.Student,
		name: t("common.labels.student.neutral"),
		icon: mdiAccountOutline,
	});
}

const schoolRoleListItemProps = (item: SchoolRoleItem) => ({
	title: item.name,
	prependIcon: item.icon,
});

const selectedSchoolRole = ref<RoleName>(schoolRoles[0].id);
const selectedUsers = ref<string[]>([]);

const onValueChange = async () => {
	resetPotentialMembers();
	selectedUsers.value = [];
	await getPotentialMembers(selectedSchoolRole.value, selectedSchool.value);
};

const onAddMembers = async () => {
	await addMembers(selectedUsers.value);
	emit("close");
};

const onClose = () => emit("close");

const addMembersContent = ref<VCard>();
const { pause, unpause } = useFocusTrap(addMembersContent, {
	immediate: true,
});

const isSchoolSelectionDisabled = computed(() => {
	return isCurrentUserStudent.value;
});

const isStudentSelectionDisabled = computed(() => {
	const isExternalSchoolSelected = selectedSchool.value !== schools.value[0].id;
	const isStudentRoleSelected = selectedSchoolRole.value === RoleName.Student;
	return isExternalSchoolSelected && isStudentRoleSelected;
});

const isRestrictedStudentVisibilityCase = computed(() => {
	return (
		selectedSchoolRole.value === RoleName.Student && !canAddAllStudents.value
	);
});

const determineStudentAlertType = computed<StudentAlertTypeEnum | null>(() => {
	if (
		selectedSchoolRole.value === RoleName.Student &&
		isCurrentUserStudent.value
	) {
		return StudentAlertTypeEnum.StudentAdmin;
	}

	if (
		isRestrictedStudentVisibilityCase.value &&
		!isStudentSelectionDisabled.value
	) {
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

onMounted(() => {
	getPotentialMembers(selectedSchoolRole.value, selectedSchool.value);
});

const isItemListDisabled = computed(() => selectedUsers.value.length > 0);
</script>
<style lang="scss" scoped>
// show focus indicator for chips on safari
:deep(.v-chip) {
	overflow: unset !important;
}
</style>
