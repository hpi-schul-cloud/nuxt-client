<template>
	<v-card ref="inviteMembersContent">
		<template #title>
			<h2 class="text-h4 mt-2">Invite Members</h2>
		</template>

		<template #text>
			<InfoAlert>Some info alert text here</InfoAlert>

			<div>Dialog content goes here</div>
		</template>

		<template #actions>
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
					@click="onInviteMembers"
				/>
			</div>
		</template>
	</v-card>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { VCard } from "vuetify/lib/components/index.mjs";
import { InfoAlert } from "@ui-alert";

const emit = defineEmits<{
	(e: "close"): void;
}>();

const { t } = useI18n();

const onClose = () => emit("close");
const onInviteMembers = () => {
	// Logic to invite members
};

const inviteMembersContent = ref<VCard>();
// TODO: check if focus trap is needed
const { pause, unpause } = useFocusTrap(inviteMembersContent, {
	immediate: true,
});
</script>
<style lang="scss" scoped></style>
