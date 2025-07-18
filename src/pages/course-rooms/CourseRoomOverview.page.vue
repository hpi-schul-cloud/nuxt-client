<template>
	<room-wrapper :has-rooms="hasCurrentRooms" :has-import-token="!!importToken">
		<template #header>
			<h1 class="text-h3 py-2 mb-4">
				{{ $t("pages.courseRooms.index.courses.active") }}
			</h1>
			<div class="mb-5 header-actions-section">
				<v-btn
					variant="outlined"
					size="small"
					to="/rooms/courses-list"
					data-testid="go-to-all-courses"
				>
					{{ $t("pages.courseRooms.index.courses.all") }}
				</v-btn>
				<v-switch
					v-if="isTouchDevice"
					v-model="allowDragging"
					class="enable-disable"
					:label="$t('pages.courseRooms.index.courses.arrangeCourses')"
					:aria-label="$t('pages.courseRooms.index.courses.arrangeCourses')"
					:true-icon="mdiCheck"
					hide-details
				/>
			</div>
		</template>
		<template #page-content>
			<div>
				<v-text-field
					ref="search"
					v-model="searchText"
					class="room-search px-1"
					variant="solo"
					rounded
					single-line
					:label="$t('pages.courseRooms.index.search.label')"
					:append-inner-icon="mdiMagnify"
					:aria-label="$t('pages.courseRooms.index.search.label')"
					data-testid="search-field-course"
				/>
				<div
					v-for="(row, rowIndex) in dimensions.rowCount"
					:key="rowIndex"
					class="room-overview-row"
				>
					<div
						v-for="(col, colIndex) in dimensions.colCount"
						:key="colIndex"
						class="room-overview-col"
						:style="{ width: dimensions.cellWidth }"
					>
						<template v-if="getDataObject(rowIndex, colIndex) !== undefined">
							<vRoomEmptyAvatar
								v-if="isEmptyGroup(rowIndex, colIndex)"
								:ref="(el) => setElementRef(rowIndex, colIndex, el)"
								:size="dimensions.cellWidth"
								data-avatar-type="vRoomEmptyAvatar"
								:data-test-position="`${rowIndex}-${colIndex}`"
								@drop-empty-avatar="
									setDropElement({ x: colIndex, y: rowIndex })
								"
							/>
							<vRoomGroupAvatar
								v-else-if="hasGroup(rowIndex, colIndex)"
								:ref="(el) => setElementRef(rowIndex, colIndex, el)"
								class="room-group-avatar"
								:data="getDataObject(rowIndex, colIndex)"
								:size="dimensions.cellWidth"
								:device="device"
								:draggable="allowDragging"
								data-avatar-type="vRoomGroupAvatar"
								:data-test-position="`${rowIndex}-${colIndex}`"
								@clicked="openDialog(getDataObject(rowIndex, colIndex).groupId)"
								@start-drag="onStartDrag($event, { x: colIndex, y: rowIndex })"
								@dragend-group-avatar="onDragend"
								@drop-group-avatar="
									addGroupElements({ x: colIndex, y: rowIndex })
								"
							/>
							<vRoomAvatar
								v-else
								:ref="(el) => setElementRef(rowIndex, colIndex, el)"
								class="room-avatar"
								:item="getDataObject(rowIndex, colIndex)"
								:size="dimensions.cellWidth"
								:show-badge="getDataObject(rowIndex, colIndex).isLocked"
								:draggable="allowDragging"
								data-avatar-type="vRoomAvatar"
								:data-test-position="`${rowIndex}-${colIndex}`"
								@start-drag="onStartDrag($event, { x: colIndex, y: rowIndex })"
								@dragend-avatar="onDragend"
								@drop-avatar="setGroupElements({ x: colIndex, y: rowIndex })"
							/>
						</template>
						<template v-else>
							<vRoomEmptyAvatar
								:ref="(el) => setElementRef(rowIndex, colIndex, el)"
								:size="dimensions.cellWidth"
								:show-outline="dragging"
								data-avatar-type="vRoomEmptyAvatar"
								:data-test-position="`${rowIndex}-${colIndex}`"
								@drop-empty-avatar="
									setDropElement({ x: colIndex, y: rowIndex })
								"
							/>
						</template>
					</div>
				</div>
			</div>
		</template>
	</room-wrapper>
	<room-modal
		v-model:is-open="groupDialog.isOpen"
		aria-describedby="folder open"
		:group-data="groupDialog.groupData"
		:avatar-size="dimensions.cellWidth"
		:draggable="allowDragging"
		tabindex="0"
		@drag-from-group="dragFromGroup"
	/>
	<import-flow
		:is-active="isImportMode"
		:token="importToken"
		:destinations="courses"
		destination-type="course"
		@success="onImportSuccess"
	/>
