<template>
	<div v-if="canAddRoomMembers" data-testid="info-text">
		<i18n-t keypath="pages.rooms.members.infoText" scope="global">
			<a :href="informationLink!" target="_blank" rel="noopener" :ariaLabel="linkAriaLabel">
				{{ t("pages.rooms.members.infoText.moreInformation") }}
			</a>
		</i18n-t>
	</div>

	<div class="mb-12">
		<MembersTable v-if="!isLoading" :header-bottom="headerBottom" />
	</div>
</template>

<script setup lang="ts">
import { useEnvConfig } from "@data-env";
import { createRoomMembersStore, useRoomAuthorization } from "@data-room";
import { MembersTable } from "@feature-room";
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

const roomMembersStore = createRoomMembersStore();
const { isLoading } = storeToRefs(roomMembersStore);
const { canAddRoomMembers } = useRoomAuthorization();

const linkAriaLabel = computed(
	() => `${t("pages.rooms.members.infoText.moreInformation")}, ${t("common.ariaLabel.newTab")}`
);

const informationLink = computed(() => useEnvConfig().value.ROOM_MEMBER_INFO_URL);
</script>
