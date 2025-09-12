<template>
	<DefaultWireframe
		:headline="t('pages.administration.migration.title')"
		max-width="full"
		:breadcrumbs="breadcrumbs"
	>
		<VSnackbar
			v-if="businessError && businessError.statusCode !== '200'"
			:model-value="!!businessError"
			:timeout="errorTimeout"
			location="top center"
			color="error"
			data-testid="error-dialog"
		>
			{{ t("pages.administration.migration.error") }}
			<template #actions>
				<VBtn color="white" :icon="mdiClose" @click="resetBusinessError" />
			</template>
		</VSnackbar>

		<template #header>
			<h1 class="text-h3">
				{{
					t("pages.administration.migration.title", {
						source: sourceSystemName,
						instance: theme.name,
					})
				}}
			</h1>
			<VStepper v-model="migrationStep" flat class="stepper">
				<VStepperHeader>
					<VStepperItem
						:complete="isMigrationFinished && isMaintenanceFinished"
						:value="1"
						color="primary"
						data-testid="migration_tutorial_head"
					>
						{{ t("pages.administration.migration.step1") }}
					</VStepperItem>
					<VDivider />
					<VStepperItem
						:complete="isMigrationFinished"
						:value="2"
						color="primary"
						data-testid="migration_importUsers_head"
					>
						{{ t("pages.administration.migration.step2") }}
					</VStepperItem>
					<VDivider />
					<VStepperItem
						:complete="isMigrationFinished"
						:value="3"
						color="primary"
						data-testid="migration_summary_head"
					>
						{{ t("pages.administration.migration.step3") }}
					</VStepperItem>
					<VDivider />
					<VStepperItem
						:complete="isMigrationFinished && isMaintenanceFinished"
						:value="4"
						color="primary"
						data-testid="migration_finish_head"
					>
						{{ t("pages.administration.migration.step4") }}
					</VStepperItem>
					<VDivider />
					<VStepperItem
						:value="5"
						:complete="migrationStep === 5"
						color="primary"
						data-testid="migration_waitForSync_head"
					>
						{{ t("pages.administration.migration.step5") }}
					</VStepperItem>
				</VStepperHeader>

				<VCustomDialog
					ref="cancelMigrationDialog"
					v-model:is-open="isCancelDialogOpen"
					has-buttons
					:buttons="['cancel', 'confirm']"
					data-testid="cancel-migration-dialog"
					@dialog-confirmed="confirmCancelMigration()"
				>
					<template #title>
						{{
							t(
								"components.administration.adminMigrationSection.migrationWizardCancelDialog.Title"
							)
						}}
					</template>
					<template #content>
						{{
							t(
								"components.administration.adminMigrationSection.migrationWizardCancelDialog.Description"
							)
						}}
					</template>
				</VCustomDialog>

				<VCustomDialog
					ref="clearAutoMatchesDialog"
					v-model:is-open="isClearAutoMatchesDialogOpen"
					has-buttons
					:buttons="['cancel', 'confirm']"
					data-testid="clear-auto-matches-dialog"
					@dialog-confirmed="clearAllAutoMatches()"
				>
					<template #title>
						{{
							t(
								"components.administration.adminMigrationSection.clearAutoMatchesDialog.title"
							)
						}}
					</template>
					<template #content>
						<p>
							{{
								t(
									"components.administration.adminMigrationSection.clearAutoMatchesDialog.description.firstParagraph"
								)
							}}
						</p>
						<p>
							{{
								t(
									"components.administration.adminMigrationSection.clearAutoMatchesDialog.description.secondParagraph"
								)
							}}
							>
						</p>
					</template>
				</VCustomDialog>
			</VStepper>
		</template>

		<div>
			<VStepper v-model="migrationStep" flat>
				<VStepperWindow :model-value="migrationStep">
					<VStepperWindowItem :value="1" data-testid="migration_tutorial">
						<VContainer>
							<VCard
								:ripple="false"
								elevation="2"
								class="pa-5 mb-10"
								color="grey-lighten-5"
							>
								<VProgressLinear
									v-if="school.inUserMigration && isLoading"
									indeterminate
								/>
								<VCardText>
									<iframe class="full" :src="helpPageUri" />
									<v-alert
										v-if="(!school.inUserMigration || isLoading) && !isNbc"
										density="compact"
										variant="outlined"
										type="info"
										:text="t('pages.administration.migration.tutorialWait')"
									/>
								</VCardText>
								<VCardActions>
									<VRow align="center" justify="space-between">
										<div class="ml-14">
											<VSwitch
												v-show="isNbc && isMigrationNotStarted"
												v-model="matchByPreferredName"
												:label="
													t(
														'pages.administration.migration.matchByPreferredName'
													)
												"
												:disabled="isLoading"
												:true-value="true"
												:false-value="false"
												data-testid="migration-preferred-name-switch"
											/>
										</div>
										<div>
											<VBtn
												v-if="isMigrationNotStarted"
												data-testid="start_user_migration"
												variant="flat"
												color="primary"
												:disabled="isLoading"
												@click="setSchoolInUserMigration"
											>
												<VProgressCircular
													v-if="isLoading"
													:size="20"
													indeterminate
													class="mr-1"
												/>
												{{
													t("pages.administration.migration.startUserMigration")
												}}
											</VBtn>
											<VBtn
												v-else-if="canPerformMigration"
												data-testid="migration_tutorial_next"
												:disabled="isLoading"
												variant="flat"
												color="primary"
												@click="nextStep"
											>
												<VProgressCircular
													v-if="isLoading && school.inUserMigration"
													:size="20"
													indeterminate
													class="mr-1"
												/>
												{{
													!isLoading || school.inUserMigration === false
														? t("pages.administration.migration.next")
														: t("pages.administration.migration.waiting")
												}}
											</VBtn>
											<VBtn
												v-else-if="isMigrationFinished"
												id="migration_tutorial_skip"
												variant="flat"
												color="primary"
												@click="nextStep"
											>
												{{ t("pages.administration.migration.next") }}
											</VBtn>
										</div>
									</VRow>
								</VCardActions>
							</VCard>
						</VContainer>
					</VStepperWindowItem>

					<VStepperWindowItem :value="2" data-testid="migration_importUsers">
						<ImportUsers ref="importUsersRef" />
						<div class="d-flex justify-space-between pa-3">
							<div>
								<VBtn
									data-testid="import-users-cancel-migration-btn"
									@click="cancelMigration()"
								>
									{{ t("common.actions.cancel") }}
								</VBtn>
								<VBtn
									class="ml-2"
									data-testid="import-users-clear-auto-matches-btn"
									@click="showClearAutoMatchesDialog()"
								>
									{{ t("pages.administration.migration.clearAutoMatches") }}
								</VBtn>
							</div>

							<div>
								<VBtn @click="migrationStep = 1">
									{{ t("pages.administration.migration.back") }}
								</VBtn>

								<VBtn
									id="migration_importUsers_next"
									class="ml-2"
									color="primary"
									:disabled="!canPerformMigration"
									@click="migrationStep = 3"
								>
									{{ t("pages.administration.migration.next") }}
								</VBtn>
							</div>
						</div>
					</VStepperWindowItem>

					<VStepperWindowItem
						v-if="canPerformMigration && !isMigrationFinished"
						:value="3"
						data-testid="migration_summary"
					>
						<VContainer>
							<VCard
								:ripple="false"
								elevation="2"
								class="pa-5 mb-10"
								color="grey-lighten-5"
							>
								<div v-if="!isLoading">
									<VCardText>
										<div>
											<p
												v-for="(
													paragraph, index
												) in migrationSummaryParagraphItems"
												:key="index"
											>
												<span
													v-if="paragraph.boldText"
													class="font-weight-bold"
												>
													{{ paragraph.boldText }}
												</span>
												{{
													t(paragraph.text, {
														instance: theme.name,
														source: sourceSystemName,
													})
												}}
											</p>
										</div>
										<VRow>
											<VCheckbox
												v-model="isMigrationConfirm"
												:label="t('pages.administration.migration.confirm')"
											/>
										</VRow>
									</VCardText>
									<div class="d-flex justify-space-between">
										<div>
											<VBtn
												data-testid="summary-cancel-migration-btn"
												@click="cancelMigration()"
											>
												{{ t("common.actions.cancel") }}
											</VBtn>
										</div>
										<div>
											<VBtn :disabled="isLoading" @click="migrationStep = 2"
												>{{ t("pages.administration.migration.back") }}
											</VBtn>

											<VBtn
												class="ml-2"
												color="primary"
												:disabled="!isMigrationConfirm || isLoading"
												data-testid="migration_performMigration"
												@click="performMigration"
											>
												<VProgressCircular
													v-if="isLoading"
													:size="20"
													indeterminate
												/>
												{{
													isNbc
														? t("pages.administration.migration.nbc.migrate")
														: t("pages.administration.migration.migrate")
												}}
											</VBtn>
										</div>
									</div>
								</div>
								<div v-else>
									<VProgressLinear indeterminate />
									{{ t("pages.administration.migration.performingMigration") }}
								</div>
							</VCard>
						</VContainer>
					</VStepperWindowItem>

					<VStepperWindowItem :value="4" data-testid="migration_finish">
						<div v-if="canFinishMaintenance">
							<VContainer>
								<VCard
									:ripple="false"
									elevation="2"
									class="pa-5 mb-10"
									color="grey-lighten-5"
								>
									<VCardText>
										<VRow>
											<template v-if="isNbc">
												<p>
													{{
														t(
															"pages.administration.migration.step4.nbc.linkingFinished",
															{
																source: sourceSystemName,
																instance: theme.name,
																totalMatched: totalMatched,
															}
														)
													}}
												</p>
											</template>
											<template v-else>
												<p>
													{{
														t(
															"pages.administration.migration.step4.linkingFinished",
															{
																source: sourceSystemName,
																instance: theme.name,
															}
														)
													}}
												</p>
												<p>
													{{
														t(
															"pages.administration.migration.step4.transferphase"
														)
													}}
												</p>
												<ul class="mb-2">
													<li>
														{{
															t(
																"pages.administration.migration.step4.bullets.linkedUsers",
																{ source: sourceSystemName }
															)
														}}
													</li>
													<li>
														{{
															t(
																"pages.administration.migration.step4.bullets.newUsers",
																{ instance: theme.name }
															)
														}}
													</li>
													<li>
														{{
															t(
																"pages.administration.migration.step4.bullets.classes",
																{ source: sourceSystemName }
															)
														}}
													</li>
													<li>
														{{
															t(
																"pages.administration.migration.step4.bullets.oldUsers"
															)
														}}
													</li>
												</ul>
												<p class="font-weight-bold">
													{{
														t(
															"pages.administration.migration.step4.endTransferphase"
														)
													}}
												</p>
											</template>
										</VRow>
									</VCardText>

									<div class="text-right">
										<VBtn
											class="bg-primary"
											data-testid="migration_endMaintenance"
											@click="endMaintenance"
										>
											{{
												isNbc
													? t("pages.administration.migration.finishWizard")
													: t(
															"pages.administration.migration.finishTransferPhase"
														)
											}}
										</VBtn>
									</div>
								</VCard>
							</VContainer>
						</div>
					</VStepperWindowItem>

					<VStepperWindowItem :value="5" data-testid="migration_waitForSync">
						<VContainer>
							<VCard
								:ripple="false"
								elevation="2"
								class="pa-5 mb-10"
								color="grey-lighten-5"
							>
								<VCardText>
									<template v-if="isNbc">
										<p>
											{{
												t(
													"pages.administration.migration.step5.nbc.linkingFinished",
													{
														source: sourceSystemName,
														instance: theme.name,
													}
												)
											}}
										</p>
										<ul class="mb-4">
											<li>
												{{
													t(
														"pages.administration.migration.step5.nbc.bullet1",
														{
															source: sourceSystemName,
														}
													)
												}}
											</li>
											<li>
												{{
													t(
														"pages.administration.migration.step4.bullets.oldUsers"
													)
												}}
											</li>
										</ul>
									</template>
									<template v-else>
										<p>
											{{ t("pages.administration.migration.step5.syncReady1") }}
										</p>
										<p>
											{{
												t("pages.administration.migration.step5.syncReady2", {
													source: sourceSystemName,
													instance: theme.name,
												})
											}}
										</p>

										<p>
											{{
												t("pages.administration.migration.step5.afterSync", {
													source: sourceSystemName,
													instance: theme.name,
												})
											}}
										</p>
										<ul>
											<li>
												{{
													t(
														"pages.administration.migration.step5.afterSync.bullet1",
														{ source: sourceSystemName }
													)
												}}
											</li>
											<li>
												{{
													t(
														"pages.administration.migration.step5.afterSync.bullet2"
													)
												}}
											</li>
											<li>
												{{
													t(
														"pages.administration.migration.step4.bullets.oldUsers"
													)
												}}
											</li>
										</ul>
									</template>
								</VCardText>
								<div class="text-right">
									<VBtn
										class="bg-primary"
										data-testid="migration_backToAdministration"
										to="/administration/school-settings"
									>
										{{
											t("pages.administration.migration.backToAdministration")
										}}
									</VBtn>
								</div>
							</VCard>
						</VContainer>
					</VStepperWindowItem>
				</VStepperWindow>
			</VStepper>
		</div>
	</DefaultWireframe>
