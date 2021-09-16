<template>
	<v-container ref="main" fluid>
		<v-row v-for="row in dimensions.rowCount" :key="row">
			<v-col v-for="col in dimensions.columnCount" :key="col">
				<div
					v-if="getDataObject(row, col) !== null"
					class="d-flex justify-center"
				>
					<vRoomGroupAvatar
						v-if="hasGroup(row, col)"
						:ref="`${row}-${col}`"
						class="room-group-avatar"
						:data-position-row="row"
						:data-position-col="col"
						:items="getDataObject(row, col)"
						:size="dimensions.cellWidth * ratios.itemRatio"
						:max-items="4"
						@clicked="openDialog(getDataObject(row, col).id)"
					>
					</vRoomGroupAvatar>
					<vRoomAvatar
						v-else
						:ref="`${row}-${col}`"
						class="room-avatar"
						:data-position-row="row"
						:data-position-col="col"
						:item="getDataObject(row, col)"
						:size="dimensions.cellWidth * ratios.itemRatio"
						:show-badge="true"
						show-sub-title
					></vRoomAvatar>
				</div>
				<div v-else>
					<vRoomEmptyAvatar
						:ref="`${row}-${col}`"
						:size="dimensions.cellWidth * ratios.itemRatio"
						:data-position-row="row"
						:data-position-col="col"
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
							:size="dimensions.cellWidth * ratios.itemRatio"
							:show-badge="true"
							show-sub-title
						></vRoomAvatar>
					</v-col>
				</v-row>
			</template>
		</vCustomDialog>
	</v-container>
</template>

<script>
import vRoomAvatar from "@components/atoms/vRoomAvatar";
import vRoomEmptyAvatar from "@components/atoms/vRoomEmptyAvatar";
import vRoomGroupAvatar from "@components/molecules/vRoomGroupAvatar";
import vCustomDialog from "@components/organisms/vCustomDialog";
import RoomsModule from "@store/rooms";

export default {
	components: {
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
		};
	},
	computed: {
		loading() {
			return RoomsModule.getLoading;
		},
		roomsError() {
			return RoomsModule.getError;
		},
	},
	async created() {
		await RoomsModule.fetch(); // this method will receive a string parameter (Eg, mobile | tablet | desktop)
		this.roomsData = RoomsModule.getRoomsData;
		// this.roomsData = mobileData;
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
			const roomObject = this.findDataByPos(row, col);
			if (roomObject.length) return roomObject[0];
			return null;
		},
		hasGroup(row, col) {
			const roomObject = this.findDataByPos(row, col);
			return roomObject.length && roomObject[0].group !== undefined;
		},
		openDialog(groupId) {
			this.groupDialog.groupData = this.roomsData.filter(
				(item) => item.id == groupId
			)[0];
			this.groupDialog.isOpen = true;
		},
		findDataByPos(row, col) {
			return this.roomsData.filter(
				(item) => item.xPosition == col && item.yPosition == row
			);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
