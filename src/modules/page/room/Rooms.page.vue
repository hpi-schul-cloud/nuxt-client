<template>
	<DefaultWireframe max-width="short" :fab-items="fabAction">
		<template #header>
			<h1 class="text-h3 mb-4">{{ t("pages.rooms.title") }}</h1>
			<div class="mb-5 header-actions-section">
				<v-switch
					v-if="isTouchDevice"
					v-model="allowDragging"
					class="enable-disable"
					:label="$t('pages.rooms.arrangeRooms')"
					:aria-label="$t('pages.rooms.arrangeRooms')"
					:true-icon="mdiCheck"
					hide-details
				/>
			</div>
		</template>
		<RoomGrid :draggable="allowDragging" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { RoomGrid } from "@feature-room";
import { mdiCheck, mdiPlus } from "@icons/material";
import { useTitle } from "@vueuse/core";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const pageTitle = computed(() => buildPageTitle(`${t("pages.rooms.title")}`));
useTitle(pageTitle);

const fabAction = {
	icon: mdiPlus,
	title: t("common.actions.create"),
	to: "/rooms/new",
	ariaLabel: t("pages.rooms.fab.title"),
	testId: "fab-add-room",
};

const isTouchDevice = computed(() => window.ontouchstart !== undefined);

// TODO: Allow dragging once grid positioning is implemented
const allowDragging = ref(false);
</script>

<style scoped>
.header-actions-section {
	width: 100%;
	height: 56px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
