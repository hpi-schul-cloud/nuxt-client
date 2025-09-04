<template>
	<!-- Alerts for login view -->
	<v-alert
		v-for="(alert, index) in alerts"
		:key="index"
		:type="alert.type"
		:color="alert.color"
		:dismissible="alert.dismissible"
		class="mb-2"
	>
		{{ alert.message }}
	</v-alert>
	<v-container
		class="d-flex flex-column"
		style="min-height: 100vh; width: 100%"
	>
		<v-card
			v-if="
				!showEmailLoginSection &&
				!showLdapLoginSection &&
				featureOauthLoginEnabled
			"
		>
			<v-card-title class="h3 mt-3">
				{{ t("components.login.title") }}
			</v-card-title>
			<div class="login-providers mb-4">
				<v-btn
					class="btn-cloud"
					color="tertiary"
					block
					@click="showCloud"
					variant="outlined"
				>
					{{ t("components.login.button.email") }}
				</v-btn>
			</div>
			<div class="login-providers mb-8">
				<v-btn
					class="btn-ldap"
					color="tertiary"
					block
					@click="showLdap"
					variant="outlined"
				>
					{{ t("components.login.button.ldap") }}
				</v-btn>
			</div>
		</v-card>

		<!-- Email Login Section -->
		<v-card v-show="showEmailLoginSection" class="email-login-section">
			<v-card-title class="h3 mt-3">
				{{ t("components.login.title") }}
			</v-card-title>
			<v-card-text>
				<!--:prepend-icon="mdiEmailOutline"-->
				<v-text-field
					v-model="email"
					:label="$t('common.labels.email')"
					type="email"
					required
					autocomplete="username"
					data-testid="username-email"
				/>
				<!--:prepend-icon="mdiLockOutline"-->
				<v-text-field
					v-model="password"
					:label="$t('common.labels.password')"
					:append-icon="showPassword ? mdiEyeOutline : mdiEyeOffOutline"
					:type="showPassword ? 'text' : 'password'"
					required
					autocomplete="current-password"
					data-testid="password-email"
					@click:append="togglePassword"
				/>
				<v-checkbox
					v-if="featureJwtExtendedTimeoutEnabled"
					class="form-check mt-2"
					id="privateDevice"
					v-model="privateDevice"
					:label="$t('components.login.checkbox.stayLoggedIn')"
					name="privateDevice"
					value="true"
					data-testid="private-device-checkbox"
					color="primary"
					hide-details
				/>
			</v-card-text>
			<v-btn
				id="submit-login"
				class="btn-login"
				color="primary"
				block
				:disabled="isLoading"
				:data-timeout="loginTimeout"
				data-testid="submit-login-email"
				:autofocus="true"
				aria-label="login"
				@click="submitLogin"
			>
				{{ submitButtonLabel }}
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
			<v-card-title class="h3 mt-3">
				{{ t("components.login.title") }}
			</v-card-title>
			<v-card-text>
				<!--:prepend-icon="mdiAccountOutline"-->
				<v-text-field
					v-model="ldapUsername"
					:label="$t('common.labels.username')"
					required
					autocomplete="username"
					data-testid="username-ldap"
				/>
				<!--:prepend-icon="mdiLockOutline"-->
				<v-text-field
					v-model="ldapPassword"
					:label="$t('common.labels.password')"
					:append-icon="showLdapPassword ? mdiEyeOutline : mdiEyeOffOutline"
					:type="showLdapPassword ? 'text' : 'password'"
					data-testid="password-ldap"
					autocomplete="current-password"
					required
					@click:append="toggleLdapPassword"
				/>
				<v-checkbox
					v-if="featureJwtExtendedTimeoutEnabled"
					class="form-check mt-2"
					id="privateDevice"
					v-model="privateDevice"
					:label="$t('components.login.checkbox.stayLoggedIn')"
					name="privateDevice"
					value="true"
					data-testid="private-device-checkbox"
					color="primary"
					hide-details
				/>
				<v-select
					v-model="selectedSchool"
					class="school"
					:items="schoolOptions"
					:label="$t('components.login.label.school')"
					placeholder="bla"
					item-title="label"
					item-value="value"
					data-testid="select-school"
					clearable
					dense
					required
					@change="onSchoolChange"
				/>
				<v-select
					v-if="selectedSchool && currentLdapSystems.length > 0"
					v-model="selectedSystem"
					class="system"
					:items="currentLdapSystems"
					:label="$t('login.label.system')"
					item-title="label"
					item-value="value"
					dense
					clearable
					data-testid="select-system-ldap"
				/>
			</v-card-text>
			<v-btn
				class="btn-login-ldap"
				color="primary"
				block
				:disabled="isSubmitting || !selectedSchool"
				aria-label="login"
				:autofocus="true"
				data-testid="submit-login-ldap"
				:data-active="ldapLoginActive"
				:data-timeout="ldapTimeout"
				@click="submitLdapLogin"
			>
				{{ ldapButtonLabel }}
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
		<!-- Non-Oauth Login Section-->
		<v-card v-if="!featureOauthLoginEnabled">
			<v-card-title class="h3 mt-3">
				{{ t("components.login.title") }}
			</v-card-title>
			<v-card-text>
				<v-text-field
					v-model="email"
					:label="$t('common.labels.emailUsername')"
					type="email"
					required
					autocomplete="username"
					data-testid="username-email"
				/>
				<v-text-field
					v-model="password"
					:label="$t('common.labels.password')"
					:append-icon="showPassword ? mdiEyeOutline : mdiEyeOffOutline"
					:type="showPassword ? 'text' : 'password'"
					required
					autocomplete="current-password"
					data-testid="password-email"
					@click:append="togglePassword"
				/>
				<v-checkbox
					v-if="featureJwtExtendedTimeoutEnabled"
					class="form-check mt-2"
					id="privateDevice"
					v-model="privateDevice"
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
				data-testid="btn-more-options"
				aria-label="more-options"
				@click="openMoreOptions"
			>
				{{ moreLessOptionsButtonLabel }}
			</v-btn>
			<v-btn
				v-else
				id="less-options"
				class="btn-less-options mb-4"
				color="tertiary"
				block
				data-testid="btn-less-options"
				aria-label="less-options"
				@click="closeMoreOptions"
			>
				{{ moreLessOptionsButtonLabel }}
			</v-btn>
			<div v-show="showMoreOptions" class="mb-4">
				<v-select
					v-model="selectedSchool"
					class="school"
					:items="schoolOptions"
					:label="$t('components.login.label.school')"
					placeholder="bla"
					item-title="label"
					item-value="value"
					data-testid="select-school"
					clearable
					dense
					required
					@change="onSchoolChange"
				/>
				<v-select
					v-if="selectedSchool && currentLdapSystems.length > 0"
					v-model="selectedSystem"
					class="system"
					:items="currentLdapSystems"
					:label="$t('login.label.system')"
					item-title="label"
					item-value="value"
					dense
					clearable
					data-testid="select-system-ldap"
				/>
			</div>
			<v-btn
				id="submit-login"
				class="btn-login"
				color="primary"
				block
				:disabled="isSubmitting"
				:data-timeout="loginTimeout"
				data-testid="submit-login-email"
				:autofocus="true"
				aria-label="login"
				@click="submitLogin"
			>
				{{ t("common.labels.login") }}
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
		<div class="flex-grow-1" />
	</v-container>
