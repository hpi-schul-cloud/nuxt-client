import { useRoomStore } from "./room.store";
import { RoomGroupNameErrorReason } from "./room-group-name";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { HttpStatusCode } from "@/types/enum/http-status-code.enum";
import { RoomItem } from "@/types/room/Room";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import {
	Configuration,
	RoomArrangementApiFactory,
	RoomArrangementResponse,
	RoomGroupCreatedResponse,
} from "@api-server";
import { notifyError, useAppStore } from "@data-app";
import { AxiosPromise, isAxiosError } from "axios";
import { cloneDeep } from "lodash-es";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { z } from "zod";

export type RoomArrangement = RoomArrangementResponse;

export type RoomMoveCommand = {
	roomId: string;
	sourceGroupId: string | null;
	targetGroupId: string | null;
	beforeRoomId: string | null;
};

export type RoomGroupView = {
	id: string;
	name: string;
	collapsed: boolean;
	rooms: RoomItem[];
};

export type RoomArrangementView = {
	ungrouped: RoomItem[];
	groups: RoomGroupView[];
};

export type RoomArrangementLoadStatus = "idle" | "loading" | "loaded" | "error";

export type RoomArrangementMutationKind =
	"createGroup" | "renameGroup" | "collapseGroup" | "deleteGroup" | "reorderGroups" | "moveRoom" | "updatePreferences";

export type RoomArrangementMutationResult =
	| { success: true; arrangement: RoomArrangement; createdGroupId?: string }
	| { success: false; failure: "busy" | "stale" | "rejected" | "uncertain" }
	| { success: false; failure: "name"; nameError: RoomGroupNameErrorReason };

const ROOM_GROUP_NAME_INVALID = "ROOM_GROUP_NAME_INVALID";
const ROOM_GROUP_NAME_DUPLICATE = "ROOM_GROUP_NAME_DUPLICATE";

const nameInvalidDetailsSchema = z.object({
	details: z.object({ reason: z.enum(["REQUIRED", "TOO_LONG", "INVALID_CHARACTERS"]) }),
});

const getNameError = (error: unknown): RoomGroupNameErrorReason | undefined => {
	if (!isAxiosError(error) || !error.response) return undefined;

	const { type } = mapAxiosErrorToResponseError(error);
	if (type === ROOM_GROUP_NAME_DUPLICATE) return "DUPLICATE";
	if (type !== ROOM_GROUP_NAME_INVALID) return undefined;

	const parsed = nameInvalidDetailsSchema.safeParse(error.response.data);
	return parsed.success ? parsed.data.details.reason : undefined;
};

// 409, a request without response (network error, timeout) or a server error leave the saved state unknown.
const isOutcomeUncertain = (error: unknown) => {
	if (!isAxiosError(error) || !error.response) return true;

	const status = error.response.status || mapAxiosErrorToResponseError(error).code;
	return status === HttpStatusCode.Conflict || status >= HttpStatusCode.InternalServerError;
};

const toSnapshot = (response: RoomArrangementResponse): RoomArrangement => ({
	revision: response.revision,
	ungroupedRoomIds: [...response.ungroupedRoomIds],
	groups: response.groups.map((group) => ({ ...group, roomIds: [...group.roomIds] })),
	confirmGroupDeletion: response.confirmGroupDeletion,
});

const getSectionRoomIds = (arrangement: RoomArrangement, groupId: string | null) =>
	groupId === null ? arrangement.ungroupedRoomIds : arrangement.groups.find((group) => group.id === groupId)?.roomIds;

export const applyRoomMove = (arrangement: RoomArrangement, command: RoomMoveCommand) => {
	const source = getSectionRoomIds(arrangement, command.sourceGroupId);
	const target = getSectionRoomIds(arrangement, command.targetGroupId);
	if (!source || !target) return;

	const sourceIndex = source.indexOf(command.roomId);
	if (sourceIndex >= 0) source.splice(sourceIndex, 1);

	const anchorIndex = command.beforeRoomId === null ? -1 : target.indexOf(command.beforeRoomId);
	if (anchorIndex < 0) {
		target.push(command.roomId);
	} else {
		target.splice(anchorIndex, 0, command.roomId);
	}
};

