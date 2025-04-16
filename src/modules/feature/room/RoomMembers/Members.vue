<template>
	<div v-if="isVisiblePageInfoText" data-testid="info-text">
		<i18n-t keypath="pages.rooms.members.infoText" scope="global">
			<a
				href="https://docs.dbildungscloud.de/display/SCDOK/Teameinladung+freigeben"
				target="_blank"
				rel="noopener"
				:ariaLabel="linkAriaLabel"
			>
				{{ t("pages.rooms.members.infoText.moreInformation") }}
			</a>
		</i18n-t>
	</div>

	<div class="mb-12 mt-8">
		<MembersTable
			v-if="!isLoading && currentUser"
			:header-bottom="headerBottom"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import {
	useRoomMemberVisibilityOptions,
	useRoomMembersStore,
} from "@data-room";
import { storeToRefs } from "pinia";
import { MembersTable } from "@feature-room";

defineProps({
	headerBottom: {
		type: Number,
		default: 0,
	},
});

const { t } = useI18n();

const roomMembersStore = useRoomMembersStore();
const { isLoading, currentUser } = storeToRefs(roomMembersStore);
const { isVisiblePageInfoText } = useRoomMemberVisibilityOptions(currentUser);

const linkAriaLabel = computed(
	() =>
		`${t("pages.rooms.members.infoText.moreInformation")}, ${t("common.ariaLabel.newTab")}`
);
</script>
