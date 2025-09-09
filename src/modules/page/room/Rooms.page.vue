<template>
	<DefaultWireframe max-width="nativ" :fab-items="fabAction">
		<template #header>
			<h1 class="text-h3 mb-4">{{ t("pages.rooms.title") }}</h1>
		</template>
		<RoomsWelcomeInfo />
		<v-text-field
			v-model="searchTerm"
			label="Suche Elemente"
			@input="onSearchChange"
			class="mb-4"
			clearable
		/>
		<v-table class="mt-6" v-if="boardNodes.length">
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
						<v-btn
							variant="text"
							size="small"
							@click="onGoToCard((node.payload as any)?.svs_id)"
							>Zum Element</v-btn
						>
					</td>
				</tr>
			</tbody>
		</v-table>
		<RoomGrid :rooms="rooms" :is-loading="isLoading" :is-empty="isEmpty" />

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
import ImportFlow from "@/components/share/ImportFlow.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { BoardDto, BoardExternalReferenceType } from "@/serverApi/v3";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { useFolderState } from "@data-folder";
import { useRoomAuthorization, useRoomsState } from "@data-room";
import { RoomGrid, RoomsWelcomeInfo } from "@feature-room";
import { mdiPlus } from "@icons/material";
import { useTitle } from "@vueuse/core";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
const { fetchParentNodeInfos } = useFolderState();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { rooms, fetchRooms, isLoading, isEmpty, searchBoardNode } =
	useRoomsState();
const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const { canCreateRoom } = useRoomAuthorization();

const pageTitle = computed(() => buildPageTitle(`${t("pages.rooms.title")}`));
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

	const boardId = res?.parentHierarchy.find(
		(parent) => parent.type === "board"
	)?.id;

	const link = `boards/${boardId}#richTextCk5-${id}`;
	if (boardId) {
		router.push(link);
	}
};

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

const onImportSuccess = (newName: string, destinationId?: string) => {
	showImportSuccess(newName);
	if (destinationId) {
		router.replace({ name: "room-details", params: { id: destinationId } });
	} else {
		router.replace({ name: "rooms" });
		fetchRooms();
		isImportMode.value = false;
		importToken.value = undefined;
	}
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
</script>
