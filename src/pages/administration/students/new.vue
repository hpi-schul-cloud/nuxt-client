<template>
	<section class="section">
		<h1>Schüler:in hinzufügen</h1>
		<form-create-user>
			<template v-slot:inputs="{ userData }">
				<base-input
					v-model="userData.birthday"
					type="date"
					:label="'Geburtstag'"
					:placeholder="'29.3.2004'"
					class="mt--md"
				>
				</base-input>
				<base-input
					v-model="userData.sendRegistration"
					type="checkbox"
					name="switch"
					class="mt--xl"
					:label="'Nach dem Hinzufügen Registrierungslink an Schüler senden'"
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
