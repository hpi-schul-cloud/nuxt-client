<template>
	<v-container ref="main" fluid>
		<v-row v-for="row in dimensions.rowCount" :key="row">
			<v-col v-for="col in dimensions.columnCount" :key="col">
				<div v-if="getDataObject(row, col) !== null">
					<vRoomGroupAvatar
						v-if="hasGroup(row, col)"
						:items="getDataObject(row, col)"
						:size="dimensions.cellWidth * ratios.itemRatio"
						:max-items="4"
						@clicked="openDialog(getDataObject(row, col).id)"
					>
					</vRoomGroupAvatar>
					<vRoomAvatar
						v-else
						:item="getDataObject(row, col)"
						:size="dimensions.cellWidth * ratios.itemRatio"
						:show-badge="true"
						show-sub-title
					></vRoomAvatar>
				</div>
				<div v-else>
					<vRoomEmtptyAvatar
						:size="dimensions.cellWidth * ratios.itemRatio"
					></vRoomEmtptyAvatar>
				</div>
			</v-col>
		</v-row>

		<vCustomDialog
			v-model="groupDialog.isOpen"
			@dialog-closed="groupDialog.isOpen = false"
		>
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
						cols="4"
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
const mobileData = [
	{
		id: "1",
		title: "First Mobile",
		shortTitle: "Ma",
		color: "purple",
		url: "/api/xxxx/1234w",
		x_pos: 1,
		y_pos: 1,
	},
	{
		id: "2",
		title: "Second Mobile",
		shortTitle: "Ma",
		color: "#EC407A",
		url: "/api/xxxx/1234w",
		notification: true,
		x_pos: 2,
		y_pos: 2,
	},

	{
		id: "3",
		title: "Third Mobile",
		shortTitle: "Ma",
		color: "#EC407A",
		url: "/api/xxxx/1234w",
		x_pos: 1,
		y_pos: 4,
	},
	{
		id: "4",
		title: "Fourth Mobile",
		shortTitle: "Bi",
		color: "#EC407A",
		url: "/api/xxxx/1234w",
		x_pos: 2,
		y_pos: 4,
		group: [
			{
				id: "5",
				title: "Math 7a",
				color: "yellow",
			},
			{
				id: "6",
				title: "Bio 7a",
				color: "green",
				notification: true,
			},
			{
				id: "7",
				title: "Math 7a",
				color: "yellow",
			},
			{
				id: "8",
				title: "Bio 7a",
				color: "green",
				notification: true,
			},
		],
	},
];
const tabletData = [
	{
		id: "1",
		title: "First Tablet",
		shortTitle: "Ma",
		color: "purple",
		url: "/api/xxxx/1234w",
		x_pos: 1,
		y_pos: 1,
	},
	{
		id: "2",
		title: "Second Tablet",
		shortTitle: "Ma",
		color: "#EC407A",
		url: "/api/xxxx/1234w",
		notification: true,
		x_pos: 3,
		y_pos: 2,
	},
	{
		id: "3",
		title: "Third Tablet",
		shortTitle: "Ma",
		color: "#EC407A",
		url: "/api/xxxx/1234w",
		x_pos: 4,
		y_pos: 4,
	},
	{
		id: "4",
		title: "Forth Tablet",
		shortTitle: "Bi",
		color: "#EC407A",
		url: "/api/xxxx/1234w",
		x_pos: 2,
		y_pos: 4,
		group: [
			{
				id: "5",
				title: "Math 7a",
				color: "yellow",
			},
			{
				id: "6",
				title: "Bio 7a",
				color: "green",
				notification: true,
			},
		],
	},
	{
		id: "3",
		title: "Fifth Tablet",
		shortTitle: "Ma",
		color: "#EC407A",
		url: "/api/xxxx/1234w",
		x_pos: 2,
		y_pos: 3,
	},
];
const desktopData = [
	{
		id: "1",
		title: "First Desktop",
		shortTitle: "Ma",
		color: "purple",
		url: "/api/xxxx/1234w",
		x_pos: 6,
		y_pos: 1,
	},
	{
		id: "2",
		title: "Second Desktop",
		shortTitle: "Ma",
		color: "#EC407A",
		url: "/api/xxxx/1234w",
		notification: true,
		x_pos: 5,
		y_pos: 5,
	},
	{
		id: "3",
		title: "Third Desktop",
		shortTitle: "Ma",
		color: "#EC407A",
		url: "/api/xxxx/1234w",
		x_pos: 1,
		y_pos: 4,
	},
	{
		id: "4",
		title: "Fourth Desktop",
		shortTitle: "Bi",
		color: "#EC407A",
		url: "/api/xxxx/1234w",
		x_pos: 3,
		y_pos: 3,
		group: [
			{
				id: "5",
				title: "Math 7a",
				color: "yellow",
			},
			{
				id: "6",
				title: "Bio 7a",
				color: "green",
				notification: true,
			},
		],
	},
	{
		id: "7",
		title: "Fifth Desktop",
		shortTitle: "Ma",
		color: "#EC407A",
		url: "/api/xxxx/1234w",
		x_pos: 1,
		y_pos: 2,
	},
	{
		id: "8",
		title: "Sixst Desktop",
		shortTitle: "Ma",
		color: "#EC407A",
		url: "/api/xxxx/1234w",
		x_pos: 5,
		y_pos: 2,
	},
];

