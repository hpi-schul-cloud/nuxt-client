<template>
	<DefaultWireframe ref="main" max-width="short" :breadcrumbs="breadcrumbs">
		<template #header>
			<h1>
				{{ title }}
			</h1>
			<i18n-t v-if="isConsentNecessary" keypath="pages.administration.students.consent.info" scope="global" tag="p">
				<template #dataProtection>
					<a :href="fileLinks.dataProtection" target="_blank">{{ t("common.words.privacyPolicy") }}</a>
				</template>
				<template #terms>
					<a :href="fileLinks.termsOfUse" target="_blank">{{ t("components.legacy.footer.terms") }}</a>
				</template>
				<template #handout>
					<a :href="fileLinks.analogConsent" target="_blank">
						{{ t("pages.administration.students.consent.handout") }}
					</a>
				</template>
			</i18n-t>
		</template>
		<section class="section">
			<div class="mt-6">
				<StepProgress id="progressbar" :steps="progressSteps" :current-step="currentStep" data-testid="step_progress" />
			</div>

			<section v-if="currentStep === 0">
				<h2>
					{{ t("pages.administration.students.consent.steps.complete") }}
				</h2>
				{{ t("pages.administration.students.consent.steps.complete.info") }}

				<BackendDataTable
					v-model:sort-by="sortBy"
					v-model:sort-order="sortOrder"
					:columns="tableColumns"
					:data="tableData"
					track-by="_id"
					data-testid="consent_table_1"
					@update:sort="onUpdateSort"
				>
					<template #datacolumn-birthday="slotProps">
						<DatePicker
							:date="slotProps.data"
							class="ml-2"
							hide-details
							hide-icon
							density="compact"
							:min-date="dateFromToday(-100, 'year')"
							:max-date="dateFromToday(-4, 'year')"
							data-testid="birthday-input"
							@update:date="
								inputDate({
									id: tableData[slotProps.rowindex]._id,
									birthDate: toGermanDate($event) ?? '',
								})
							"
						/>
					</template>
					<template #datacolumn-password="slotProps">
						<VTextField
							:model-value="slotProps.data"
							class="ml-2"
							hide-details
							density="compact"
							data-testid="password-input"
							@update:model-value="
								inputPass({
									id: tableData[slotProps.rowindex]._id,
									pass: $event,
								})
							"
						/>
					</template>
				</BackendDataTable>

				<p v-if="birthdayWarning" class="text-error" data-testid="error-text">
					<VIcon color="error">{{ mdiAlert }} </VIcon>
					{{ t("pages.administration.students.consent.steps.complete.warn") }}
				</p>

				<div class="d-flex justify-end">
					<VBtn variant="text" @click="cancelWarning = true">
						{{ t("common.actions.cancel") }}
					</VBtn>
					<VBtn color="primary" variant="flat" data-testid="button-next" @click="next">
						{{ t("pages.administration.students.consent.steps.complete.next") }}
					</VBtn>
				</div>
			</section>

			<section v-if="currentStep === 1">
				<h2>
					{{ t("pages.administration.students.consent.steps.register") }}
				</h2>
				<p v-if="isConsentNecessary">
					{{ t("pages.administration.students.consent.steps.register.info") }}
				</p>

				<BackendDataTable
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
							{{ fromGermanDate(slotProps.data) }}
						</div>
					</template>
				</BackendDataTable>

				<div v-if="isConsentNecessary" id="consent-checkbox">
					<VCheckbox v-model="check" name="switch" data-testid="check-confirm" hide-details>
						<template #label>
							<div>
								<i18n-t keypath="pages.administration.students.consent.steps.register.confirm" scope="global">
									<template #analogConsent>
										<a :href="fileLinks.analogConsent" target="_">
											{{ t("pages.administration.students.consent.steps.register.analog-consent") }}
										</a>
									</template>
								</i18n-t>
							</div>
						</template>
					</VCheckbox>
				</div>

				<p v-if="checkWarning" class="text-error" data-testid="confirm-error">
					<v-icon color="error">{{ mdiAlert }} </v-icon>
					{{ t("pages.administration.students.consent.steps.register.confirm.warn") }}
				</p>

				<div class="d-flex justify-end">
					<VBtn variant="text" @click="cancelWarning = true">
						{{ t("common.actions.cancel") }}
					</VBtn>
					<VBtn color="primary" variant="flat" data-testid="button-next-2" @click="register">
						{{ t("pages.administration.students.consent.steps.register.next") }}
					</VBtn>
				</div>
			</section>

			<section v-if="currentStep === 2">
				<h2>
					{{ t("pages.administration.students.consent.steps.download") }}
				</h2>
				{{ t("pages.administration.students.consent.steps.download.info") }}
				<BackendDataTable
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
						{{ fromGermanDate(slotProps.data) }}
					</template>
				</BackendDataTable>
				<p>
					{{ passwordHint }}
				</p>

				<div class="d-flex justify-end">
					<VBtn variant="text" @click="cancelWarning = true">
						{{ t("common.actions.cancel") }}
					</VBtn>
					<VBtn color="primary" variant="flat" @click="download">
						{{ t("pages.administration.students.consent.steps.download.next") }}
					</VBtn>
				</div>
			</section>

			<section v-if="currentStep === 3">
				<h2 class="centered">
					{{ successMessage }}
				</h2>
				<img
					class="success-image mb-4"
					:src="image"
					:alt="t('pages.administration.students.consent.steps.success.image.alt')"
				/>

				<div class="d-flex justify-end">
					<VBtn color="primary" variant="outlined" @click="success">
						{{ t("pages.administration.students.consent.steps.success.back") }}
					</VBtn>
				</div>
			</section>

			<SvsDialog v-model="cancelWarning" title="pages.administration.students.consent.cancel.modal.title">
				<template #content>
					<ErrorAlert>
						<p v-if="currentStep === 2">
							{{ t("pages.administration.students.consent.cancel.modal.download.info") }}
						</p>
						<p v-else>
							{{ t("pages.administration.students.consent.cancel.modal.info") }}
						</p>
					</ErrorAlert>
				</template>
				<template #actions>
					<SvsDialogBtnCancel @click="cancelWarning = false" />
					<VBtn
						v-if="currentStep === 2"
						:text="t('pages.administration.students.consent.cancel.modal.download.continue')"
						color="error"
						variant="flat"
						@click="download"
					/>
					<SvsDialogBtnConfirm text-lang-key="pages.administration.students.consent.cancel.modal" @click="cancel" />
				</template>
			</SvsDialog>

			<div hidden>
				<div id="tableStudentsForPrint">
					<h3 class="text-h1">
						{{ t("pages.administration.students.consent.print.title") }}
					</h3>
					<p>
						{{ printPageInfo }}
					</p>

					<BackendDataTable :columns="tableColumnsForPrint" :data="tableData" track-by="_id" :paginated="false" />
				</div>
			</div>
		</section>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import SafelyConnectedImage from "@/assets/img/safely_connected.png";
