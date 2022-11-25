<template>
	<div v-if="isMigrationEnabled">
		test
		<v-switch label="Hallo Welt"></v-switch>
		<!--		<v-switch :label="$t('pages.courses.index.courses.arrangeCourses')></v-switch>-->
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";
import EnvConfigModule from "@store/env-config";
import { inject } from "@nuxtjs/composition-api";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "SystemMigrationSection",
	components: {},
	/* props: {
		enableIfEnvExists: {
			type: Boolean,
			required: false,
		},
	}, */
	setup() {
		const envConfigModule: EnvConfigModule | undefined =
			inject<EnvConfigModule>("envConfigModule");
		if (!envConfigModule) {
			throw new Error("Injection of dependencies failed");
		}
		const isMigrationEnabled = computed(() => {
			envConfigModule.getEnv.FEATURE_SCHOOL_SANIS_USER_MIGRATION_ENABLED;
		});
		return {
			isMigrationEnabled,
		};
	},
});
</script>
