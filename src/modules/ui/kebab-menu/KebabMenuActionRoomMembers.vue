<template>
	<KebabMenuAction
		:icon="mdiAccountGroupOutline"
		data-testid="kebab-menu-action-room-members"
	>
		{{ membersInfoText }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiAccountGroupOutline } from "@icons/material";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
	canAddRoomMembers: { type: Boolean, required: true, default: false },
});

const membersInfoText = computed(() =>
	props.canAddRoomMembers
		? t("pages.rooms.members.manage")
		: t("pages.rooms.members.view")
);
</script>
