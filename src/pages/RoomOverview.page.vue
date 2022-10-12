<template>
	<room-wrapper
		:header-aria-label="sectionAriaLabel"
		:has-rooms="hasCurrentRooms"
	>
		<template slot="header">
			<h1 class="text-h3 pt-2">
				{{ $t("pages.courses.index.courses.active") }}
			</h1>
			<div class="mb-5 header-div">
				<div class="btn">
					<v-btn
						color="secondary"
						outlined
						small
						to="/rooms-list"
						data-testid="go-to-all-courses"
						>{{ $t("pages.courses.index.courses.all") }}
					</v-btn>
				</div>
				<div class="toggle-div">
					<v-custom-switch
						v-if="isTouchDevice"
						v-model="allowDragging"
						class="enable-disable"
						:label="$t('pages.courses.index.courses.arrangeCourses')"
					></v-custom-switch>
				</div>
			</div>
		</template>
		<template slot="page-content">
			<div class="rooms-container">
				<v-text-field
					ref="search"
					v-model="searchText"
					class="room-search"
					solo
					rounded
					:label="$t('pages.rooms.index.search.label')"
					:append-icon="mdiMagnify"
					:aria-label="$t('common.labels.search')"
					data-testid="search-field"
				>
				</v-text-field>
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
								:ref="`${rowIndex}-${colIndex}`"
								:size="dimensions.cellWidth"
								@drop="setDropElement({ x: colIndex, y: rowIndex })"
							></vRoomEmptyAvatar>

							<vRoomGroupAvatar
								v-else-if="hasGroup(rowIndex, colIndex)"
								:ref="`${rowIndex}-${colIndex}`"
								class="room-group-avatar"
								:data="getDataObject(rowIndex, colIndex)"
								:size="dimensions.cellWidth"
								:device="device"
								:draggable="allowDragging"
								@clicked="openDialog(getDataObject(rowIndex, colIndex).groupId)"
								@startDrag="onStartDrag($event, { x: colIndex, y: rowIndex })"
								@dragend="onDragend"
								@drop="addGroupElements({ x: colIndex, y: rowIndex })"
							>
							</vRoomGroupAvatar>
							<vRoomAvatar
								v-else
								:ref="`${rowIndex}-${colIndex}`"
								class="room-avatar"
								:item="getDataObject(rowIndex, colIndex)"
								:size="dimensions.cellWidth"
								:show-badge="true"
								:draggable="allowDragging"
								@startDrag="onStartDrag($event, { x: colIndex, y: rowIndex })"
								@dragend="onDragend"
								@drop="setGroupElements({ x: colIndex, y: rowIndex })"
							></vRoomAvatar>
						</template>
						<template v-else>
							<vRoomEmptyAvatar
								:ref="`${rowIndex}-${colIndex}`"
								:size="dimensions.cellWidth"
								:show-outline="dragging"
								@drop="setDropElement({ x: colIndex, y: rowIndex })"
							></vRoomEmptyAvatar>
						</template>
					</div>
				</div>
			</div>
			<room-modal
				ref="roomModal"
				v-model="groupDialog.isOpen"
				aria-describedby="folder open"
				:group-data="groupDialog.groupData"
				:avatar-size="dimensions.cellWidth"
				:draggable="allowDragging"
				tabindex="0"
				@drag-from-group="dragFromGroup"
			>
			</room-modal>
		</template>
	</room-wrapper>
</template>

<script>
import RoomWrapper from "@components/templates/RoomWrapper.vue";
import vRoomAvatar from "@components/atoms/vRoomAvatar";
import vRoomEmptyAvatar from "@components/atoms/vRoomEmptyAvatar";
import vRoomGroupAvatar from "@components/molecules/vRoomGroupAvatar";
import RoomModal from "@components/molecules/RoomModal";
import { roomsModule } from "@/store";
import vCustomSwitch from "@components/atoms/vCustomSwitch";
import { mdiMagnify } from "@mdi/js";

export default {
	components: {
		RoomWrapper,
		vRoomAvatar,
		vRoomGroupAvatar,
		vRoomEmptyAvatar,
		RoomModal,
		vCustomSwitch,
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
		};
	},
	computed: {
		hasCurrentRooms() {
			return roomsModule.hasCurrentRooms;
		},
		rooms() {
			return JSON.parse(JSON.stringify(roomsModule.getRoomsData)).filter(
				(item) => {
					if (item.groupElements) {
						const groupElements = item.groupElements.filter((groupItem) => {
							return groupItem.title
								.toLowerCase()
								.includes(this.searchText.toLowerCase());
						});
						item.groupElements = groupElements;
						return groupElements;
					}
					return item.title
						.toLowerCase()
						.includes(this.searchText.toLowerCase());
				}
			);
		},
		isTouchDevice() {
			return window.ontouchstart !== undefined;
		},
		sectionAriaLabel() {
			return this.$t("pages.rooms.headerSection.ariaLabel", {
				itemCount: this.rooms.length,
			});
		},
	},
	async created() {
		await roomsModule.fetch(); // TODO: this method will receive a string parameter (Eg, mobile | tablet | desktop)
		this.getDeviceDims();
	},
	methods: {
		getDeviceDims() {
			this.device = this.$mq;
			switch (this.$mq) {
				case "tablet":
					this.dimensions.colCount = 4;
					this.dimensions.cellWidth = "4em";
					break;
				case "tabletPortrait":
					this.dimensions.colCount = 4;
					this.dimensions.cellWidth = "4em";
					break;
				case "desktop":
					this.dimensions.colCount = 4;
					this.dimensions.cellWidth = "5em";
					this.allowDragging = true;
					break;
				case "large":
					this.dimensions.colCount = 4;
					this.dimensions.cellWidth = "5em";
					this.allowDragging = true;
					break;
				case "mobile":
					this.dimensions.colCount = 4;
					this.dimensions.cellWidth = "3.7em";
					break;
				default:
					this.dimensions.colCount = 6;
					break;
			}
			const lastItem = roomsModule.getRoomsData.reduce((prev, current) => {
				return prev.yPosition > current.yPosition ? prev : current;
			}, {});

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
		getElementNameByRef(pos) {
			return this.$refs[`${pos.y}-${pos.x}`][0].$options["_componentTag"];
		},
		dragFromGroup(element) {
			this.draggedElement.from = {
				x: this.groupDialog.groupData.xPosition,
				y: this.groupDialog.groupData.yPosition,
				groupIndex: roomsModule.roomsData
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
			await roomsModule.align(this.draggedElement);
			this.groupDialog.groupData = {};
		},
		defaultNaming(pos) {
			const title = this.$t("pages.rooms.groupName");
			const payload = {
				title,
				xPosition: pos.x,
				yPosition: pos.y,
			};
			roomsModule.update(payload);
		},
	},
	head() {
		return {
			title: `${this.$t("pages.courses.index.courses.active")} - ${
				this.$theme.short_name
			}`,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.rooms-container {
	max-width: 600px;
	margin: 0 auto;
}

.room-overview-row {
	display: flex;
	justify-content: space-between;
}

.header-div {
	display: flex;
	align-items: center;
	width: 100%;

	.btn {
		display: inline-block;
		flex: 1;
	}

	.toggle-div {
		display: inline-block;
	}
}

::v-deep .v-messages {
	display: none;
}

::v-deep .v-input {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	margin-top: 0 !important;
}
</style>
