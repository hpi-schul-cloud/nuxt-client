<!-- eslint-disable max-lines -->
<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ $t("pages.administration.students.consent.title") }}
		</h1>
		<i18n path="pages.administration.students.consent.info" tag="p">
			<template v-slot:dataProtection>
				<a class="link" :href="fileLinks.dataProtection" target="_blank">{{
					$t("components.legacy.footer.privacy_policy")
				}}</a>
			</template>
			<template v-slot:terms>
				<a class="link" :href="fileLinks.termsOfUse" target="_blank">{{
					$t("components.legacy.footer.terms")
				}}</a>
			</template>
			<template v-slot:handout>
				<a class="link" :href="fileLinks.analogConsent" target="_blank">{{
					$t("pages.administration.students.consent.handout")
				}}</a>
			</template>
		</i18n>
		<div class="mt--lg">
			<step-progress
				id="progressbar"
				:steps="progressSteps"
				:current-step="currentStep"
			/>
		</div>

		<section v-if="currentStep === 0">
			<h4>{{ $t("pages.administration.students.consent.steps.complete") }}</h4>
			{{ $t("pages.administration.students.consent.steps.complete.info") }}

			<backend-data-table
				:columns="tableColumns"
				:data="filteredTableData"
				track-by="_id"
				:sort-by.sync="sortBy"
				:sort-order.sync="sortOrder"
				@update:sort="onUpdateSort"
			>
				<template v-slot:datacolumn-birthday="slotProps">
					<base-input-default
						v-if="(birthdayWarning && !slotProps.data)"
						:error="inputError"
						class="date base-input-default"
						:vmodel="dayjs(slotProps.data, 'DD.MM.YYYY').format('YYYY-MM-DD')"
						type="date"
						label=""
						:birth-date="true"
						v-on="
							inputDateForDate({
								id: filteredTableData[slotProps.rowindex]._id,
								birthDate: slotProps.data,
							})
						"
					/>
					<base-input-default
						v-else-if="(!birthdayWarning || slotProps.data)"
						class="date base-input-default"
						:vmodel="dayjs(slotProps.data, 'DD.MM.YYYY').format('YYYY-MM-DD')"
						type="date"
						label=""
						:birth-date="true"
						v-on="
							inputDateForDate({
								id: filteredTableData[slotProps.rowindex]._id,
								birthDate: slotProps.data,
							})
						"
					/>
				</template>
				<template v-slot:datacolumn-password="slotProps">
					<base-input-default
						:vmodel="slotProps.data"
						type="text"
						label=""
						class="base-input-default"
						v-on="
							inputPass({
								id: filteredTableData[slotProps.rowindex]._id,
								password: slotProps.data,
							})
						"
					/>
				</template>
			</backend-data-table>

			<p v-if="birthdayWarning" style="color: var(--color-danger);">
				<base-icon source="material" icon="report_problem" />
				{{ $t("pages.administration.students.consent.steps.complete.warn") }}
			</p>

			<base-button design="secondary" @click="next">{{
				$t("pages.administration.students.consent.steps.complete.next")
			}}</base-button>
			<base-button design="text" @click="cancelWarning = true">{{
				$t("common.actions.cancel")
			}}</base-button>
		</section>

		<section v-if="currentStep === 1">
			<h4>{{ $t("pages.administration.students.consent.steps.register") }}</h4>
			{{ $t("pages.administration.students.consent.steps.register.info") }}
			<backend-data-table
				:columns="tableColumns"
				:data="filteredTableData"
				track-by="id"
				:paginated="false"
				:sort-by.sync="sortBy"
				:sort-order.sync="sortOrder"
				@update:sort="onUpdateSort"
			>
				<template v-slot:datacolumn-birthday="slotProps">
					<div class="text-content">
						{{ dayjs(slotProps.data, "DD.MM.YYYY").format("DD.MM.YYYY") }}
					</div>
				</template>
			</backend-data-table>

			<div id="consent-checkbox">
				<base-input v-model="check" type="checkbox" name="switch" label="">
				</base-input>
				<label @click="check = !check">
					<i18n
						path="pages.administration.students.consent.steps.register.confirm"
					>
						<template v-slot:analogConsent>
							<a class="link" :href="fileLinks.analogConsent" target="_">{{
								$t(
									"pages.administration.students.consent.steps.register.analog-consent"
								)
							}}</a>
						</template>
					</i18n>
				</label>
			</div>

			<p v-if="checkWarning" style="color: var(--color-danger);">
				<base-icon source="material" icon="report_problem" />
				{{
					$t(
						"pages.administration.students.consent.steps.register.confirm.warn"
					)
				}}
			</p>

			<base-button design="secondary" @click="register">{{
				$t("pages.administration.students.consent.steps.register.next")
			}}</base-button>
			<base-button design="text" @click="cancelWarning = true">{{
				$t("common.actions.cancel")
			}}</base-button>
		</section>

		<section v-if="currentStep === 2">
			<h4>{{ $t("pages.administration.students.consent.steps.download") }}</h4>
			{{ $t("pages.administration.students.consent.steps.download.info") }}
			<backend-data-table
				:columns="tableColumns"
				:data="filteredTableData"
				track-by="_id"
				:paginated="false"
				:sort-by.sync="sortBy"
				:sort-order.sync="sortOrder"
				@update:sort="onUpdateSort"
			>
				<template v-slot:datacolumn-birthday="slotProps">
					{{ dayjs(slotProps.data, "DD.MM.YYYY").format("DD.MM.YYYY") }}
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
			<base-button design="text" @click="cancelWarning = true">{{
				$t("common.actions.cancel")
			}}</base-button>
		</section>

		<section v-if="currentStep === 3">
			<base-content-container>
				<h4 class="centered">
					{{ $t("pages.administration.students.consent.steps.success") }}
				</h4>
				<img
					class="mb--md"
					:src="image"
					:alt="
						$t('pages.administration.students.consent.steps.success.image.alt')
					"
				/>

				<base-button design="secondary outline" @click="success">{{
					$t("pages.administration.students.consent.steps.success.back")
				}}</base-button>
			</base-content-container>
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
				<span v-if="currentStep === 2">
					{{
						$t(
							"pages.administration.students.consent.cancel.modal.download.info"
						)
					}}
				</span>
				<span v-else>
					{{ $t("pages.administration.students.consent.cancel.modal.info") }}
				</span>
			</template>
			<template v-slot:footerRight>
				<base-button design="danger text" @click="cancel">
					{{ $t("pages.administration.students.consent.cancel.modal.confirm") }}
				</base-button>
				<base-button v-if="currentStep === 2" design="danger" @click="download">
					{{
						$t(
							"pages.administration.students.consent.cancel.modal.download.continue"
						)
					}}
				</base-button>
				<base-button v-else design="danger" @click="cancelWarning = false">
					{{
						$t("pages.administration.students.consent.cancel.modal.continue")
					}}
				</base-button>
			</template>
		</base-modal>

		<div hidden>
			<div id="tableStudentsForPrint">
				<h3 class="print-title">
					{{ this.$t("pages.administration.students.consent.print.title") }}
				</h3>
				<p>
					{{ printPageInfo }}
				</p>

				<backend-data-table
					:columns="tableColumnsForPrint"
					:data="filteredTableData"
					track-by="_id"
					:paginated="false"
				/>
			</div>
		</div>
	</section>
