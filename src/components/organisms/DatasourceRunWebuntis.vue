<template>
	<div>
		<template v-if="run.dryrun === true">
			<data-table
				:columns="columns"
				:data="tableData"
				track-by="_id"
				:paginated="true"
				:rows-selectable="true"
				:selection.sync="selections"
				:sort-by.sync="sortBy"
				:sort-order.sync="sortOrder"
			>
				<template v-slot:datacolumn-state="{ data }">
					<base-icon
						v-if="data === 'new'"
						source="custom"
						icon="neu"
						color="var(--color-primary)"
					/>
					<template v-else-if="data === 'imported'">
						<div class="cell">
							<base-icon
								source="custom"
								icon="datasource-check"
								color="var(--color-success)"
								class="icon-status"
							/>
							{{ $t("components.organisms.DatasourceRunWebuntis.imported") }}
						</div>
					</template>
					<template v-else-if="data === 'discarded'">
						<div class="cell">
							<base-icon
								source="custom"
								icon="datasource-remove"
								color="var(--color-danger)"
								class="icon-status"
							/>
							{{ $t("components.organisms.DatasourceRunWebuntis.discarded") }}
						</div>
					</template>
					<template v-else>
						{{ $t("components.organisms.DatasourceRunWebuntis.unknown") }}
					</template>
				</template>
			</data-table>
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
import DataTable from "@components/organisms/DataTable/DataTable";

import { mapGetters } from "vuex";
export default {
	components: {
		ModalBodyInfo,
		ModalFooterConfirm,
		FormActions,
		DataTable,
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
	data() {
		return {
			sortBy: "state",
			sortOrder: "desc",
			columns: [
				{
					field: "class",
					label: "Name",
					sortable: true,
				},
				{
					field: "teacher",
					label: "Lehrer",
					sortable: true,
				},
				{
					field: "room",
					label: "Raum",
					sortable: true,
				},
				{
					field: "state",
					label: "Status",
					sortable: true,
				},
			],
			selections: [],
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
	},
	created(ctx) {
		this.findAll();
	},
	methods: {
		async findAll() {
			let data;
			try {
				({ data } = await this.$store.dispatch("webuntis-metadata/findAll", {
					query: {
						datasourceId: this.datasourceId,
					},
				}));
			} catch (error) {
				console.error(error);
				this.$toast.error(this.$t("error.load"));
			}
			const allItemsNew = data.every((d) => d.state === "new");
			this.selections = (allItemsNew
				? data // preselect all rows if all are new
				: data.filter((d) => d.state === "imported")
			).map((d) => d._id);
		},
		async triggerRun() {
			try {
				const run = await this.$store.dispatch("datasourceRuns/create", {
					datasourceId: this.datasource._id,
					dryrun: false,
					data: {
						datatype: "inclusive", // inclusive/exclusive
						courseMetadataIds: this.selections,
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

.cell {
	display: flex;
	align-items: center;
}
.icon-status {
	font-size: var(--text-md);
}
</style>
