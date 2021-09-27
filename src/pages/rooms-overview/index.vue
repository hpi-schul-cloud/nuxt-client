<template>
	<default-wireframe ref="main" :headline="title" :full-width="true">
		<v-row v-for="row in dimensions.rowCount" :key="row">
			<v-col v-for="col in dimensions.columnCount" :key="col">
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
			device: null,
			maxItem: 4,
			dimensions: {
				width: 1200,
				height: 1200,
				device: "desktop", // this will be mobile after whole implementations
				columnCount: 6, // this will be be 2 due to mobile first approach
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
	},
	methods: {
		// TODO: this method should be improved when the different devices will be started to use
		// getDeviceDims() {
		// 	const { width } = this.$refs.main.getBoundingClientRect();

		// 	this.dimensions.width = width;
		// 	this.dimensions.height = this.$vuetify.breakpoint.height;
		// 	const device = this.$vuetify.breakpoint.name;
		// 	this.device = device;

		// if (device == "sm" || device == "md") {
		// 	this.dimensions.columnCount = 4;
		// 	this.dimensions.device = "tablet";
		// 	this.roomsData = tabletData;
		// }
		// if (device == "lg" || device == "xl") {
		// 	this.dimensions.columnCount = 6;
		// 	this.dimensions.device = "desktop";
		// 	this.roomsData = desktopData;
		// }

		// 	const cellWidth = Math.round(
		// 		(width / this.dimensions.columnCount) * this.ratios.pageRatio
		// 	);
		// 	this.dimensions.cellWidth = cellWidth;
		// 	this.dimensions.rowCount = Math.round(this.dimensions.height / cellWidth);
		// },

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
		},
		setDropElement(pos) {
			this.draggedElement.to = pos;
			if (
				this.getElementNameByRef(this.draggedElement.from) == "vRoomAvatar" &&
				this.getElementNameByRef(pos) == "vRoomEmptyAvatar"
			) {
				RoomsModule.align(this.draggedElement);
			}
		},
		getElementNameByRef(refId) {
			return this.$refs[refId][0].$options["_componentTag"];
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
