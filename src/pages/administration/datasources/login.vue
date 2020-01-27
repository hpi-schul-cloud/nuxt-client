<template>
	<div>
		<base-breadcrumb :inputs="inputs" />
		<h3>WebUnits verbinden</h3>
		<div class="container">
			<img
				class="logo-image"
				src="@assets/img/datasources/logo-webuntis-text.svg"
			/>

			<form-datasource-login action="create">
				<template v-slot:inputs="{ setValue, getValue }">
					<base-input
						:vmodel="getValue('username') || ''"
						type="text"
						label="Benutzername"
						:placeholder="'WebUntis Nutzername'"
						@update:vmodel="setValue('username', $event)"
					>
					</base-input>

					<base-input
						:vmodel="getValue('password') || ''"
						type="password"
						label="Passwort"
						:placeholder="'WebUntis Passwort'"
						@update:vmodel="setValue('password', $event)"
					></base-input>
					<base-input
						:vmodel="getValue('url') || ''"
						type="text"
						label="URL"
						:placeholder="'erato.webuntis.com'"
						@update:vmodel="setValue('url', $event)"
					></base-input>
				</template>
			</form-datasource-login>
		</div>
	</div>
</template>
<script>
import FormDatasourceLogin from "@components/organisms/FormDatasourceLogin";
export default {
	components: {
		FormDatasourceLogin,
	},
	data() {
		return {
			image: "@assets/img/logo/logo-webuntis-text.svg",
			inputs: [
				{
					text: "Admin",
					to: "/administration/",
					icon: { source: "fa", icon: "fas fa-cog" },
				},
				{
					text: "Datenquellen",
					to: "/administration/datasources",
				},
				{
					text: "Hinzufügen",
					to: "/administration/datasources/add",
				},
				{
					text: "Login",
					to: "/administration/datasources/login",
				},
			],
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>
