<template>
	<vCustomDialog
		ref="customDialog"
		:is-open="isOpen"
		class="room-dialog"
		:size="1500"
		@dialog-closed="$emit('dialog-closed', false)"
	>
		<div slot="title" class="room-title">
			<v-row>
				<v-col cols="12">
					<h2>Search All Courses</h2>
				</v-col>
			</v-row>
		</div>
		<template slot="content">
			<v-row>
				<v-col cols="12">
					<v-text-field
						ref="search"
						v-model="search"
						label="search"
						:append-icon="mdiMagnify"
						@focus="searchOpen = true"
					>
					</v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-container fluid>
					<v-data-iterator
						:items="data"
						:search="search"
						:sort-desc="sortDesc"
						hide-default-footer
					>
						<template v-slot:default="props">
							<v-row>
								<v-col
									v-for="item in props.items"
									:key="item.name"
									class="d-flex justify-left cols-12 xs-6 sm-6 lg-4 xl-2"
								>
									<vRoomAvatar
										class="room-avatar"
										:item="item"
										size="5em"
										:show-badge="true"
									></vRoomAvatar>
								</v-col>
							</v-row>
						</template>
					</v-data-iterator>
				</v-container>
			</v-row>
		</template>
	</vCustomDialog>
</template>

<script>
import vRoomAvatar from "@components/atoms/vRoomAvatar.vue";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";

import { mdiMagnify } from "@mdi/js";

export default {
	components: {
		vCustomDialog,
		vRoomAvatar,
	},
	model: {
		prop: "isOpen",
		event: "dialog-closed",
	},
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
		groupData: {
			type: Object,
			default: () => ({}),
		},
		searchable: {
			type: Boolean,
		},
		list: {
			type: Boolean,
			// modalDialog or list
		},
	},
	data() {
		return {
			mdiMagnify,
			itemsPerPageArray: [-1],
			search: "",

			sortDesc: false,

			data: [
				{
					id: "6183dd6480fdc650e44b79d1",
					title: "Physics",
					shortTitle: "Ph",
					displayColor: "blue",
				},
				{
					id: "6183dd6680fdc650e44b79d2",
					title: "Math",
					shortTitle: "Ma",
					displayColor: "#f23f76",
				},
				{
					id: "6188f93df71f695cfb16fe18",
					title: "Greek",
					shortTitle: "Gr",
					displayColor: "#f23f76",
				},
				{
					id: "6188f941f71f695cfb16fe19",
					title: "German",
					shortTitle: "Ge",
					displayColor: "#f23f76",
				},
				{
					id: "618a95ce06870b10d863cca4",
					title: "English",
					shortTitle: "En",
					displayColor: "green",
				},
				{
					id: "618b659806870b10d863cca5",
					title: "Biology",
					shortTitle: "Bi",
					displayColor: "yellow",
				},
				{
					title: "Chemistry",
					shortTitle: "Ch",
					displayColor: "#f23f76",
				},
				{
					id: "6183dd6480fdc650e44b79d1",
					title: "Physics",
					shortTitle: "Ph",
					displayColor: "blue",
				},
				{
					id: "6183dd6680fdc650e44b79d2",
					title: "Math",
					shortTitle: "Ma",
					displayColor: "#f23f76",
				},
				{
					id: "6188f93df71f695cfb16fe18",
					title: "Greek",
					shortTitle: "Gr",
					displayColor: "#f23f76",
				},
				{
					id: "6188f941f71f695cfb16fe19",
					title: "German",
					shortTitle: "Ge",
					displayColor: "#f23f76",
				},
				{
					id: "618a95ce06870b10d863cca4",
					title: "English",
					shortTitle: "En",
					displayColor: "green",
				},
				{
					id: "618b659806870b10d863cca5",
					title: "Biology",
					shortTitle: "Bi",
					displayColor: "yellow",
				},
				{
					title: "Chemistry",
					shortTitle: "Ch",
					displayColor: "#f23f76",
				},
				{
					id: "6188f93df71f695cfb16fe18",
					title: "Greek",
					shortTitle: "Gr",
					displayColor: "#f23f76",
				},
				{
					id: "6188f941f71f695cfb16fe19",
					title: "German",
					shortTitle: "Ge",
					displayColor: "#f23f76",
				},
				{
					id: "618a95ce06870b10d863cca4",
					title: "English",
					shortTitle: "En",
					displayColor: "green",
				},
				{
					id: "618b659806870b10d863cca5",
					title: "Biology",
					shortTitle: "Bi",
					displayColor: "yellow",
				},
				{
					title: "Chemistry",
					shortTitle: "Ch",
					displayColor: "#f23f76",
				},
			],
		};
	},
	methods: {},
};
</script>
