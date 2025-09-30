<template>
	<default-wireframe ref="main" max-width="short" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1>
				{{ title }}
			</h1>
			<i18n-t
				v-if="isConsentNecessary"
				keypath="pages.administration.students.consent.info"
				scope="global"
				tag="p"
			>
				<template #dataProtection>
					<a class="link" :href="fileLinks.dataProtection" target="_blank">{{
						$t("common.words.privacyPolicy")
					}}</a>
				</template>
				<template #terms>
					<a class="link" :href="fileLinks.termsOfUse" target="_blank">{{
						$t("components.legacy.footer.terms")
					}}</a>
				</template>
				<template #handout>
					<a class="link" :href="fileLinks.analogConsent" target="_blank">{{
						$t("pages.administration.students.consent.handout")
					}}</a>
				</template>
			</i18n-t>
		</template>
		<section class="section">
			<div class="mt-6">
				<step-progress
					id="progressbar"
					:steps="progressSteps"
					:current-step="currentStep"
					data-testid="step_progress"
				/>
			</div>

			<section v-if="currentStep === 0">
				<h2>
					{{ $t("pages.administration.students.consent.steps.complete") }}
				</h2>
				{{ $t("pages.administration.students.consent.steps.complete.info") }}

				<backend-data-table
					v-model:sort-by="sortBy"
					v-model:sort-order="sortOrder"
					:columns="tableColumns"
					:data="tableData"
					track-by="_id"
					data-testid="consent_table_1"
					@update:sort="onUpdateSort"
				>
					<template #datacolumn-birthday="slotProps">
						<base-input
							:error="birthdayWarning && !slotProps.data ? inputError : null"
							class="date base-input"
							:model-value="inputDateFromDeUTC(slotProps.data)"
							type="date"
							label=""
							data-testid="birthday-input"
							:birth-date="true"
							@update:model-value="
								inputDate({
									id: tableData[slotProps.rowindex]._id,
									birthDate: inputDateFormat($event),
								})
							"
						/>
					</template>
					<template #datacolumn-password="slotProps">
						<base-input
							:model-value="slotProps.data"
							type="text"
							label=""
							data-testid="password-input"
							class="base-input"
							@update:model-value="
								inputPass({
									id: tableData[slotProps.rowindex]._id,
									pass: $event,
								})
							"
						/>
					</template>
				</backend-data-table>

				<p v-if="birthdayWarning" class="text-error" data-testid="error-text">
					<v-icon color="error">{{ mdiAlert }} </v-icon>
					{{ $t("pages.administration.students.consent.steps.complete.warn") }}
				</p>

				<div class="d-flex justify-end">
					<v-btn variant="text" @click="cancelWarning = true">
						{{ $t("common.actions.cancel") }}
					</v-btn>
					<v-btn
						color="primary"
						variant="flat"
						data-testid="button-next"
						@click="next"
					>
						{{
							$t("pages.administration.students.consent.steps.complete.next")
						}}
					</v-btn>
				</div>
			</section>

			<section v-if="currentStep === 1">
				<h2>
					{{ $t("pages.administration.students.consent.steps.register") }}
				</h2>
				<p v-if="isConsentNecessary">
					{{ $t("pages.administration.students.consent.steps.register.info") }}
				</p>
				<backend-data-table
					v-model:sort-by="sortBy"
					v-model:sort-order="sortOrder"
					:columns="tableColumns"
					:data="tableData"
					track-by="id"
					:paginated="false"
					data-testid="consent_table_2"
					@update:sort="onUpdateSort"
				>
					<template #datacolumn-birthday="slotProps">
						<div class="text-content">
							{{ printDateFromDeUTC(slotProps.data) }}
						</div>
					</template>
				</backend-data-table>

				<div v-if="isConsentNecessary" id="consent-checkbox">
					<base-input
						v-model="check"
						type="checkbox"
						name="switch"
						label=""
						data-testid="check-confirm"
					/>
					<label @click="check = !check">
						<i18n-t
							keypath="pages.administration.students.consent.steps.register.confirm"
							scope="global"
						>
							<template #analogConsent>
								<a class="link" :href="fileLinks.analogConsent" target="_">{{
									$t(
										"pages.administration.students.consent.steps.register.analog-consent"
									)
								}}</a>
							</template>
						</i18n-t>
					</label>
				</div>

				<p v-if="checkWarning" class="text-error" data-testid="confirm-error">
					<v-icon color="error">{{ mdiAlert }} </v-icon>
					{{
						$t(
							"pages.administration.students.consent.steps.register.confirm.warn"
						)
					}}
				</p>

				<div class="d-flex justify-end">
					<v-btn variant="text" @click="cancelWarning = true">
						{{ $t("common.actions.cancel") }}
					</v-btn>
					<v-btn
						color="primary"
						variant="flat"
						data-testid="button-next-2"
						@click="register"
					>
						{{
							$t("pages.administration.students.consent.steps.register.next")
						}}
					</v-btn>
				</div>
			</section>

			<section v-if="currentStep === 2">
				<h2>
					{{ $t("pages.administration.students.consent.steps.download") }}
				</h2>
				{{ $t("pages.administration.students.consent.steps.download.info") }}
				<backend-data-table
					v-model:sort-by="sortBy"
					v-model:sort-order="sortOrder"
					:columns="tableColumns"
					:data="tableData"
					track-by="_id"
					:paginated="false"
					data-testid="consent_table_3"
					@update:sort="onUpdateSort"
				>
					<template #datacolumn-birthday="slotProps">
						{{ printDateFromDeUTC(slotProps.data) }}
					</template>
				</backend-data-table>
				<p>
					{{ passwordHint }}
				</p>

				<div class="d-flex justify-end">
					<v-btn variant="text" @click="cancelWarning = true">
						{{ $t("common.actions.cancel") }}
					</v-btn>
					<v-btn color="primary" variant="flat" @click="download">
						{{
							$t("pages.administration.students.consent.steps.download.next")
						}}
					</v-btn>
				</div>
			</section>

			<section v-if="currentStep === 3">
				<h2 class="centered">
					{{ successMessage }}
				</h2>
				<img
					class="success-image mb-4"
					:src="image"
					:alt="
						$t('pages.administration.students.consent.steps.success.image.alt')
					"
				/>

				<div class="d-flex justify-end">
					<v-btn color="primary" variant="outlined" @click="success">{{
						$t("pages.administration.students.consent.steps.success.back")
					}}</v-btn>
				</div>
			</section>

			<base-modal v-model:active="cancelWarning">
				<template #header />
				<template #body>
					<modal-body-info
						:title="
							$t('pages.administration.students.consent.cancel.modal.title')
						"
					>
						<template #icon>
							<v-icon color="error" size="60">{{ mdiAlert }}</v-icon>
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
				<template #footerRight>
					<v-btn variant="text" @click="cancel">
						{{
							$t("pages.administration.students.consent.cancel.modal.confirm")
						}}
					</v-btn>
					<v-btn
						v-if="currentStep === 2"
						color="error"
						variant="flat"
						@click="download"
					>
						{{
							$t(
								"pages.administration.students.consent.cancel.modal.download.continue"
							)
						}}
					</v-btn>
					<v-btn
						v-else
						color="primary"
						variant="flat"
						@click="cancelWarning = false"
					>
						{{
							$t("pages.administration.students.consent.cancel.modal.continue")
						}}
					</v-btn>
				</template>
			</base-modal>

			<div hidden>
				<div id="tableStudentsForPrint">
					<h3 class="text-h1">
						{{ $t("pages.administration.students.consent.print.title") }}
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
	</default-wireframe>
