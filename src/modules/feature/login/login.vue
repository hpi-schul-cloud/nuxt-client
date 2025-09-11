<template>
	<v-container
		class="d-flex flex-column"
		style="min-height: 100vh; width: 100%"
	>
		<v-card>
			<v-card-title class="h3 mt-3">
				{{ t("components.login.title") }}
			</v-card-title>
			<v-alert
				v-model="showAlert"
				:type="alert?.type"
				:color="alert?.color"
				:closable="alert?.dismissible"
				class="mb-2"
			>
				{{ alert?.message }}
			</v-alert>
			<v-card
				v-if="
					!showEmailLoginSection &&
					!showLdapLoginSection &&
					featureOauthLoginEnabled
				"
			>
				<div class="login-providers mb-4">
					<v-btn
						class="btn-cloud"
						color="tertiary"
						block
						variant="outlined"
						@click="showEmail"
					>
						{{ t("components.login.button.email") }}
					</v-btn>
				</div>
				<div class="login-providers mb-8">
					<v-btn
						class="btn-ldap"
						color="tertiary"
						block
						variant="outlined"
						@click="showLdap"
					>
						{{ t("components.login.button.ldap") }}
					</v-btn>
				</div>
			</v-card>

			<!-- Email Login Section -->
			<v-card v-show="showEmailLoginSection" class="email-login-section">
				<v-card-text>
					<!--:prepend-icon="mdiEmailOutline"-->
					<v-text-field
						v-model="email"
						:label="$t('common.labels.email')"
						type="email"
						:error="!!emailError"
						:error-messages="emailError"
						required
						autocomplete="username"
						data-testid="username-email"
						@input="emailError = ''"
					/>
					<!--:prepend-icon="mdiLockOutline"-->
					<v-text-field
						v-model="password"
						:label="$t('common.labels.password')"
						:append-icon="showPassword ? mdiEyeOutline : mdiEyeOffOutline"
						:type="showPassword ? 'text' : 'password'"
						:error="!!passwordError"
						:error-messages="passwordError"
						required
						autocomplete="current-password"
						data-testid="password-email"
						@click:append="togglePassword"
						@input="passwordError = ''"
					/>
					<v-checkbox
						v-if="featureJwtExtendedTimeoutEnabled"
						id="privateDevice"
						v-model="privateDevice"
						class="form-check mt-2"
						:label="$t('components.login.checkbox.stayLoggedIn')"
						name="privateDevice"
						value="true"
						data-testid="private-device-checkbox"
						color="primary"
						hide-details
					/>
				</v-card-text>
				<v-btn
					v-if="!isLoginTimeoutActive"
					id="submit-login"
					class="btn-login"
					color="primary"
					block
					:disabled="isLoading"
					data-testid="submit-login-email"
					:autofocus="true"
					aria-label="login"
					@click="submitLogin(loginOptions.EMAIL)"
				>
					{{ t("components.login.button.email") }}
				</v-btn>
				<v-btn v-else class="btn-login" color="primary" block disabled>
					{{ `Bitte ${countdownNum} Sekunden warten` }}
				</v-btn>
				<v-card-actions>
					<v-btn
						class="submit-pwrecovery"
						color="default"
						block
						text
						data-testid="forgot-password"
						@click="openPwRecoveryModal"
					>
						{{ t("components.login.button.forgotPassword") }}
					</v-btn>
				</v-card-actions>
				<v-btn class="btn-return" color="tertiary" block @click="returnToMenu">
					{{ t("components.login.button.return") }}
				</v-btn>
			</v-card>
			<!-- LDAP Login Section -->
			<v-card v-show="showLdapLoginSection" class="ldap-login-section">
				<v-card-text>
					<!--:prepend-icon="mdiAccountOutline"-->
					<v-text-field
						v-model="ldapUsername"
						:label="$t('common.labels.username')"
						:error="!!emailError"
						:error-messages="emailError"
						required
						autocomplete="username"
						data-testid="username-ldap"
						@input="emailError = ''"
					/>
					<!--:prepend-icon="mdiLockOutline"-->
					<v-text-field
						v-model="ldapPassword"
						:label="$t('common.labels.password')"
						:append-icon="showLdapPassword ? mdiEyeOutline : mdiEyeOffOutline"
						:type="showLdapPassword ? 'text' : 'password'"
						data-testid="password-ldap"
						autocomplete="current-password"
						:error="!!passwordError"
						:error-messages="passwordError"
						required
						@click:append="toggleLdapPassword"
						@input="passwordError = ''"
					/>
					<v-checkbox
						v-if="featureJwtExtendedTimeoutEnabled"
						id="privateDevice"
						v-model="privateDevice"
						class="form-check mt-2"
						:label="$t('components.login.checkbox.stayLoggedIn')"
						name="privateDevice"
						value="true"
						data-testid="private-device-checkbox"
						color="primary"
						hide-details
					/>
					<v-select
						v-model="selectedSchool"
						return-object
						class="school"
						:items="schools"
						:label="$t('components.login.label.school')"
						placeholder="Wähle deine Schule"
						item-title="name"
						data-testid="select-school"
						clearable
						dense
						required
						@update:model-value="onSchoolChange"
					/>
					<v-select
						v-if="selectedSchool && currentLdapSystems.length > 1"
						v-model="selectedSystem"
						return-object
						class="system"
						:items="currentLdapSystems"
						:label="$t('System')"
						item-title="alias"
						item-value="id"
						dense
						clearable
						data-testid="select-system-ldap"
						@update:model-value="onSystemChange"
					/>
				</v-card-text>
				<v-btn
					v-if="!isLoginTimeoutActive"
					class="btn-login-ldap"
					color="primary"
					block
					:disabled="isLoading || !selectedSchool"
					aria-label="login"
					:autofocus="true"
					data-testid="submit-login-ldap"
					@click="submitLogin(loginOptions.LDAP)"
				>
					{{ t("components.login.button.ldap") }}
				</v-btn>
				<v-btn v-else class="btn-login-ldap" color="primary" block disabled>
					{{ `Bitte ${countdownNum} Sekunden warten` }}
				</v-btn>
				<v-card-actions>
					<v-btn
						class="submit-pwrecovery"
						color="default"
						text
						block
						data-testid="forgot-password"
						@click="openPwRecoveryModal"
					>
						{{ t("components.login.button.forgotPassword") }}
					</v-btn>
				</v-card-actions>
				<v-btn class="btn-return" color="tertiary" block @click="returnToMenu">
					{{ t("components.login.button.return") }}
				</v-btn>
			</v-card>
			<!-- More or less Section-->
			<v-card v-if="!featureOauthLoginEnabled">
				<v-card-text>
					<v-text-field
						v-model="emailMoreLess"
						:label="$t('common.labels.emailUsername')"
						type="email"
						:error="!!emailError"
						:error-messages="emailError"
						required
						autocomplete="username"
						data-testid="username-email"
						@input="emailError = ''"
					/>
					<v-text-field
						v-model="passwordMoreLess"
						:label="$t('common.labels.password')"
						:append-icon="showPassword ? mdiEyeOutline : mdiEyeOffOutline"
						:type="showPassword ? 'text' : 'password'"
						:error="!!passwordError"
						:error-messages="passwordError"
						required
						autocomplete="current-password"
						data-testid="password-email"
						@click:append="togglePassword"
						@input="passwordError = ''"
					/>
					<v-checkbox
						v-if="featureJwtExtendedTimeoutEnabled"
						id="privateDevice"
						v-model="privateDevice"
						class="form-check mt-2"
						:label="$t('components.login.checkbox.stayLoggedIn')"
						name="privateDevice"
						value="true"
						data-testid="private-device-checkbox"
						color="primary"
						hide-details
					/>
				</v-card-text>
				<v-btn
					v-if="!showMoreOptions"
					id="more-options"
					class="btn-more-options mb-4"
					color="tertiary"
					block
					prepend-icon="mdiChevronUp"
					data-testid="btn-more-options"
					aria-label="more-options"
					@click="openMoreOptions"
				>
					<v-icon>
						{{ mdiChevronUp }}
					</v-icon>
					{{ t("components.login.button.moreOptions") }}
				</v-btn>
				<v-btn
					v-else
					id="less-options"
					class="btn-less-options mb-4"
					color="tertiary"
					block
					prepend-icon="mdiChevronDown"
					data-testid="btn-less-options"
					aria-label="less-options"
					@click="closeMoreOptions"
				>
					<v-icon>
						{{ mdiChevronDown }}
					</v-icon>
					{{ t("components.login.button.less") }}
				</v-btn>
				<div v-show="showMoreOptions" class="mb-4">
					<v-select
						v-model="selectedSchool"
						return-object
						class="school"
						:items="schools"
						:label="$t('components.login.label.school')"
						placeholder="Select your school"
						item-title="name"
						data-testid="select-school"
						clearable
						dense
						required
						@update:model-value="onSchoolChange"
					/>
					<v-select
						v-if="selectedSchool && currentLdapSystems.length > 1"
						v-model="selectedSystem"
						return-object
						class="system"
						:items="currentLdapSystems"
						:label="$t('System')"
						item-title="alias"
						item-value="id"
						dense
						clearable
						data-testid="select-system-ldap"
						@update:model-value="onSystemChange"
					/>
				</div>
				<v-btn
					v-if="!isLoginTimeoutActive"
					id="submit-login"
					class="btn-login"
					color="primary"
					block
					:disabled="isLoading"
					data-testid="submit-login-email"
					:autofocus="true"
					aria-label="login"
					@click="submitLogin(loginOptions.MoreLess)"
				>
					{{ t("common.labels.login") }}
				</v-btn>
				<v-btn v-else class="btn-login" color="primary" block disabled>
					{{ `Bitte ${countdownNum} Sekunden warten` }}
				</v-btn>
				<v-card-actions>
					<v-btn
						class="submit-pwrecovery mb-4"
						color="default"
						text
						block
						data-testid="forgot-password"
						@click="openPwRecoveryModal"
					>
						{{ t("components.login.button.forgotPassword") }}
					</v-btn>
				</v-card-actions>
			</v-card>

			<v-row v-if="showPwRecovery">
				<v-col cols="12">
					<v-dialog v-model="pwRecoveryModal" max-width="500">
						<v-card class="pwrecovery-modal">
							<v-card-title class="h3 mt-3">
								{{ t("components.login.passwordRecovery.title") }}
							</v-card-title>
							<v-card-text>
								<v-text-field
									id="username"
									v-model="pwRecoveryEmail"
									:label="
										$t('components.login.passwordRecovery.label.emailUsername')
									"
									name="username"
									autocomplete="username"
									size="30"
									class="form-control"
									data-testid="password-recovery-email"
									required
								/>
								<p class="mt-2" data-testid="info-message">
									{{ t("components.login.passwordRecovery.text1") }}
									<br />
									{{ t("components.login.passwordRecovery.text2") }}
								</p>
							</v-card-text>
							<v-card-actions class="justify-end">
								<v-spacer />
								<v-btn
									color="tertiary"
									variant="elevated"
									@click="closePwRecoveryModal"
								>
									{{ t("common.actions.cancel") }}
								</v-btn>
								<v-btn
									color="primary"
									variant="elevated"
									data-testid="password-recovery-modal"
									@click="submitPwRecovery"
								>
									{{ t("components.login.passwordRecovery.button.submit") }}
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script setup lang="ts">
import { useLogin } from "@/modules/feature/login/login.composable";
import router from "@/router";
import {
	SchoolForLdapLoginResponse,
	SystemForLdapLoginResponse,
} from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import {
	mdiChevronDown,
	mdiChevronUp,
	mdiEyeOffOutline,
	mdiEyeOutline,
} from "@icons/material";
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
//TODO: implement in composable or import (compare how alerting works here, notifiermodule?)

