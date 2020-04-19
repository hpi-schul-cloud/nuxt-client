<template>
	<form autocomplete="off" v-on="$listeners" @submit.prevent="submitHandler">
		<base-input
			v-model="data.name"
			name="name"
			type="text"
			required="true"
			:label="$t('common.labels.name')"
			:placeholder="
				$t('components.organisms.FormDatasourcesLogin.input.name.placeholder')
			"
			class="mt--md"
		>
			<template v-slot:icon>
				<base-icon source="custom" icon="server" />
			</template>
		</base-input>
		<slot name="inputs" :config="data.config" />
		<base-button type="submit" class="w-100 mt--lg" design="secondary" text>
			<span v-if="actionType === 'create'">{{
				$t("components.organisms.FormDatasourcesLogin.btn.connect")
			}}</span>
			<span v-else>{{
				$t("components.organisms.FormDatasourcesLogin.btn.update")
			}}</span>
		</base-button>
	</form>
</template>

<script>
export default {
	props: {
		datasourceId: {
			type: String,
			required: false,
			default: undefined,
		},
		type: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			data: {
				name: "",
				schoolId: "",
				config: {
					target: this.type,
				},
			},
		};
	},
	computed: {
		actionType() {
			return this.datasourceId ? "patch" : "create";
		},
		errors() {
			const name = this.data.name
				? undefined
				: this.$t(
						"components.organisms.FormDatasourcesLogin.errors.missing_name"
				  );
			//TODO: check target and config (test against json schema!?)
			const config =
				Object.keys(this.data.config).length !== 0
					? undefined
					: this.$t(
							"components.organisms.FormDatasourcesLogin.errors.missing_config"
					  );
			return {
				name,
				config,
			};
		},
	},
	created() {
		if (this.datasourceId) this.get(this.datasourceId);
	},
	methods: {
		async get(id) {
			try {
				this.data = JSON.parse(
					JSON.stringify(await this.$store.dispatch("datasources/get", id))
				);
			} catch (e) {
				console.error(e);
				this.$toast.error(
					this.$t("components.organisms.FormDatasourcesLogin.errors.get")
				);
			}
		},
		submitHandler() {
			switch (this.actionType) {
				case "create": {
					this.create();
					break;
				}
				case "patch": {
					this.patch();
					break;
				}
			}
		},
		async create() {
			const errors = Object.values(this.errors).filter((a) => a);
			if (errors.length) {
				return this.$toast.error(errors[0]);
			}
			try {
				await this.$store.dispatch("datasources/create", {
					name: this.data.name,
					schoolId: this.$user.schoolId,
					config: this.data.config,
				});
				this.$toast.success(
					this.$t("components.organisms.FormDatasourcesLogin.success.create")
				);
				this.$router.push({
					path: "/administration/datasources",
				});
			} catch (e) {
				console.error(e);
				this.$toast.error(
					this.$t("components.organisms.FormDatasourcesLogin.errors.create")
				);
			}
		},
		async patch() {
			const errors = Object.values(this.errors).filter((a) => a);
			if (errors.length) {
				return this.$toast.error(errors[0]);
			}
			try {
				await this.$store.dispatch("datasources/patch", [
					this.datasourceId,
					{
						name: this.data.name,
						schoolId: this.$user.schoolId,
						config: this.data.config,
					},
				]);
				this.$toast.success(
					this.$t("components.organisms.FormDatasourcesLogin.success.patch")
				);
				this.$router.push({
					path: "/administration/datasources",
				});
			} catch (e) {
				console.error(e);
				this.$toast.error(
					this.$t("components.organisms.FormDatasourcesLogin.errors.patch")
				);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