</template>
<script setup lang="ts">
import ImportUsers from "@/components/organisms/administration/ImportUsers.vue";
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { SchulcloudTheme } from "@/serverApi/v3";
import { importUsersModule, schoolsModule } from "@/store";
import { BusinessError } from "@/store/types/commons";
import { injectStrict, THEME_KEY } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { mdiClose } from "@icons/material";
import { useTitle } from "@vueuse/core";
import {
	computed,
	ComputedRef,
	onMounted,
	onUnmounted,
	Ref,
	ref,
	watch,
} from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useEnvConfig } from "@data-env";

const { t } = useI18n();

const router = useRouter();

const theme = injectStrict(THEME_KEY);

const migrationStep: Ref<number> = ref(1);

const isMigrationConfirm: Ref<boolean> = ref(false);

const errorTimeout: Ref<number> = ref(7500);

const isLoading: Ref<boolean> = ref(false);

const matchByPreferredName: Ref<boolean> = ref(false);

const checkTotal: Ref<ReturnType<typeof setTimeout> | undefined> =
	ref(undefined);

const isCancelDialogOpen: Ref<boolean> = ref(false);

const isClearAutoMatchesDialogOpen: Ref<boolean> = ref(false);

const importUsersRef: Ref<InstanceType<typeof ImportUsers> | null> = ref(null);

