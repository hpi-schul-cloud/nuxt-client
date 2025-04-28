<template>
	<DefaultWireframe max-width="nativ" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1 class="text-h3 mb-4" data-testid="page-title">
				{{ t("pages.roomInvitationLink.title") }}
			</h1>
		</template>
		<div v-if="true /* isLoading*/" class="w-100 text-center">
			<VProgressCircular
				color="primary"
				indeterminate
				:size="51"
				class="my-10"
			/>
		</div>
		<div v-else>
			<img
				:src="CrossedHandsBirdSvg"
				role="presentation"
				alt="t('pages.roomInvitationLinkStatus.image.alt')"
			/>
			<div class="text-centered mt-8">
				{{ infoMessage }}
			</div>
		</div>
		å
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import CrossedHandsBirdSvg from "@/assets/img/crossedHands.svg";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

/* const route = useRoute();
const router = useRouter();
const message = ref("");
const loading = ref(true);

const linkId = route.params.id as string; */
// const { roomId } = invitationLinkStatusStore();

const checkInvitationLinkStatus = async () => {
	// const { status, roomId } = await invitationLinkStatusStore.useLink(linkId);
	/* if (status === 'already_member') {
		router.push({ name: "room-details", params: { id: roomId } });
	} */
	/* message.value = status; */
	/* loading.value = false */
};

const pageTitle = computed(() =>
	buildPageTitle(`${t("pages.roomInvitationLink.title")}`)
);
useTitle(pageTitle);

const breadcrumbs: Breadcrumb[] = [
	{
		title: t("pages.rooms.title"),
		to: "/rooms",
	},
	{
		title: t("pages.roomInvitationLink.title"),
		disabled: true,
	},
];

const infoMessage = computed(() => {
	return t("pages.roomInvitationLinkStatus.infoMessage");
});

onMounted(() => {
	checkInvitationLinkStatus();
});

/* const onSave = async (payload: { room: RoomCreateParams }) => {
	try {
		const room = await createRoom(payload.room);

		router.push({ name: "room-details", params: { id: room.id } });
	} catch (error: unknown) {
		if (isInvalidRequestError(error)) {
			notifierModule.show({
				text: t("components.roomForm.validation.generalSaveError"),
				status: "error",
			});
		} else {
			throw createApplicationError((error as ApiResponseError).code);
		}
	}
}; */

/* const isInvalidRequestError = (error: unknown): boolean => {
	const apiError = error as ApiResponseError;
	return apiError.code === 400;
}; */

/* const onCancel = () => {
	router.push({
		name: "rooms",
	});
}; */
</script>

<style lang="scss" scoped>
.text-centered {
	text-align: center;
}
</style>
