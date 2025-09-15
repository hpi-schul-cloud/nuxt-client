<template>
	<VDialog
		v-model="isOpen"
		:width="xs ? 'auto' : 480"
		data-testid="dialog-invite-participants"
		max-width="480"
		@keydown.esc="onClose"
		@click:outside="onClose"
	>
		<v-card ref="inviteMembersContent">
			<template #title>
				<h2 class="text-h4 mt-2">
					{{ modalTitle }}
				</h2>
			</template>
			<template #text>
				<div class="mt-5">asdasd</div>
			</template>

			<template #actions>
				<v-btn
					ref="cancelButton"
					class="ms-auto mr-2"
					:text="t('common.actions.cancel')"
					data-testid="invite-participant-cancel-btn"
					@click="onClose"
				/>
				<v-btn
					ref="continueButton"
					class="ms-auto"
					color="primary"
					variant="flat"
					:text="t('common.actions.continue')"
					data-testid="invite-participant-save-btn"
				/>
			</template>
		</v-card>
	</VDialog>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, ref, watch } from "vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import type { VCard } from "vuetify/components";
import { useDisplay } from "vuetify";

const isOpen = defineModel({
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	(e: "close"): void;
}>();

const { t } = useI18n();
const { xs } = useDisplay();

const modalTitle = computed(() =>
	t("components.board.menu.editing.settings.title")
);

// const subTitle = computed(() =>
// 	t("pages.rooms.members.inviteMember.editStep.subTitle")
// );

// const onUpdateDate = () => {

// 	unpause();
// };

const onClose = () => {
	emit("close");
};

const editSettings = ref<VCard>();
// const { pause, unpause, deactivate } = useFocusTrap(editSettings, {
const { deactivate } = useFocusTrap(editSettings, {
	immediate: true,
});

watch(
	() => isOpen.value,
	(isOpen: boolean) => {
		if (isOpen === false) {
			deactivate();
		}
	}
);
</script>