export const ROOM_ARRANGEMENT_REQUEST_TIMEOUT_MS = 20000;

export const useRoomArrangementStore = defineStore("room-arrangement-store", () => {
	const { t } = useI18nGlobal();
	// A hanging request must not block editing forever: a timeout is an unknown outcome and leads to a refetch.
	const arrangementApi = RoomArrangementApiFactory(
		new Configuration({ baseOptions: { timeout: ROOM_ARRANGEMENT_REQUEST_TIMEOUT_MS } }),
		"/v3",
		$axios
	);
	const roomStore = useRoomStore();
	const appStore = useAppStore();

	const { execute: executeLoad } = useSafeAxiosTask();
	const { execute: executeMutation } = useSafeAxiosTask();

	const confirmed = ref<RoomArrangement | null>(null);
	const working = ref<RoomArrangement | null>(null);
	const arrangementStatus = ref<RoomArrangementLoadStatus>("idle");
	const roomsStatus = ref<RoomArrangementLoadStatus>("idle");
	const pendingMutation = ref<RoomArrangementMutationKind | null>(null);

	// Incremented on reset: responses of requests started before are ignored.
	let epoch = 0;
	let latestLoadId = 0;

	const isLoading = computed(() => arrangementStatus.value === "loading" || roomsStatus.value === "loading");
	const isInitialLoading = computed(
		() => confirmed.value === null && (isLoading.value || arrangementStatus.value === "idle")
	);
	const hasLoadError = computed(() => arrangementStatus.value === "error" || roomsStatus.value === "error");
	const isReady = computed(
		() => arrangementStatus.value === "loaded" && roomsStatus.value === "loaded" && working.value !== null
	);
	const isMutating = computed(() => pendingMutation.value !== null);
	const canEdit = computed(() => isReady.value && !isMutating.value);

	const confirmGroupDeletion = computed(() => confirmed.value?.confirmGroupDeletion ?? true);
	const groups = computed(() => working.value?.groups ?? []);

	const roomsById = computed(() => new Map(roomStore.rooms.map((room) => [room.id, room])));

	const arrangedRoomIds = computed(() => {
		const arrangement = working.value;
		if (!arrangement) return [];
		return [...arrangement.ungroupedRoomIds, ...arrangement.groups.flatMap((group) => group.roomIds)];
	});

	const unknownRoomIds = computed(() => arrangedRoomIds.value.filter((id) => !roomsById.value.has(id)));

	const view = computed<RoomArrangementView | undefined>(() => {
		const arrangement = working.value;
		if (!arrangement) return undefined;

		const resolve = (ids: string[]) =>
			ids.map((id) => roomsById.value.get(id)).filter((room): room is RoomItem => room !== undefined);

		const placed = new Set(arrangedRoomIds.value);
		const notArranged = roomStore.rooms.filter((room) => !placed.has(room.id));

		return {
			ungrouped: [...resolve(arrangement.ungroupedRoomIds), ...notArranged],
			groups: arrangement.groups.map((group) => ({
				id: group.id,
				name: group.name,
				collapsed: group.collapsed,
				rooms: resolve(group.roomIds),
			})),
		};
	});

	const isEmpty = computed(() => {
		const current = view.value;
		return current !== undefined && current.ungrouped.length === 0 && current.groups.length === 0;
	});

	const applyConfirmed = (arrangement: RoomArrangement) => {
		confirmed.value = arrangement;
		if (!isMutating.value) {
			working.value = cloneDeep(arrangement);
		}
	};

	const fetchArrangement = async () => {
		const { success, result } = await executeLoad(
			async () => toSnapshot((await arrangementApi.roomArrangementControllerGetArrangement()).data),
			t("common.notifications.errors.notLoaded", { type: t("pages.rooms.groups.label", 2) }, 2)
		);
		return success ? result : undefined;
	};

	// Loads GET /rooms and the arrangement together; editing is only possible when both succeeded.
	const loadOverview = async (options: { reconcileUnknownRooms?: boolean } = {}): Promise<boolean> => {
		const { reconcileUnknownRooms = true } = options;
		const loadId = ++latestLoadId;
		const requestEpoch = epoch;

		arrangementStatus.value = "loading";
		roomsStatus.value = "loading";

		const [roomsLoaded, arrangement] = await Promise.all([roomStore.fetchRooms(), fetchArrangement()]);

		if (loadId !== latestLoadId || requestEpoch !== epoch) return false;

		roomsStatus.value = roomsLoaded ? "loaded" : "error";
		if (arrangement === undefined) {
			arrangementStatus.value = "error";
			return false;
		}

		const isOutdated = confirmed.value !== null && arrangement.revision < confirmed.value.revision;
		if (!isOutdated) {
			applyConfirmed(arrangement);
		}
		arrangementStatus.value = "loaded";

		if (!roomsLoaded) return false;

		if (reconcileUnknownRooms && unknownRoomIds.value.length > 0) {
			return loadOverview({ reconcileUnknownRooms: false });
		}

		return true;
	};

	const runMutation = async <T extends RoomArrangementResponse>(
		kind: RoomArrangementMutationKind,
		request: (expectedRevision: number) => AxiosPromise<T>,
		errorMessage: string,
		applyOptimistic?: (draft: RoomArrangement) => void,
		getCreatedGroupId?: (data: T) => string
	): Promise<RoomArrangementMutationResult> => {
		const base = confirmed.value;
		if (base === null || !canEdit.value) {
			return { success: false, failure: "busy" };
		}

		const requestEpoch = epoch;
		pendingMutation.value = kind;

		if (applyOptimistic) {
			const draft = cloneDeep(base);
			applyOptimistic(draft);
			working.value = draft;
		}

		// Mapping inside the task: an unusable success response counts as an unknown outcome.
		const send = async () => {
			const response = await request(base.revision);
			return { arrangement: toSnapshot(response.data), createdGroupId: getCreatedGroupId?.(response.data) };
		};
		const { success, result, error } = await executeMutation(send, errorMessage, {
			skipErrorNotification: (err) => getNameError(err) !== undefined || isOutcomeUncertain(err),
		});

		if (requestEpoch !== epoch) {
			return { success: false, failure: "stale" };
		}

		pendingMutation.value = null;

		if (success) {
			const { arrangement, createdGroupId } = result;
			confirmed.value = arrangement;
			working.value = cloneDeep(arrangement);
			return { success: true, arrangement, createdGroupId };
		}

		working.value = cloneDeep(confirmed.value);

		const nameError = getNameError(error);
		if (nameError) {
			return { success: false, failure: "name", nameError };
		}

		if (isOutcomeUncertain(error)) {
			notifyError(t("pages.rooms.groups.notification.outcomeUnknown"));
			await loadOverview();
			return { success: false, failure: "uncertain" };
		}

		return { success: false, failure: "rejected" };
	};

	const groupLabel = () => t("pages.rooms.groups.label");

	const createGroup = (name: string) =>
		runMutation(
			"createGroup",
			(expectedRevision) => arrangementApi.roomArrangementControllerCreateGroup({ expectedRevision, name }),
			t("common.notifications.errors.notCreated", { type: groupLabel() }),
			undefined,
			(data: RoomGroupCreatedResponse) => data.createdGroupId
		);

	const renameGroup = (groupId: string, name: string) =>
		runMutation(
			"renameGroup",
			(expectedRevision) => arrangementApi.roomArrangementControllerUpdateGroup(groupId, { expectedRevision, name }),
			t("common.notifications.errors.notSaved", { type: groupLabel() }),
			(draft) => {
				const group = draft.groups.find((g) => g.id === groupId);
				if (group) group.name = name;
			}
		);

	const setGroupCollapsed = (groupId: string, collapsed: boolean) =>
		runMutation(
			"collapseGroup",
			(expectedRevision) =>
				arrangementApi.roomArrangementControllerUpdateGroup(groupId, { expectedRevision, collapsed }),
			t("common.notifications.errors.notSaved", { type: groupLabel() }),
			(draft) => {
				const group = draft.groups.find((g) => g.id === groupId);
				if (group) group.collapsed = collapsed;
			}
		);

	const deleteGroup = (groupId: string, disableFutureConfirmation = false) =>
		runMutation(
			"deleteGroup",
			(expectedRevision) =>
				arrangementApi.roomArrangementControllerDeleteGroup(
					groupId,
					disableFutureConfirmation ? { expectedRevision, disableFutureConfirmation } : { expectedRevision }
				),
			t("common.notifications.errors.notDeleted", { type: groupLabel() }),
			(draft) => {
				const index = draft.groups.findIndex((g) => g.id === groupId);
				if (index < 0) return;
				const [removed] = draft.groups.splice(index, 1);
				draft.ungroupedRoomIds.push(...removed.roomIds);
				if (disableFutureConfirmation) draft.confirmGroupDeletion = false;
			}
		);

	const updateGroupOrder = (groupIds: string[]) =>
		runMutation(
			"reorderGroups",
			(expectedRevision) => arrangementApi.roomArrangementControllerUpdateGroupOrder({ expectedRevision, groupIds }),
			t("common.notifications.errors.notMoved", { type: groupLabel() }),
			(draft) => {
				const byId = new Map(draft.groups.map((g) => [g.id, g]));
				const reordered = groupIds.map((id) => byId.get(id)).filter((g) => g !== undefined);
				if (reordered.length === draft.groups.length) draft.groups = reordered;
			}
		);

	const moveGroup = (groupId: string, offset: -1 | 1) => {
		const ids = (confirmed.value?.groups ?? []).map((g) => g.id);
		const index = ids.indexOf(groupId);
		const targetIndex = index + offset;
		if (index < 0 || targetIndex < 0 || targetIndex >= ids.length) {
			return Promise.resolve<RoomArrangementMutationResult>({ success: false, failure: "rejected" });
		}
		[ids[index], ids[targetIndex]] = [ids[targetIndex], ids[index]];
		return updateGroupOrder(ids);
	};

	const moveRoom = (command: RoomMoveCommand) =>
		runMutation(
			"moveRoom",
			(expectedRevision) =>
				arrangementApi.roomArrangementControllerMoveRoom({
					expectedRevision,
					roomId: command.roomId,
					sourceGroupId: command.sourceGroupId,
					targetGroupId: command.targetGroupId,
					beforeRoomId: command.beforeRoomId,
				}),
			t("common.notifications.errors.notMoved", { type: t("common.labels.room") }),
			(draft) => applyRoomMove(draft, command)
		);

	const setConfirmGroupDeletion = (value: boolean) =>
		runMutation(
			"updatePreferences",
			(expectedRevision) =>
				arrangementApi.roomArrangementControllerUpdatePreferences({ expectedRevision, confirmGroupDeletion: value }),
			t("common.notification.error.preferences.update"),
			(draft) => {
				draft.confirmGroupDeletion = value;
			}
		);

	const reset = () => {
		epoch++;
		latestLoadId++;
		confirmed.value = null;
		working.value = null;
		arrangementStatus.value = "idle";
		roomsStatus.value = "idle";
		pendingMutation.value = null;
	};

	watch(
		() => appStore.user?.id,
		(newUserId, oldUserId) => {
			if (oldUserId !== undefined && newUserId !== oldUserId) reset();
		}
	);
	watch(
		() => appStore.isLoggedIn,
		(isLoggedIn, wasLoggedIn) => {
			if (wasLoggedIn && !isLoggedIn) reset();
		}
	);

	return {
		confirmed,
		working,
		arrangementStatus,
		roomsStatus,
		pendingMutation,
		isLoading,
		isInitialLoading,
		hasLoadError,
		isReady,
		isMutating,
		canEdit,
		confirmGroupDeletion,
		groups,
		unknownRoomIds,
		view,
		isEmpty,
		loadOverview,
		createGroup,
		renameGroup,
		setGroupCollapsed,
		deleteGroup,
		updateGroupOrder,
		moveGroup,
		moveRoom,
		setConfirmGroupDeletion,
		reset,
	};
});
