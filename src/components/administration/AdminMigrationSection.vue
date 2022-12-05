<template>
	<div>
		<h2 class="text-h4 mb-10">
			{{ t("components.administration.adminMigrationSection.headers") }}
		</h2>
		<v-alert light prominent text type="info">
			{{ t("components.administration.adminMigrationSection.infoText") }}
		</v-alert>
		<v-switch
			:label="t('components.administration.adminMigrationSection.label')"
			:disabled="!isMigrationAvailable"
			:true-value="true"
			:false-value="false"
			:value="isMigrationEnabled"
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

		const isMigrationEnabled: Ref<boolean | undefined > = ref(
			schoolsModule.getOauthMigration
		);
		const isMigrationAvailable: Ref<boolean> = ref(
			schoolsModule.getOauthMigrationAvailable
		);

		const setMigration = (value: boolean) => {
			schoolsModule.setSchoolOauthMigration(value);
		};

		return {
			isMigrationEnabled,
			setMigration,
			isMigrationAvailable,
			t,
		};
	},
});
</script>
