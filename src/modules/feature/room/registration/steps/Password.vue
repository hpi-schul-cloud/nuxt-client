<template>
	<p>
		Die dBildungscloud bewahrt die Nutzenden-Daten sicher auf und gibt sie nicht an Dritte weiter. Die Verarbeitung der
		Daten erfolgt entsprechend der hohen gesetzlichen Datenschutz-Anforderungen.
	</p>
	<p>
		Die folgenden Daten hat eine Lehrkraft oder ein Schul-Admin eingetragen (falls Anpassungen notwendig sind, bitte an
		die entsprechende Person wenden):
	</p>
	<VTextField readonly :label="t('common.labels.firstName')" model-value="Vorname" data-testid="first-name" />
	<VTextField readonly :label="t('common.labels.lastName')" model-value="Nachname" data-testid="last-name" />
	<VTextField readonly :label="t('common.labels.email')" model-value="Email" data-testid="email" />

	<p class="font-weight-bold mt-4">Bitte ein Passwort vergeben</p>
	<ul id="password-instructions" class="pl-4">
		<li>mindestens 8 Zeichen mit Groß-und Kleinschreibung</li>
		<li>davon jeweils mindestens eine Zahl und ein Sonderzeichen</li>
		<li>erlaube Sonderzeichen sind: ! § $ % / ( ) = ? \ ; : , . # + * ~ -</li>
	</ul>
	<VTextField
		v-model="password"
		aria-describedby="password-instructions"
		autocomplete="new-password"
		data-testid="password"
		counter
		type="password"
		:label="t('common.labels.password')"
		:rules="passwordRules"
	/>
	<VTextField
		data-testid="confirm-password"
		autocomplete="new-password"
		type="password"
		label="Passwort wiederholen"
		:rules="passwordConfirmationRules"
	/>
</template>

<script setup lang="ts">
import {
	hasLowercaseLetter,
	hasNumber,
	hasSpecialCharacter,
	hasUppercaseLetter,
	isOfMinLength,
	isRequired,
} from "@util-validators";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { VTextField } from "vuetify/components";

const { t } = useI18n();
const password = defineModel<string>();

const passwordRules = computed(() => [
	isRequired("Bitte ein Passwort eingeben"),
	isOfMinLength(8)("Das Passwort muss mindestens 8 Zeichen lang sein."),
	hasUppercaseLetter("Das Passwort muss mindestens einen Großbuchstaben enthalten."),
	hasLowercaseLetter("Das Passwort muss mindestens einen Kleinbuchstaben enthalten."),
	hasNumber("Das Passwort muss mindestens eine Zahl enthalten."),
	hasSpecialCharacter("Das Passwort muss mindestens ein Sonderzeichen enthalten."),
]);

const passwordConfirmationRules = computed(() => [
	isRequired("Bitte das Passwort wiederholen"),
	(value: string) => {
		if (value !== password.value) {
			return "Die Passwörter stimmen nicht überein.";
		}
		return true;
	},
]);
</script>
