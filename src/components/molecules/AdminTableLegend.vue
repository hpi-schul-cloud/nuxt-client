<template>
	<div class="admin-table-legend section">
		<span v-if="showIcons" data-testid="legend-icons">
			<strong>{{ $t("components.molecules.adminfooterlegend.title") }}</strong>
			<ul class="consent-icon">
				<li v-for="icon in icons" :key="icon.icon" class="mb-2">
					<v-icon :color="icon.color">{{ icon.icon }}</v-icon>
					<span>
						{{ icon.label }}
					</span>
				</li>
			</ul>
		</span>
		<p v-if="isThr" class="mt-6">
			{{ $t("components.molecules.admintablelegend.thr") }}
		</p>
		<template v-else>
			<span v-if="showExternalSyncHint" class="wrapper">
				<strong class="external-sync-hint">
					{{ $t("components.molecules.admintablelegend.externalSync") }}
					<base-link
						class="link-style"
						to="/"
						href="https://docs.dbildungscloud.de/x/PgBVAw"
						target="_blank"
						:no-styles="true"
						traget="_blank"
					>
						{{ $t("components.molecules.admintablelegend.help") }}.
					</base-link>
				</strong>
			</span>
			<p class="mt-6">
				{{
					$t("components.molecules.admintablelegend.hint", {
						institute_title: instituteTitle,
					})
				}}
			</p>
		</template>
	</div>
</template>

<script setup lang="ts">
import { SchulcloudTheme } from "@/serverApi/v3";
import { computed } from "vue";
import { useEnvConfig, useEnvStore } from "@data-env";

type Props = {
	icons: { icon: string; color: string; label: string }[];
	showExternalSyncHint?: boolean;
	showIcons: boolean;
};

defineProps<Props>();

const instituteTitle = useEnvStore().instituteTitle;

const isThr = computed(
	() => useEnvConfig().value.SC_THEME === SchulcloudTheme.Thr
);
</script>

<style lang="scss" scoped>
$vertically-center: auto 0;

.section {
	margin-top: 24px;
}

.consent-icon {
	display: flex;
	flex-direction: column;
	align-items: left;
	justify-content: left;
	margin-top: 12px;
	margin-bottom: 32px;
	padding-left: 0;

	> li {
		list-style: none;
	}
}

.sync-symbol {
	width: 2.5rem;
	margin-right: 16px;
}

.wrapper {
	display: flex;
	justify-content: left;
}

.external-sync-hint {
	margin: $vertically-center;
}
</style>