</template>

<script setup lang="ts">
import { useLogin } from "@/modules/feature/login/login.composable";
import router from "@/router";
import { envConfigModule } from "@/store";
import { System } from "@/store/types/system"; //import { System } from "@data-system"; // one of those?
import { mdiEyeOffOutline, mdiEyeOutline } from "@icons/material";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n"; //TODO: implement in composable or import (compare how alerting works here, notifiermodule?)
//TODO: implement in composable or import (compare how alerting works here, notifiermodule?)
//import { useAlerts } from "../../feature/login/login.composable";

// Vuetify typenames
type AlertType = "info" | "success" | "warning" | "error";

const { t } = useI18n();
const { loginEmail, isLoading, setCookie, loginResult, cookieDefaults } =
	useLogin();

// Alerts
//const { initAlerts, alerts: composableAlerts } = useAlerts();
const alerts = ref<
	Array<{
		message: string;
		type: AlertType;
		color?: string;
		dismissible?: boolean;
	}>
>([]);
//watch(
//composableAlerts,
//	(val) => {
//		alerts.value = val;
//	},
//	{ immediate: true }
//);

// Feature Toggles
const featureOauthLoginEnabled: boolean =
	envConfigModule.getEnv.FEATURE_OAUTH_LOGIN_ENABLED;
