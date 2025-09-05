<template>
	<DefaultWireframe max-width="nativ" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 data-testid="page-title">
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
			<CrossedHandsSvg data-testid="img-crossed-hands" />
			<div class="text-h2" data-testid="status-message">
				{{ infoMessage }}
			</div>
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import CrossedHandsSvg from "@/assets/img/CrossedHandsSvg.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
	RoomInvitationLinkValidationError,
	useRoomInvitationLinkStore,
} from "@data-room";
import { useRouter } from "vue-router";

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
	const { roomId, validationMessage, schoolName } =
		await roomInvitationLinkStore.useLink(props.invitationLinkId);
	isLoading.value = false;

	if (roomId !== "") {
		router.push({ path: `/rooms/${roomId}` });
		return;
	}

	updateInfoMessage(validationMessage, schoolName);
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
	useLink();
});

const updateInfoMessage = (validationMessage: string, schoolName: string) => {
	switch (validationMessage) {
		case RoomInvitationLinkValidationError.CantInviteStudentsFromOtherSchool:
			infoMessage.value = t(
				"pages.rooms.invitationLinkStatus.cantInviteStudentsFromOtherSchool",
				{ schoolName }
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
				"pages.rooms.invitationLinkStatus.restrictedToCreatorSchool",
				{ schoolName }
			);
			break;
		case RoomInvitationLinkValidationError.InvalidLink:
			infoMessage.value = t("pages.rooms.invitationLinkStatus.invalidLink");
			break;
		case RoomInvitationLinkValidationError.RoomApplicantWaiting:
			infoMessage.value = t(
				"pages.rooms.invitationLinkStatus.confirmationPending"
			);
			break;
		default:
			infoMessage.value = t("error.generic");
			break;
	}
};
</script>