// Vuetify typenames
type AlertType = "info" | "success" | "warning" | "error";

enum loginOptions {
	EMAIL,
	LDAP,
	MoreLess,
}

const { t } = useI18n();
const {
	loginEmail,
	loginLdap,
	isLoading,
	loginResult,
	schools,
	fetchLdapSchools,
	submitPasswordRecovery,
	passwordRecoveryError,
	getValidRedirect,
} = useLogin();
const route = useRoute();
// Alerts
const alert = ref<{
	message: string;
	type: AlertType;
	color: string;
	dismissible: boolean;
} | null>(null);
const showAlert = ref(false);

// Feature Toggles
const featureOauthLoginEnabled: boolean =
	envConfigModule.getEnv.FEATURE_OAUTH_LOGIN_ENABLED;
//TODO: get env the schulcloud way, for now:
const featureJwtExtendedTimeoutEnabled =
	envConfigModule.getEnv.FEATURE_JWT_EXTENDED_TIMEOUT_ENABLED;

// Section and field states
const showEmailLoginSection = ref(false);
const showLdapLoginSection = ref(false);
const showMoreOptions = ref(false);
const showPwRecovery = ref(true);
const pwRecoveryModal = ref(false);
const pwRecoveryEmail = ref("");

// Login field states
const email = ref("");
const password = ref("");
const ldapUsername = ref("");
const ldapPassword = ref("");
const emailMoreLess = ref("");
const passwordMoreLess = ref("");
const privateDevice = ref(false);
const showPassword = ref(false);
const showLdapPassword = ref(false);
const emailError = ref("");
const passwordError = ref("");

