<template>
	<DefaultWireframe max-width="nativ" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 class="text-h3 mb-4" data-testid="page-title">
				{{ t("pages.rooms.invitationLinkStatus.title") }}
			</h1>
		</template>
		<div v-if="isLoading" class="w-100 text-center">
			<VProgressCircular
				color="primary"
				indeterminate
				:size="51"
				class="my-10"
			/>
		</div>
		<div v-else class="w-100 text-center">
			<img
				:src="CrossedHandsBirdSvg"
				role="presentation"
				alt="t('pages.rooms.invitationLinkStatus.image.alt')"
			/>
			<div class="text-h2">
				{{ infoMessage }}
			</div>
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import CrossedHandsBirdSvg from "@/assets/img/crossedHands.svg";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
// import { useRoute } from "vue-router";
import { useRoomInvitationLinkStore } from "@data-room";
import { RoomInvitationLinkValidationError } from "./WIP_enums";
import { useRouter } from "vue-router";

const { t } = useI18n();

const infoMessage = ref("");
const isLoading = ref(true);

const router = useRouter();
// const route = useRoute();

const roomInvitationLinkStore = useRoomInvitationLinkStore();
const { useLink } = roomInvitationLinkStore;

const linkId = "5fa2c58a2f58ccafc23288f5"; // route.params.id as string;

const checkInvitationLinkStatus = async () => {
	const message = (await useLink(linkId)) as unknown as string;
	/*
	if (message === "room-id") {
		router.push({path: `/rooms/${message}`});
		// isLoading.value = false; necessary or does vue solve that by itself???
		return;
	}
	*/
	determineStatus(message);
	isLoading.value = false;
};

const pageTitle = computed(() =>
	buildPageTitle(`${t("pages.rooms.invitationLinkStatus.title")}`)
);
useTitle(pageTitle);

const breadcrumbs: Breadcrumb[] = [
	{
		title: t("pages.rooms.title"),
		to: "/rooms",
	},
	{
		title: t("pages.rooms.invitationLinkStatus.title"),
		disabled: true,
	},
];

onMounted(() => {
	checkInvitationLinkStatus();
});

const determineStatus = (status: string) => {
	switch (status) {
		case RoomInvitationLinkValidationError.ALREADY_MEMBER:
			router.push({ name: "rooms" });
			break;
		case RoomInvitationLinkValidationError.CANT_INVITE_STUDENTS_FROM_OTHER_SCHOOL:
			infoMessage.value = t(
				"pages.rooms.invitationLinkStatus.cantInviteStudentsFromOtherSchool"
			);
			break;
		case RoomInvitationLinkValidationError.EXPIRED:
			infoMessage.value = t("pages.rooms.invitationLinkStatus.expired");
			break;
		case RoomInvitationLinkValidationError.ONLY_FOR_TEACHERS:
			infoMessage.value = t("pages.rooms.invitationLinkStatus.onlyForTeachers");
			break;
		case RoomInvitationLinkValidationError.RESTRICTED_TO_CREATOR_SCHOOL:
			infoMessage.value = t(
				"pages.rooms.invitationLinkStatus.restrictedToCreatorSchool"
			);
			break;
		default:
			infoMessage.value = t("pages.rooms.invitationLinkStatus.notFound");
			break;
	}
};
</script>

<style lang="scss" scoped>
.text-centered {
	text-align: center;
}
</style>
