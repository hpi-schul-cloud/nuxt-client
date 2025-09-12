<template>
	<DefaultWireframe max-width="full">
		<template #header>
			<div ref="header">
				<div class="d-flex align-center">
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
				:show-select="false"
				:header-bottom="headerBottom"
				@manage-room-members="manageRoom"
			/>
		</template>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useI18n } from "vue-i18n";
import { computed, onMounted, ref } from "vue";
import { RoomAdminTable } from "@feature-room";
import { useAdministrationRoomStore } from "@data-room";
import { storeToRefs } from "pinia";
import { EmptyState, RoomsEmptyStateSvg } from "@ui-empty-state";
import { useElementBounding, useTitle } from "@vueuse/core";
import { buildPageTitle } from "@/utils/pageTitle";
import { useRouter } from "vue-router";
import { envConfigModule } from "@/store";

const { t } = useI18n();
const router = useRouter();

const adminRoomStore = useAdministrationRoomStore();
const { isEmptyList } = storeToRefs(adminRoomStore);
const { fetchRooms } = adminRoomStore;

const header = ref<HTMLElement | null>(null);
const { bottom: headerBottom } = useElementBounding(header);

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

const manageRoom = (roomId: string) => {
	router.push({
		name: "administration-rooms-manage-members",
		params: { roomId },
	});
};
</script>
