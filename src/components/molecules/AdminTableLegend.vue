<template>
	<div class="admin-table-legend section">
		<span v-if="showIcons" data-testid="legend-icons">
			<strong>{{ $t("components.molecules.adminfooterlegend.title") }}</strong>
			<ul class="consent-icon">
				<li v-for="icon in icons" :key="icon.icon" class="mb--xs">
					<v-icon class="material-icon" :color="icon.color">{{
						icon.icon
					}}</v-icon>
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
import { envConfigModule } from "@/store";
import { computed } from "vue";

type Props = {
	icons: { icon: string; color: string; label: string }[];
	showExternalSyncHint?: boolean;
	showIcons: boolean;
};

defineProps<Props>();

const instituteTitle = computed(() => {
	switch (envConfigModule.getTheme) {
		case SchulcloudTheme.N21:
			return "Niedersächsisches Landesinstitut für schulische Qualitätsentwicklung (NLQ)";
		case SchulcloudTheme.Thr:
			return "Thüringer Institut für Lehrerfortbildung, Lehrplanentwicklung und Medien";
		case SchulcloudTheme.Brb:
			return "Ministerium für Bildung, Jugend und Sport des Landes Brandenburg";
		default:
			return "Dataport";
	}
});

const isThr = computed(() => envConfigModule.getTheme === SchulcloudTheme.Thr);
</script>

<style lang="scss" scoped>
$vertically-center: auto 0;

.section {
	margin-top: var(--space-lg);
}

.consent-icon {
	display: flex;
	flex-direction: column;
	align-items: left;
	justify-content: left;
	margin-top: var(--space-sm);
	margin-bottom: var(--space-xl);
	padding-left: 0;

	> li {
		list-style: none;
	}
}

.sync-symbol {
	width: 2.5rem;
	margin-right: var(--space-md);
}

.wrapper {
	display: flex;
	justify-content: left;
}

.external-sync-hint {
	margin: $vertically-center;
}
</style>
