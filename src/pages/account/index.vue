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
		</account-card>
		<account-card
			:heading="$t('pages.account.index.user.email')"
			:data="this.$user.email"
		>
			<template v-if="newEmail && newEmail.email" v-slot:new-mail>
				<p>ist die aktuelle primäre Email Adresse</p>
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
					style="font-size: var(--heading-3); color: var(--color-tertiary);"
				/>
			</template>
		</account-card>

		<account-card :heading="$t('pages.account.index.user.password')">
			<template v-slot:icon>
				<base-icon
					source="material"
					icon="lock"
					style="font-size: var(--heading-3); color: var(--color-tertiary);"
				/>
			</template>
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

<style lang="scss" scoped>
@import "@styles";

.info-box {
	padding: var(--space-sm);
	font-size: var(--text-sm);
	color: var(--color-white);
	background-color: var(--color-info);
	border-radius: var(--radius-sm);

	p {
		margin: 0;
	}
}
</style>
