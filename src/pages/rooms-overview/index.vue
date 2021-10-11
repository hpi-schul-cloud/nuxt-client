<template>
	<default-wireframe ref="main" :headline="title" :full-width="true">
		<v-row v-for="row in dimensions.rowCount" :key="row">
			<v-col v-for="col in dimensions.colCount" :key="col">
				<div
					v-if="getDataObject(row, col) !== undefined"
					class="d-flex justify-center"
				>
					<vRoomGroupAvatar
						v-if="hasGroup(row, col)"
						:ref="`${row}-${col}`"
						class="room-group-avatar"
						:location="`${row}-${col}`"
						:data="getDataObject(row, col)"
						:size="dimensions.cellWidth * ratios.itemRatio"
						:max-items="4"
						@clicked="openDialog(getDataObject(row, col).id)"
					>
					</vRoomGroupAvatar>
					<vRoomAvatar
						v-else
						:ref="`${row}-${col}`"
						class="room-avatar"
						:location="`${row}-${col}`"
						:item="getDataObject(row, col)"
						:size="dimensions.cellWidth * ratios.itemRatio"
						:show-badge="true"
						show-sub-title
						@startDrag="setDragElement"
					></vRoomAvatar>
				</div>
				<div v-else class="d-flex justify-center">
					<vRoomEmptyAvatar
						:ref="`${row}-${col}`"
						:location="`${row}-${col}`"
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
				<v-row>
					<v-col
						v-for="item in groupDialog.groupData.group"
						:key="item.id"
						:cols="maxItem"
					>
						<vRoomAvatar
							:item="item"
							:size="(dimensions.cellWidth * ratios.itemRatio) / 2"
							:show-badge="true"
							show-sub-title
						></vRoomAvatar>
					</v-col>
				</v-row>
			</template>
		</vCustomDialog>
		<!-- <vRoomDeleteAvatar v-if="showDeleteSection" @deleteAvatar="deleteAvatar" /> -->
	</default-wireframe>
</template>

<script>
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import vRoomAvatar from "@components/atoms/vRoomAvatar";
import vRoomEmptyAvatar from "@components/atoms/vRoomEmptyAvatar";
import vRoomGroupAvatar from "@components/molecules/vRoomGroupAvatar";
// import vRoomDeleteAvatar from "@components/atoms/vRoomDeleteAvatar";
import vCustomDialog from "@components/organisms/vCustomDialog";
import RoomsModule from "@store/rooms";

export default {
	components: {
		DefaultWireframe,
		vRoomAvatar,
		vRoomGroupAvatar,
		vRoomEmptyAvatar,
		vCustomDialog,
		// vRoomDeleteAvatar,
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
			return roomObject.group !== undefined;
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
			this.draggedElement.item = element;
			this.showDeleteSection = true;
		},
		async setDropElement(pos) {
			this.draggedElement.to = pos;
			if (
				this.getElementNameByRef(this.draggedElement.from) == "vRoomAvatar" &&
				this.getElementNameByRef(pos) == "vRoomEmptyAvatar"
			) {
				await RoomsModule.align(this.draggedElement);
				this.roomsData = RoomsModule.getRoomsData;
			}
			this.showDeleteSection = false;
		},
		getElementNameByRef(refId) {
			return this.$refs[refId][0].$options["_componentTag"];
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
