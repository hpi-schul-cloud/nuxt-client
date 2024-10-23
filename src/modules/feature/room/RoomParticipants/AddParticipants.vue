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
						v-model="school"
						:label="t('global.sidebar.item.school')"
						bg-color="white"
						color="primary"
						density="comfortable"
						item-value="id"
						item-title="name"
						menu-icon=""
						readonly
						variant="underlined"
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
						menu-icon=""
						readonly
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

<style scoped>
:deep .v-label {
	margin-left: 0px !important;
	padding-left: 2px !important;
}

:deep .v-field__input {
	padding-left: 2px !important;
}
</style>
