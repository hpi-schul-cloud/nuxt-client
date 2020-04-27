<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ $t("pages.administration.students.consent.title") }}
		</h1>
		{{ $t("pages.administration.students.consent.info") }}
		<div>
			<step-progress :steps="progressSteps" :current-step="currentStep" />
		</div>

		<section v-if="currentStep === 0">
			<h4>{{ $t("pages.administration.students.consent.steps.complete") }}</h4>
			{{ $t("pages.administration.students.consent.steps.complete.info") }}
			<backend-data-table
				:columns="tableColumns"
				:data="tableData"
				track-by="id"
				:paginated="false"
			>
				<template v-slot:datacolumn-birthday="{ data }">
					{{ dayjs(data).format("DD.MM.YYYY") }}
				</template>
			</backend-data-table>

			<base-button design="text" @click="cancelWarning = true">{{
				$t("common.actions.cancel")
			}}</base-button>
			<base-button design="secondary" @click="next">{{
				$t("pages.administration.students.consent.steps.complete.next")
			}}</base-button>
		</section>

		<section v-if="currentStep === 1">
			<h4>{{ $t("pages.administration.students.consent.steps.complete") }}</h4>
			{{ $t("pages.administration.students.consent.steps.complete.info") }}
			<backend-data-table
				:columns="tableColumns"
				:data="tableData"
				track-by="id"
				:paginated="false"
			>
				<template v-slot:datacolumn-birthday="{ data }">
					{{ dayjs(data).format("DD.MM.YYYY") }}
				</template>
			</backend-data-table>
			<base-input
				v-model="check"
				type="checkbox"
				name="switch"
				:label="
					$t('pages.administration.students.consent.steps.register.confirm')
				"
			/>

			<base-button design="text" @click="cancelWarning = true">{{
				$t("common.actions.cancel")
			}}</base-button>
			<base-button :disabled="!check" design="secondary" @click="next">{{
				$t("pages.administration.students.consent.steps.complete.next")
			}}</base-button>
		</section>

		<section v-if="currentStep === 2">
			<h4>{{ $t("pages.administration.students.consent.steps.download") }}</h4>
			{{ $t("pages.administration.students.consent.steps.download.info") }}
			<backend-data-table
				:columns="tableColumns"
				:data="tableData"
				track-by="id"
				:paginated="false"
			>
				<template v-slot:datacolumn-birthday="{ data }">
					{{ dayjs(data).format("DD.MM.YYYY") }}
				</template>
			</backend-data-table>
			<p>
				{{
					$t("pages.administration.students.consent.steps.download.explanation")
				}}
			</p>

			<base-button design="secondary" @click="download">{{
				$t("pages.administration.students.consent.steps.download.next")
			}}</base-button>
		</section>

		<base-modal :active.sync="cancelWarning">
			<template v-slot:header></template>
			<template v-slot:body>
				<modal-body-info
					:title="
						$t('pages.administration.students.consent.cancel.modal.title')
					"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="report_problem"
							style="color: var(--color-danger);"
						/>
					</template>
				</modal-body-info>
				{{ $t("pages.administration.students.consent.cancel.modal.info") }}
			</template>
			<template v-slot:footerRight>
				<base-button design="danger text" @click="cancel">
					{{ $t("pages.administration.students.consent.cancel.modal.confirm") }}
				</base-button>
				<base-button design="danger" @click="cancelWarning = false">
					{{
						$t("pages.administration.students.consent.cancel.modal.continue")
					}}
				</base-button>
			</template>
		</base-modal>
	</section>
</template>

<script>
import dayjs from "dayjs";
import generatePassword from "@mixins/generatePassword";
import { mapGetters } from "vuex";
import StepProgress from "@components/organisms/StepProgress";
import BackendDataTable from "@components/organisms/DataTable/BackendDataTable";
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
dayjs.locale("de");

export default {
	components: {
		BackendDataTable,
		StepProgress,
		ModalBodyInfo,
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
			check: false,
			cancelWarning: false,
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
					field: "birthday",
					label: this.$t("common.labels.birthdate"),
					sortable: true,
				},
				{
					field: "password",
					label: this.$t("common.labels.password"),
					sortable: false,
				},
			],
		};
	},
	computed: {
		...mapGetters("users", {
			students: "list",
		}),
		...mapGetters("bulk-consent", {
			selectedStudentIds: "selectedStudents",
		}),
		tableData: function () {
			const data = [];
			for (const key of this.students.keys()) {
				if (this.selectedStudentIds.includes(this.students[key]._id)) {
					const student = this.students[key];
					student.password = generatePassword();
					data.push(student);
				}
			}
			return data;
		},
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			const query = {
				_id: {
					$in: this.selectedStudentIds,
				},
			};

			this.$store.dispatch("users/findStudents", {
				query,
			});
		},
		next() {
			this.currentStep += 1;
		},
		download() {},
		cancel() {
			this.$store.commit("bulk-consent/setSelectedStudents", {
				students: [],
			});
			this.$router.push({
				path: `/administration/students`,
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
