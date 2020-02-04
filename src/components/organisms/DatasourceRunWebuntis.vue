<template>
	<div>
		<template v-if="run.dryrun === true">
			<backend-data-table
				:columns="columns"
				:data="tableData"
				track-by="_id"
				:total="pagination.total"
				:current-page.sync="currentPage"
				:paginated="true"
				:rows-per-page.sync="rowsPerPage"
				:rows-selectable="true"
				:selection-type.sync="sendType"
				:selected-row-ids.sync="sendIds"
			>
				<template v-slot:datacolumn-state="{ data }">
					<template v-if="data === 'new'">
						<base-icon
							source="custom"
							icon="datasource"
							color="var(--color-primary)"
						/>
						Neu
					</template>
					<template v-else-if="data === 'imported'">
						<base-icon
							source="custom"
							icon="datasource-check"
							color="var(--color-success)"
						/>
						Importiert
					</template>
					<template v-else-if="data === 'discarded'">
						<base-icon
							source="custom"
							icon="datasource-error"
							color="var(--color-danger)"
						/>
						Verworfen
					</template>
					<template v-else>
						Status unbekannt
					</template>
				</template>
			</backend-data-table>
			<form-actions>
				<template v-slot:primary>
					<base-button design="primary" @click="triggerRun">
						{{ $t("components.organisms.DatasourceRunWebuntis.import") }}
					</base-button>
					<base-button design="text" to="/administration/datasources">
						{{ $t("common.actions.cancel") }}
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
			<!-- Should not be reached ever -->
			{{ $t("components.organisms.DatasourceRunWebuntis.loading") }}
		</template>
	</div>
</template>
<script>
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import ModalFooterConfirm from "@components/molecules/ModalFooterConfirm";
import FormActions from "@components/molecules/FormActions";
import BackendDataTable from "@components/organisms/DataTable/BackendDataTable";

import { mapGetters } from "vuex";
export default {
	components: {
		ModalBodyInfo,
		ModalFooterConfirm,
		FormActions,
		BackendDataTable,
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
		datasourceId: {
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
			sendIds: [],
			sendType: "inclusive", // or exclusive
		};
	},
	computed: {
		...mapGetters("webuntis-metadata", {
			webuntisMetadata: "list",
		}),
		tableDataObject() {
			return this.tableData.reduce((obj, row) => {
				obj[row._id] = row;
				return obj;
			}, {});
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
		currentPage: {
			get() {
				return this.pagination?.skip / this.pagination?.limit + 1;
			},
			set(to) {
				this.find({
					$limit: this.rowsPerPage,
					page: to,
				});
			},
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
	watch: {
		rowsPerPage(to) {
			this.find({
				$limit: to,
				page: 1,
			});
		},
	},
	created(ctx) {
		this.find({
			$limit: this.rowsPerPage,
			page: 1,
		});
	},
	methods: {
		find({ $limit, page }) {
			const $skip = $limit * (page - 1);
			try {
				this.$store.dispatch("webuntis-metadata/find", {
					query: {
						$skip,
						$limit,
						datasourceId: this.datasourceId,
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
						courseMetadataIds: this.sendIds,
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
