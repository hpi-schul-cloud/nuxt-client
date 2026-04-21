<template>
	<CourseRoomWrapper :has-rooms="hasCurrentRooms" :has-import-token="!!shareTokenInfo">
		<template #header>
			<h1 class="py-2">
				{{ $t("pages.courseRooms.index.courses.active") }}
			</h1>

			<div class="mb-5 header-actions-section">
				<VBtn variant="outlined" size="small" to="/rooms/courses-list" data-testid="go-to-all-courses">
					{{ $t("pages.courseRooms.index.courses.all") }}
				</VBtn>
				<VSwitch
					v-if="isTouchDevice"
					v-model="allowDragging"
					class="enable-disable"
					:label="$t('pages.courseRooms.index.courses.arrangeCourses')"
					:true-icon="mdiCheck"
					hide-details
				/>
			</div>
		</template>
		<template #page-content>
			<div>
				<SvsSearchField
					ref="search"
					v-model="searchText"
					density="default"
					class="px-1 mb-6"
					:label="$t('pages.courseRooms.index.search.label')"
					:clearable="false"
					data-testid="search-field-course"
				/>
				<div v-for="(row, rowIndex) in dimensions.rowCount" :key="rowIndex" class="room-overview-row">
					<div
						v-for="(col, colIndex) in dimensions.colCount"
						:key="colIndex"
						class="room-overview-col"
						:style="{ width: dimensions.cellWidth }"
					>
						<template v-if="getDataObject(rowIndex, colIndex) !== undefined">
							<CourseRoomEmptyAvatar
								v-if="isEmptyGroup(rowIndex, colIndex)"
								:ref="(el) => setElementRef(rowIndex, colIndex, el)"
								:size="dimensions.cellWidth"
								data-avatar-type="RoomEmptyAvatar"
								:data-test-position="`${rowIndex}-${colIndex}`"
								@drop-empty-avatar="setDropElement({ x: colIndex, y: rowIndex })"
							/>
							<CourseRoomGroupAvatar
								v-else-if="hasGroup(rowIndex, colIndex)"
								:ref="(el) => setElementRef(rowIndex, colIndex, el)"
								class="room-group-avatar"
								:data="getDataObject(rowIndex, colIndex)"
								:size="dimensions.cellWidth"
								:device="device"
								:draggable="allowDragging"
								data-avatar-type="RoomGroupAvatar"
								:data-test-position="`${rowIndex}-${colIndex}`"
								@clicked="openDialog(getDataObject(rowIndex, colIndex).groupId)"
								@start-drag="onStartDrag($event, { x: colIndex, y: rowIndex })"
								@dragend-group-avatar="onDragend"
								@drop-group-avatar="addGroupElements({ x: colIndex, y: rowIndex })"
							/>
							<CourseRoomAvatar
								v-else
								:ref="(el) => setElementRef(rowIndex, colIndex, el)"
								class="room-avatar"
								:item="getDataObject(rowIndex, colIndex)"
								:size="dimensions.cellWidth"
								:draggable="allowDragging"
								data-avatar-type="RoomAvatar"
								:data-test-position="`${rowIndex}-${colIndex}`"
								@start-drag="onStartDrag($event, { x: colIndex, y: rowIndex })"
								@dragend-avatar="onDragend"
								@drop-avatar="setGroupElements({ x: colIndex, y: rowIndex })"
							/>
						</template>
						<template v-else>
							<CourseRoomEmptyAvatar
								:ref="(el) => setElementRef(rowIndex, colIndex, el)"
								:size="dimensions.cellWidth"
								:show-outline="dragging"
								data-avatar-type="RoomEmptyAvatar"
								:data-test-position="`${rowIndex}-${colIndex}`"
								@drop-empty-avatar="setDropElement({ x: colIndex, y: rowIndex })"
							/>
						</template>
					</div>
				</div>
			</div>
		</template>
	</CourseRoomWrapper>
	<CourseRoomModal
		v-model:is-open="groupDialog.isOpen"
		aria-describedby="folder open"
		:group-data="groupDialog.groupData"
		:avatar-size="dimensions.cellWidth"
		:draggable="allowDragging"
		tabindex="0"
		@drag-from-group="dragFromGroup"
	/>
	<ImportDialog
		v-if="isImportDialogOpen"
		:is-dialog-open="isImportDialogOpen"
		:share-token-info="shareTokenInfo!"
		:available-destinations="availableDestinations"
		destination-type="course"
		@confirm="importAction.submit"
		@cancel="onCancelImport"
	/>
