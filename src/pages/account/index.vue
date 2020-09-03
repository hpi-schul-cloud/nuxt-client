<template>
	<section>
		<h1 class="mb--md h3">
			{{ $t("pages.account.index.title") }}
		</h1>
		<account-card
			:heading="$t('pages.account.index.user.data')"
			:data="currentUser.fullName"
			:target-path="`/account/name/edit`"
			:readonly="isStudent || thirdPartyLogin"
			data-testid="account_card_name"
		>
			<template v-slot:icon>
				<base-icon
					source="material"
					icon="account_circle"
					class="account-icon"
				/>
			</template>
		</account-card>

		<account-card
			:heading="$t('pages.account.index.user.email')"
			:data="currentUser.email"
			:target-path="`/account/email/edit`"
			:readonly="thirdPartyLogin"
			data-testid="account_card_email"
		>
			<template v-if="!!newEmail" v-slot:new-mail>
				{{ $t("pages.account.current.mail") }}
			</template>
			<template v-if="!!newEmail" v-slot:notification>
				<div class="info-box">
					<p>{{ $t("pages.account.index.info.mail", { newEmail }) }}</p>
				</div>
			</template>
			<template v-slot:icon>
				<base-icon source="material" icon="mail" class="account-icon" />
			</template>
		</account-card>

		<account-card
			:heading="$t('pages.account.index.user.password')"
			:target-path="`/account/password/edit`"
			:readonly="thirdPartyLogin"
			data-testid="account_card_password"
		>
			<template v-slot:icon>
				<base-icon
					source="material"
					icon="lock"
					style="
						margin-top: calc(0.1 * (var(--space-xs)));
						margin-right: var(--space-xs);
						font-size: var(--heading-4);
						color: var(--color-black);
					"
				/>
			</template>
		</account-card>

		<account-card
			v-if="!isStudent"
			:heading="$t('pages.account.index.user.teams')"
			:data="$t('pages.account.index.user.teams.placeholder')"
			:target-path="`/account/teams`"
		>
			<template v-slot:icon>
				<base-icon
					source="fa"
					icon="users"
					style="
						margin-top: calc(0.8 * (var(--space-xs)));
						margin-right: var(--space-sm);
						font-size: var(--heading-5);
						color: var(--color-black);
					"
				/>
			</template>
		</account-card>

		<account-card
			:heading="$t('pages.account.index.user.thirdPartyProviders')"
			data=""
			:target-path="`/account/thirdPartyProviders`"
		>
			<template v-slot:icon>
				<base-icon
					source="material"
					icon="vpn_key"
					style="
						margin-top: calc(0.1 * (var(--space-xs)));
						margin-right: var(--space-xs);
						font-size: var(--heading-4);
						color: var(--color-black);
					"
				/>
			</template>
		</account-card>
		<account-card
			:heading="$t('pages.account.index.user.locale')"
			:data="currentUser.language"
			:target-path="`/account/locale/edit`"
			data-testid="account_card_locale"
		>
			<template v-slot:icon>
				<base-icon source="material" icon="language" class="account-icon" />
			</template>
			<template v-slot:data>
				<p>
					<base-icon
						source="custom"
						:icon="`flag_${$t(
							`pages.account.index.user.locale.longName.${languageName}`
						)}`"
						class="flag-icon"
					></base-icon>
					<span>
						{{ $t(`pages.account.index.user.locale.longName.${languageName}`) }}
					</span>
				</p>
			</template>
		</account-card>
		<p v-if="thirdPartyLogin" class="info">
			<base-icon source="material" icon="info" fill="var(--color-info)" />
			{{ $t("pages.account.index.thirdParty.info") }}
		</p>
	</section>
</template>

<script>
import AccountCard from "@components/molecules/AccountCard";

export default {
	components: {
		AccountCard,
	},
	meta: {
		requiredPermissions: ["ACCOUNT_EDIT"],
	},
	data() {
		return {
			currentUser: {},
			unconfirmedChanges: [],
		};
	},
	computed: {
		languageName() {
			return this.currentUser.language;
		},
		thirdPartyLogin() {
			return !!this.$user?.externallyManaged;
		},
		isStudent() {
			return this.$user?.roles.some((role) => role.name === "student");
		},
		newEmail() {
			return this.unconfirmedChanges.find(
				(change) => change.keyword === "eMailAddress"
			)?.data;
		},
	},
	created(ctx) {
		this.populateUser();
	},
	methods: {
		async populateUser() {
			try {
				this.currentUser = await this.$store.dispatch("auth/populateUser");
				this.unconfirmedChanges = (
					await this.$store.dispatch("activation/find")
				).entry;
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.info-box {
	padding: var(--space-sm);
	margin-bottom: var(--space-md);
	font-size: var(--text-sm);
	color: var(--color-white);
	background-color: var(--color-info);
	border-radius: var(--radius-sm);

	p {
		margin: 0;
	}
}
.info {
	margin-top: var(--space-lg);
	font-size: var(--text-sm);
	font-weight: var(--font-weight-weight);
	color: var(--color-gray-dark);
}
.account-icon {
	margin-top: calc(0.3 * (var(--space-xs))) !important;
	margin-right: var(--space-xs) !important;
	font-size: var(--heading-4);
	color: var(--color-black);
}
.flag-icon {
	margin-top: calc(-4 * var(--border-width));
}
</style>
