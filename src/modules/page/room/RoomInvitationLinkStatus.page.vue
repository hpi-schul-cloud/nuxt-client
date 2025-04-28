<template>
	<DefaultWireframe max-width="nativ" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 class="text-h3 mb-4" data-testid="page-title">
				{{ t("pages.roomInvitationLinkStatus.title") }}
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
				alt="t('pages.roomInvitationLinkStatus.image.alt')"
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
// import { RoomInvitationLinkValidationError } from "./WIPenums";
// import { useRouter } from "vue-router";

const { t } = useI18n();

const infoMessage = ref("");
const isLoading = ref(true);
// const router = useRouter();
/* const route = useRoute();

const linkId = route.params.id as string; */
// const { roomId } = invitationLinkStatusStore();

const checkInvitationLinkStatus = async () => {
	// const { status, roomId } = await invitationLinkStatusStore.useLink(linkId);

	//determineStatus(status)
	infoMessage.value = t("pages.roomInvitationLinkStatus.title");
	setTimeout(() => {
		isLoading.value = false;
	}, 2000);
};

const pageTitle = computed(() =>
	buildPageTitle(`${t("pages.roomInvitationLinkStatus.title")}`)
);
useTitle(pageTitle);

const breadcrumbs: Breadcrumb[] = [
	{
		title: t("pages.rooms.title"),
		to: "/rooms",
	},
	{
		title: t("pages.roomInvitationLinkStatus.title"),
		disabled: true,
	},
];

onMounted(() => {
	checkInvitationLinkStatus();
});

/* const isInvalidRequestError = (error: unknown): boolean => {
	const apiError = error as ApiResponseError;
	return apiError.code === 400;
}; */

/* const determineStatus = (status: string) => {
	switch (status) {
		case RoomInvitationLinkValidationError.ALREADY_MEMBER:
			router.push({ name: "rooms" });
			break;
		case RoomInvitationLinkValidationError.CANT_INVITE_STUDENTS_FROM_OTHER_SCHOOL:
			infoMessage.value = t(
				"pages.roomInvitationLinkStatus.cantInviteStudents"
			);
			break;
		case RoomInvitationLinkValidationError.EXPIRED:
			infoMessage.value = t("pages.roomInvitationLinkStatus.expired");
			break;
		case RoomInvitationLinkValidationError.ONLY_FOR_TEACHERS:
			infoMessage.value = t("pages.roomInvitationLinkStatus.onlyForTeachers");
			break;
		case RoomInvitationLinkValidationError.RESTRICTED_TO_CREATOR_SCHOOL:
			infoMessage.value = t(
				"pages.roomInvitationLinkStatus.restrictedToCreator"
			);
			break;
	}
}; */
</script>

<style lang="scss" scoped>
.text-centered {
	text-align: center;
}
</style>