const isMigrationNotStarted = computed(() => {
	return school.value.inUserMigration === undefined;
});

const canPerformMigration = computed(() => {
	return school.value.inUserMigration && school.value.inMaintenance;
});

const isMigrationFinished = computed(() => {
	return school.value.inUserMigration === false;
});

const canFinishMaintenance = computed(() => {
	return isMigrationConfirm.value || isMigrationFinished.value;
});

const isMaintenanceFinished = computed(() => {
	return !school.value.inMaintenance;
});

const school = computed(() => {
	return schoolsModule.getSchool;
});

const businessError: ComputedRef<BusinessError | null> = computed(() => {
	return importUsersModule.getBusinessError;
});

const totalMatched = computed(() => {
	return importUsersModule.getTotalMatched;
});

const totalUnmatched = computed(() => {
	return importUsersModule.getTotalUnmatched;
});

const totalImportUsers = computed(() => {
	return importUsersModule.getTotal;
});

const isBrb = computed(() => {
	return useEnvConfig().value.SC_THEME.toLowerCase() === SchulcloudTheme.Brb;
});

const isNbc = computed(() => {
	return useEnvConfig().value.SC_THEME.toLowerCase() === SchulcloudTheme.N21;
});

const sourceSystemName = computed(() => {
	if (isBrb.value) {
		return t("pages.administration.migration.brbSchulportal");
	} else if (isNbc.value) {
		return "moin.schule";
	} else {
		return t("pages.administration.migration.ldapSource");
	}
});

