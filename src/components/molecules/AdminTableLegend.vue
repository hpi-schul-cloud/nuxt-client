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
		<p class="text-grey mt-6">
			{{
				$t("components.molecules.admintablelegend.hint", {
					institute_title: setInstituteTitle,
				})
			}}
		</p>
	</div>
</template>

<script>
export default {
	props: {
		icons: {
			type: Array,
			required: true,
		},
		showExternalSyncHint: {
			type: Boolean,
		},
		showIcons: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	computed: {
		setInstituteTitle() {
			switch (process.env.SC_THEME) {
				case "n21":
					return "Landesinitiative n-21: Schulen in Niedersachsen online e.V.";
				case "thr":
					return "Thüringer Institut für Lehrerfortbildung, Lehrplanentwicklung und Medien";
				case "brb":
					return "Ministerium für Bildung, Jugend und Sport des Landes Brandenburg";
				default:
					return "Dataport";
			}
		},
	},
};
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

.link-style {
	color: rgba(var(--v-theme-black));
	text-decoration: underline;
}

.external-sync-hint {
	margin: $vertically-center;
}
</style>
