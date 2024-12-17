<template>
	<v-card ref="addMembersContent">
		<template v-slot:prepend>
			<div ref="textTitle" class="text-h4 mt-2">
				{{ t("pages.rooms.members.add") }}
			</div>
		</template>

		<template v-slot:default>
			<div class="ml-6 mr-6">
				<div class="mt-3" data-testid="add-participant-school">
					<v-autocomplete
						ref="autoCompleteSchool"
						v-model="selectedSchool"
						density="comfortable"
						item-title="name"
						item-value="id"
						variant="underlined"
						:items="schoolList"
						:label="t('global.sidebar.item.school')"
						@update:model-value="onSchoolChange"
						@update:menu="onAutocompleteToggle"
					/>
				</div>

				<div class="mt-4" data-testid="add-participant-role">
					<v-autocomplete
						ref="autoCompleteRole"
						v-model="selectedRole"
						auto-select-first="exact"
						density="comfortable"
						item-title="name"
						item-value="id"
						variant="underlined"
						:items="roles"
						:label="t('common.labels.role')"
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
						variant="underlined"
						:items="memberList"
						:label="t('common.labels.name')"
						@update:menu="onAutocompleteToggle"
					/>
				</div>
			</div>
		</template>

		<template v-slot:actions>
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
import { PropType, ref, toRef } from "vue";
import { RoleName, SchoolForExternalInviteResponse } from "@/serverApi/v3";
import { RoomMember } from "@data-room";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { VAutocomplete } from "vuetify/lib/components/index.mjs";

const props = defineProps({
	memberList: {
		type: Array as PropType<RoomMember[]>,
	},
	schools: {
		type: Array as PropType<SchoolForExternalInviteResponse[]>,
		required: true,
	},
});

const emit = defineEmits(["add:members", "close", "update:role"]);
const { t } = useI18n();
const schoolList = toRef(props, "schools");
const selectedSchool = ref(schoolList.value[0].id);

const roles = [{ id: RoleName.Roomeditor, name: t("common.labels.teacher") }];

const selectedRole = ref<string>(roles[0].id);
const selectedUsers = ref<string[]>([]);

const onRoleChange = () => {
	selectedUsers.value = [];
	emit("update:role", {
		role: selectedRole.value,
		schoolId: selectedSchool.value,
	});
};

const onSchoolChange = () => {
	selectedRole.value = roles[0].id;
	onRoleChange();
};

const onAddMembers = () => {
	emit("add:members", selectedUsers.value);
	emit("close");
};

const onClose = () => emit("close");

const addMembersContent = ref();
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
</script>
