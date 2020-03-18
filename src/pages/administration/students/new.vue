<template>
	<section class="section">
		<h1>Schüler:in hinzufügen</h1>
		<form-create-user>
			<template v-slot:inputs="{ userData }">
				<base-input
					v-model="userData.birthday"
					type="date"
					:label="$t('common.labels.birthdate')"
					:placeholder="$t('common.placeholder.birthdate')"
					class="mt--md"
				>
				</base-input>
				<base-input
					v-model="userData.sendRegistration"
					type="checkbox"
					name="switch"
					class="mt--xl"
					:label="$t('pages.administration.students.new.checkbox.label')"
				/>
			</template>
		</form-create-user>
	</section>
</template>

<script>
import FormCreateUser from "@components/organisms/FormCreateUser";

export default {
	components: {
		FormCreateUser,
	},
};
</script>
