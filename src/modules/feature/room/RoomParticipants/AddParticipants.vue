<template>
	<v-card min-width="480" max-height="480">
		<template v-slot:prepend>
			<div ref="textTitle" class="text-h4 mt-2">
				{{ t("pages.rooms.participants.addParticipants") }}
			</div>
		</template>

		<template v-slot:default>
			<div class="ml-6 mr-6">
				<div class="mt-3">
					<v-autocomplete
						ref="autoCompleteSchool"
						v-model="selectedSchool"
						bg-color="white"
						color="primary"
						density="comfortable"
						item-title="name"
						item-value="id"
						variant="underlined"
						:items="schoolList"
						:label="t('global.sidebar.item.school')"
						@update:model-value="onSchoolChange"
					/>
				</div>

				<div class="mt-4">
					<v-autocomplete
						ref="autoCompleteRole"
						v-model="selectedRole"
						auto-select-first="exact"
						bg-color="white"
						color="primary"
						density="comfortable"
						item-title="name"
						item-value="id"
						variant="underlined"
						:items="roles"
						:label="t('common.labels.role')"
						@update:model-value="onRoleChange"
					/>
				</div>

				<div class="mt-4">
					<v-autocomplete
						ref="autoCompleteUsers"
						v-model="selectedUsers"
						bg-color="white"
						chips
						clear-on-select
						closable-chips
						color="primary"
						item-value="userId"
						item-title="fullName"
						multiple
						variant="underlined"
						:items="userList"
						:label="t('common.labels.name')"
						:no-data-text="t('common.nodata')"
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
					@click="onClose"
				/>
				<v-btn
					ref="addButton"
					class="ms-auto"
					color="primary"
					variant="flat"
					:text="t('common.actions.add')"
					@click="onAddParticipants"
				/>
			</div>
		</template>
	</v-card>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { PropType, ref, toRef } from "vue";
import { RoleName, SchoolForExternalInviteResponse } from "@/serverApi/v3";
import { ParticipantType } from "@data-room";

const props = defineProps({
	userList: {
		type: Array as PropType<ParticipantType[]>,
	},
	schools: {
		type: Array as PropType<SchoolForExternalInviteResponse[]>,
		required: true,
	},
});

const emit = defineEmits(["add:participants", "close", "update:role"]);
const { t } = useI18n();
const schoolList = toRef(props, "schools");
const selectedSchool = ref(schoolList.value[0].id);

const roles = [
	{ id: RoleName.RoomEditor, name: t("common.labels.teacher") },
	// This role is not used for now
	// { id: RoleName.RoomViewer, name: t("pages.rooms.participants.roles.viewer") },
];

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

const onAddParticipants = () => {
	emit("add:participants", selectedUsers.value);
	emit("close");
};

const onClose = () => emit("close");
</script>
