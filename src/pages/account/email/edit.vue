<template>
	<section>
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
			this.$toast.success("Du hast deine..");
			this.$router.push({
				path: `/account/`,
			});
		},
	},
};
</script>
