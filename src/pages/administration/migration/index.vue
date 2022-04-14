<template>
	<default-wireframe
		v-if="isAllowed"
		:headline="$t('pages.administration.migration.title')"
		:full-width="true"
		:breadcrumbs="breadcrumbs"
	>
		<v-snackbar
			v-if="businessError && businessError.statusCode !== '200'"
			v-model="businessError"
			:timeout="errorTimeout"
			top
			centered
			color="error darken-3"
		>
			{{ $t("pages.administration.migration.error") }}
			<template v-slot:action="{ attrs }">
				<v-btn color="white" icon v-bind="attrs" @click="resetBusinessError">
					<v-icon>{{ mdiClose }}</v-icon>
				</v-btn>
			</template>
		</v-snackbar>

		<div slot="header">
			<h1 class="text-h3">{{ $t("pages.administration.migration.title") }}</h1>
			<v-stepper v-model="migrationStep" flat class="stepper">
				<v-stepper-header>
					<v-stepper-step
						:complete="isMigrationFinished && isMaintenanceFinished"
						:editable="isStepEditable(1)"
						:step="1"
						data-testid="migration_tutorial_head"
					>
						{{ $t("pages.administration.migration.step1") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step
						:complete="isMigrationFinished"
						:editable="isStepEditable(2)"
						:step="2"
						data-testid="migration_importUsers_head"
					>
						{{ $t("pages.administration.migration.step2") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step
						:editable="isStepEditable(3)"
						:complete="isMigrationFinished"
						:step="3"
						data-testid="migration_summary_head"
					>
						{{ $t("pages.administration.migration.step3") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step
						:complete="isMigrationFinished && isMaintenanceFinished"
						:editable="isStepEditable(4)"
						:step="4"
						data-testid="migration_finish_head"
					>
						{{ $t("pages.administration.migration.step4") }}
					</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step
						:step="5"
						:editable="isStepEditable(5)"
						:complete="migrationStep === 5"
						data-testid="migration_waitForSync_head"
					>
						{{ $t("pages.administration.migration.step5") }}
					</v-stepper-step>
				</v-stepper-header>
			</v-stepper>
		</div>

		<div>
			<v-stepper v-model="migrationStep" v-ripple="false" flat>
				<v-stepper-items>
					<v-stepper-content step="1" data-testid="migration_tutorial">
						<v-container>
							<v-card
								:ripple="false"
								elevation="2"
								class="pa-5 mb-10"
								color="grey lighten-5"
							>
								<v-progress-linear
									v-if="school.inUserMigration && totalImportUsers === 0"
									indeterminate
								></v-progress-linear>
								<v-card-text>
									<iframe
										class="full"
										src="https://docs.dbildungscloud.de/display/SCDOK/Migrationsprozess?frameable=true"
									></iframe>
									<v-alert
										v-if="!school.inUserMigration || totalImportUsers === 0"
										dense
										outlined
										type="info"
										>{{ $t("pages.administration.migration.tutorialWait") }}
									</v-alert>
								</v-card-text>
								<v-card-actions>
									<v-row align="center" justify="end">
										<v-btn
											v-if="isMigrationNotStarted"
											data-testid="start_user_migration"
											color="primary"
											@click="setSchoolInUserMigration"
										>
											{{
												$t("pages.administration.migration.startUserMigration")
											}}
										</v-btn>
										<v-btn
											v-else-if="canPerformMigration"
											data-testid="migration_tutorial_next"
											:disabled="totalImportUsers === 0"
											color="primary"
											@click="nextStep"
										>
											<v-progress-circular
												v-if="
													totalImportUsers === 0 &&
													school.inUserMigration === true
												"
												:size="20"
												indeterminate
											></v-progress-circular>
											{{
												totalImportUsers > 0 || school.inUserMigration === false
													? $t("pages.administration.migration.next")
													: $t("pages.administration.migration.waiting")
											}}
										</v-btn>
										<v-btn
											v-else-if="isMigrationFinished"
											id="migration_tutorial_skip"
											color="primary"
											@click="nextStep"
										>
											{{ $t("pages.administration.migration.next") }}
										</v-btn>
									</v-row>
								</v-card-actions>
							</v-card>
						</v-container>
					</v-stepper-content>

					<v-stepper-content step="2" data-testid="migration_importUsers">
						<import-users></import-users>
						<div class="text-right">
							<v-btn color="secondary" @click="migrationStep = 1"
								>{{ $t("pages.administration.migration.back") }}
							</v-btn>
							<v-btn
								id="migration_importUsers_next"
								color="primary"
								:disabled="!canPerformMigration"
								@click="migrationStep = 3"
								>{{ $t("pages.administration.migration.next") }}
							</v-btn>
						</div>
					</v-stepper-content>

					<v-stepper-content
						v-if="canPerformMigration && !isMigrationFinished"
						step="3"
						data-testid="migration_summary"
					>
						<v-container>
							<v-card
								:ripple="false"
								elevation="2"
								class="pa-5 mb-10"
								color="grey lighten-5"
							>
								<div v-if="!isLoading">
									<v-card-text>
										<div
											v-html="
												$t('pages.administration.migration.summary', {
													instance: this.$theme.short_name,
													source: $t(
														'pages.administration.migration.ldapSource'
													),
													importUsersCount: totalMatched,
													importUsersUnmatchedCount:
														totalImportUsers - totalMatched,
													usersUnmatchedCount: totalUnmatched,
												})
											"
										></div>
										<v-row>
											<v-checkbox
												v-model="isMigrationConfirm"
												:label="$t('pages.administration.migration.confirm')"
											></v-checkbox>
										</v-row>
									</v-card-text>
									<div class="text-right">
										<v-btn
											color="secondary"
											:disabled="isLoading"
											@click="migrationStep = 2"
											>{{ $t("pages.administration.migration.back") }}
										</v-btn>

										<v-btn
											color="primary"
											:disabled="!isMigrationConfirm || isLoading"
											data-testid="migration_performMigration"
											@click="performMigration"
										>
											<v-progress-circular
												v-if="isLoading"
												:size="20"
												indeterminate
											></v-progress-circular>
											{{ $t("pages.administration.migration.migrate") }}
										</v-btn>
									</div>
								</div>
								<div v-else>
									<v-progress-linear indeterminate></v-progress-linear>
									{{ $t("pages.administration.migration.performingMigration") }}
								</div>
							</v-card>
						</v-container>
					</v-stepper-content>

					<v-stepper-content data-testid="migration_finish" step="4">
						<div v-if="canFinishMaintenance">
							<v-container>
								<v-card
									:ripple="false"
									elevation="2"
									class="pa-5 mb-10"
									color="grey lighten-5"
								>
									<v-card-text>
										<v-row>
											<div
												v-html="
													$t('pages.administration.migration.endTransferPhase')
												"
											></div>
										</v-row>
										<v-row>
											<v-checkbox
												v-model="isMaintenanceConfirm"
												:label="
													$t(
														'pages.administration.migration.confirmMaintenance'
													)
												"
												data-testid="isMaintenanceConfirm"
											></v-checkbox>
										</v-row>
									</v-card-text>

									<div class="text-right">
										<v-btn
											:disabled="!isMaintenanceConfirm"
											class="primary"
											data-testid="migration_endMaintenance"
											@click="endMaintenance"
											>{{
												$t("pages.administration.migration.finishTransferPhase")
											}}
										</v-btn>
									</div>
								</v-card>
							</v-container>
						</div>
					</v-stepper-content>

					<v-stepper-content step="5" data-testid="migration_waitForSync">
						<v-container>
							<v-card
								:ripple="false"
								elevation="2"
								class="pa-5 mb-10"
								color="grey lighten-5"
								v-html="$t('pages.administration.migration.waitForSync')"
							></v-card>
						</v-container>
					</v-stepper-content>
				</v-stepper-items>
			</v-stepper>
		</div>
	</default-wireframe>
</template>
<script>
import { mdiClose, mdiLoading } from "@mdi/js";

import SchoolsModule from "@/store/schools";
import ImportUserModule from "@store/import-users";

import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import EnvConfigModule from "@/store/env-config";
import ImportUsers from "@components/organisms/administration/ImportUsers";
export default {
	components: { DefaultWireframe, ImportUsers },
	layout: "defaultVuetify",
	data() {
		return {
			mdiClose,
			mdiLoading,
			migrationStep: 1,
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					href: "/administration/",
				},
			],
			isMigrationConfirm: false,
			isMaintenanceConfirm: false,
			errorTimeout: 7500,
			isLoading: false,
			checkTotal: null,
		};
	},
	computed: {
		isAllowed() {
			return EnvConfigModule.getEnv.FEATURE_USER_MIGRATION_ENABLED === true;
		},
		isMigrationNotStarted() {
			return this.school.inUserMigration === undefined;
		},
		canPerformMigration() {
			return this.school.inUserMigration === true && this.school.inMaintenance;
		},
		isMigrationFinished() {
			return this.school.inUserMigration === false;
		},
		canFinishMaintenance() {
			return this.isMigrationConfirm || this.isMigrationFinished;
		},
		isMaintenanceFinished() {
			return !this.school.inMaintenance;
		},
		school() {
			return SchoolsModule.getSchool;
		},
		businessError() {
			const error = ImportUserModule.getBusinessError;
			if (error && error.message && error.statusCode) {
				return {
					message: error.message,
					statusCode: error.statusCode,
				};
			}
			return false;
		},
		totalMatched() {
			return ImportUserModule.getTotalMatched;
		},
		totalUnmatched() {
			return ImportUserModule.getTotalUnmatched;
		},
		totalImportUsers() {
			return ImportUserModule.getTotal;
		},
	},
	watch: {
		async migrationStep(val) {
			if (val === 1 || val === 3) {
				await this.summary();
			}
			this.scrollToTop();
		},
		totalImportUsers(val) {
			if (val > 0) {
				clearInterval(this.checkTotal);
			}
		},
	},
	created() {
		if (!this.isAllowed) {
			this.$router.push("/");
		}
		this.summary();
		this.checkTotalInterval();
	},
	methods: {
		isStepEditable(step) {
			switch (step) {
				case 1:
					return !this.isLoading && !this.isMaintenanceFinished;
				case 2:
					return (
						this.canPerformMigration &&
						!this.isMigrationFinished &&
						this.totalImportUsers > 0
					);
				case 3:
					return (
						this.canPerformMigration &&
						!this.isMigrationFinished &&
						this.totalImportUsers > 0
					);
				case 4:
					return (
						!this.isLoading &&
						this.isMigrationFinished &&
						!this.isMaintenanceFinished
					);
				case 5:
					return (
						!this.isLoading &&
						this.isMigrationFinished &&
						this.isMaintenanceFinished
					);
				default:
					return false;
			}
		},
		async summary() {
			if (this.school.id === "") {
				await SchoolsModule.fetchSchool();
			}
			if (!this.canPerformMigration) {
				return;
			}
			await ImportUserModule.fetchTotal();
			await ImportUserModule.fetchTotalMatched();
			await ImportUserModule.fetchTotalUnmatched();
		},
		checkTotalInterval() {
			if (this.school.inUserMigration && this.totalImportUsers === 0) {
				this.checkTotal = setInterval(() => {
					ImportUserModule.fetchTotal();
				}, 5000);
			}
			if (this.totalImportUsers > 0) {
				clearInterval(this.checkTotal);
			}
		},
		async setSchoolInUserMigration() {
			if (this.school.inUserMigration) {
				return;
			}
			this.isLoading = true;
			await SchoolsModule.setSchoolInUserMigration();
			this.checkTotalInterval();
			if (SchoolsModule.getError) {
				// TODO better error handling
				ImportUserModule.setBusinessError({
					statusCode: "500",
					message: SchoolsModule.getError.message,
				});
			} else {
				this.school.inUserMigration = true;
				this.school.inMaintenance = true;
			}
			this.isLoading = false;
		},
		async performMigration() {
			this.isLoading = true;
			await ImportUserModule.performMigration();
			if (!ImportUserModule.getBusinessError) {
				SchoolsModule.setSchool({
					...SchoolsModule.getSchool,
					inUserMigration: false,
				});
				this.school.inUserMigration = false;
				this.isLoading = false;
				this.migrationStep = 4;
			}
		},
		async endMaintenance() {
			if (!this.isMaintenanceConfirm) {
				return;
			}
			this.isLoading = true;
			await SchoolsModule.migrationStartSync();
			if (SchoolsModule.getError) {
				// TODO better error handling
				ImportUserModule.setBusinessError({
					statusCode: "500",
					message: SchoolsModule.getError.message,
				});
			} else {
				this.school.inMaintenance = false;
				this.migrationStep = 5;
			}
			this.isLoading = false;
		},
		resetBusinessError() {
			ImportUserModule.setBusinessError(null);
		},
		scrollToTop() {
			window.scrollTo(0, 0);
		},
		nextStep() {
			let nextStep;
			if (this.migrationStep === 1) {
				nextStep = 2;
				if (this.isMigrationFinished) {
					nextStep = 4;
				}
				if (this.isMaintenanceFinished) {
					nextStep = 5;
				}
			}
			this.migrationStep = nextStep;
		},
	},
	head() {
		return {
			title: this.$t("pages.administration.migration.title"),
		};
	},
};
</script>
<style scoped>
.v-stepper__content {
	padding: 0;
}

.v-card__text {
	font-size: var(--text-md);
}

iframe.full {
	width: 100%;
	min-height: 800px;
	overflow: scroll;
	border: none;
}
</style>
