<template>
	<section>
		<h1 class="mb--md h3">
			{{ $t("pages.account.index.title") }}
		</h1>
		<account-card
			:heading="$t('pages.account.index.user.data')"
			:data="fullName"
			:target-path="`/account/name/edit`"
			:mode="isStudent ? 'readonly' : 'editable'"
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
			:data="this.$user.email"
			:target-path="`/account/email/edit`"
		>
			<template v-if="newEmail && newEmail.email" v-slot:new-mail>
				ist die aktuelle primäre Email Adresse
			</template>
			<template v-if="newEmail && newEmail.email" v-slot:notification>
				<div class="info-box">
					<p>
						Deine neue Email {{ newEmail.email }} muss noch bestätigt werden.
						Bitte folge den Anweisungen in der Bestätigungsmail, welche an die
						neue Adresse versand wurde.
					</p>
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
		>
			<template v-slot:icon>
				<base-icon
					source="material"
					icon="lock"
					style="font-size: var(--heading-3); color: var(--color-black);"
				/>
			</template>
		</account-card>

		<user-has-role :role="isNotStudent">
			<account-card
				:heading="$t('pages.account.index.user.teams')"
				data="Sichtbarkeit für Teameinladungen"
				:target-path="`/account/teams`"
			>
				<template v-slot:icon>
					<base-icon
						source="material"
						icon="people"
						style="font-size: var(--heading-3); color: var(--color-black);"
					/>
				</template>
			</account-card>
		</user-has-role>

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
	</section>
</template>

<script>
import AccountCard from "@components/molecules/AccountCard";
import UserHasRole from "@components/helpers/UserHasRole";
// import { mapGetters } from "vuex";

export default {
	components: {
		AccountCard,
		UserHasRole,
	},
	async asyncData({ store }) {
		return {
			//   newEmail: await store.dispatch("activation/getActivationMail"),
			//currentUser: await store.dispatch("auth/authenticate"),
		};
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	computed: {
		fullName() {
			return `${this.$user?.firstName} ${this.$user?.lastName}`;
		},
		thirdPartyLogin() {
			return this.$user?.systemId;
		},
		isStudent() {
			return this.$user?.roles.some((role) => role.name === "student");
		},
	},

	created() {},
	methods: {
		isNotStudent(roles) {
			return roles.some((role) => role !== "student");
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
