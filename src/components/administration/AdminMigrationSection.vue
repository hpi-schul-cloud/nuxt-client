<template>
	<div>
		<h2 class="text-h4 mb-10">
			{{ t("components.administration.adminMigrationSection.headers") }}
		</h2>
		<v-alert light prominent text type="info">
			{{ t("components.administration.adminMigrationSection.infoText") }}
		</v-alert>
		<v-btn
			v-if="!isMigrationEnabled"
			class="my-5 button-start"
			color="primary"
			depressed
			:disabled="!isMigrationAvailable"
			@click="setMigration(true, false)"
		>
			{{ $t("components.administration.adminMigrationSection.label") }}
		</v-btn>

		<v-btn
			v-if="isMigrationEnabled"
			class="my-5 button-end"
			color="primary"
			depressed
			@click="setMigration(false, false)"
		>
			Migration abschließen
		</v-btn>

		<v-switch
			:label="'Migration verpflichtend machen'"
			:disabled="!isMigrationEnabled"
			:true-value="true"
			:false-value="false"
			:value="isMigrationMandatory"
			@change="setMigration"
		></v-switch>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { inject, Ref } from "@nuxtjs/composition-api";
import SchoolsModule from "@store/schools";
import VueI18n from "vue-i18n";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "AdminMigrationSection",
	components: {},
	setup() {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const schoolsModule: SchoolsModule | undefined =
			inject<SchoolsModule>("schoolsModule");
		if (!schoolsModule || !i18n) {
			throw new Error("Injection of dependencies failed");
		}

		const t = (key: string) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const isMigrationEnabled: Ref<boolean> = ref(
			schoolsModule.getOauthMigration ?? false
		);

		const isMigrationAvailable: Ref<boolean> = ref(
			schoolsModule.getOauthMigrationAvailable
		);

		const isMigrationMandatory: Ref<boolean> = ref(
			schoolsModule.getOauthMigrationMandatory
		);

		const setMigration = (enabled: boolean, mandatory: boolean) => {
			schoolsModule.setSchoolOauthMigration(enabled, mandatory);
		};

		return {
			isMigrationEnabled,
			setMigration,
			isMigrationAvailable,
			isMigrationMandatory,
			t,
		};
	},
});
</script>
