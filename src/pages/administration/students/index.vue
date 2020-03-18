<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ $t("pages.administration.students.index.title") }}
		</h1>
		<backend-data-table
			:columns="tableColumns"
			:data="students"
			track-by="id"
			:total="pagination.total"
			:paginated="true"
			:current-page.sync="page"
			:rows-per-page.sync="limit"
			@update:current-page="onUpdateCurrentPage"
			@update:rows-per-page="onUpdateRowsPerPage"
		>
			<template v-slot:datacolumn-createdAt="{ data }">
				{{ dayjs(data).format("DD.MM.YYYY") }}
			</template>
			<template v-slot:datacolumn-consent="{ data }">
				<span v-if="data && data.consentStatus === 'ok'">
					<base-icon
						source="material"
						icon="check"
						color="var(--color-success)"
					/>
					<base-icon
						style="position: relative; left: -17.5px"
						source="material"
						icon="check"
						color="var(--color-success)"
					/>
				</span>
				<span v-else-if="data && data.consentStatus === 'parentsAgreed'">
					<base-icon
						source="material"
						icon="check"
						color="var(--color-warning)"
					/>
				</span>
				<span v-else-if="data && data.consentStatus === 'missing'">
					<base-icon
						source="material"
						icon="close"
						color="var(--color-danger)"
					/>
				</span>
				<span v-else />
			</template>
			<template v-slot:datacolumn-_id="{ data }">
				<base-button
					design="text icon"
					size="small"
					:to="`/administration/students/${data}/edit`"
				>
					<base-icon source="material" icon="edit" />
				</base-button>
			</template>
		</backend-data-table>
		<fab-floating
			position="bottom-right"
			:show-label="true"
			:actions="[
				{
					label: $t('pages.administration.students.fab.add'),
					icon: 'person_add',
					'icon-source': 'material',
					to: '/administration/students/new',
				},
				{
					label: $t('pages.administration.students.fab.import'),
					icon: 'arrow_downward',
					'icon-source': 'material',
					href: '/administration/students/import',
				},
			]"
		/>
	</section>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import BackendDataTable from "@components/organisms/DataTable/BackendDataTable";
import FabFloating from "@components/molecules/FabFloating";
import dayjs from "dayjs";
import "dayjs/locale/de";
dayjs.locale("de");

export default {
	layout: "loggedInFull",
	components: {
		BackendDataTable,
		FabFloating,
	},
	data() {
		return {
			page:
				parseInt(
					localStorage.getItem(
						"pages.administration.students.index.currentPage"
					)
				) || 1,
			limit:
				parseInt(
					localStorage.getItem(
						"pages.administration.students.index.itemsPerPage"
					)
				) || 10,
			tableColumns: [
				{
					field: "firstName",
					label: this.$t("common.labels.firstName"),
					sortable: true,
				},
				{
					field: "lastName",
					label: this.$t("common.labels.lastName"),
				},
				{
					field: "email",
					label: this.$t("common.labels.email"),
				},
				// {
				// 	field: "birthday",
				// 	label: this.$t("common.labels.birthday"),
				// },
				{
					field: "consent",
					label: this.$t("common.labels.consent"),
				},
				{
					field: "createdAt",
					label: this.$t("common.labels.createdAt"),
				},
				{
					field: "_id",
					label: "",
				},
			],
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					to: "/administration/",
					icon: { source: "fa", icon: "fas fa-cog" },
				},
				{
					text: this.$t("pages.administration.students.index.title"),
				},
			],
		};
	},
	computed: {
		...mapGetters("users", {
			students: "list",
		}),
		...mapState("users", {
			pagination: (state) =>
				state.pagination.default || { limit: 10, total: 0 },
		}),
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			const query = {
				$limit: this.limit,
				$skip: (this.page - 1) * this.limit,
			};

			this.$store.dispatch("users/findStudents", {
				query,
			});
		},
		onUpdateCurrentPage(page) {
			this.page = page;
			localStorage.setItem(
				"pages.administration.students.index.currentPage",
				page
			);
			this.find();
		},
		onUpdateRowsPerPage(limit) {
			this.page = 1;
			this.limit = limit;
			// save user settings in localStorage
			localStorage.setItem(
				"pages.administration.students.index.itemsPerPage",
				limit
			);
			this.find();
		},
		dayjs,
	},
};
</script>