const selectedSchool = ref<SchoolForLdapLoginResponse | null>(null);
const systemOptions = ref<Array<SystemForLdapLoginResponse>>([]);
const selectedSystem = ref<SystemForLdapLoginResponse | null>(null);
const currentLdapSystems = ref<Array<SystemForLdapLoginResponse>>([]);

const countdownNum = ref(0);
const loginTimeoutSeconds = envConfigModule.getEnv.LOGIN_BLOCK_TIME;
const isLoginTimeoutActive = ref(false);
const redirectParam = ref(route.query.redirect?.toString() || null);

function togglePassword() {
	showPassword.value = !showPassword.value;
}
function toggleLdapPassword() {
	showLdapPassword.value = !showLdapPassword.value;
}

// ----- Cookie Check -----
function checkCookie() {
	let cookieEnabled = navigator.cookieEnabled;
	if (!cookieEnabled) {
		document.cookie = "testcookie";
		cookieEnabled = document.cookie.indexOf("testcookie") !== -1;
	}
	// If cookies not enabled, show alert
	if (!cookieEnabled) {
		alert.value = {
			type: "error",
			color: "error",
			dismissible: true,
			message: t("login.alert.cookiesBlocked"),
		};
		showAlert.value = true;
	}
	return cookieEnabled;
}

