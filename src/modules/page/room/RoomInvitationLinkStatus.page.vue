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
				data-testid="bird-image"
			/>
			<div class="text-h2" data-testid="status-message">
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
import {
	RoomInvitationLinkValidationError,
	useRoomInvitationLinkStore,
} from "@data-room";
import { useRouter } from "vue-router";
import { nextTick } from "vue";

const { t } = useI18n();

const props = defineProps({
	invitationLinkId: {
		type: String,
		required: true,
	},
});

const infoMessage = ref("");
const isLoading = ref(true);

const router = useRouter();

const roomInvitationLinkStore = useRoomInvitationLinkStore();

const useLink = async () => {
	const linkResult = await roomInvitationLinkStore.useLink(
		props.invitationLinkId
	);
	isLoading.value = false;

	if (linkResult.roomId !== "") {
		router.push({ path: `/rooms/${linkResult.roomId}` });
		return;
	}

	determineStatus(linkResult.message);
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

onMounted(async () => {
	await nextTick();
	useLink();
});

const determineStatus = (status: string) => {
	switch (status) {
		case RoomInvitationLinkValidationError.CantInviteStudentsFromOtherSchool:
			infoMessage.value = t(
				"pages.rooms.invitationLinkStatus.cantInviteStudentsFromOtherSchool"
			);
			break;
		case RoomInvitationLinkValidationError.Expired:
			infoMessage.value = t("pages.rooms.invitationLinkStatus.expired");
			break;
		case RoomInvitationLinkValidationError.OnlyForTeachers:
			infoMessage.value = t("pages.rooms.invitationLinkStatus.onlyForTeachers");
			break;
		case RoomInvitationLinkValidationError.RestrictedToCreatorSchool:
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
