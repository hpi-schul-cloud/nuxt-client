<template>
	<p data-testid="info-text">
		{{ t("pages.rooms.members.tab.invitations.infoText") }}
	</p>
	<div class="mb-12 mt-8">
		<InvitationTable
			:header-bottom="headerBottom"
			:items="invitationTableData"
			:show-select="true"
		/>
	</div>
</template>
<script setup lang="ts">
import { useRoomInvitationLinkStore } from "@data-room";
import { InvitationTable } from "@feature-room";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const roomInvitationLinkStore = useRoomInvitationLinkStore();
const { roomInvitationLinks, invitationTableData } = storeToRefs(
	roomInvitationLinkStore
);

defineProps({
	headerBottom: {
		type: Number,
		default: 0,
	},
});

onMounted(async () => {
	await roomInvitationLinkStore.fetchLinks();
});

const onClickAdd = async () => {
	await roomInvitationLinkStore.createLink({
		title: "Test " + Math.ceil(Math.random() * 1000),
		activeUntil: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
		isOnlyForTeachers: false,
		restrictedToCreatorSchool: false,
		requiresConfirmation: false,
	});
};

const onClickRemove = async (linkId: string) => {
	await roomInvitationLinkStore.deleteLinks(linkId);
};

const onClickCopyLink = async (linkId: string) => {
	const url = new URL(window.location.href);
	url.pathname = `/rooms/invitation-link/${linkId}`;
	url.searchParams.keys().forEach((key) => {
		url.searchParams.delete(key);
	});
	navigator.clipboard.writeText(url.toString());
};

const onClickUpdate = async (linkId: string) => {
	const link = roomInvitationLinks.value.find((link) => link.id === linkId);
	let updateCount = 0;
	const matches = link?.title.match(/\s*\(update: (\d+)\)/);
	if (matches) {
		updateCount = parseInt(matches[1], 10);
	}
	const title =
		(link?.title ?? "Test ").replace(/\s*\(update: \d+\)/, "") +
		` (update: ${updateCount + 1})`;

	const maxOneOur = Math.ceil((Math.random() + 1) * 1000 * 3600);

	await roomInvitationLinkStore.updateLink({
		id: linkId,
		title: title,
		activeUntil: new Date(Date.now() + maxOneOur).toISOString(),
		isOnlyForTeachers: Math.random() > 0.5,
		restrictedToCreatorSchool: Math.random() > 0.5,
		requiresConfirmation: Math.random() > 0.5,
	});
};
</script>
