<template>
	<SvsDialog
		v-model="isOpen"
		is-open-state-managed-externally
		:title="title"
		:is-loading="isSaving"
		:persistent="isSaving"
		:are-actions-disabled="isSaving"
		:confirm-btn-lang-key="mode === 'create' ? 'common.actions.create' : 'common.actions.save'"
		data-testid="room-group-name-dialog"
		@confirm="onSubmit"
		@cancel="emit('cancel')"
		@after-leave="emit('after-leave')"
	>
		<template #content>
			<VTextField
				v-model="name"
				:label="t('pages.rooms.groups.dialog.name.label')"
				autofocus
				:counter="ROOM_GROUP_NAME_MAX_LENGTH"
				:counter-value="countRoomGroupNameLength"
				persistent-counter
				:error-messages="errorMessage"
				:readonly="isSaving"
				data-testid="room-group-name-input"
				@update:model-value="onInput"
				@keydown.enter.prevent="onSubmit"
			/>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import {
	countRoomGroupNameLength,
	ROOM_GROUP_NAME_MAX_LENGTH,
	RoomGroupNameErrorReason,
	validateRoomGroupName,
} from "@data-room";
import { SvsDialog } from "@ui-dialog";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = withDefaults(
	defineProps<{
		mode: "create" | "rename";
		initialName?: string;
		/** Id of the renamed group; excluded from the duplicate check. */
		groupId?: string;
		existingGroups?: { id: string; name: string }[];
		isSaving?: boolean;
		serverError?: RoomGroupNameErrorReason;
	}>(),
	{ initialName: "", groupId: undefined, existingGroups: () => [], isSaving: false, serverError: undefined }
);

const emit = defineEmits<{
	submit: [name: string];
	cancel: [];
	"clear-server-error": [];
	"after-leave": [];
}>();

const isOpen = defineModel<boolean>({ default: false });

const { t } = useI18n();

const name = ref("");
const isDirty = ref(false);
const submitAttempted = ref(false);

const title = computed(() =>
	t(props.mode === "create" ? "pages.rooms.groups.dialog.create.title" : "pages.rooms.groups.dialog.rename.title")
);

const validation = computed(() => validateRoomGroupName(name.value, props.existingGroups, props.groupId));

const errorReason = computed<RoomGroupNameErrorReason | undefined>(() => {
	if (props.serverError) return props.serverError;
	if (validation.value.valid) return undefined;
	const showRequired = submitAttempted.value || isDirty.value;
	if (validation.value.reason === "REQUIRED" && !showRequired) return undefined;
	return validation.value.reason;
});

const errorMessage = computed(() =>
	errorReason.value
		? t(`pages.rooms.groups.validation.${errorReason.value}`, { max: ROOM_GROUP_NAME_MAX_LENGTH })
		: undefined
);

const onInput = () => {
	isDirty.value = true;
	if (props.serverError) emit("clear-server-error");
};

watch(
	isOpen,
	(open) => {
		if (!open) return;
		name.value = props.initialName;
		isDirty.value = false;
		submitAttempted.value = false;
	},
	{ immediate: true }
);

const onSubmit = () => {
	if (props.isSaving) return;
	submitAttempted.value = true;
	const result = validation.value;
	if (!result.valid) return;
	emit("submit", result.normalized);
};
</script>
