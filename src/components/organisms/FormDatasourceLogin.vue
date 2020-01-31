<template>
	<form v-on="$listeners" @submit.prevent="submitHandler">
		<base-input
			v-model="data.name"
			type="text"
			:label="$t('components.organisms.FormDatasources.input.name.label')"
			:placeholder="
				$t('components.organisms.FormDatasources.input.name.placeholder')
			"
			class="mt--md"
		>
			<template v-slot:icon>
				<base-icon source="custom" icon="server" />
			</template>
		</base-input>
		<slot name="inputs" :config="data.config" />
		<base-button type="submit" class="w-100 mt--lg" design="secondary" text>{{
			$t("components.organisms.FormDatasources.btn.connect")
		}}</base-button>
	</form>
</template>

<script>
export default {
	model: {
		prop: "datasource",
		event: "update datasource",
	},
	props: {
		id: {
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
				config: {},
			},
		};
	},
	computed: {
		actionType() {
			return this.$route.params.id ? "patch" : "create";
		},
		errors() {
			const name = this.data.name
				? undefined
				: this.$t("components.organisms.FormDatasources.errors.missing_name");
			const schoolId = this.data.schoolId
				? undefined
				: this.$t(
						"components.organisms.FormDatasources.errors.missing_hidden_data"
				  );
			return {
				name,
				schoolId,
			};
		},
	},
	created() {
		this.data.config.target = this.type;
		if (this.$route.params.id) this.get(this.$route.params.id);
	},
	methods: {
		async get(id) {
			this.data = JSON.parse(
				JSON.stringify(await this.$store.dispatch("datasources/get", id))
			);
		},
		submitHandler() {
			if (!this.data.schoolId) {
				this.data.schoolId = this.$user.schoolId;
			}
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
					schoolId: this.data.schoolId,
					config: this.data.config,
				});
				this.$toast.success(
					this.$t("components.organisms.FormDatasources.success.create")
				);
			} catch (e) {
				console.error(e);
				this.$toast.error(
					this.$t("components.organisms.FormDatasources.errors.create")
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
					this.$route.params.id,
					{
						name: this.data.name,
						schoolId: this.data.schoolId,
						config: this.data.config,
					},
				]);
				this.$toast.success(
					this.$t("components.organisms.FormDatasources.success.patch")
				);
			} catch (e) {
				console.error(e);
				this.$toast.error(
					this.$t("components.organisms.FormDatasources.errors.patch")
				);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