</template>

<script>
import vRoomAvatar from "@/components/atoms/vRoomAvatar.vue";
import vRoomEmptyAvatar from "@/components/atoms/vRoomEmptyAvatar.vue";
import RoomModal from "@/components/molecules/RoomModal.vue";
import vRoomGroupAvatar from "@/components/molecules/vRoomGroupAvatar.vue";
import ImportFlow from "@/components/share/ImportFlow.vue";
import RoomWrapper from "@/components/templates/RoomWrapper.vue";
import { courseRoomListModule } from "@/store";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { mdiCheck, mdiMagnify } from "@icons/material";
import { defineComponent, reactive } from "vue";

export default defineComponent({
	components: {
		RoomWrapper,
		vRoomAvatar,
		vRoomGroupAvatar,
		vRoomEmptyAvatar,
		RoomModal,
		ImportFlow,
	},
	inject: {
		notifierModule: { from: NOTIFIER_MODULE_KEY },
	},
	layout: "defaultVuetify",
	setup() {
		const refs = reactive({});

		const setElementRef = (rowIndex, colIndex, el) => {
			refs[`${rowIndex}-${colIndex}`] = el;
		};

		const getElementNameByRef = (pos) => {
			return refs[`${pos.y}-${pos.x}`].$attrs["data-avatar-type"];
		};

		return { setElementRef, getElementNameByRef };
	},
	data() {
		return {
			device: "mobile",
			dimensions: {
				colCount: 2,
				cellWidth: "3em",
				rowCount: 6,
				defaultRowCount: 6,
			},
			groupDialog: {
				isOpen: false,
				groupData: {},
			},
			draggedElement: {
				from: null,
				item: {},
				to: null,
			},
			showDeleteSection: false,
			roomNameEditMode: false,
			draggedElementName: "",
			mdiMagnify,
			searchText: "",
			dragging: false,
			allowDragging: false,
			mdiCheck,
		};
	},
	computed: {
		hasCurrentRooms() {
			return courseRoomListModule.hasCurrentRooms;
		},
		rooms() {
			return JSON.parse(
				JSON.stringify(courseRoomListModule.getRoomsData)
			).filter((item) => {
				if (item.groupElements) {
					const groupElements = item.groupElements.filter((groupItem) => {
						return groupItem.title
							.toLowerCase()
							.includes(this.searchText.toLowerCase());
					});
					item.groupElements = groupElements;
					return groupElements;
				}
				return item.title.toLowerCase().includes(this.searchText.toLowerCase());
			});
		},
		courses() {
			return courseRoomListModule.getAllElements.map((item) => {
				return {
					id: item.id,
					name: item.title,
				};
			});
		},
		hasRoomsBeingCopied() {
			return this.rooms.some((item) => item.copyingSince !== undefined);
		},
		isTouchDevice() {
			return window.ontouchstart !== undefined;
		},
		isImportMode() {
			return this.$route.query.import !== undefined;
		},
		importToken() {
			return this.$route.query.import;
		},
	},
	async created() {
		await courseRoomListModule.fetch();
		await courseRoomListModule.fetchAllElements();

		this.dimensions = this.getDeviceDims();
		this.setRowCount();

		if (this.hasRoomsBeingCopied) {
			this.initCoursePolling(new Date());
		}
	},
	mounted() {
		document.title = buildPageTitle(
			this.$t("pages.courseRooms.index.courses.active")
		);
	},
	methods: {
		getDeviceDims() {
			const { xs, sm, mdAndUp } = this.$vuetify.display;

			if (xs) return { ...this.dimensions, colCount: 4, cellWidth: "3.7em" };
			if (sm) return { ...this.dimensions, colCount: 4, cellWidth: "4em" };
			if (mdAndUp) {
				this.allowDragging = true;
				return {
					...this.dimensions,
					colCount: 4,
					cellWidth: "5em",
				};
			}
			return { ...this.dimensions, colCount: 6 };
		},
		setRowCount() {
			const lastItem = courseRoomListModule.getRoomsData.reduce(
				(prev, current) => {
					return prev.yPosition > current.yPosition ? prev : current;
				},
				{}
			);

			this.dimensions.rowCount =
				lastItem.yPosition &&
				lastItem.yPosition + 2 > this.dimensions.defaultRowCount
					? lastItem.yPosition + 2
					: this.dimensions.defaultRowCount;
		},
		getDataObject(row, col) {
			return this.findDataByPos(row, col);
		},
		hasGroup(row, col) {
			const roomObject = this.findDataByPos(row, col);
			return roomObject.groupElements !== undefined;
		},
		isEmptyGroup(row, col) {
			return this.findDataByPos(row, col).groupElements?.length == 0;
		},
		openDialog(groupId) {
			this.groupDialog.groupData = this.rooms.find(
				(item) => item.groupId == groupId
			);
			this.groupDialog.isOpen = true;
		},
		findDataByPos(row, col) {
			return this.rooms.find(
				(item) => item.xPosition == col && item.yPosition == row
			);
		},
		onStartDrag(element, pos) {
			this.draggedElement.from = pos;
			this.draggedElement.to = null;
			this.draggedElement.item = element;
			this.showDeleteSection = true;
			this.draggedElementName = this.getElementNameByRef(pos);
			this.searchText = "";
			this.dragging = true;
		},
		setDropElement(pos) {
			this.draggedElement.to = pos;
			const toElementName = this.getElementNameByRef(pos);

			if (JSON.stringify(this.draggedElement.from) == JSON.stringify(pos))
				return;

			if (toElementName == "vRoomEmptyAvatar") {
				this.savePosition();
			}
			this.showDeleteSection = false;
			this.dragging = false;
		},
		onDragend() {
			this.dragging = false;
		},
		async setGroupElements(pos) {
			this.draggedElement.to = pos;
			const toElementName = this.getElementNameByRef(pos);

			if (JSON.stringify(this.draggedElement.from) == JSON.stringify(pos))
				return;

			if (
				(this.draggedElementName == "vRoomAvatar" ||
					this.draggedElementName == "groupItem") &&
				toElementName == "vRoomAvatar"
			) {
				await this.savePosition();
				this.defaultNaming(pos);
			}
			this.dragging = false;
		},
		addGroupElements(pos) {
			this.draggedElement.to = pos;
			const toElementName = this.getElementNameByRef(pos);

			if (JSON.stringify(this.draggedElement.from) == JSON.stringify(pos))
				return;

			if (
				(this.draggedElementName == "vRoomAvatar" ||
					this.draggedElementName == "groupItem") &&
				toElementName == "vRoomGroupAvatar"
			) {
				this.savePosition();
			}
			this.dragging = false;
		},
		dragFromGroup(element) {
			this.draggedElement.from = {
				x: this.groupDialog.groupData.xPosition,
				y: this.groupDialog.groupData.yPosition,
				groupIndex: courseRoomListModule.roomsData
					.find((item) => item.groupId == this.groupDialog.groupData.groupId)
					.groupElements.findIndex((groupItem) => groupItem.id == element.id),
			};
			this.draggedElement.item = element;
			this.draggedElementName = "groupItem";
			// This setTimeout is used for preventing being closed modal immediately while ungrouping the items.
			setTimeout(() => {
				this.groupDialog.isOpen = false;
			}, 0);
			this.searchText = "";
			this.dragging = true;
		},
		async savePosition() {
			await courseRoomListModule.align(this.draggedElement);
			this.groupDialog.groupData = {};
		},
		defaultNaming(pos) {
			const title = this.$t("pages.courseRooms.groupName");
			const payload = {
				title,
				xPosition: pos.x,
				yPosition: pos.y,
			};
			courseRoomListModule.update(payload);
		},
		onImportSuccess(name, id) {
			this.showImportSuccess(name);
			if (id) {
				this.$router.replace({ name: "room-details", params: { id } });
			} else {
				this.$router.replace({ name: "course-room-overview" });
				courseRoomListModule.fetch();
			}
		},
		showImportSuccess(name) {
			this.notifierModule?.show({
				text: this.$t("components.molecules.import.options.success", {
					name,
				}),
				status: "success",
				timeout: 5000,
			});
		},
		initCoursePolling(started, count = 0) {
			const nextTimeout = count * count * 1000 + 5000;
			setTimeout(
				async () => {
					await courseRoomListModule.fetch({ indicateLoading: false });
					if (this.hasRoomsBeingCopied) {
						this.initCoursePolling(started ?? new Date(), count + 1);
					} else {
						this.notifierModule?.show({
							text: this.$t("components.molecules.copyResult.timeoutSuccess"),
							status: "success",
							autoClose: true,
							timeout: 5000,
						});
					}
				},
				Math.min(nextTimeout, 30000)
			);
		},
	},
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
