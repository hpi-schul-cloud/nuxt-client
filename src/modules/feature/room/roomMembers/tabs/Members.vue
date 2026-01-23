<template>
	<div v-if="canAddRoomMembers" data-testid="info-text">
		<i18n-t keypath="pages.rooms.members.infoText" scope="global">
			<a :href="informationLink!" target="_blank" rel="noopener" :ariaLabel="linkAriaLabel">
				{{ t("pages.rooms.members.infoText.moreInformation") }}
			</a>
		</i18n-t>
	</div>

	<div class="mb-12">
		<h2 class="mb-0">
			{{ t("pages.rooms.members.title.roomMembers") }}
		</h2>
		<MembersTable v-if="!isLoadingMembers" :header-bottom="headerBottom" />
	</div>

	<div v-if="!isLoadingInvitations && canManageRoomInvitationLinks && isInviteExternalPersonsFeatureEnabled">
		<h2 class="mb-0">
			{{ t("pages.rooms.members.title.invitations") }}
		</h2>
		<MemberInvitationsTable />
	</div>
</template>

<script setup lang="ts">
import MemberInvitationsTable from "../tables/MemberInvitationsTable.vue";
import MembersTable from "../tables/MembersTable.vue";
import { useEnvConfig } from "@data-env";
import {
	useRegistrationStore,
	useRoomAuthorization,
	useRoomInvitationLinkStore,
	useRoomMembersStore,
} from "@data-room";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

defineProps({
	headerBottom: {
		type: Number,
		default: 0,
	},
});

const { t } = useI18n();

const roomMembersStore = useRoomMembersStore();
const { isInviteExternalPersonsFeatureEnabled } = storeToRefs(useRoomInvitationLinkStore());
const registrationStore = useRegistrationStore();
const { isLoading: isLoadingMembers } = storeToRefs(roomMembersStore);
const { isLoading: isLoadingInvitations } = storeToRefs(registrationStore);
const { canAddRoomMembers, canManageRoomInvitationLinks } = useRoomAuthorization();

const linkAriaLabel = computed(
	() => `${t("pages.rooms.members.infoText.moreInformation")}, ${t("common.ariaLabel.newTab")}`
);

const informationLink = computed(() => useEnvConfig().value.ROOM_MEMBER_INFO_URL);
</script>