</template>

<script setup lang="ts">
import CourseRoomAvatar from "@/components/course-rooms/CourseRoomAvatar.vue";
import CourseRoomEmptyAvatar from "@/components/course-rooms/CourseRoomEmptyAvatar.vue";
import CourseRoomGroupAvatar from "@/components/course-rooms/CourseRoomGroupAvatar.vue";
import CourseRoomModal from "@/components/course-rooms/CourseRoomModal.vue";
import CourseRoomWrapper from "@/components/course-rooms/CourseRoomWrapper.vue";
import { useAwaitableAction } from "@/composables/awaitable-action.composable";
import router from "@/router";
import { DroppedObject } from "@/store/types/rooms";
import { buildPageTitle } from "@/utils/pageTitle";
import { DashboardGridElementResponse, ShareTokenInfoResponse, ShareTokenInfoResponseParentType } from "@api-server";
import { notifySuccess, useLoadingStore } from "@data-app";
import { GroupDataType, useCourseRoomListStore } from "@data-course-rooms";
import { ImportDialog, useShareTokenImport } from "@feature-import";
import { mdiCheck } from "@icons/material";
import { SvsSearchField } from "@ui-controls";
import { useTitle } from "@vueuse/core";
import { sortBy } from "lodash-es";
import { storeToRefs } from "pinia";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

const { t } = useI18n();
const route = useRoute();
const display = useDisplay();
const { withLoadingState } = useLoadingStore();

const refs = reactive<Record<string, unknown>>({});
const courseRoomListStore = useCourseRoomListStore();
const { hasCurrentRooms, roomsData, allElements } = storeToRefs(courseRoomListStore);
const { alignCourse, updateCourse, fetchCourses, fetchAllElements } = courseRoomListStore;

const device = ref("mobile");
const dimensions = reactive({
	colCount: 2,
	cellWidth: "3em",
	rowCount: 6,
	defaultRowCount: 6,
});
const groupDialog = reactive({
	isOpen: false,
	groupData: {} as GroupDataType,
});
const draggedElement = reactive<{
	from: { x: number; y: number; groupIndex?: number } | null;
	item: DashboardGridElementResponse | Record<string, unknown>;
	to: { x: number; y: number } | null;
}>({
	from: null,
	item: {} as DashboardGridElementResponse,
	to: null,
});
const showDeleteSection = ref(false);
const draggedElementName = ref("");
const searchText = ref("");
const dragging = ref(false);
const allowDragging = ref(false);

const setElementRef = (rowIndex: number, colIndex: number, el: unknown) => {
	refs[`${rowIndex}-${colIndex}`] = el;
};

const getElementNameByRef = (pos: { x: number; y: number }) =>
	(refs[`${pos.y}-${pos.x}`] as { $attrs: { "data-avatar-type": string } }).$attrs["data-avatar-type"];

const rooms = computed(() =>
	JSON.parse(JSON.stringify(roomsData.value)).filter((item: { groupElements?: { title: string }[]; title: string }) => {
		if (item.groupElements) {
			const groupElements = item.groupElements.filter((groupItem) =>
				groupItem.title.toLowerCase().includes(searchText.value.toLowerCase())
			);
			item.groupElements = groupElements;
			return groupElements.length > 0;
		}
		return item.title.toLowerCase().includes(searchText.value.toLowerCase());
	})
);

