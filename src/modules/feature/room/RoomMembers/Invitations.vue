<template>
	<p data-testid="info-text">
		{{ t("pages.rooms.members.tab.invitations.infoText") }}
	</p>
	<div v-for="link of roomInvitationLinks" :key="link.id">
		<div>
			{{ link }} {{ link.id
			}}<v-btn
				data-testid="update-invitation-button"
				@click="onClickUpdate(link.id)"
				>update</v-btn
			>
			<v-btn data-testid="use-invitation-button" @click="onClickUse(link.id)"
				>use</v-btn
			>
			<v-btn
				data-testid="delete-invitation-button"
				@click="onClickRemove(link.id)"
				>delete</v-btn
			>
		</div>
	</div>
	<v-btn data-testid="create-invitation-button" @click="onClickAdd"
		>add random link</v-btn
	>
</template>
<script setup lang="ts">
import {
	useRoomInvitationLinkStore,
	RoomInvitationLinkValidationError,
} from "@data-room";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const roomInvitationLinkStore = useRoomInvitationLinkStore();
const { roomInvitationLinks } = storeToRefs(roomInvitationLinkStore);

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

const onClickUse = async (linkId: string) => {
	const { roomId, message } = await roomInvitationLinkStore.useLink(linkId);
	if (roomId) {
		window.alert("redirect to room: " + roomId);
		return;
	}

	if (message === RoomInvitationLinkValidationError.Expired) {
		window.alert(t("pages.rooms.invitationlinks.error.expired"));
	}
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
	const maxOneOur =
		Math.ceil(Math.random() * 1000 * 3600) * (Math.ceil(Math.random()) * -1);

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