//TODO: get env the schulcloud way, for now:
const featureJwtExtendedTimeoutEnabled = true;
//const featureJwtExtendedTimeoutEnabled = ref(
//	!!import.meta.env.VITE_FEATURE_JWT_EXTENDED_TIMEOUT_ENABLED
//);

// Section and field states
const showEmailLoginSection = ref(false);
const showLdapLoginSection = ref(false);
const showMoreOptions = ref(false);
const isSubmitting = ref(false);
const showPwRecovery = ref(true);
const pwRecoveryModal = ref(false);
const pwRecoveryEmail = ref("");

// Login field states
const email = ref("");
const password = ref("");
const ldapUsername = ref("");
const ldapPassword = ref("");
const privateDevice = ref(false);
const showPassword = ref(false);
const showLdapPassword = ref(false);

// School/System selection (dummy data for now)
const schoolOptions = ref<
	Array<{ label: string; value: string; systems?: System[] }>
>([
	// Example: { label: 'School A', value: 'schoolA', systems: [{ id: 's1', type: 'local', alias: 'A1' }] },
]);
schoolOptions.value = [
	{ label: "school1", value: "school1" },
	{
		label: "school2",
		value: "school2",
		systems: [{ id: "1", name: "LdapSystem1" }],
	},
	{ label: "Kleine Burg Braunschweig", value: "kBB" },
];
const selectedSchool = ref();
const systemOptions = ref<Array<{ label: string; value: string }>>([]); // For cloud/email login
const selectedSystem = ref<{ label: string; value: string } | null>(null);
const currentLdapSystems = ref<Array<{ label: string; value: string }>>([]);

const loginTimeout = ref<number | null>(null);
const ldapTimeout = ref<number | null>(null);
const submitButtonLabel = ref(t("components.login.button.email"));
const ldapButtonLabel = ref(t("components.login.button.ldap"));
const moreLessOptionsButtonLabel = ref(
	t("components.login.button.moreOptions")
);
const ldapLoginActive = ref(true);
const countdownNum = ref(0); // initially let

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
		alerts.value.push({
			type: "error",
			color: "error",
			dismissible: true,
			message: t("login.alert.cookiesBlocked"),
		});
	}
	return cookieEnabled;
}

// ----- Local Storage Versioning -----
onMounted(() => {
	//initAlerts("login");
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

	// Restore previous login system/school preferences if available
	const storedSchool = localStorage.getItem("loginSchool");
	if (storedSchool) selectedSchool.value = storedSchool;
	const storedSystem = localStorage.getItem("loginSystem");
	if (storedSystem) {
		const systemObj = systemOptions.value.find((s) => s.value === storedSystem);
		if (systemObj) selectedSystem.value = systemObj;
	}

	// Timeout initialization (auto enable after timeout)
	if (loginTimeout.value || ldapTimeout.value) {
		setTimeout(
			() => {
				isSubmitting.value = false;
				ldapLoginActive.value = true;
				enableDisableLdapBtn(selectedSchool.value);
			},
			(loginTimeout.value || ldapTimeout.value)! * 1000
		);
		countdownNum.value = ldapTimeout.value || loginTimeout.value || 0;
		incTimer();
	}
});