const breadcrumbs: Ref<Breadcrumb[]> = ref([
	{
		title: t("pages.administration.index.title"),
		disabled: true,
	},
	{
		title: t("pages.administration.migration.title", {
			source: sourceSystemName.value,
			instance: theme.name,
		}),
		disabled: true,
	},
]);

const helpPageUri = computed(
	() => useEnvConfig().value.MIGRATION_WIZARD_DOCUMENTATION_LINK
);

useTitle(
	buildPageTitle(
		t("pages.administration.migration.title", {
			source: sourceSystemName.value,
			instance: theme.name,
		})
	)
);

const isAllowed = async () => {
	if (useEnvConfig().value.FEATURE_USER_MIGRATION_ENABLED) {
		return true;
	}
	if (school.value.id === "") {
		await schoolsModule.fetchSchool();
	}
	return school.value.featureObject.ldapUniventionMigrationSchool;
};

const summary = async () => {
	if (school.value.id === "") {
		await schoolsModule.fetchSchool();
	}
	if (!canPerformMigration.value) {
		return;
	}

	isLoading.value = true;

	await importUsersModule.fetchTotal();
	await importUsersModule.fetchTotalMatched();
	await importUsersModule.fetchTotalUnmatched();

	isLoading.value = false;
};

const checkTotalInterval = () => {
	if (school.value.inUserMigration && totalImportUsers.value === 0) {
		checkTotal.value = setInterval(() => {
			importUsersModule.fetchTotal();
		}, 5000);
	}
	if (totalImportUsers.value > 0) {
		clearInterval(checkTotal.value);
	}
};