import BackendDataTable from "@/components/administration/BackendDataTable.vue";
import StepProgress from "@/components/administration/StepProgress.vue";
import { dateFromToday, fromGermanDate, germanDateToIso, toGermanDate } from "@/utils/date-time.utils";
import { buildPageTitle } from "@/utils/pageTitle";
import { notifyError, notifySuccess } from "@data-app";
import { useEnvConfig } from "@data-env";
import { useFilePaths } from "@data-file";
import { useBulkConsent } from "@data-users";
import { mdiAlert } from "@icons/material";
import { ErrorAlert } from "@ui-alert";
import { DatePicker } from "@ui-date-time-picker";
import { SvsDialog, SvsDialogBtnCancel, SvsDialogBtnConfirm } from "@ui-dialog";
import { DefaultWireframe } from "@ui-layout";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const { selectedStudentsData, findConsentUsers, updateStudent, register: registerStudents } = useBulkConsent();
const { specificFiles } = useFilePaths();

const image = SafelyConnectedImage;

const fileLinks = computed(() => ({
	analogConsent: specificFiles.value.analogConsent,
	termsOfUse: "/termsofuse",
	dataProtection: "/privacypolicy",
}));

const tableColumns = [
	{
		field: "fullName",
		label: t("common.labels.name"),
		sortable: true,
	},
	{
		field: "email",
		label: t("common.labels.email"),
		sortable: true,
	},
	{
		field: "birthday",
		label: t("common.labels.birthdate"),
		sortable: false,
	},
	{
		field: "password",
		label: t("common.labels.password"),
		sortable: false,
	},
];

const tableColumnsForPrint = [
	{
		field: "fullName",
		label: t("common.labels.name"),
		sortable: false,
	},
	{
		field: "email",
		label: t("common.labels.email"),
		sortable: false,
	},
	{
		field: "password",
		label: t("common.labels.password"),
		sortable: false,
	},
];

const progressSteps = [
	{
		name: t("pages.administration.students.consent.steps.complete"),
	},
	{
		name: t("pages.administration.students.consent.steps.register"),
	},
	{
		name: t("pages.administration.students.consent.steps.download"),
	},
];

const printPageInfo = t("pages.administration.students.consent.steps.register.print", {
	hostName: window.location.origin,
});

const currentStep = ref(0);
const birthdayWarning = ref(false);
const cancelWarning = ref(false);
const check = ref(false);
const checkWarning = ref(false);
const sortBy = ref("fullName");
const sortOrder = ref<"asc" | "desc">("asc");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tableData = ref<any[]>([]);

