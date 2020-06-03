<template>
	<section>
		<h1 class="mb--md h3">E-Mail-Adresse ändern</h1>
		<strong>Deine aktuelle E-mail-Adresse lautet:</strong>
		<p>{{ this.$user.email }}</p>
		<form-edit-user-data @success="success" @error="error">
			<template v-slot:inputs="{ userData }">
				<base-input
					v-model="userData.email"
					type="email"
					:label="$t('common.labels.email')"
					:placeholder="$t('common.placeholder.email.update')"
					class="mt--md"
					data-testid="jjjjjjj"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="mail"
							fill="var(--color-tertiary)"
						/>
					</template>
				</base-input>
				<base-input
					v-model="userData.repeatEmail"
					type="email"
					:label="$t('common.labels.repeat.email')"
					:placeholder="$t('common.placeholder.repeat.email')"
					class="mt--md"
					data-testid="jjjjjjj"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="mail"
							fill="var(--color-tertiary)"
						/>
					</template>
				</base-input>
			</template>
		</form-edit-user-data>
	</section>
</template>

<script>
import FormEditUserData from "@components/organisms/FormEditUserData";

export default {
	components: {
		FormEditUserData,
	},
	methods: {
		error() {
			this.$toast.error("Leider ist etwas schief gegangen");
		},
		success() {
			this.$router.push({
				path: `/account/`,
			});
		},
	},
};
</script>