const setSchoolInUserMigration = async () => {
	if (school.value.inUserMigration) {
		return;
	}

	isLoading.value = true;

	if (isNbc.value) {
		await importUsersModule.populateImportUsersFromExternalSystem(
			matchByPreferredName.value
		);

		if (importUsersModule.getBusinessError) {
			isLoading.value = false;

			return;
		}
	}

	await schoolsModule.setSchoolInUserMigration();

	checkTotalInterval();
	if (schoolsModule.getError) {
		// TODO better error handling
		importUsersModule.setBusinessError({
			statusCode: "500",
			message: schoolsModule.getError.message,
		});
	}

	isLoading.value = false;
};

const performMigration = async () => {
	isLoading.value = true;

	await importUsersModule.performMigration();

	if (!importUsersModule.getBusinessError) {
		schoolsModule.setSchool({
			...schoolsModule.getSchool,
			inUserMigration: false,
		});
		isLoading.value = false;
		migrationStep.value = 4;
	}
};
const endMaintenance = async () => {
	isLoading.value = true;
	await schoolsModule.migrationStartSync();
	if (schoolsModule.getError) {
		// TODO better error handling
		importUsersModule.setBusinessError({
			statusCode: "500",
			message: schoolsModule.getError.message,
		});
	} else {
		school.value.inMaintenance = isNbc.value;
		migrationStep.value = 5;
	}
	isLoading.value = false;
};

const resetBusinessError = () => {
	importUsersModule.setBusinessError(null);
};

const scrollToTop = () => {
	window.scrollTo(0, 0);
};

const nextStep = () => {
	let nextStep = 0;

	if (migrationStep.value === 1) {
		nextStep = 2;
		if (isMigrationFinished.value) {
			nextStep = 4;
		}
		if (isMaintenanceFinished.value) {
			nextStep = 5;
		}
	}

	migrationStep.value = nextStep;
};

const cancelMigration = () => {
	isCancelDialogOpen.value = true;
};

const confirmCancelMigration = async () => {
	isLoading.value = true;

	await importUsersModule.cancelMigration();

	migrationStep.value = 0;

	await schoolsModule.fetchSchool();

	isLoading.value = false;

	await redirectToAdminPage();
};

const redirectToAdminPage = async () => {
	await router.push({
		path: "/administration/school-settings",
		query: { openPanels: "migration" },
	});
};

const showClearAutoMatchesDialog = async () => {
	isClearAutoMatchesDialogOpen.value = true;
};

const clearAllAutoMatches = async () => {
	isLoading.value = true;

	await importUsersModule.clearAllAutoMatches();

	importUsersRef.value?.reloadData();

	isLoading.value = false;
};

const migrationSummaryParagraphItems = computed(() => [
	{
		text: "pages.administration.migration.summary.firstParagraph",
	},
	{
		boldText: totalMatched.value,
		text: "pages.administration.migration.summary.secondParagraph.importUsersCount",
	},
	{
		boldText: totalImportUsers.value - totalMatched.value,
		text: "pages.administration.migration.summary.thirdParagraph.importUsersUnmatchedCount",
	},
	{
		boldText: isNbc.value ? undefined : totalUnmatched.value,
		text: isNbc.value
			? "pages.administration.migration.summary.lastParagraph.nbc"
			: "pages.administration.migration.summary.lastParagraph.usersUnmatchedCount",
	},
]);

watch(migrationStep, async (val) => {
	if (val === 1 || val === 3) {
		await summary();
	}

	scrollToTop();
});

watch(totalImportUsers, (val) => {
	if (val > 0) {
		clearInterval(checkTotal.value);
	}
});

onMounted(async () => {
	const allowed = await isAllowed();
	if (!allowed) {
		await router.push("/");
		return;
	}
	await summary();
	checkTotalInterval();
});

onUnmounted(() => {
	if (checkTotal.value) {
		clearInterval(checkTotal.value);
	}
});
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
