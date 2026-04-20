<template>
	<SvsDialog
		v-model="isOpen"
		cancel-btn-lang-key="common.labels.close"
		no-confirm
		title="pages.rooms.leaveRoom.menu"
		data-testid="dialog-leave-room-owner"
	>
		<template #content>
			<WarningAlert class="warning-text">
				{{ t("pages.rooms.leaveRoom.RoomOwner.warning") }}
			</WarningAlert>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const isOpen = defineModel({
	type: Boolean,
	required: true,
});
</script>
