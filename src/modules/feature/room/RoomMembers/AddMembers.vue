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
					:items="schoolList"
					:label="t('global.sidebar.item.school')"
					:disabled="isAutocompleteDisabled"
					:aria-disabled="isAutocompleteDisabled"
					@update:model-value="onSchoolChange"
					@update:menu="onAutocompleteToggle"
				/>
			</div>

			<div class="mt-4" data-testid="add-participant-role">
				<v-autocomplete
					ref="autoCompleteRole"
					v-model="selectedSchoolRole"
					auto-select-first="exact"
					density="comfortable"
					item-title="name"
					item-value="id"
					:items="schoolRoles"
					:label="t('pages.rooms.members.tableHeader.schoolRole')"
					:disabled="isAutocompleteDisabled"
					:aria-disabled="isAutocompleteDisabled"
					@update:model-value="onRoleChange"
					@update:menu="onAutocompleteToggle"
				/>
			</div>

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
					:items="memberList"
					:label="t('common.labels.name')"
					@update:menu="onAutocompleteToggle"
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
import { computed, PropType, ref, toRef } from "vue";
import { RoleName, SchoolForExternalInviteResponse } from "@/serverApi/v3";
import { RoomMember } from "@data-room";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { VAutocomplete, VCard } from "vuetify/lib/components/index.mjs";
import { InfoAlert } from "@ui-alert";

const props = defineProps({
	memberList: {
		type: Array as PropType<Omit<RoomMember, "roomRoleName">[]>,
		default: undefined,
	},
	schools: {
		type: Array as PropType<SchoolForExternalInviteResponse[]>,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "add:members", selectedUsers: string[]): void;
	(e: "close"): void;
	(e: "update:role", payload: { schoolRole: RoleName; schoolId: string }): void;
}>();

const { t } = useI18n();
const schoolList = toRef(props, "schools");
const selectedSchool = ref(schoolList.value[0].id);

const schoolRoles = [
	{ id: RoleName.Teacher, name: t("common.labels.teacher") },
];

const selectedSchoolRole = ref<RoleName>(schoolRoles[0].id);
const selectedUsers = ref<string[]>([]);

const onRoleChange = () => {
	selectedUsers.value = [];
	emit("update:role", {
		schoolRole: selectedSchoolRole.value,
		schoolId: selectedSchool.value,
	});
};

const onSchoolChange = () => {
	selectedSchoolRole.value = schoolRoles[0].id;
	onRoleChange();
};

const onAddMembers = () => {
	emit("add:members", selectedUsers.value);
	emit("close");
};

const onClose = () => emit("close");

const addMembersContent = ref<VCard>();
const { pause, unpause } = useFocusTrap(addMembersContent, {
	immediate: true,
});

const autoCompleteSchool = ref<VAutocomplete>();
const autoCompleteRole = ref<VAutocomplete>();
const autoCompleteUsers = ref<VAutocomplete>();

const onAutocompleteToggle = () => {
	const autocompleteRefs = [
		autoCompleteSchool,
		autoCompleteRole,
		autoCompleteUsers,
	];

	const isAnyAutocompleteOpen = autocompleteRefs.some(
		(autocomplete) => autocomplete.value?.menu
	);

	if (isAnyAutocompleteOpen) {
		pause();
	} else {
		unpause();
	}
};

const isAutocompleteDisabled = computed(() => selectedUsers.value.length > 0);
</script>
<style lang="scss" scoped>
// show focus indicator for chips on safari
:deep(.v-chip) {
	overflow: unset !important;
}
</style>