const hasRoomsBeingCopied = computed(() =>
	rooms.value.some((item: { copyingSince?: unknown }) => item.copyingSince !== undefined)
);

const isTouchDevice = computed(() => window.ontouchstart !== undefined);

const shareTokenInfo = ref<ShareTokenInfoResponse>();
const availableDestinations = computed(() =>
	sortBy(
		allElements.value.filter((course) => !course.isLocked).map((course) => ({ id: course.id, name: course.title }))
	)
);

const { validateShareToken, importShareToken } = useShareTokenImport();
const importAction = useAwaitableAction<{ newName: string; destinationId?: string }>();

const isImportDialogOpen = computed(
	() =>
		importAction.isActive.value &&
		!!shareTokenInfo.value &&
		!(shareTokenInfo.value?.parentType === ShareTokenInfoResponseParentType.CARD)
);

const onCancelImport = () => {
	importAction.cancel();
	router.push({ name: "course-room-overview" });
};

const executeImport = async (token: string) => {
	const { validationResult } = await validateShareToken(token);

	if (!validationResult) {
		onCancelImport();
		return;
	}

	shareTokenInfo.value = validationResult;

	const { submitted, data } = await importAction.start();
	if (!submitted) return;

	const { importResult } = await withLoadingState(
		() => importShareToken(validationResult, data),
		t("components.molecules.import.options.loadingMessage")
	);

	if (!importResult) {
		onCancelImport();
		return;
	}

	if (validationResult.parentType === ShareTokenInfoResponseParentType.COURSES) {
		router.replace({ name: "course-room-overview" });
		fetchCourses();
	} else {
		router.replace({ name: "room-details", params: { id: importResult.destinationId } });
	}
};

watch(
	() => route.query.import,
	() => {
		if (route.query.import) {
			const token = route.query.import as string;
			executeImport(token);
		}
	},
	{ immediate: true }
);

const getDeviceDims = () => {
	const { xs, sm, mdAndUp } = display;

	if (xs.value) return { ...dimensions, colCount: 4, cellWidth: "3.7em" };
	if (sm.value) return { ...dimensions, colCount: 4, cellWidth: "4em" };
	if (mdAndUp.value) {
		allowDragging.value = true;
		return {
			...dimensions,
			colCount: 4,
			cellWidth: "5em",
		};
	}
	return { ...dimensions, colCount: 6 };
};

const setRowCount = () => {
	const lastItem = roomsData.value.reduce(
		(prev: { yPosition?: number }, current: { yPosition?: number }) =>
			(prev.yPosition ?? 0) > (current.yPosition ?? 0) ? prev : current,
		{} as { yPosition?: number }
	);

	dimensions.rowCount =
		lastItem.yPosition && lastItem.yPosition + 2 > dimensions.defaultRowCount
			? lastItem.yPosition + 2
			: dimensions.defaultRowCount;
};

const findDataByPos = (row: number, col: number) =>
	rooms.value.find(
		(item: { xPosition: number; yPosition: number }) => item.xPosition === col && item.yPosition === row
	);

const getDataObject = (row: number, col: number) => findDataByPos(row, col);

const hasGroup = (row: number, col: number) => {
	const roomObject = findDataByPos(row, col);
	return roomObject?.groupElements !== undefined;
};

const isEmptyGroup = (row: number, col: number) => findDataByPos(row, col)?.groupElements?.length === 0;

const openDialog = (groupId: string) => {
	groupDialog.groupData = rooms.value.find((item: { groupId: string }) => item.groupId === groupId);
	groupDialog.isOpen = true;
};

const onStartDrag = (element: Record<string, unknown>, pos: { x: number; y: number }) => {
	draggedElement.from = pos;
	draggedElement.to = null;
	draggedElement.item = element;
	showDeleteSection.value = true;
	draggedElementName.value = getElementNameByRef(pos);
	searchText.value = "";
	dragging.value = true;
};

