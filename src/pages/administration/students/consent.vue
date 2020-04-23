<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ $t("pages.administration.students.consent.title") }}
		</h1>
		<div>
			<step-progress :steps="progressSteps" :current-step="currentStep" />
		</div>
		<h4>{{ $t("pages.administration.students.consent.steps.complete") }}</h4>
		{{ $t("pages.administration.students.consent.info") }}
		<backend-data-table
			:columns="tableColumns"
			:data="students"
			track-by="id"
			:paginated="false"
		>
			<template v-slot:datacolumn-birthday="{ data }">
				{{ dayjs(data).format("DD.MM.YYYY") }}
			</template>
		</backend-data-table>
	</section>
</template>

<script>
import dayjs from "dayjs";
import { mapGetters } from "vuex";
import StepProgress from "@components/organisms/StepProgress";
import BackendDataTable from "@components/organisms/DataTable/BackendDataTable";
dayjs.locale("de");

export default {
	components: {
		BackendDataTable,
		StepProgress,
	},
	meta: {
		requiredPermissions: ["STUDENT_CREATE"],
	},
	data() {
		return {
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					to: "/administration/",
					icon: { source: "fa", icon: "cog" },
				},
				{
					text: this.$t("pages.administration.students.index.title"),
					to: "/administration/students",
				},
				{
					text: this.$t("pages.administration.students.consent.title"),
				},
			],
			roleName: "student",
			progressSteps: [
				{
					name: this.$t("pages.administration.students.consent.steps.complete"),
				},
				{
					name: this.$t("pages.administration.students.consent.steps.register"),
				},
				{
					name: this.$t("pages.administration.students.consent.steps.download"),
				},
			],
			currentStep: 0,
			tableColumns: [
				{
					field: "fullName",
					label: this.$t("common.labels.name"),
					sortable: true,
				},
				{
					field: "email",
					label: this.$t("common.labels.email"),
					sortable: true,
				},
				{
					field: "password",
					label: this.$t("common.labels.password"),
					sortable: false,
				},
				{
					field: "birthday",
					label: this.$t("common.labels.birthdate"),
					sortable: true,
				},
			],
		};
	},
	computed: {
		...mapGetters("users", {
			students: "list",
		}),
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			const query = {
				_id: {
					$in: this.$store.getters["bulk-consent/selectedStudents"],
				},
			};

			this.$store.dispatch("users/findStudents", {
				query,
			});
		},
		error() {
			this.$toast.error(this.$t("pages.administration.students.consent.error"));
		},
		success() {
			this.$toast.success(
				this.$t("pages.administration.students.consent.success")
			);
			this.$router.push({
				path: `/administration/students`,
			});
		},
		dayjs,
	},
};
</script>
