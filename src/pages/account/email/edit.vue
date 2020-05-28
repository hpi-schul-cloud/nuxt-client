<template>
	<section>
		<form-edit-user-data>
			<template v-slot:inputs="{ userData }">
				<base-input
					v-model="userData.Email"
					type="email"
					:label="$t('common.labels.email')"
					:placeholder="$t('common.placeholder.email.update')"
					class="mt--md"
					data-testid=""
				>
				</base-input>
				<base-input
					v-model="userData.Email"
					type="email"
					:label="$t('common.labels.email')"
					:placeholder="$t('common.placeholder.email.confirmation')"
					class="mt--md"
					data-testid=""
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
};
</script>
