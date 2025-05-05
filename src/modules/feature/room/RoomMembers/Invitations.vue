<template>
	<p data-testid="info-text">
		{{ t("pages.rooms.members.tab.invitations.infoText") }}
	</p>
	<div v-for="link of roomInvitationLinks" :key="link.id">
		<div>
			{{ link }} {{ link.id
			}}<VBtn
				data-testid="update-invitation-button"
				@click="onClickUpdate(link.id)"
				>update</VBtn
			>
			<VBtn data-testid="use-invitation-button" @click="onClickUse(link.id)"
				>use</VBtn
			>
			<VBtn
				data-testid="delete-invitation-button"
				@click="onClickRemove(link.id)"
				>delete</VBtn
			>
		</div>
	</div>
	<VBtn data-testid="create-invitation-button" @click="onClickAdd"
		>add random link</VBtn
	>
</template>
<script setup lang="ts">
import {
	useRoomInvitationLinkStore,
	RoomInvitationLinkValidationError,
} from "@data-room";
import { storeToRefs } from "pinia";
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

roomInvitationLinkStore.fetchLinks();

const onClickAdd = () => {
	roomInvitationLinkStore.createLink({
		title: "Test " + Math.ceil(Math.random() * 1000),
		activeUntil: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
		isOnlyForTeachers: false,
		restrictedToCreatorSchool: false,
		requiresConfirmation: false,
	});
};

const onClickRemove = (linkId: string) => {
	roomInvitationLinkStore.deleteLinks(linkId);
};

const onClickUse = async (linkId: string) => {
	const { roomId, validationMessage } =
		await roomInvitationLinkStore.useLink(linkId);
	if (roomId) {
		window.alert("redirect to room: " + roomId);
		return;
	}

	if (validationMessage === RoomInvitationLinkValidationError.Expired) {
		window.alert(t("pages.rooms.invitationlinks.error.expired"));
	}
};

const onClickUpdate = (linkId: string) => {
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
	roomInvitationLinkStore.updateLink({
		id: linkId,
		title: title,
		activeUntil: new Date(Date.now() + maxOneOur).toISOString(),
		isOnlyForTeachers: Math.random() > 0.5,
		restrictedToCreatorSchool: Math.random() > 0.5,
		requiresConfirmation: Math.random() > 0.5,
	});
};
</script>
