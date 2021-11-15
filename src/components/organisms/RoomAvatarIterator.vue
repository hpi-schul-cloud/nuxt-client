<template>
	<v-data-iterator
		:items="items"
		:search="searchText"
		:items-per-page.sync="maxItems"
		:page.sync="page"
		hide-default-footer
		no-data-text=""
	>
		<template v-slot:default="props">
			<v-container>
				<v-row align="center">
					<v-col
						v-for="item in props.items"
						:key="item.id"
						class="d-flex justify-center ma-0 mt-1 mb-0.5 pa-0"
						:cols="colCount"
					>
						<vRoomAvatar
							:draggable="canDraggable"
							class="room-avatar"
							:item="item"
							:size="avatarSize"
							:show-badge="true"
							:condense-layout="condenseLayout"
							@startDrag="$emit('startDrag', $event)"
						></vRoomAvatar>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</v-data-iterator>
</template>

<script>
import vRoomAvatar from "@components/atoms/vRoomAvatar.vue";

export default {
	components: {
		vRoomAvatar,
	},
	props: {
		items: {
			type: Array,
			default: () => [{}],
		},
		hasPagination: {
			type: Boolean,
		},
		listView: {
			type: Boolean,
		},
		modalView: {
			type: Boolean,
		},
		colCount: {
			type: Number,
			default: 4,
		},
		condenseLayout: {
			type: Boolean,
		},
		itemSize: {
			type: String,
			default: "3em",
		},
		maxItems: {
			type: Number,
			default: 9,
		},
		canDraggable: {
			type: Boolean,
		},
	},
	data() {
		return {
			searchText: "",
			device: "",
			page: 1,
			data: [
				{
					id: "6183dd6480fdc650e44b79d1",
					title: "Physics",
					shortTitle: "Ph",
					displayColor: "blue",
				},
				{
					id: "6183dd6680fdc650e44b79sd2",
					title: "Math",
					shortTitle: "Ma",
					displayColor: "#f23f76",
				},
				{
					id: "6s188f93df71f695cfb16fe18",
					title: "Greek",
					shortTitle: "Gr",
					displayColor: "#f23f76",
				},
				{
					id: "6188f941f71f695dcfb16fe19",
					title: "German",
					shortTitle: "Ge",
					displayColor: "#f23f76",
				},
				{
					id: "618a95ce06870b10ddd863cca4",
					title: "English",
					shortTitle: "En",
					displayColor: "green",
				},
				{
					id: "618b659806870b10d863casca5",
					title: "Biology",
					shortTitle: "Bi",
					displayColor: "yellow",
				},
				{
					id: "618b65980fs6870b10d863cca5",
					title: "Chemistry",
					shortTitle: "Ch",
					displayColor: "#f23f76",
				},
				{
					id: "61da83dd6480fdc650e44b79d1",
					title: "Physics",
					shortTitle: "Ph",
					displayColor: "blue",
				},
				{
					id: "6183dd6680fdc65asd0e44b79d2",
					title: "Math",
					shortTitle: "Ma",
					displayColor: "#f23f76",
				},
				{
					id: "6188f93df71f695cfbds16fe18",
					title: "Greek",
					shortTitle: "Gr",
					displayColor: "#f23f76",
				},
				{
					id: "6188f941f7fsd1f695cfb16fe19",
					title: "German",
					shortTitle: "Ge",
					displayColor: "#f23f76",
				},
				{
					id: "618a95fsce06870b10d863cca4",
					title: "English",
					shortTitle: "En",
					displayColor: "green",
				},
				{
					id: "618b6598sd06870b10d863cca5",
					title: "Biology",
					shortTitle: "Bi",
					displayColor: "yellow",
				},
				{
					id: "618b6598068sd70b10d863cca5",
					title: "Chemistry",
					shortTitle: "Ch",
					displayColor: "#f23f76",
				},
			],
		};
	},
	computed: {
		maxItemPerPage() {
			return -1;
			return this.listView ? -1 : Math.pow(this.colCount, 2);
		},
		avatarSize() {
			return this.device == "large" && this.modalView ? "1.5em" : this.itemSize;
		},
	},
	mounted() {
		this.device = this.$mq;
	},

	methods: {},
};
</script>
