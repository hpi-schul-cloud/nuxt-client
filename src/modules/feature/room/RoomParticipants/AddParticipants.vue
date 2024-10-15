<template>
	<v-card min-width="560">
		<template v-slot:prepend>
			<h1 class="mb-4 h4">
				{{ t("pages.rooms.participants.addParticipants") }}
			</h1>
		</template>

		<template v-slot:default>
			<v-divider />
			<div class="mx-4 mt-4">
				<v-autocomplete
					v-model="school"
					item-value="id"
					item-title="name"
					density="comfortable"
					:label="t('global.sidebar.item.school')"
					readonly
					menu-icon=""
					color="primary"
					bg-color="white"
				/>
			</div>

			<div class="ma-4">
				<v-autocomplete
					v-model="preSelecterRole"
					:items="roles"
					auto-select-first="exact"
					density="comfortable"
					:label="t('common.labels.role')"
					color="primary"
					bg-color="white"
				/>
			</div>

			<div class="ma-4">
				<v-autocomplete
					v-model="selectedUsers"
					:items="userList"
					density="comfortable"
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
			<v-divider class="mt-4" />
		</template>

		<template v-slot:actions>
			<v-spacer />
			<v-btn
				class="ms-auto"
				color="primary"
				:text="t('common.actions.cancel')"
				@click="onClose"
			/>
			<v-btn
				class="ms-auto"
				color="primary"
				:text="t('common.actions.add')"
				variant="flat"
				@click="onAddParticipants"
			/>
		</template>
	</v-card>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { computed, PropType, ref } from "vue";
import { Participants } from "./types";

defineProps({
	userList: {
		type: Array as PropType<Participants[]>,
	},
});

const emit = defineEmits(["add:participants", "close"]);

const { t } = useI18n();
const authModule = injectStrict(AUTH_MODULE_KEY);
const school = computed(() => authModule.getSchool);
const roles = computed(() => ["Teacher", "Student"]);
const preSelecterRole = ref<string>("Teacher");
const selectedUsers = ref<Participants[]>([]);

const onAddParticipants = () => {
	emit("add:participants", selectedUsers.value);
	emit("close");
};
const onClose = () => emit("close");
</script>
