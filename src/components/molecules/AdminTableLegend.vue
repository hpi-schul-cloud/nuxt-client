<template>
	<div class="section">
		<strong>{{ $t("components.molecules.adminfooterlegend.title") }}</strong>
		<div class="consent-icon">
			<li v-for="icon in icons" :key="icon.icon" class="mb--xs">
				<span v-if="icon.style">
					<base-icon
						source="custom"
						:icon="icon.icon"
						:color="icon.color"
						:style="icon.style"
					/>
					{{ icon.label }}
				</span>

				<span v-else>
					<base-icon source="material" :icon="icon.icon" :color="icon.color" />
					{{ icon.label }}
				</span>
			</li>
		</div>
		<span v-if="showExternalSyncHint" class="container">
			<strong class="external-sync-hint">
				{{
					$t("components.molecules.admintablelegend.externalSync", {
						shortName: this.$theme.short_name,
					})
				}}
				<base-link
					class="link-style"
					to="/"
					href="https://docs.schul-cloud.org/x/PgBVAw"
					target="_blank"
					:no-styles="true"
					traget="_blank"
				>
					{{ $t("components.molecules.admintablelegend.help") }}.
				</base-link>
			</strong>
		</span>
		<p class="hint">
			{{ $t("components.molecules.admintablelegend.hint") }}
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
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

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

	> li {
		list-style: none;
	}
}

.sync-symbol {
	width: 2.5rem;
	margin-right: var(--space-md);
}

.container {
	display: flex;
	justify-content: left;
}

.hint {
	margin-top: var(--space-lg);
	color: var(--color-gray);
}

.link-style {
	color: var(--color-black);
	text-decoration: underline;
}

.external-sync-hint {
	margin: $vertically-center;
}
</style>
