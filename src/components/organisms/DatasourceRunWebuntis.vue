<template>
	<div>
		<template v-if="run.dryrun === true">
			<base-table
				:columns="columns"
				:data="tableData"
				track-by="_id"
				:paginated="true"
				:current-page="currentPage"
				:total="pagination.total"
				:rows-per-page="rowsPerPage"
				:show-row-selection="true"
				:backend-pagination="true"
				:backend-sorting="true"
				:selected-rows="selectedRows"
				:send-type="sendType"
				:send-ids="sendIds"
				@all-rows-selected="handlerAllRowsSelected"
				@update:rows-per-page="handlerUpdateRowsPerPage"
				@update:current-page="handlerUpdatePage"
				@update:selected-rows="setSelection"
			>
			</base-table>
			<form-actions>
				<template v-slot:primary>
					<base-button design="primary" @click="triggerRun">
						Auswahl importieren
					</base-button>
					<base-button design="text" to="/administration/datasources">
						Abbrechen
					</base-button>
				</template>
				<template v-slot:secondary> </template>
			</form-actions>
		</template>
		<template v-else-if="run.dryrun === false">
			<base-modal :active="true">
				<template v-slot:body>
					<modal-body-info title="Die Daten wurden erfolgreich importiert.">
						<template v-slot:icon>
							<base-icon
								source="material"
								icon="check_circle"
								style="color: var(--color-success)"
							/>
						</template>
					</modal-body-info>
				</template>
				<template v-slot:footer>
					<modal-footer-confirm text="Ok" @click="gotoOverview" />
				</template>
			</base-modal>
		</template>
		<template v-else>
			Loading...
			<!-- Should not be reached ever -->
		</template>

		<!-- <li>Should fetch data from run using webuntis metadata service</li>
		<li>DONE the store to fetch this data does not exist yet</li>
		<li>DONE Should show list of courses (table)</li>
		<li>Should show import button if dry run</li>
		<li>
			Should show number of elements to import/number of imported elements
		</li>
		<li>Button to import should trigger run with selection</li> -->
	</div>
</template>
<script>
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import ModalFooterConfirm from "@components/molecules/ModalFooterConfirm";
import FormActions from "@components/molecules/FormActions";
import { mapGetters } from "vuex";
export default {
	components: {
		ModalBodyInfo,
		ModalFooterConfirm,
		FormActions,
	},
	props: {
		datasource: {
			type: Object,
			required: true,
		},
		run: {
			type: Object,
			default: () => ({}),
		},
		runId: {
			type: String,
			required: true,
		},
	},
	data: function() {
		return {
			columns: [
				{
					field: "class",
					label: "Name",
				},
				{
					field: "teacher",
					label: "Lehrer",
				},
				{
					field: "room",
					label: "Raum",
				},
				{
					field: "state",
					label: "Status",
				},
			],
			rowsPerPage: 5,
			sendIds: {},
			sendType: "inclusive", // or exclusive
		};
	},
	computed: {
		...mapGetters("webuntis-metadata", {
			webuntisMetadata: "list",
		}),
		selectedRows() {
			return this.tableData.filter((row) => {
				return this.sendType === "inclusive"
					? Boolean(this.sendIds[row._id])
					: !Boolean(this.sendIds[row._id]);
			});
		},
		tableData() {
			return this.webuntisMetadata.map((entry) => {
				return {
					_id: entry._id,
					teacher: entry.teacher,
					class: `${entry.subject} ${entry.class}`,
					room: entry.room,
					state: entry.state,
				};
			});
		},
		currentPage() {
			return this.pagination?.skip / this.pagination?.limit + 1;
		},
		pagination() {
			return (
				this.$store.state["webuntis-metadata"].pagination?.default || {
					limit: 0,
					total: 0,
					skip: 0,
				}
			);
		},
	},
	created(ctx) {
		this.find({
			$limit: this.rowsPerPage,
			page: 1,
		});
	},
	methods: {
		setSelection(selections) {
			const selectedIdsOnCurrentView = selections.map(
				(selection) => selection._id
			);
			const unselectedIdsOnCurrentView = this.tableData
				.filter((row) => {
					return !selectedIdsOnCurrentView.includes(row._id);
				})
				.map((row) => row._id);

			let idsToPush = [];
			let idsToRemove = [];
			if (this.sendType === "inclusive") {
				idsToPush = selectedIdsOnCurrentView;
				idsToRemove = unselectedIdsOnCurrentView;
			} else {
				// this.sendType === "exclusive"
				idsToRemove = selectedIdsOnCurrentView;
				idsToPush = unselectedIdsOnCurrentView;
			}
			idsToPush.forEach((id) => {
				this.sendIds[id] = true;
			});
			idsToRemove.forEach((id) => {
				delete this.sendIds[id];
			});
		},
		handlerAllRowsSelected(value) {
			this.sendType = Boolean(value.length) ? "exclusive" : "inclusive";
			this.$set(this, "sendIds", {});
		},
		handlerUpdatePage(newPage) {
			this.find({
				$limit: this.rowsPerPage,
				page: newPage,
			});
		},
		handlerUpdateRowsPerPage(newRowsPerPage) {
			this.rowsPerPage = newRowsPerPage;
			this.find({
				$limit: newRowsPerPage,
				page: 1,
			});
		},
		find({ $limit, page }) {
			const $skip = $limit * (page - 1);
			try {
				this.$store.dispatch("webuntis-metadata/find", {
					query: {
						$skip,
						$limit,
						datasourceId: this.datasource._id,
					},
				});
			} catch (error) {
				console.error(error);
				this.$toast.error(this.$t("error.load"));
			}
		},
		async triggerRun() {
			try {
				const run = await this.$store.dispatch("datasourceRuns/create", {
					datasourceId: this.datasource._id,
					dryrun: false,
					data: {
						datatype: this.sendType, // inclusive/exclusive
						courseMetadataIds: Object.keys(this.sendIds),
					},
				});
				this.$router.push({
					path: `/administration/datasources/${this.datasource._id}/run/${run._id}`,
				});
			} catch (error) {
				console.error(error, error.response);
				this.$toast.error(
					this.$t("pages.administration.datasources.index.trigger.error")
				);
			}
		},
		gotoOverview() {
			this.$router.push({
				path: `/administration/datasources/`,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
