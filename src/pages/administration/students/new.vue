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
			</template>
		</form-create-user>

		<!-- <base-button design="primary" @click="create">Speichern</base-button> -->
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
