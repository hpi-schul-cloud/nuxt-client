<template>
	<SvsDialog
		v-model="isOpen"
		is-open-state-managed-externally
		scrollable
		:title="t(roomCount > 1 ? 'pages.rooms.groups.moveDialog.titleMany' : 'pages.rooms.groups.moveDialog.title')"
		:is-loading="isMoving"
		:persistent="isMoving"
		:are-actions-disabled="isMoving"
		:confirm-btn-disabled="!canConfirm"
		confirm-btn-lang-key="common.actions.move"
		data-testid="room-move-dialog"
		@confirm="onConfirm"
		@cancel="emit('cancel')"
		@after-enter="focusFirstTarget"
	>
		<template #content>
			<p :id="questionId" class="mb-2">{{ question }}</p>
			<VRadioGroup
				ref="radioGroupRef"
				v-model="selectedKey"
				:aria-labelledby="questionId"
				:disabled="isMoving"
				hide-details
			>
				<VRadio
					v-for="target in targets"
					:key="target.key"
					:value="target.key"
					:disabled="target.key === currentKey"
					:label="
						target.key === currentKey
							? t('pages.rooms.groups.moveDialog.current', { name: target.label })
							: target.label
					"
					:data-testid="target.testId"
					class="room-move-target"
				/>
			</VRadioGroup>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { RoomMoveTarget } from "./room-arrangement-drop";
import { SvsDialog } from "@ui-dialog";
import { computed, ref, useId, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = withDefaults(
	defineProps<{
		roomName: string;
		targets: RoomMoveTarget[];
		currentKey?: string;
		isMoving?: boolean;
		/** Number of rooms moved at once; the room name is only used for a single room. */
		roomCount?: number;
	}>(),
	{ currentKey: undefined, isMoving: false, roomCount: 1 }
);

const emit = defineEmits<{
	confirm: [targetKey: string];
	cancel: [];
}>();

const isOpen = defineModel<boolean>({ default: false });
const questionId = `room-move-question-${useId()}`;

const { t } = useI18n();

const selectedKey = ref<string | null>(null);
const radioGroupRef = useTemplateRef("radioGroupRef");

// Runs before VDialog's own focus handling, which then keeps focus inside the dialog where it is.
const focusFirstTarget = () => {
	const root: unknown = radioGroupRef.value?.$el;
	if (root instanceof HTMLElement) {
		root.querySelector<HTMLInputElement>("input[type='radio']:not(:disabled)")?.focus();
	}
};

const question = computed(() =>
	props.roomCount > 1
		? t("pages.rooms.groups.moveDialog.textMany", { count: props.roomCount }, props.roomCount)
		: t("pages.rooms.groups.moveDialog.text", { name: props.roomName })
);

const canConfirm = computed(
	() =>
		selectedKey.value !== null &&
		selectedKey.value !== props.currentKey &&
		props.targets.some((target) => target.key === selectedKey.value)
);

watch(
	isOpen,
	(open) => {
		if (open) selectedKey.value = null;
	},
	{ immediate: true }
);

const onConfirm = () => {
	if (selectedKey.value !== null && canConfirm.value) {
		emit("confirm", selectedKey.value);
	}
};
</script>
