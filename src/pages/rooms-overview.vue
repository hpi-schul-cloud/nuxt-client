<template>
	<default-wireframe ref="main" :headline="title" :full-width="true">
		<v-row class="justify-center">
			<div class="d-flex justify-space-between col-sm-8">
				<v-text-field
					ref="search"
					v-model="searchText"
					:label="$t('common.words.search')"
					:append-icon="mdiMagnify"
				>
				</v-text-field>
			</div>
			<div class="ml-5 mt-5 mr-2">
				<v-btn to="/rooms-list">All Rooms</v-btn>
			</div>
		</v-row>

		<v-row v-for="(row, rowIndex) in dimensions.rowCount" :key="rowIndex">
			<v-col
				v-for="(col, colIndex) in dimensions.colCount"
				:key="colIndex"
				class="ma-0 pa-0 mt-2 mb-2"
			>
				<div
					v-if="getDataObject(rowIndex, colIndex) !== undefined"
					class="d-flex justify-center"
				>
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
						@clicked="openDialog(getDataObject(rowIndex, colIndex).id)"
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
						:draggable="true"
						@startDrag="onStartDrag($event, { x: colIndex, y: rowIndex })"
						@dragend="onDragend"
						@drop="setGroupElements({ x: colIndex, y: rowIndex })"
					></vRoomAvatar>
				</div>
				<div v-else class="d-flex justify-center">
					<vRoomEmptyAvatar
						:ref="`${rowIndex}-${colIndex}`"
						:size="dimensions.cellWidth"
						:show-outline="dragging"
						@drop="setDropElement({ x: colIndex, y: rowIndex })"
					></vRoomEmptyAvatar>
				</div>
			</v-col>
		</v-row>
		<room-modal
			ref="roomModal"
			v-model="groupDialog.isOpen"
			:group-data="groupDialog.groupData"
			:avatar-size="dimensions.cellWidth"
			@drag-from-group="dragFromGroup"
		>
		</room-modal>
	</default-wireframe>
</template>

<script>
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import vRoomAvatar from "@components/atoms/vRoomAvatar";
import vRoomEmptyAvatar from "@components/atoms/vRoomEmptyAvatar";
import vRoomGroupAvatar from "@components/molecules/vRoomGroupAvatar";
import RoomModal from "@components/molecules/RoomModal";
import RoomsModule from "@store/rooms";
import { mdiMagnify } from "@mdi/js";

export default {
	components: {
		DefaultWireframe,
		vRoomAvatar,
		vRoomGroupAvatar,
		vRoomEmptyAvatar,
		RoomModal,
	},
	layout: "defaultVuetify",
	data() {
		return {
			device: "mobile",
			dimensions: {
				colCount: 2,
				cellWidth: "3em",
				rowCount: 6,
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
		};
	},
	computed: {
		loading() {
			return RoomsModule.getLoading;
		},
		roomsError() {
			return RoomsModule.getError;
		},
		title() {
			return this.$t("common.labels.greeting", { name: this.$user.firstName });
		},
		items() {
			return JSON.parse(JSON.stringify(RoomsModule.getRoomsData)).filter(
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
	},
	async mounted() {
		await RoomsModule.fetch(); // TODO: this method will receive a string parameter (Eg, mobile | tablet | desktop)
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
					break;
				case "large":
					this.dimensions.colCount = 4;
					this.dimensions.cellWidth = "5em";
					break;
				case "mobile":
					this.dimensions.colCount = 4;
					this.dimensions.cellWidth = "3.7em";
					break;
				default:
					this.dimensions.colCount = 6;
					break;
			}
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
			this.groupDialog.groupData = this.items.find(
				(item) => item.id == groupId
			);
			this.groupDialog.isOpen = true;
		},
		findDataByPos(row, col) {
			return this.items.find(
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
		},
		getElementNameByRef(pos) {
			return this.$refs[`${pos.y}-${pos.x}`][0].$options["_componentTag"];
		},
		dragFromGroup(element) {
			this.draggedElement.from = {
				x: this.groupDialog.groupData.xPosition,
				y: this.groupDialog.groupData.yPosition,
				groupIndex: RoomsModule.roomsData
					.find((item) => item.id == this.groupDialog.groupData.id)
					.groupElements.findIndex((groupItem) => groupItem.id == element.id),
			};
			this.draggedElement.item = element;
			this.draggedElementName = "groupItem";
			this.groupDialog.isOpen = false;
			this.searchText = "";
		},
		async savePosition() {
			await RoomsModule.align(this.draggedElement);
			this.groupDialog.groupData = {};
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.row {
	flex-wrap: nowrap;
}
</style>
