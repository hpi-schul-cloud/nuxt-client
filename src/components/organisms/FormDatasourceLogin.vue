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
		</base-input>
		<slot name="inputs" :config="data.config" />
		<base-button type="submit" class="w-100" design="secondary" text
			>Verbinden</base-button
		>
	</form>
</template>

<script>
export default {
	model: {
		prop: "datasource",
		event: "update datasource",
	},
	props: {
		type: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: false,
			default: undefined,
		},
		schoolId: {
			type: String,
			required: false,
			default: undefined,
		},
		config: {
			type: Object,
			required: false,
			default: () => ({}),
		},
		/**
		 * Which Action to execute on Form Submit.
		 * Submit using a `<BaseButton type="submit">Submit</BaseButton>`
		 */
		action: {
			type: String,
			required: true,
			validator: (v) => ["create", "patch"].includes(v),
		},
	},
	data() {
		return {
			data: {
				name: this.name,
				schoolId: this.schoolId,
				config: this.config,
			},
		};
	},
	computed: {
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
		this.data.config.type = this.type;
	},
	methods: {
		submitHandler() {
			if (!this.data.schoolId) {
				this.data.schoolId = this.$user.schoolId;
			}
			switch (this.action) {
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
					this.route.params.id,
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