import vRoomAvatar from "@components/atoms/vRoomAvatar";
import vRoomEmtptyAvatar from "@components/atoms/vRoomEmptyAvatar";
import vRoomGroupAvatar from "@components/atoms/vRoomGroupAvatar";
import vCustomDialog from "@components/organisms/vCustomDialog";
export default {
	components: {
		vRoomAvatar,
		vRoomGroupAvatar,
		vRoomEmtptyAvatar,
		vCustomDialog,
	},
	layout: "defaultVuetify",
	data() {
		return {
			roomsData: mobileData,
			dim: this.$vuetify.breakpoint,
			ratios: {
				pageRatio: 0.9,
				itemRatio: 0.8,
			},
			device: null,

			dimensions: {
				width: null,
				height: null,
				device: "mobile",
				columnCount: 2,
				cellWidth: null,
				rowCount: null,
			},
			groupDialog: {
				isOpen: false,
				groupData: {},
			},
		};
	},
	mounted() {
		this.getDeviceDims();
	},

	methods: {
		getDeviceDims() {
			const { width } = this.$refs.main.getBoundingClientRect();

			this.dimensions.width = width;
			this.dimensions.height = this.$vuetify.breakpoint.height;
			const device = this.$vuetify.breakpoint.name;
			this.device = device;
			if (device == "sm" || device == "md") {
				this.dimensions.columnCount = 4;
				this.dimensions.device = "tablet";
				this.roomsData = tabletData;
			}
			if (device == "lg" || device == "xl") {
				this.dimensions.columnCount = 6;
				this.dimensions.device = "desktop";
				this.roomsData = desktopData;
			}

			const cellWidth = Math.round(
				(width / this.dimensions.columnCount) * this.ratios.pageRatio
			);
			this.dimensions.cellWidth = cellWidth;
			this.dimensions.rowCount = Math.round(this.dimensions.height / cellWidth);
		},
		getDataObject(row, col) {
			const roomObject = this.roomsData.filter(
				(item) => item.x_pos == col && item.y_pos == row
			);
			if (roomObject.length) return roomObject[0];
			return null;
		},
		hasGroup(row, col) {
			const roomObject = this.roomsData.filter(
				(item) => item.x_pos == col && item.y_pos == row
			);
			return roomObject.length && roomObject[0].group !== undefined;
		},
		openDialog(groupId) {
			this.groupDialog.groupData = this.roomsData.filter(
				(item) => item.id == groupId
			)[0];
			this.groupDialog.isOpen = true;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
