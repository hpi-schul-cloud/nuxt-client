<template>
	<default-wireframe ref="main" :headline="title" :full-width="true">
		<v-row class="d-flex justify-center">
			<v-col cols="12" sm="6" md="8" lg="8">
				<v-text-field
					ref="search"
					:label="$t('common.words.search')"
					:append-icon="mdiMagnify"
					@input="searchItems"
				>
				</v-text-field>
			</v-col>
		</v-row>
		<v-row v-for="(row, rowIndex) in dimensions.rowCount" :key="rowIndex">
			<v-col v-for="(col, colIndex) in dimensions.colCount" :key="colIndex">
				<div
					v-if="getDataObject(rowIndex, colIndex) !== undefined"
					class="d-flex justify-center"
				>
					<vRoomGroupAvatar
						v-if="hasGroup(rowIndex, colIndex)"
						:ref="`${rowIndex}-${colIndex}`"
						class="room-group-avatar"
						:data="getDataObject(rowIndex, colIndex)"
						:size="dimensions.cellWidth * ratios.itemRatio"
						:max-items="4"
						@clicked="openDialog(getDataObject(rowIndex, colIndex).id)"
						@startDrag="onStartDrag($event, { x: colIndex, y: rowIndex })"
						@drop="addGroupElements({ x: colIndex, y: rowIndex })"
					>
					</vRoomGroupAvatar>
					<vRoomAvatar
						v-else
						:ref="`${rowIndex}-${colIndex}`"
						class="room-avatar"
						:item="getDataObject(rowIndex, colIndex)"
						:size="dimensions.cellWidth * ratios.itemRatio"
						:show-badge="true"
						:draggable="true"
						@startDrag="onStartDrag($event, { x: colIndex, y: rowIndex })"
						@drop="setGroupElements({ x: colIndex, y: rowIndex })"
					></vRoomAvatar>
				</div>
				<div v-else class="d-flex justify-center">
					<vRoomEmptyAvatar
						:ref="`${rowIndex}-${colIndex}`"
						:size="dimensions.cellWidth * ratios.itemRatio"
						@drop="setDropElement({ x: colIndex, y: rowIndex })"
					></vRoomEmptyAvatar>
				</div>
			</v-col>
		</v-row>
		<room-modal
			ref="roomModal"
			v-model="groupDialog.isOpen"
			:group-data="groupDialog.groupData"
			:avatar-size="dimensions.cellWidth * ratios.itemRatio * 0.75"
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
			roomsData: [],
			ratios: {
				pageRatio: 0.9,
				itemRatio: 0.8,
			},
			device: "mobile",
			dimensions: {
				colCount: 2,
				cellWidth: 200,
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
	},
	async created() {
		await RoomsModule.fetch(); // TODO: this method will receive a string parameter (Eg, mobile | tablet | desktop)
		this.roomsData = RoomsModule.getRoomsData;
		this.getDeviceDims();
	},
	methods: {
		getDeviceDims() {
			this.device = this.$mq;
			switch (this.$mq) {
				case "tablet":
					this.dimensions.colCount = 4;
					break;
				case "desktop":
					this.dimensions.colCount = 6;
					break;
				case "large":
					this.dimensions.colCount = 6;
					break;
				case "mobile":
					this.dimensions.colCount = 2;
					this.dimensions.cellWidth = 150;
					break;
				default:
					this.dimensions.colCount = 2;
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
		openDialog(groupId) {
			this.groupDialog.groupData = this.roomsData.find(
				(item) => item.id == groupId
			);
			this.groupDialog.isOpen = true;
		},
		findDataByPos(row, col) {
			return this.roomsData.find(
				(item) => item.xPosition == col && item.yPosition == row
			);
		},
		onStartDrag(element, pos) {
			this.draggedElement.from = pos;
			this.draggedElement.to = null;
			this.draggedElement.item = element;
			this.showDeleteSection = true;
			this.draggedElementName = this.getElementNameByRef(pos);
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
		setGroupElements(pos) {
			this.draggedElement.to = pos;
			const toElementName = this.getElementNameByRef(pos);

			if (JSON.stringify(this.draggedElement.from) == JSON.stringify(pos))
				return;

			if (
				(this.draggedElementName == "vRoomAvatar" ||
					this.draggedElementName == "groupItem") &&
				toElementName == "vRoomAvatar"
			) {
				this.savePosition();
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
				groupIndex: this.roomsData
					.find((item) => item.id == this.groupDialog.groupData.id)
					.groupElements.findIndex((groupItem) => groupItem.id == element.id),
			};
			this.draggedElement.item = element;
			this.draggedElementName = "groupItem";
			this.groupDialog.isOpen = false;
		},
		deleteAvatar() {
			// TODO: delete event will be here
			this.showDeleteSection = false;

			RoomsModule.delete(this.draggedElement.item.id);
			this.roomsData = this.roomsData.filter(
				(item) => item.id !== this.draggedElement.item.id
			);
		},
		async savePosition() {
			await RoomsModule.align(this.draggedElement);
			this.roomsData = RoomsModule.getRoomsData;
			this.groupDialog.groupData = {};
		},
		searchItems(filterText) {
			this.roomsData = RoomsModule.getRoomsData;
			const filtered = JSON.parse(JSON.stringify(this.roomsData)).filter(
				(item) => {
					if (item.groupElements) {
						const groupElements = item.groupElements.filter((groupItem) => {
							return groupItem.title
								.toLowerCase()
								.includes(filterText.toLowerCase());
						});
						item.groupElements = groupElements;
						return groupElements;
					}
					return item.title.toLowerCase().includes(filterText.toLowerCase());
				}
			);
			this.roomsData = filtered;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