const savePosition = async () => {
	if (!draggedElement.from || !draggedElement.to) return;
	await alignCourse(draggedElement as DroppedObject);
	groupDialog.groupData = {} as GroupDataType;
};

const defaultNaming = (pos: { x: number; y: number }) => {
	const title = t("pages.courseRooms.groupName");
	// Find the existing room to get all required fields
	const existingRoom = rooms.value.find(
		(item: { xPosition: number; yPosition: number }) => item.xPosition === pos.x && item.yPosition === pos.y
	);
	if (existingRoom) {
		updateCourse({
			...existingRoom,
			title,
			xPosition: pos.x,
			yPosition: pos.y,
		});
	}
};

const setDropElement = (pos: { x: number; y: number }) => {
	draggedElement.to = pos;
	const toElementName = getElementNameByRef(pos);

	if (JSON.stringify(draggedElement.from) === JSON.stringify(pos)) return;

	if (toElementName === "RoomEmptyAvatar") {
		savePosition();
	}
	showDeleteSection.value = false;
	dragging.value = false;
};

const onDragend = () => {
	dragging.value = false;
};

const setGroupElements = async (pos: { x: number; y: number }) => {
	draggedElement.to = pos;
	const toElementName = getElementNameByRef(pos);

	if (JSON.stringify(draggedElement.from) === JSON.stringify(pos)) return;

	if (
		(draggedElementName.value === "RoomAvatar" || draggedElementName.value === "groupItem") &&
		toElementName === "RoomAvatar"
	) {
		await savePosition();
		defaultNaming(pos);
	}
	dragging.value = false;
};

const addGroupElements = (pos: { x: number; y: number }) => {
	draggedElement.to = pos;
	const toElementName = getElementNameByRef(pos);

	if (JSON.stringify(draggedElement.from) === JSON.stringify(pos)) return;

	if (
		(draggedElementName.value === "RoomAvatar" || draggedElementName.value === "groupItem") &&
		toElementName === "RoomGroupAvatar"
	) {
		savePosition();
	}
	dragging.value = false;
};

const dragFromGroup = (element: { id: string }) => {
	draggedElement.from = {
		x: groupDialog.groupData.xPosition as number,
		y: groupDialog.groupData.yPosition as number,
		groupIndex: roomsData.value
			.find((item: { groupId: string }) => item.groupId === groupDialog.groupData.groupId)
			?.groupElements?.findIndex((groupItem: { id: string }) => groupItem.id === element.id),
	};
	draggedElement.item = element;
	draggedElementName.value = "groupItem";
	// This setTimeout is used for preventing being closed modal immediately while ungrouping the items.
	setTimeout(() => {
		groupDialog.isOpen = false;
	}, 0);
	searchText.value = "";
	dragging.value = true;
};

const initCoursePolling = (started: Date, count = 0) => {
	const nextTimeout = count * count * 1000 + 5000;
	setTimeout(
		async () => {
			await fetchCourses();
			if (hasRoomsBeingCopied.value) {
				initCoursePolling(started ?? new Date(), count + 1);
			} else {
				notifySuccess(t("components.molecules.copyResult.timeoutSuccess"));
			}
		},
		Math.min(nextTimeout, 30000)
	);
};

const initializeComponent = async () => {
	const newDims = getDeviceDims();
	dimensions.colCount = newDims.colCount;
	dimensions.cellWidth = newDims.cellWidth;

	await Promise.allSettled([fetchCourses(), fetchAllElements()]);
	setRowCount();

	if (hasRoomsBeingCopied.value) {
		initCoursePolling(new Date());
	}
};

useTitle(buildPageTitle(t("pages.courseRooms.index.courses.active")));

onMounted(() => {
	initializeComponent();
});
</script>

<style scoped>
.header-actions-section {
	width: 100%;
	height: 56px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.room-overview-row {
	display: flex;
	justify-content: space-between;
}

:deep(.v-messages) {
	display: none;
}

:deep(.v-input) {
	margin-top: 0 !important;
}
</style>
