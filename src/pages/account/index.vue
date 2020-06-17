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
		>
			<template v-slot:icon>
				<base-icon
					source="material"
					icon="account_circle"
					style="font-size: var(--heading-3); color: var(--color-black);"
				/>
			</template>
		</account-card>

		<account-card
			:heading="$t('pages.account.index.user.email')"
			:data="currentUser.email"
			:target-path="`/account/email/edit`"
			:readonly="thirdPartyLogin"
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
				<base-icon
					source="material"
					icon="mail"
					style="font-size: var(--heading-3); color: var(--color-black);"
				/>
			</template>
		</account-card>

		<account-card
			:heading="$t('pages.account.index.user.password')"
			:target-path="`/account/password/edit`"
			:readonly="thirdPartyLogin"
		>
			<template v-slot:icon>
				<base-icon
					source="material"
					icon="lock"
					style="font-size: var(--heading-3); color: var(--color-black);"
				/>
			</template>
		</account-card>

		<account-card
			v-if="!isStudent"
			:heading="$t('pages.account.index.user.teams')"
			data="Sichtbarkeit für Teameinladungen"
			:target-path="`/account/teams`"
		>
			<template v-slot:icon>
				<base-icon
					source="fa"
					icon="users"
					style="font-size: var(--heading-3); color: var(--color-black);"
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
					style="font-size: var(--heading-3); color: var(--color-black);"
				/>
			</template>
		</account-card>
		<p v-if="thirdPartyLogin">
			Deine Nutzerdaten werden von einem zentralen Identitätsmanagement (IDM)
			synchronisiert. Änderungen daran können nur in dem Ausgangssystem erfolgen
			(z.B. Schulserver), das den Daten im IDM zugrunde liegt. Bitte wende dich
			an den lokalen Administrator deiner Schule, um Änderungen an deinen
			Nutzerdaten vorzunehmen.
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
				this.currentUser = await this.$store.dispatch(
					"auth/populateUser",
					this.$user?.accountId
				);
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
</style>