// ----- Button Section Toggles -----
function showCloud() {
	showEmailLoginSection.value = true;
	showLdapLoginSection.value = false;
}
function showLdap() {
	showEmailLoginSection.value = false;
	showLdapLoginSection.value = true;
	enableDisableLdapBtn(selectedSchool.value);
}
function returnToMenu() {
	showEmailLoginSection.value = false;
	showLdapLoginSection.value = false;
}
function openMoreOptions() {
	showMoreOptions.value = true;
	moreLessOptionsButtonLabel.value = t("components.login.button.less");
}
function closeMoreOptions() {
	showMoreOptions.value = false;
	moreLessOptionsButtonLabel.value = t("components.login.button.moreOptions");
}

// ----- School/System Option Handling -----
//TODO: find the right system object
//function setSystemOptions(systems: System[]) {
//	currentLdapSystems.value = systems.map((system) => {
//		const systemAlias = system.alias ? ` (${system.alias})` : "";
//		return {
//			label: `${system.type}${systemAlias}`,
//			value: `${system.id}//${system.type}`,
//		};
//	});
//}
function onSchoolChange(value: string) {
	enableDisableLdapBtn("test"); // value
	// Find systems in selected school
	const schoolObj = schoolOptions.value.find((item) => item.value === value);
	if (value && schoolObj?.systems) {
		//setSystemOptions(schoolObj.systems);
	} else {
		currentLdapSystems.value = [];
	}
}

// ----- LDAP Button State -----
function enableDisableLdapBtn(schoolId: string) {
	if (ldapLoginActive.value) {
		ldapLoginActive.value = !!schoolId;
	}
}

// ----- Login Submissions -----
async function submitLogin() {
	await loginEmail(email.value, password.value);
	if (loginResult.value) {
		setCookie("jwt", loginResult.value?.accessToken);
		setCookie("isLoggedIn", "true");
	}
	await router.push({ path: '/rooms' })
	//TODO: implement timer
	//setTimeout(() => {
	//	isSubmitting.value = false;
	//	submitButtonLabel.value = t("components.login.button.email");
	//}, 1500);
}
function submitLdapLogin() {
	isSubmitting.value = true;
	ldapLoginActive.value = false;
	// Store school/system prefs
	if (selectedSchool.value) {
		localStorage.setItem("loginSchool", selectedSchool.value);
	} else {
		localStorage.removeItem("loginSchool");
	}
	if (selectedSystem.value) {
		//localStorage.setItem("loginSystem", selectedSystem.value);
	} else {
		localStorage.removeItem("loginSystem");
	}
	// TODO: Replace with LDAP login API logic
	setTimeout(() => {
		isSubmitting.value = false;
		ldapLoginActive.value = true;
		ldapButtonLabel.value = t("components.login.button.ldap");
	}, 1500);
}
function incTimer() {
	if (countdownNum.value > 1) {
		countdownNum.value--;
		submitButtonLabel.value = t("login.text.pleaseWaitXSeconds", {
			seconds: countdownNum.value,
		});
		ldapButtonLabel.value = t("login.text.pleaseWaitXSeconds", {
			seconds: countdownNum.value,
		});
		ldapLoginActive.value = false;
		setTimeout(incTimer, 1000);
	} else {
		submitButtonLabel.value = t("components.login.button.email");
		ldapButtonLabel.value = t("components.login.button.ldap");
		ldapLoginActive.value = true;
	}
}

// ----- Password Recovery -----
function openPwRecoveryModal() {
	pwRecoveryModal.value = true;
}
function closePwRecoveryModal() {
	pwRecoveryModal.value = false;
}
function submitPwRecovery() {
	// Simulate sending password reset link
	pwRecoveryModal.value = false;
	alerts.value.push({
		message: t("login.popup_resetPw.confirmation"),
		type: "success",
		color: "success",
		dismissible: true,
	});
}
</script>
