<template>
	<DefaultWireframe max-width="full" :fab-items="fabAction" main-with-bottom-padding>
		<template #header>
			<h1>{{ t("pages.rooms.title") }}</h1>
		</template>
		<RoomsWelcomeInfo />
		<v-text-field v-model="searchTerm" label="Suche Elemente" class="mb-4" clearable @input="onSearchChange" />
		<v-table v-if="boardNodes.length" class="mt-6">
			<thead>
				<tr>
					<th><b>Text</b></th>
					<th><b>Score</b></th>
					<th><b>Aktionen</b></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="node in boardNodes" :key="node.id">
					<td>{{ stripHtmlTags((node.payload as any)?.text) }}</td>
					<td>{{ node.score }}</td>
					<td>
						<v-btn variant="text" size="small" @click="onGoToCard((node.payload as any)?.svs_id)">Zum Element</v-btn>
					</td>
				</tr>
			</tbody>
		</v-table>
		<VContainer v-if="isLoading && isEmpty" class="loader">
			<VSkeletonLoader ref="skeleton-loader" type="date-picker-days" class="mt-6" />
		</VContainer>
		<EmptyState v-else-if="isEmpty" :title="t('pages.rooms.emptyState')">
			<template #media>
				<RoomsEmptyStateSvg />
			</template>
		</EmptyState>
		<RoomGrid v-else :rooms />
		<ImportCardDialog v-if="showImportCardDialog" :is-dialog-open="showImportCardDialog" :token="importToken!" />
		<ImportFlow
			:is-active="showGenericImportDialog"
			:token="importToken"
			:destinations="importFlowDestinations"
			:destination-type="BoardExternalReferenceType.ROOM"
			@success="onImportSuccess"
		/>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import ImportFlow from "@/components/share/ImportFlow.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { BoardDto, BoardExternalReferenceType } from "@/serverApi/v3";
import { buildPageTitle } from "@/utils/pageTitle";
import { Permission, ShareTokenBodyParamsParentType } from "@api-server";
import { notifySuccess, useAppStore } from "@data-app";
import { useFolderState } from "@data-folder";
import { useRoomAuthorization, useRoomStore } from "@data-room";
import { ImportCardDialog } from "@feature-board";
import { RoomGrid, RoomsWelcomeInfo } from "@feature-room";
import { mdiPlus } from "@icons/material";
import { EmptyState, RoomsEmptyStateSvg } from "@ui-empty-state";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, toValue, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
const { fetchParentNodeInfos } = useFolderState();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { canCreateRoom } = useRoomAuthorization();
const { rooms, isLoading, isEmpty } = storeToRefs(useRoomStore());

const { fetchRooms, searchBoardNode } = useRoomStore();

const pageTitle = computed(() => buildPageTitle(t("pages.rooms.title")));
useTitle(pageTitle);

const boardNodes = ref<BoardDto[]>([]);

const searchTerm = ref("");

const stripHtmlTags = (input?: string): string => {
	if (!input) return "";
	return input.replace(/<[^>]*>/g, "");
};

const onSearchChange = async () => {
	if (searchTerm.value.length < 3) {
		boardNodes.value = [];
		return;
	}
	const nodes = await searchBoardNode(searchTerm.value);
	boardNodes.value = nodes;
};

const onGoToCard = async (id: string) => {
	const res = await fetchParentNodeInfos(id);

	const boardId = res?.parentHierarchy.find((parent) => parent.type === "board")?.id;

	const link = `boards/${boardId}#richTextCk5-${id}`;
	if (boardId) {
		router.push(link);
	}
};

const fabAction = computed(() => {
	const canCreateRoom = toValue(useAppStore().hasPermission(Permission.SCHOOL_CREATE_ROOM));
	if (!canCreateRoom) return;

	return [
		{
			icon: mdiPlus,
			label: t("pages.rooms.fab.title"),
			to: "/rooms/new",
			dataTestId: "fab-add-room",
		},
	];
});

const importedType = ref<string>();
const importToken = ref<string>();

watch(
	() => route.query.import,
	() => {
		if (route.query.import) {
			importedType.value = route.query.importedType as string;
			importToken.value = route.query.import as string;
		} else {
			importToken.value = undefined;
		}
	},
	{ immediate: true }
);

const showImportCardDialog = computed(
	() => importToken.value && importedType.value === ShareTokenBodyParamsParentType.CARD
);
const showGenericImportDialog = computed(
	() => !!importToken.value && importedType.value !== ShareTokenBodyParamsParentType.CARD
);

onMounted(() => {
	fetchRooms();
});

const importFlowDestinations = computed(() => rooms.value.filter((room) => !room.isLocked));

const onImportSuccess = (newName: string, destinationId?: string) => {
	notifySuccess(
		t("components.molecules.import.options.success", {
			name: newName,
		})
	);

	if (destinationId) {
		router.replace({ name: "room-details", params: { id: destinationId } });
	} else {
		router.replace({ name: "rooms" });
		fetchRooms();
		importToken.value = undefined;
	}
};
</script>
