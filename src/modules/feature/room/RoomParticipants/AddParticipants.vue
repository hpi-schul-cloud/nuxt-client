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
						:items="mockSchools"
						:label="t('global.sidebar.item.school')"
						bg-color="white"
						color="primary"
						density="comfortable"
						item-title="name"
						item-value="id"
						variant="underlined"
						@update:model-value="onSchoolChange"
					/>
				</div>

				<div class="mt-4">
					<v-autocomplete
						ref="autoCompleteRole"
						v-model="selectedRole"
						:items="roles"
						:label="t('common.labels.role')"
						auto-select-first="exact"
						bg-color="white"
						color="primary"
						density="comfortable"
						item-title="name"
						item-value="id"
						variant="underlined"
						@update:model-value="onRoleChange"
					/>
				</div>

				<div class="mt-4">
					<v-autocomplete
						ref="autoCompleteUsers"
						v-model="selectedUsers"
						:items="userList"
						:label="t('common.labels.name')"
						bg-color="white"
						chips
						closable-chips
						clear-on-select
						color="primary"
						item-value="id"
						item-title="fullName"
						multiple
						:no-data-text="t('common.nodata')"
						variant="underlined"
					/>
				</div>
			</div>
		</template>

		<template v-slot:actions>
			<v-spacer />
			<div class="mr-4 mb-3">
				<v-btn
					ref="cancelButton"
					:text="t('common.actions.cancel')"
					class="ms-auto mr-2"
					color="primary"
					@click="onClose"
				/>
				<v-btn
					ref="addButton"
					:text="t('common.actions.add')"
					class="ms-auto"
					color="primary"
					variant="flat"
					@click="onAddParticipants"
				/>
			</div>
		</template>
	</v-card>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { PropType, ref } from "vue";
import { mockSchools } from "@data-room";
import { RoleName, RoomParticipantResponse } from "@/serverApi/v3";

defineProps({
	userList: {
		type: Array as PropType<RoomParticipantResponse[]>,
	},
});

const emit = defineEmits(["add:participants", "close", "update:role"]);

const { t } = useI18n();

const selectedSchool = ref(mockSchools[0]);

const roles = [
	{ id: RoleName.Teacher, name: t("common.roleName.teacher") },
	{ id: RoleName.Student, name: t("common.roleName.student") },
];

const selectedRole = ref(roles[0]);
const selectedUsers = ref<RoomParticipantResponse[]>([]);

const onRoleChange = () => {
	selectedUsers.value = [];
	emit("update:role", selectedRole.value);
};

const onSchoolChange = () => {
	selectedRole.value = roles[0];
	selectedUsers.value = [];
};

const onAddParticipants = () => {
	emit("add:participants", selectedUsers.value);
	emit("close");
};
const onClose = () => emit("close");
</script>