let tableTimeOut: ReturnType<typeof setTimeout> | null = null;
let printTimeOut: ReturnType<typeof setTimeout> | null = null;

const isConsentNecessary = computed(() => useEnvConfig().value.FEATURE_CONSENT_NECESSARY);

const title = computed(() =>
	isConsentNecessary.value
		? t("pages.administration.students.consent.title")
		: t("pages.administration.students.manualRegistration.title")
);

const breadcrumbs = computed(() => [
	{
		title: t("pages.administration.students.index.title"),
		to: "/administration/students",
	},
	{
		title: title.value,
		disabled: true,
	},
]);

const passwordHint = computed(() =>
	isConsentNecessary.value
		? t("pages.administration.students.consent.steps.download.explanation")
		: t("pages.administration.students.manualRegistration.steps.download.explanation")
);

const successMessage = computed(() =>
	isConsentNecessary.value
		? t("pages.administration.students.consent.steps.success")
		: t("pages.administration.students.manualRegistration.steps.success")
);

const find = async () => {
	const query = {
		$limit: 1000,
		$skip: 0,
		$sort: {
			[sortBy.value]: sortOrder.value === "asc" ? 1 : -1,
		},
	};
	await findConsentUsers(query);
	tableData.value = selectedStudentsData.value;
};

const onUpdateSort = (newSortBy: string, newSortOrder: "asc" | "desc") => {
	sortBy.value = newSortBy === "fullName" ? "firstName" : newSortBy;
	sortOrder.value = newSortOrder;
	find();
};

const inputDate = (student: { id: string; birthDate: string }) => {
	updateStudent(student);
};

const inputPass = (student: { id: string; pass: string }) => {
	updateStudent(student);
};

const checkBirthdays = () =>
	!tableData.value.some((element) => element.birthday === "" || element.birthday === null || !element.birthday);

const next = () => {
	if (currentStep.value === 0) {
		if (!checkBirthdays()) {
			birthdayWarning.value = true;
			return;
		}
	}
	currentStep.value += 1;
};

const register = () => {
	if (isConsentNecessary.value && check.value === false) {
		checkWarning.value = true;
	} else {
		const users = tableData.value.map((student) => ({
			...student,
			birthday: germanDateToIso(student.birthday),
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
		}));
		registerStudents(users as Parameters<typeof registerStudents>[0]);

		notifySuccess(t("pages.administration.students.consent.steps.register.success"));
		next();
	}
};

const download = () => {
	const prtHtml = document.getElementById("tableStudentsForPrint")?.innerHTML ?? "";
	let stylesHtml = "";

	for (const node of [...document.querySelectorAll("link[rel='stylesheet'], style")]) {
		stylesHtml += node.outerHTML;
	}

	const winPrint = window.open("", "", "left=0,top=500,width=800,height=900,toolbar=0,scrollbars=0,status=0");

	winPrint?.document.write(`<!DOCTYPE html>
		<html lang="de">
		<head>
			<title>${t("pages.administration.students.consent.print.title")}</title>
			${stylesHtml}
		</head>
		<body>
			<h1 class="centered">
				&nbsp;
			</h1>
			<main>
				${prtHtml}
			</main>
		</body>
		</html>`);

	winPrint?.document.close();
	winPrint?.focus();
	printTimeOut = setTimeout(() => {
		winPrint?.print();
		winPrint?.close();
	}, 500);
	cancelWarning.value = false;
	next();
};

const success = () => {
	router.push({
		path: `/administration/students`,
	});
};

const cancel = () => {
	router.push({
		path: `/administration/students`,
	});
	cancelWarning.value = false;
};

const checkTableData = () => {
	tableTimeOut = setTimeout(() => {
		if (tableData.value.length === 0) {
			notifyError(t("pages.administration.students.consent.table.empty"));

			router.push({
				path: `/administration/students`,
			});
		}
	}, 2000);
};

const warningEventHandler = (event: BeforeUnloadEvent) => {
	if (currentStep.value === 2) {
		// Cancel the event as stated by the standard.
		event.preventDefault();
		// Chrome requires returnValue to be set.
		event.returnValue = "";
		// then show customized warning modal
		cancelWarning.value = true;
	}
};

window.addEventListener("beforeunload", warningEventHandler);

onMounted(() => {
	find();
	checkTableData();
	document.title = buildPageTitle(title.value);
});

onBeforeUnmount(() => {
	window.removeEventListener("beforeunload", warningEventHandler);
	if (tableTimeOut) clearTimeout(tableTimeOut);
	if (printTimeOut) clearTimeout(printTimeOut);
});
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
</style>