// ----- Local Storage Versioning -----
onMounted(() => {
	// Versioning
	const newVersion = 1;
	const currentVersion = parseInt(
		localStorage.getItem("homepageVersion") || "0",
		10
	);
	if (currentVersion < newVersion) {
		localStorage.clear();
		localStorage.setItem("homepageVersion", newVersion.toString());
	}

	checkCookie();
	//TODO: toggle for dev
	fetchLdapSchools();
	//getMockSchoolsForLogin();

	const route = useRoute();
	const strategy = route.query.strategy;
	const schoolid = route.query.schoolid;

	if (strategy) {
		if (featureOauthLoginEnabled) {
			if (strategy === "ldap") {
				showLdap();
				if (schoolid) {
					const schoolObj = schools.value.find((item) => item.id === schoolid);
					if (schoolObj) {
						selectedSchool.value = schoolObj;
						onSchoolChange(schoolObj);
					}
				}
			} else if (strategy === "email") {
				showEmail();
			}
		}
	} else {
		const storedSchool = localStorage.getItem("loginSchool");
		if (storedSchool) {
			const schoolObj = schools.value.find((item) => item.id === storedSchool);
			if (schoolObj) {
				selectedSchool.value = schoolObj;
				onSchoolChange(schoolObj);
			}
		}
		const storedSystem = localStorage.getItem("loginSystem");
		if (storedSystem) {
			const systemObj = systemOptions.value.find((s) => s.id === storedSystem);
			if (systemObj) selectedSystem.value = systemObj;
		}
	}

	incTimer();
});

watch(
	() => route.query.redirect,
	(newVal) => {
		redirectParam.value = newVal?.toString() || null;
	}
);

/*function getMockSchoolsForLogin() {
	schools.value = [
		{ name: "school1", id: "id1", systems: [] },
		{
			name: "school2",
			id: "id2",
			systems: [
				{ alias: "system1", id: "sid1", type: "ldap" },
				{ alias: "system2", id: "sid2", type: "oauth" },
			],
		},
	];
}*/

// ----- Button Section Toggles -----
function showEmail() {
	showEmailLoginSection.value = true;
	showLdapLoginSection.value = false;
}
function showLdap() {
	showEmailLoginSection.value = false;
	showLdapLoginSection.value = true;
}
function returnToMenu() {
	showEmailLoginSection.value = false;
	showLdapLoginSection.value = false;
}
function openMoreOptions() {
	showMoreOptions.value = true;
}
function closeMoreOptions() {
	showMoreOptions.value = false;
}

// ----- School/System Option Handling -----
function setSystemOptions(systems: SystemForLdapLoginResponse[]) {
	currentLdapSystems.value = systems;
}

function onSchoolChange(school: SchoolForLdapLoginResponse | null) {
	selectedSchool.value = school;
	// Find systems in selected school
	if (school && Array.isArray(school.systems)) {
		setSystemOptions(school.systems);
	} else {
		currentLdapSystems.value = [];
	}
}

function onSystemChange(system: SystemForLdapLoginResponse | null) {
	selectedSystem.value = system;
}

