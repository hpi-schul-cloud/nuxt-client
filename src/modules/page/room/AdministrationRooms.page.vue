<template>
	<DefaultWireframe max-width="full" :fab-items="fabAction">
		<template #header>
			<div ref="header">
				<div class="d-flex align-items-center">
					<h1 class="text-h3 mb-4" data-testid="admin-room-title">
						{{ t("pages.rooms.administration.title") }}
					</h1>
				</div>
			</div>
		</template>

		<template v-if="isEmptyList">
			<EmptyState :title="t('pages.rooms.emptyState')">
				<template #media>
					<RoomsEmptyStateSvg />
				</template>
			</EmptyState>
		</template>
		<template v-else>
			<RoomAdminTable
				v-if="!isRoomDetailsVisible"
				:show-select="false"
				:header-bottom="headerBottom"
			/>
		</template>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useI18n } from "vue-i18n";
import { computed, onMounted, ref, watch } from "vue";
import { RoomAdminTable } from "@feature-room";
import { useAdministrationRoomStore } from "@data-room";
import { storeToRefs } from "pinia";
import { EmptyState, RoomsEmptyStateSvg } from "@ui-empty-state";
import { useElementBounding, useTitle } from "@vueuse/core";
import { buildPageTitle } from "@/utils/pageTitle";
import { mdiPlus } from "@icons/material";
import { useRouter } from "vue-router";
import { envConfigModule } from "@/store";

const { t } = useI18n();
const router = useRouter();

const adminRoomStore = useAdministrationRoomStore();
const { isEmptyList, selectedRoom } = storeToRefs(adminRoomStore);
const { fetchRooms } = adminRoomStore;

const header = ref<HTMLElement | null>(null);
const { bottom: headerBottom } = useElementBounding(header);
const isRoomDetailsVisible = computed(() => selectedRoom.value !== null);

onMounted(async () => {
	const isFeatureEnabled =
		envConfigModule.getEnv.FEATURE_ADMINISTRATE_ROOMS_ENABLED;

	if (!isFeatureEnabled) {
		window.location.replace("/dashboard");
		return;
	}

	await fetchRooms();
});

const pageTitle = computed(() =>
	buildPageTitle(t("pages.rooms.administration.pageTitle"))
);
useTitle(pageTitle);

watch(isRoomDetailsVisible, (visible) => {
	if (visible) {
		router.push({
			name: "administration-rooms-manage-details",
			params: { roomId: selectedRoom.value?.roomId },
		});
	}
});

const fabAction = computed(() => {
	{
		return {
			icon: mdiPlus,
			title: t("pages.rooms.members.add"),
			ariaLabel: t("pages.rooms.members.add"),
			dataTestId: "fab-add-members",
		};
	}
});
</script>