</template>

<script>
import { filePathsModule, notifierModule } from "@/store";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import StepProgress from "@/components/organisms/StepProgress";
import BackendDataTable from "@/components/organisms/DataTable/BackendDataTable";
import ModalBodyInfo from "@/components/molecules/ModalBodyInfo";
import SafelyConnectedImage from "@/assets/img/safely_connected.png";
import {
	inputDateFormat,
	inputDateFromDeUTC,
	printDateFromDeUTC,
} from "@/plugins/datetime";
import { mdiAlert } from "@icons/material";
import { buildPageTitle } from "@/utils/pageTitle";
import { useEnvConfig } from "@data-env";

export default {
	components: {
		DefaultWireframe,
		BackendDataTable,
		StepProgress,
		ModalBodyInfo,
	},
	data() {
		return {
			mdiAlert,
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
				analogConsent: filePathsModule.getSpecificFiles.analogConsent,
				termsOfUse: "/termsofuse",
				dataProtection: "/privacypolicy",
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
	computed: {
		breadcrumbs() {
			return [
				{
					title: this.$t("pages.administration.students.index.title"),
					to: "/administration/students",
				},
				{
					title: this.title,
					disabled: true,
				},
			];
		},
		isConsentNecessary() {
			return useEnvConfig().value.FEATURE_CONSENT_NECESSARY;
		},
		title() {
			return this.isConsentNecessary
				? this.$t("pages.administration.students.consent.title")
				: this.$t("pages.administration.students.manualRegistration.title");
		},
		passwordHint() {
			return this.isConsentNecessary
				? this.$t(
						"pages.administration.students.consent.steps.download.explanation"
					)
				: this.$t(
						"pages.administration.students.manualRegistration.steps.download.explanation"
					);
		},
		successMessage() {
			return this.isConsentNecessary
				? this.$t("pages.administration.students.consent.steps.success")
				: this.$t(
						"pages.administration.students.manualRegistration.steps.success"
					);
		},
	},
	async created() {
		await this.find();
		window.addEventListener("beforeunload", this.warningEventHandler);
	},
	beforeUnmount() {
		window.removeEventListener("beforeunload", this.warningEventHandler);
		clearTimeout(this.tableTimeOut);
		clearTimeout(this.printTimeOut);
	},
	mounted() {
		this.checkTableData();
		document.title = buildPageTitle(this.title);
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
			if (this.isConsentNecessary && this.check === false) {
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

				notifierModule.show({
					text: this.$t(
						"pages.administration.students.consent.steps.register.success"
					),
					status: "success",
					timeout: 5000,
				});
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

			const winPrint = window.open(
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
					notifierModule.show({
						text: this.$t("pages.administration.students.consent.table.empty"),
						status: "error",
						timeout: 5000,
					});

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
};
</script>

<style lang="scss" scoped>
.button {
	float: right;
	margin-left: 12px;
}

.centered {
	text-align: center;
}

#progressbar {
	display: inline-block;
	margin-top: 16px;
}

#consent-checkbox {
	display: flex;
	margin-bottom: 16px;
}

.warning {
	color: rgba(var(--v-theme-error));
}
.success-image {
	max-width: 100%;
	height: auto;
	display: block;
	margin: 0 auto;
}

:deep(.link) {
	text-decoration: none;
}

:deep(.table) {
	margin-top: 24px;

	.table__row {
		height: 3rem;
	}
}

:deep(.toolbelt) {
	display: none;
}

:deep(.calendar-input) {
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

:deep(.base-input) {
	max-width: 10em;
	margin-bottom: 16px;
	margin-left: 8px;

	.input-line {
		.icon-behind {
			display: none;
		}
	}
}
</style>
