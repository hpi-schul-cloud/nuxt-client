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
					$t("common.words.privacyPolicy")
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
				data-testid="step_progress"
			/>
		</div>

		<section v-if="currentStep === 0">
			<h4>{{ $t("pages.administration.students.consent.steps.complete") }}</h4>
			{{ $t("pages.administration.students.consent.steps.complete.info") }}

			<backend-data-table
				:columns="tableColumns"
				:data="tableData"
				track-by="_id"
				:sort-by.sync="sortBy"
				:sort-order.sync="sortOrder"
				data-testid="consent_table_1"
				@update:sort="onUpdateSort"
			>
				<template v-slot:datacolumn-birthday="slotProps">
					<base-input
						:error="birthdayWarning && !slotProps.data ? inputError : null"
						class="date base-input"
						:vmodel="inputDateFromDeUTC(slotProps.data)"
						type="date"
						label=""
						data-testid="birthday-input"
						:birth-date="true"
						@input="
							inputDate({
								id: tableData[slotProps.rowindex]._id,
								birthDate: inputDateFormat($event),
							})
						"
					/>
				</template>
				<template v-slot:datacolumn-password="slotProps">
					<base-input
						:vmodel="slotProps.data"
						type="text"
						label=""
						data-testid="password-input"
						class="base-input"
						@input="
							inputPass({
								id: tableData[slotProps.rowindex]._id,
								pass: $event,
							})
						"
					/>
				</template>
			</backend-data-table>

			<p v-if="birthdayWarning" class="warning" data-testid="error-text">
				<base-icon source="material" icon="report_problem" />
				{{ $t("pages.administration.students.consent.steps.complete.warn") }}
			</p>

			<base-button design="secondary" data-testid="button-next" @click="next">{{
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
				:data="tableData"
				track-by="id"
				:paginated="false"
				:sort-by.sync="sortBy"
				:sort-order.sync="sortOrder"
				data-testid="consent_table_2"
				@update:sort="onUpdateSort"
			>
				<template v-slot:datacolumn-birthday="slotProps">
					<div class="text-content">
						{{ printDateFromDeUTC(slotProps.data) }}
					</div>
				</template>
			</backend-data-table>

			<div id="consent-checkbox">
				<base-input
					v-model="check"
					type="checkbox"
					name="switch"
					label=""
					data-testid="check-confirm"
				>
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

			<p v-if="checkWarning" class="warning" data-testid="confirm-error">
				<base-icon source="material" icon="report_problem" />
				{{
					$t(
						"pages.administration.students.consent.steps.register.confirm.warn"
					)
				}}
			</p>

			<base-button
				design="secondary"
				data-testid="button-next-2"
				@click="register"
				>{{
					$t("pages.administration.students.consent.steps.register.next")
				}}</base-button
			>
			<base-button design="text" @click="cancelWarning = true">{{
				$t("common.actions.cancel")
			}}</base-button>
		</section>

		<section v-if="currentStep === 2">
			<h4>{{ $t("pages.administration.students.consent.steps.download") }}</h4>
			{{ $t("pages.administration.students.consent.steps.download.info") }}
			<backend-data-table
				:columns="tableColumns"
				:data="tableData"
				track-by="_id"
				:paginated="false"
				:sort-by.sync="sortBy"
				:sort-order.sync="sortOrder"
				data-testid="consent_table_3"
				@update:sort="onUpdateSort"
			>
				<template v-slot:datacolumn-birthday="slotProps">
					{{ printDateFromDeUTC(slotProps.data) }}
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
							class="warning"
							source="material"
							icon="report_problem"
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
					:data="tableData"
					track-by="_id"
					:paginated="false"
				/>
			</div>
		</div>
	</section>
</template>

<script>
import StepProgress from "@components/organisms/StepProgress";
import BackendDataTable from "@components/organisms/DataTable/BackendDataTable";
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import SafelyConnectedImage from "@assets/img/safely_connected.png";
import {
	inputDateFromDeUTC,
	inputDateFormat,
	printDateFromDeUTC,
} from "@plugins/datetime";

export default {
	components: {
		BackendDataTable,
		StepProgress,
		ModalBodyInfo,
	},
	meta: {
		requiredPermissions: ["STUDENT_EDIT", "STUDENT_LIST"],
	},
	layout: "loggedInFull",
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
				analogConsent:
					this.$store.getters["filePaths/getSpecificFiles"].analogConsent,
				termsOfUse:
					this.$store.getters["filePaths/getSpecificFiles"].termsOfUseSchool,
				dataProtection:
					this.$store.getters["filePaths/getSpecificFiles"].privacyExemplary,
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
			tableData: [],
		};
	},
	async created() {
		await this.find();
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
				$sort: {
					[this.sortBy]: this.sortOrder === "asc" ? 1 : -1,
				},
			};
			await this.$store.dispatch("bulkConsent/findConsentUsers", query);

			this.tableData =
				this.$store.getters["bulkConsent/getSelectedStudentsData"];
		},
		onUpdateSort(sortBy, sortOrder) {
			this.sortBy = sortBy === "fullName" ? "firstName" : sortBy;
			this.sortOrder = sortOrder;
			this.find();
		},
		inputDate(student) {
			this.$store.dispatch("bulkConsent/updateStudent", student);
		},
		inputPass(student) {
			this.$store.dispatch("bulkConsent/updateStudent", student);
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
			return !this.tableData.some(
				(element) =>
					element.birthday === "" ||
					element.birthday === null ||
					!element.birthday
			);
		},
		register() {
			if (this.check === false) {
				this.checkWarning = true;
			} else {
				const users = this.tableData.map((student) => {
					return {
						_id: student._id,
						birthday: inputDateFromDeUTC(student.birthday),
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
			const prtHtml = document.getElementById(
				"tableStudentsForPrint"
			).innerHTML;
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
				if (this.tableData.length === 0) {
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
		inputDateFromDeUTC,
		inputDateFormat,
		printDateFromDeUTC,
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
	head() {
		return {
			title: `${this.$t("pages.administration.students.consent.title")} - ${
				this.$theme.short_name
			}`,
		};
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
.warning {
	color: var(--color-danger);
}
::v-deep .link {
	color: var(--color-secondary);
	text-decoration: none;
}
::v-deep .table {
	margin-top: var(--space-lg);
	.table__row {
		height: 3rem;
	}
}
::v-deep .toolbelt {
	display: none;
}

::v-deep .calendar-input {
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

::v-deep .base-input {
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
