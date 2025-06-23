<template>
	<p data-testid="info-text">
		{{ t("pages.rooms.members.tab.invitations.infoText") }}
	</p>
	<div class="mb-12">
		<InvitationTable :header-bottom="headerBottom" :show-select="true" />
	</div>
</template>
<script setup lang="ts">
import { useRoomInvitationLinkStore } from "@data-room";
import { InvitationTable } from "@feature-room";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const roomInvitationLinkStore = useRoomInvitationLinkStore();

defineProps({
	headerBottom: {
		type: Number,
		default: 0,
	},
});

onMounted(async () => {
	await roomInvitationLinkStore.fetchLinks();
});
</script>