function checkValidityFields(loginOption: loginOptions) {
	emailError.value = "";
	passwordError.value = "";
	let valid = true;
	switch (loginOption) {
		case loginOptions.EMAIL:
			if (!email.value) {
				emailError.value = "Please fill out this field";
				valid = false;
			}
			if (!password.value) {
				passwordError.value = "Please fill out this field";
				valid = false;
			}
			break;
		case loginOptions.LDAP:
			if (!ldapUsername.value) {
				emailError.value = "Please fill out this field";
				valid = false;
			}
			if (!ldapPassword.value) {
				passwordError.value = "Please fill out this field";
				valid = false;
			}
			break;
		case loginOptions.MoreLess:
			if (!emailMoreLess.value) {
				emailError.value = "Please fill out this field";
				valid = false;
			}
			if (!passwordMoreLess.value) {
				passwordError.value = "Please fill out this field";
				valid = false;
			}
			break;
		default:
			break;
	}
	return valid;
}

// ----- Login Submissions -----
async function submitLogin(loginOption: loginOptions) {
	switch (loginOption) {
		case loginOptions.EMAIL:
			if (!checkValidityFields(loginOptions.EMAIL)) return;
			await submitLocalLogin();
			break;
		case loginOptions.LDAP:
			if (!checkValidityFields(loginOptions.LDAP)) return;
			await submitLdapLogin();
			break;
		case loginOptions.MoreLess:
			if (!checkValidityFields(loginOptions.MoreLess)) return;
			if (selectedSchool.value && showMoreOptions.value) {
				await submitLdapLogin();
			} else {
				await submitLocalLogin();
			}
			break;
		default:
			return;
	}
}

async function submitLocalLogin() {
	await loginEmail(email.value, password.value, true);
	if (loginResult.value) {
		if (redirectParam.value) {
			const validRedirect = getValidRedirect(redirectParam.value);
			await router.push({ path: validRedirect });
		} else {
			await router.push({ path: "/rooms" });
		}
	} else {
		alert.value = {
			type: "error",
			color: "error",
			dismissible: true,
			message: "Login fehlgeschlagen",
		};
		showAlert.value = true;
		email.value = "";
		password.value = "";
		emailMoreLess.value = "";
		passwordMoreLess.value = "";
		countdownNum.value = loginTimeoutSeconds;
		incTimer();
	}
}

async function submitLdapLogin() {
	// Store school/system prefs
	if (selectedSchool.value) {
		localStorage.setItem("loginSchool", selectedSchool.value.id ?? "");
	} else {
		localStorage.removeItem("loginSchool");
	}
	if (selectedSystem.value) {
		localStorage.setItem("loginSystem", selectedSystem.value.id);
	} else {
		localStorage.removeItem("loginSystem");
	}

	if (!selectedSchool.value) {
		alert.value = {
			type: "warning",
			color: "error",
			dismissible: true,
			message: t("Login fehlgeschlagen"),
		};
		showAlert.value = true;
		return;
	}

	await loginLdap(
		email.value,
		password.value,
		selectedSchool.value.id,
		selectedSystem.value?.id
			? selectedSystem.value.id
			: selectedSchool.value?.systems[0].id,
		true
	);
	if (loginResult.value) {
		if (redirectParam.value) {
			const validRedirect = getValidRedirect(redirectParam.value);
			await router.push({ path: validRedirect });
		} else {
			await router.push({ path: "/rooms" });
		}
	} else {
		ldapUsername.value = "";
		ldapPassword.value = "";
		emailMoreLess.value = "";
		passwordMoreLess.value = "";
		selectedSchool.value = null;
		selectedSystem.value = null;
		alert.value = {
			type: "warning",
			color: "error",
			dismissible: true,
			message: t("Login fehlgeschlagen"),
		};
		showAlert.value = true;
		countdownNum.value = loginTimeoutSeconds;
		incTimer();
	}
}

function incTimer() {
	isLoginTimeoutActive.value = true;
	if (countdownNum.value > 1) {
		countdownNum.value--;
		setTimeout(incTimer, 1000);
	} else {
		isLoginTimeoutActive.value = false;
	}
}

// ----- Password Recovery -----
function openPwRecoveryModal() {
	pwRecoveryModal.value = true;
}

function closePwRecoveryModal() {
	pwRecoveryModal.value = false;
}

async function submitPwRecovery() {
	try {
		await submitPasswordRecovery(pwRecoveryEmail.value);
		pwRecoveryModal.value = false;
		await router.push({ path: "/pwrecovery/response" });
	} catch {
		pwRecoveryModal.value = false;
		if (passwordRecoveryError.value === "EMAIL_DOMAIN_BLOCKED") {
			await router.push({ path: "/pwrecovery/failed" });
		} else {
			await router.push({ path: "/pwrecovery/response" });
		}
	}
}
</script>
