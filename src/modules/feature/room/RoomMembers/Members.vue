<template>
	<div class="mb-8" data-testid="info-text">
		<i18n-t
			v-if="isVisiblePageInfoText"
			keypath="pages.rooms.members.infoText"
			scope="global"
		>
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

	<div class="mb-12">
		<MembersTable
			v-if="!isLoading && currentUser"
			:fixed-position="fixedHeaderOnMobile"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import {
	useRoomMemberVisibilityOptions,
	useRoomMembersStore,
} from "@data-room";
import { storeToRefs } from "pinia";
import { MembersTable } from "@feature-room";
import { useDisplay } from "vuetify";
import { useElementBounding } from "@vueuse/core";

const { t } = useI18n();

const { mdAndDown } = useDisplay();

const roomMembersStore = useRoomMembersStore();
const { isLoading, currentUser } = storeToRefs(roomMembersStore);

const wireframe = ref<HTMLElement | null>(null);
const fixedHeaderOnMobile = ref({
	enabled: false,
	positionTop: 0,
});
const { y } = useElementBounding(wireframe);
const { isVisiblePageInfoText } = useRoomMemberVisibilityOptions(currentUser);

onMounted(async () => {
	const header = document.querySelector(".wireframe-header") as HTMLElement;
	fixedHeaderOnMobile.value.positionTop = header.offsetHeight + y.value;
});

watch(y, () => {
	fixedHeaderOnMobile.value.enabled = y.value <= 0 && mdAndDown.value;
});

const linkAriaLabel = computed(
	() =>
		`${t("pages.rooms.members.infoText.moreInformation")}, ${t("common.ariaLabel.newTab")}`
);
</script>
