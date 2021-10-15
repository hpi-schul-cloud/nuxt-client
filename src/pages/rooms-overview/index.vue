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
		<vCustomDialog v-model="groupDialog.isOpen" class="custom-dialog">
			<div slot="title">
				<h2 class="text-h4 my-2">
					{{ groupDialog.groupData.title }}
				</h2>
			</div>
			<template slot="content">
				<v-row class="d-flex justify-center ma-1">
					<v-col
						v-for="item in groupDialog.groupData.groupElements"
						:key="item.id"
						class="d-flex justify-center"
						:cols="maxItem"
					>
						<vRoomAvatar
							:item="item"
							:size="(dimensions.cellWidth * ratios.itemRatio) / 2"
							:show-badge="true"
							class="rounded-xl"
							show-sub-title
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
			return `${this.$t("common.labels.greeting")} ${this.$user.firstName}`;
		},
	},
	async created() {
		await RoomsModule.fetch(); // this method will receive a string parameter (Eg, mobile | tablet | desktop)
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
		},
		async setDropElement(pos) {
			this.draggedElement.to = pos;
			const fromElementName = this.getElementNameByRef(
				this.draggedElement.from
			);
			const toElementName = this.getElementNameByRef(pos);

			if (
				(fromElementName == "vRoomAvatar" || "vRoomGroupAvatar") &&
				toElementName == "vRoomEmptyAvatar"
			) {
				await RoomsModule.align(this.draggedElement);
				this.roomsData = RoomsModule.getRoomsData;
			}
			this.showDeleteSection = false;
		},
		async setGroupElements(pos) {
			this.draggedElement.to = pos;
			const fromObject = this.draggedElement.item;
			const toObject = this.findDataByPos(pos.y, pos.x);
			const fromElementName = this.getElementNameByRef(
				this.draggedElement.from
			);
			const toElementName = this.getElementNameByRef(pos);

			if (fromObject.id === toObject.id) return;

			if (fromElementName == "vRoomAvatar" && toElementName == "vRoomAvatar") {
				await RoomsModule.align(this.draggedElement);
				this.roomsData = RoomsModule.getRoomsData;
			}
		},
		async addGroupElements(pos) {
			this.draggedElement.to = pos;
			const fromObject = this.draggedElement.item;
			const toObject = this.findDataByPos(pos.y, pos.x);
			const fromElementName = this.getElementNameByRef(
				this.draggedElement.from
			);
			const toElementName = this.getElementNameByRef(pos);

			if (fromObject.id === toObject.id) return;

			if (
				fromElementName == "vRoomAvatar" &&
				toElementName == "vRoomGroupAvatar"
			) {
				await RoomsModule.align(this.draggedElement);
				this.roomsData = RoomsModule.getRoomsData;
			}
		},
		getElementNameByRef(pos) {
			return this.$refs[`${pos.y}-${pos.x}`][0].$options["_componentTag"];
		},
		deleteAvatar() {
			// TODO: delete event will be here
			this.showDeleteSection = false;

			RoomsModule.delete(this.draggedElement.item.id);
			this.roomsData = this.roomsData.filter(
				(item) => item.id !== this.draggedElement.item.id
			);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
