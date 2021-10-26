<template>
	<default-wireframe ref="main" :headline="title" :full-width="true">
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
						:location="{ x: colIndex, y: rowIndex }"
						:data="getDataObject(rowIndex, colIndex)"
						:size="dimensions.cellWidth * ratios.itemRatio"
						:max-items="4"
						@clicked="openDialog(getDataObject(rowIndex, colIndex).id)"
						@startDrag="setDragElement"
						@drop="addGroupElements"
					>
					</vRoomGroupAvatar>
					<vRoomAvatar
						v-else
						:ref="`${rowIndex}-${colIndex}`"
						class="room-avatar"
						:location="{ x: colIndex, y: rowIndex }"
						:item="getDataObject(rowIndex, colIndex)"
						:size="dimensions.cellWidth * ratios.itemRatio"
						:show-badge="true"
						show-sub-title
						@startDrag="setDragElement"
						@drop="setGroupElements"
					></vRoomAvatar>
				</div>
				<div v-else class="d-flex justify-center">
					<vRoomEmptyAvatar
						:ref="`${rowIndex}-${colIndex}`"
						:location="{ x: colIndex, y: rowIndex }"
						:size="dimensions.cellWidth * ratios.itemRatio"
						@drop="setDropElement"
					></vRoomEmptyAvatar>
				</div>
			</v-col>
		</v-row>
		<vCustomDialog
			ref="custom-dialog"
			v-model="groupDialog.isOpen"
			class="custom-dialog"
			@dialog-closed="groupDialog.groupData = {}"
		>
			<div slot="title">
				<h2 class="text-h4 my-2">
					{{ groupDialog.groupData.title }}
				</h2>
			</div>
			<template slot="content">
				<v-row class="d-flex justify-center ma-1">
					<v-col
						v-for="(item, index) in groupDialog.groupData.groupElements"
						:key="item.id"
						class="d-flex justify-center"
						:cols="maxItem"
					>
						<vRoomAvatar
							:ref="`index-${index}`"
							:item="item"
							:size="dimensions.cellWidth * ratios.itemRatio"
							:is-group-avatar-list="true"
							:show-badge="true"
							class="rounded-xl dialog-avatar"
							show-sub-title
							@startDrag="dragFromGroup"
						></vRoomAvatar>
					</v-col>
				</v-row>
			</template>
		</vCustomDialog>
	</default-wireframe>
</template>

<script>
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import vRoomAvatar from "@components/atoms/vRoomAvatar";
import vRoomEmptyAvatar from "@components/atoms/vRoomEmptyAvatar";
import vRoomGroupAvatar from "@components/molecules/vRoomGroupAvatar";
import vCustomDialog from "@components/organisms/vCustomDialog";
import RoomsModule from "@store/rooms";

export default {
	components: {
		DefaultWireframe,
		vRoomAvatar,
		vRoomGroupAvatar,
		vRoomEmptyAvatar,
		vCustomDialog,
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
			maxItem: 4,
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
			draggedElementName: "",
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
		setDragElement(element, pos) {
			this.draggedElement.from = pos;
			this.draggedElement.to = null;
			this.draggedElement.item = element;
			this.showDeleteSection = true;
			this.draggedElementName = this.getElementNameByRef(pos);
		},
		setDropElement(pos) {
			this.draggedElement.to = pos;
			const toElementName = this.getElementNameByRef(pos);

			if (
				(this.draggedElementName == "vRoomAvatar" ||
					"vRoomGroupAvatar" ||
					"groupItem") &&
				toElementName == "vRoomEmptyAvatar"
			) {
				this.savePosition();
			}
			this.showDeleteSection = false;
		},
		setGroupElements(pos) {
			this.draggedElement.to = pos;
			const toElementName = this.getElementNameByRef(pos);

			if (this.draggedElement.from == pos) return;

			if (
				(this.draggedElementName == "vRoomAvatar" || "groupItem") &&
				toElementName == "vRoomAvatar"
			) {
				this.savePosition();
			}
		},
		addGroupElements(pos) {
			this.draggedElement.to = pos;
			const toElementName = this.getElementNameByRef(pos);

			if (this.draggedElement.from == pos) return;

			if (
				(this.draggedElementName == "vRoomAvatar" || "groupItem") &&
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
		setGroupElementIndex(elementId) {
			return this.roomsData
				.find((item) => item.id == this.groupDialog.groupData.id)
				.groupElements.findIndex((groupItem) => groupItem.id == elementId);
		},
		async savePosition() {
			await RoomsModule.align(this.draggedElement);
			this.roomsData = RoomsModule.getRoomsData;
			this.groupDialog.groupData = {};
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
