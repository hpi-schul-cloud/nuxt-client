<template>
	<VMenu location="bottom end" :close-on-content-click="false">
		<template #activator="{ props }">
			<VBtn
				v-bind="props"
				icon
				variant="text"
				color="info"
				:aria-label="$t('pages.administration.students.infobox.registrationOnly.headline')"
			>
				<VIcon class="ma-0" size="20">{{ mdiInformation }}</VIcon>
			</VBtn>
		</template>
		<VCard class="info-menu-card">
			<VCardTitle data-testid="infobox-title">
				<h6 class="my-2">
					{{
						isConsentNecessary
							? $t("pages.administration.students.infobox.headline")
							: $t("pages.administration.students.infobox.registrationOnly.headline")
					}}
				</h6>
			</VCardTitle>
			<VCardText>
				<template v-if="isConsentNecessary">
					<div v-if="showExternalText">
						<p>
							{{ $t("pages.administration.students.infobox.LDAP.paragraph-1") }}
							{{ $t("pages.administration.students.infobox.LDAP.paragraph-2") }}
						</p>
						<p>
							<v-icon color="rgba(var(--v-theme-error))" :icon="mdiAlert" />
							{{ $t("pages.administration.students.infobox.LDAP.paragraph-3") }}
							{{ $t("pages.administration.students.infobox.LDAP.paragraph-4") }}
							<a href="https://docs.dbildungscloud.de/pages/viewpage.action?pageId=36700189" target="_blank">
								{{ $t("pages.administration.students.infobox.LDAP.helpsection") }}.
							</a>
						</p>
					</div>
					<div v-else>
						<p>{{ $t("pages.administration.students.infobox.paragraph-1") }}</p>
						<ul class="pl-5 mb-2">
							<li>{{ $t("pages.administration.students.infobox.li-1") }}</li>
							<li>{{ $t("pages.administration.students.infobox.li-2") }}</li>
							<li>{{ $t("pages.administration.students.infobox.li-3") }}</li>
							<a
								href="https://s3.hidrive.strato.com/cloud-instances/default/Dokumente/Einwilligungserklaerung_analog.pdf"
								target="_blank"
							>
								{{ $t("pages.administration.students.infobox.more.info") }}.
							</a>
						</ul>
						<p>
							{{ $t("pages.administration.students.infobox.paragraph-2") }}
							{{ $t("pages.administration.students.infobox.paragraph-3") }}
						</p>
						<p>
							<v-icon color="rgba(var(--v-theme-error))" :icon="mdiAlert" />
							{{ $t("pages.administration.students.infobox.paragraph-4") }}
						</p>
					</div>
				</template>
				<template v-else>
					<p>
						{{ $t("pages.administration.students.infobox.registrationOnly.paragraph-1") }}
						{{ $t("pages.administration.students.infobox.registrationOnly.paragraph-2") }}
						{{ $t("pages.administration.students.infobox.registrationOnly.paragraph-3") }}
					</p>
					<ul class="pl-5 mb-2">
						<li>{{ $t("pages.administration.students.infobox.registrationOnly.li-1") }}</li>
						<li>{{ $t("pages.administration.students.infobox.registrationOnly.li-2") }}</li>
						<li>{{ $t("pages.administration.students.infobox.registrationOnly.li-3") }}</li>
						<li>{{ $t("pages.administration.students.infobox.registrationOnly.li-4") }}</li>
					</ul>
				</template>
			</VCardText>
		</VCard>
	</VMenu>
</template>

<script setup lang="ts">
import { useEnvConfig } from "@data-env";
import { mdiAlert, mdiInformation } from "@icons/material";
import { computed } from "vue";
import { VBtn } from "vuetify/components";

defineProps<{
	showExternalText?: boolean;
}>();

const isConsentNecessary = computed(() => useEnvConfig().value.FEATURE_CONSENT_NECESSARY);
</script>
<style lang="css" scoped>
.info-menu-card {
	min-width: 320px;
	max-width: 450px;
	background: white !important;

	.v-card-title,
	.v-card-text {
		background: rgba(var(--v-theme-info), 0.12) !important;
	}
}
</style>
