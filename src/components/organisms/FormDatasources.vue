<template>
	<div>
		<slot name="logo" />
		<h4>Bitte gib deine Zugangsdaten ein</h4>
		<p
			>Bitte verwende keine privaten Konten. Für die Einbindung der Datenquelle
			ist ein nicht personenbezogener Account</p
		>

		<form v-on="$listeners" @submit.prevent="submitHandler">
			<base-input
				v-model="data.name"
				type="text"
				:label="$t('components.organisms.FormDatasources.input.name.label')"
				:placeholder="
					$t('components.organisms.FormDatasources.input.name.placeholder')
				"
			>
				<base-icon slot="icon" :source="iconSource" :icon="icon" />
			</base-input>
			<base-input
				v-model="data.username"
				type="text"
				:label="username"
				:placeholder="'WebUntis Nutzername'"
			>
				<base-icon slot="icon" :source="iconSource" :icon="icon" />
			</base-input>
			<base-input
				v-model="data.password"
				type="password"
				:label="password"
				:placeholder="'WebUntis Passwort'"
			>
				<base-icon slot="icon" :source="iconSource" :icon="icon" />
			</base-input>
			<base-input
				v-model="data.url"
				type="text"
				:label="url"
				:placeholder="'erato.webuntis.com'"
			>
				<base-icon slot="icon" :source="iconSource" :icon="icon" />
			</base-input>
		</form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			data: {
				name: "",
				username: "",
				password: "",
				url: "",
			},
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
