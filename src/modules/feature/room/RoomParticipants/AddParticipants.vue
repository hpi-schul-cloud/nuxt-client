<template>
	<v-card min-width="560">
		<template v-slot:prepend>
			<h1 class="mb-4 ml-2 h4">
				{{ t("pages.rooms.participants.addParticipants") }}
			</h1>
		</template>

		<template v-slot:default>
			<div class="ml-4 mr-6">
				<div class="mt-4">
					<v-autocomplete
						ref="autoCompleteSchool"
						v-model="school"
						:label="t('global.sidebar.item.school')"
						item-value="id"
						item-title="name"
						density="comfortable"
						readonly
						menu-icon=""
						color="primary"
						bg-color="white"
					/>
				</div>

				<div class="mt-4">
					<v-autocomplete
						ref="autoCompleteRole"
						v-model="selectedRole"
						:items="roles"
						:label="t('common.labels.role')"
						readonly
						menu-icon=""
						@update:model-value="onRoleChange"
						auto-select-first="exact"
						density="comfortable"
						color="primary"
						bg-color="white"
					/>
				</div>

				<div class="mt-4">
					<v-autocomplete
						ref="autoCompleteUsers"
						v-model="selectedUsers"
						:items="userList"
						:label="t('common.labels.name')"
						color="primary"
						bg-color="white"
						item-value="id"
						item-title="fullName"
						multiple
						chips
						closable-chips
						clear-on-select
					/>
				</div>
			</div>
		</template>

		<template v-slot:actions>
			<v-spacer />
			<div class="mr-4 mb-3">
				<v-btn
					ref="cancelButton"
					class="ms-auto"
					color="primary"
					:text="t('common.actions.cancel')"
					@click="onClose"
				/>
				<v-btn
					ref="addButton"
					class="ms-auto"
					color="primary"
					:text="t('common.actions.add')"
					variant="flat"
					@click="onAddParticipants"
				/>
			</div>
		</template>
	</v-card>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { computed, PropType, ref } from "vue";
import { Participants } from "@data-room";
import { RoleName } from "@/serverApi/v3";

defineProps({
	userList: {
		type: Array as PropType<Participants[]>,
	},
});

const emit = defineEmits(["add:participants", "close", "update:role"]);

const { t } = useI18n();
const authModule = injectStrict(AUTH_MODULE_KEY);
const school = computed(() => authModule.getSchool);
const roles = computed(() => [RoleName.Teacher]);
const selectedRole = ref<RoleName>(RoleName.Teacher);
const selectedUsers = ref<Participants[]>([]);

const onRoleChange = () => {
	selectedUsers.value = [];
	emit("update:role", selectedRole.value);
};

const onAddParticipants = () => {
	emit("add:participants", selectedUsers.value);
	emit("close");
};
const onClose = () => emit("close");
</script>
