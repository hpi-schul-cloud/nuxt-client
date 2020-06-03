<template>
	<section>
		<h1 class="mb--md h3">
			{{ $t("pages.account.index.title") }}
		</h1>
		<account-card
			:heading="$t('pages.account.index.user.data')"
			:data="this.$user.firstName + ' ' + this.$user.lastName"
		>
			<template v-slot:icon>
				<base-icon
					source="material"
					icon="account_circle"
					style="font-size: var(--heading-3); color: var(--color-tertiary);"
				/>
			</template>
			{{ $t("pages.account.button.user.data") }}
		</account-card>
		<account-card
			:heading="$t('pages.account.index.user.email')"
			:data="this.$user.email"
		>
			<template v-if="newEmail && newEmail.email" v-slot:notification>
				<p>das ist ihre akutelle Email Adresse</p>
				{{ newEmail }}
			</template>
			<template v-slot:icon>
				<base-icon
					source="material"
					icon="mail"
					style="font-size: var(--heading-3); color: var(--color-tertiary);"
				/>
			</template>
			{{ $t("pages.account.button.user.email") }}
		</account-card>

		<account-card :heading="$t('pages.account.index.user.password')">
			<template v-slot:icon>
				<base-icon
					source="material"
					icon="lock"
					style="font-size: var(--heading-3); color: var(--color-tertiary);"
				/>
			</template>
			{{ $t("pages.account.button.user.password") }}
		</account-card>
	</section>
</template>

<script>
import AccountCard from "@components/molecules/AccountCard";
// import { mapGetters } from "vuex";

export default {
	components: {
		AccountCard,
	},
	async asyncData({ store }) {
		return {
			newEmail: await store.dispatch("activation/getActivationMail"),
		};
	},
};
</script>