</template>

<script>
// file deepcode ignore ArrayMethodOnNonArray
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import defaultDocuments from "@utils/documents.js";
import generatePassword from "@mixins/generatePassword";
import { mapGetters } from "vuex";
import StepProgress from "@components/organisms/StepProgress";
import BackendDataTable from "@components/organisms/DataTable/BackendDataTable";
import BaseInput from "@components/base/BaseInput/BaseInput";
import BaseInputDefault from "@components/base/BaseInput/BaseInputDefault";
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import SafelyConnectedImage from "@assets/img/safely_connected.png";
import "dayjs/locale/de";
dayjs.locale("de");

export default {
	components: {
		BackendDataTable,
		StepProgress,
		ModalBodyInfo,
		BaseInputDefault,
		BaseInput,
	},
	meta: {
		requiredPermissions: ["STUDENT_CREATE", "STUDENT_LIST"],
	},
	layout: "loggedInFull",
	props: {},
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
					sortable: false,
				},
				{
					field: "password",
					label: this.$t("common.labels.password"),
					sortable: false,
				},
			],
			tableColumnsForPrint: [
				{
					field: "fullName",
					label: this.$t("common.labels.name"),
					sortable: false,
				},
				{
					field: "email",
					label: this.$t("common.labels.email"),
					sortable: false,
				},
				{
					field: "password",
					label: this.$t("common.labels.password"),
					sortable: false,
				},
			],
			image: SafelyConnectedImage,
			fileLinks: {
				analogConsent: defaultDocuments.specificFiles().analogConsent,
				termsOfUse: defaultDocuments.specificFiles().termsOfUseSchool,
				dataProtection: defaultDocuments.specificFiles().privacyExemplary,
			},
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
			birthdayWarning: false,
			cancelWarning: false,
			inputError: this.$t(
				"pages.administration.students.consent.input.missing"
			),
			check: false,
			checkWarning: false,
			tableTimeOut: null,
			printTimeOut: null,
			printPageInfo: this.$t(
				"pages.administration.students.consent.steps.register.print",
				{ hostName: window.location.origin }
			),
			sortBy: "fullName",
			sortOrder: "asc",
		};
	},
	computed: {
		...mapGetters("bulkConsent", {
			selectedStudents: "selectedStudents",
			selectedStudentsData: "selectedStudentsData",
			registeredStudents: "registeredStudents",
			registerError: "registerError",
		}),
		...mapGetters("users", {
			students: "list",
		}),
		filteredTableData: {
			get() {
				const result = this.$store.state.bulkConsent.selectedStudentsData;
				if (result.length > 0) {
					return JSON.parse(
						JSON.stringify(
							this.$store.state.bulkConsent.selectedStudentsData.filter(
								(student) => student.consentStatus !== "ok"
							)
						)
					);
				}
				return [];
			},
			set() {},
		},
	},
	created(ctx) {
		this.find();
		window.addEventListener("beforeunload", this.warningEventHandler);
	},
	beforeDestroy() {
		window.removeEventListener("beforeunload", this.warningEventHandler);
		clearTimeout(this.tableTimeOut);
		clearTimeout(this.printTimeOut);
	},
	mounted() {
		this.checkTableData();
	},
	methods: {
		async find() {
			const query = {
				usersForConsent: this.selectedStudents,
				$sort: {
					[this.sortBy]: this.sortOrder === "asc" ? 1 : -1,
				},
				users: this.selectedStudents,
			};

			await this.$store.dispatch("users/handleUsers", {
				query,
				action: "find",
				userType: "students",
			});

			if (this.students.length) {
				const data = this.students.map((student) => {
					student.fullName = student.firstName + " " + student.lastName;
					student.password = generatePassword();
					return student;
				});
				this.filteredTableData = data;
				this.$store.dispatch("bulkConsent/setStudents", data);
			}
		},
		onUpdateSort(sortBy, sortOrder) {
			this.sortBy = sortBy === "fullName" ? "firstName" : sortBy;
			this.sortOrder = sortOrder;
			this.find();
		},
		inputDateForDate(student) {
			return {
				input: (dateData) => {
					if (dateData !== "") {
						const newDate = dayjs(dateData, "YYYY-MM-DD").format("DD.MM.YYYY");
						const index = this.filteredTableData.findIndex(
							(st) => st._id === student.id
						);
						this.filteredTableData[index].birthday = newDate;
						this.$store.dispatch(
							"bulkConsent/updateStudents",
							this.filteredTableData
						);
					}
				},
			};
		},
		inputPass: function (student) {
			return {
				input: (pass) => {
					if (pass !== "") {
						const index = this.filteredTableData.findIndex(
							(st) => st._id === student.id
						);
						this.filteredTableData[index].password = pass;
						this.$store.dispatch(
							"bulkConsent/updateStudents",
							this.filteredTableData
						);
					}
				},
			};
		},
		next() {
			if (this.currentStep === 0) {
				if (!this.checkBirthdays()) {
					this.birthdayWarning = true;
					return;
				}
			}
			this.currentStep += 1;
		},
		checkBirthdays() {
			const checkEmptyBirtday = this.selectedStudentsData.find(
				(element) =>
					element.birthday === "" ||
					element.birthday === null ||
					!element.birthday
			);
			if (checkEmptyBirtday) return false;

			return true;
		},
		register() {
			if (this.check === false) {
				this.checkWarning = true;
			} else {
				const users = this.filteredTableData.map((student) => {
					return {
						_id: student._id,
						birthday: dayjs(student.birthday, "DD.MM.YYYY").format(
							"YYYY-MM-DD"
						),
						password: student.password,
						consent: {
							userConsent: {
								form: "analog",
								privacyConsent: true,
								termsOfUseConsent: true,
							},
							parentConsents: [
								{
									form: "analog",
									privacyConsent: true,
									termsOfUseConsent: true,
								},
							],
						},
					};
				}, this);
				this.$store.dispatch("bulkConsent/register", users);
				this.$toast.success(
					this.$t(
						"pages.administration.students.consent.steps.register.success"
					)
				);
				this.next();
			}
		},
		download() {
			const prtHtml = document.getElementById("tableStudentsForPrint")
				.innerHTML;
			let stylesHtml = "";

			for (const node of [
				...document.querySelectorAll("link[rel='stylesheet'], style"),
			]) {
				stylesHtml += node.outerHTML;
			}

			var winPrint = window.open(
				"",
				"",
				"left=0,top=500,width=800,height=900,toolbar=0,scrollbars=0,status=0"
			);

			winPrint.document.write(`<!DOCTYPE html>
				<html>
				<head>
					${stylesHtml}
				</head>
				<body>
					${prtHtml}
				</body>
				</html>`);

			winPrint.document.close();
			winPrint.focus();
			this.printTimeOut = setTimeout(() => {
				winPrint.print();
				winPrint.close();
			}, 500);
			this.cancelWarning = false;
			this.next();
		},
		success() {
			this.$router.push({
				path: `/administration/students`,
			});
		},
		cancel() {
			this.$store.commit("bulkConsent/setSelectedStudents", {
				students: [],
			});
			this.$router.push({
				path: `/administration/students`,
			});
		},
		checkTableData() {
			this.tableTimeOut = setTimeout(() => {
				if (this.filteredTableData.length === 0) {
					this.$toast.error(
						this.$t("pages.administration.students.consent.table.empty"),
						{ position: "top-center" }
					);
					this.$router.push({
						path: `/administration/students`,
					});
				}
			}, 2000);
		},
		dayjs,
		warningEventHandler() {
			if (this.currentStep === 2) {
				// Cancel the event as stated by the standard.
				event.preventDefault();
				// Chrome requires returnValue to be set.
				event.returnValue = "";
				// then show customized warning modal
				this.cancelWarning = true;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.button {
	float: right;
	margin-left: var(--space-sm);
}
.centered {
	text-align: center;
}
#progressbar {
	display: inline-block;
	margin-top: var(--space-md);
}
#consent-checkbox {
	display: flex;
	margin-bottom: var(--space-md);
}
.print-title {
	color: var(--color-secondary);
	border: none;
}
/deep/ .link {
	color: var(--color-secondary);
	text-decoration: none;
}
/deep/ .table {
	margin-top: var(--space-lg);
	.row {
		height: 3rem;
	}
}
/deep/ .toolbelt {
	display: none;
}

/deep/ .calendar-input {
	max-width: 5em;
	margin-bottom: 0;
	.info-line {
		display: none;
	}
	.input-line {
		.icon-behind {
			display: none;
		}
	}
}

/deep/ .base-input-default {
	max-width: 10em;
	margin-bottom: var(--space-md);
	margin-left: var(--space-xs);
	.input-line {
		.icon-behind {
			display: none;
		}
	}
}
</style>
