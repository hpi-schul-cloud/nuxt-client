<template>
	<DefaultWireframe max-width="nativ" :fab-items="fabAction">
		<template #header>
			<h1 class="text-h3 mb-4">{{ t("pages.rooms.title") }}</h1>
		</template>
		<InfoAlert class="mb-14">
			{{ t("pages.rooms.infoAlert.welcome") }}

			<ul class="mt-1 pl-4">
				<li>{{ t("pages.rooms.infoAlert.welcome.collaboration") }}</li>
				<li>{{ t("pages.rooms.infoAlert.welcome.teamsAndCourses") }}</li>
				<li>
					<i18n-t
						keypath="pages.rooms.infoAlert.welcome.furtherInformation"
						scope="global"
					>
						<template #helpLink>
							<a
								href="https://docs.dbildungscloud.de/x/6gthFg"
								target="_blank"
								rel="noopener"
								data-testid="rooms-help-link"
								:aria-label="helpAriaLabel"
							>
								{{ t("pages.rooms.infoAlert.welcome.furtherInformation.help") }}
							</a>
						</template>
						<template #feedbackLink>
							<a
								href="/help/contact"
								target="_blank"
								rel="noopener"
								:aria-label="feedbackAriaLabel"
							>
								{{
									t("pages.rooms.infoAlert.welcome.furtherInformation.feedback")
								}}
							</a>
						</template>
					</i18n-t>
				</li>
			</ul>
		</InfoAlert>
		<RoomGrid />
		<ImportFlow
			:is-active="isImportMode"
			:token="importToken"
			:destinations="rooms"
			:destination-type="BoardExternalReferenceType.Room"
			@success="onImportSuccess"
		/>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import ImportFlow from "@/components/share/ImportFlow.vue";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { useRoomAuthorization, useRoomsState } from "@data-room";
import { RoomGrid } from "@feature-room";
import { mdiPlus } from "@icons/material";
import { useTitle } from "@vueuse/core";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { BoardExternalReferenceType } from "@/serverApi/v3";
import { InfoAlert } from "@ui-alert";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { rooms, fetchRooms } = useRoomsState();
const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const { canCreateRoom } = useRoomAuthorization();

const pageTitle = computed(() => buildPageTitle(`${t("pages.rooms.title")}`));
useTitle(pageTitle);

const fabAction = computed(() => {
	if (!canCreateRoom.value) return;

	return {
		icon: mdiPlus,
		title: t("common.actions.create"),
		to: "/rooms/new",
		ariaLabel: t("pages.rooms.fab.title"),
		dataTestId: "fab-add-room",
	};
});

const isImportMode = ref(false);
const importToken = ref<string>();

watch(
	() => route.query.import,
	() => {
		if (route.query.import !== undefined) {
			isImportMode.value = true;
			importToken.value = route.query.import as string;
		} else {
			isImportMode.value = false;
			importToken.value = undefined;
		}
	},
	{ immediate: true }
);

onMounted(() => {
	fetchRooms();
});

const onImportSuccess = (newName: string, id: string) => {
	showImportSuccess(newName);
	router.replace({ name: "room-details", params: { id } });
};

const showImportSuccess = (newName: string) => {
	notifierModule.show({
		text: t("components.molecules.import.options.success", {
			name: newName,
		}),
		status: "success",
		timeout: 5000,
	});
};

const helpAriaLabel = computed(
	() =>
		`${t("pages.rooms.infoAlert.welcome.furtherInformation.help")}, ${t("common.ariaLabel.newTab")}`
);

const feedbackAriaLabel = computed(
	() =>
		`${t("pages.rooms.infoAlert.welcome.furtherInformation.feedback")}, ${t("common.ariaLabel.newTab")}`
);
</script>
