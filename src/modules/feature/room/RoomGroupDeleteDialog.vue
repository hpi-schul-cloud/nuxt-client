<template>
	<SvsDialog
		v-model="isOpen"
		is-open-state-managed-externally
		:title="t('pages.rooms.groups.deleteDialog.title')"
		:is-loading="isDeleting"
		:persistent="isDeleting"
		data-testid="room-group-delete-dialog"
		@cancel="emit('cancel')"
	>
		<template #content>
			<p class="mb-2" data-testid="room-group-delete-text">{{ text }}</p>
			<VCheckbox
				v-model="dontAskAgain"
				:label="t('pages.rooms.groups.deleteDialog.dontAskAgain')"
				:disabled="isDeleting"
				hide-details
				data-testid="room-group-delete-dont-ask"
			/>
		</template>
		<template #actions>
			<SvsDialogBtnCancel data-testid="room-group-delete-cancel" :disabled="isDeleting" @click="emit('cancel')" />
			<SvsDialogBtnConfirm
				data-testid="room-group-delete-confirm"
				text-lang-key="common.actions.delete"
				:disabled="isDeleting"
				@click="emit('confirm', dontAskAgain)"
			/>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { SvsDialog, SvsDialogBtnCancel, SvsDialogBtnConfirm } from "@ui-dialog";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = withDefaults(defineProps<{ groupName: string; roomCount?: number; isDeleting?: boolean }>(), {
	roomCount: 0,
	isDeleting: false,
});

const emit = defineEmits<{
	confirm: [disableFutureConfirmation: boolean];
	cancel: [];
}>();

const isOpen = defineModel<boolean>({ default: false });

const { t } = useI18n();

const dontAskAgain = ref(false);

const text = computed(() =>
	props.roomCount === 0
		? t("pages.rooms.groups.deleteDialog.textEmpty", { name: props.groupName })
		: t("pages.rooms.groups.deleteDialog.text", { name: props.groupName, count: props.roomCount }, props.roomCount)
);

watch(
	isOpen,
	(open) => {
		if (open) dontAskAgain.value = false;
	},
	{ immediate: true }
);
</script>
