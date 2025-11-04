<template>
	<p>
		Die dBildungscloud bewahrt die Nutzenden-Daten sicher auf und gibt sie nicht an Dritte weiter. Die Verarbeitung der
		Daten erfolgt entsprechend der hohen gesetzlichen Datenschutz-Anforderungen.
	</p>
	<p>
		Die folgenden Daten hat eine Lehrkraft oder ein Schul-Admin eingetragen (falls Anpassungen notwendig sind, bitte an
		die entsprechende Person wenden):
	</p>
	<VTextField readonly :label="t('common.labels.firstName')" model-value="Vorname" />
	<VTextField readonly :label="t('common.labels.lastName')" model-value="Nachname" />
	<VTextField readonly :label="t('common.labels.email')" model-value="Email" />

	<p class="font-weight-bold mt-4">Bitte ein Passwort vergeben</p>
	<ul id="password-instructions" class="pl-4">
		<li>mindestens 8 Zeichen mit Groß-und Kleinschreibung</li>
		<li>davon jeweils mindestens eine Zahl und ein Sonderzeichen</li>
		<li>erlaube Sonderzeichen sind: ! § $ % / ( ) = ? \ ; : , . # + * ~ -</li>
	</ul>
	<VTextField
		aria-describedby="password-instructions"
		counter
		type="password"
		:label="t('common.labels.password')"
		:rules="passwordRules"
	/>
	<VTextField type="password" label="Passwort wiederholen" />
</template>

<script setup lang="ts">
import { isOfMinLength, isRequired } from "@util-validators";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { VTextField } from "vuetify/components";

const { t } = useI18n();

// TODO: add rules for min one uppercase, one lowercase, one number, one special character
const passwordRules = computed(() => [
	isRequired("Bitte ein Passwort eingeben"),
	isOfMinLength(8)("Das Passwort muss mindestens 8 Zeichen lang sein."),
]);
</script>
