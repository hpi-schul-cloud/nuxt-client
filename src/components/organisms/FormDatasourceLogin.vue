<template>
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
		<slot name="inputs" />
	</form>
</template>

<script>
import dayjs from "dayjs";

export default {
	model: {
		prop: "datasource",
		event: "update datasource",
	},
	props: {
		config: {
			type: Object,
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
				name: "",
				schoolId: "",
				config: {},
			},
		};
	},
	computed: {
		publishDate() {
			if (!this.data.date.date || !this.data.date.time) {
				return undefined;
			}
			const date = dayjs(
				`${this.data.date.date} ${this.data.date.time}`,
				"YYYY-MM-DD HH:MM"
			);
			return date.toISOString();
		},
		// TODO: rewrite error messages and varibles
		errors() {
			const name = this.data.name
				? undefined
				: this.$t("components.organisms.For datasource.errors.missing_title");
			const content = this.data.content
				? undefined
				: this.$t("components.organisms.For datasource.errors.missing_content");
			return {
				name,
				content,
			};
		},
	},
	methods: {
		submitHandler() {
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
				await this.$store.dispatch("datasource/create", {
					name: this.data.name,
					schoolId: this.data.schoolId,
					config: this.props.config,
				});
				//TODO: change text
				this.$toast.success(
					this.$t("components.organisms.For datasource.success.create")
				);
			} catch (e) {
				console.error(e);
				//TODO: change text
				this.$toast.error(
					this.$t("components.organisms.For datasource.errors.create")
				);
			}
		},
		async patch() {
			const errors = Object.values(this.errors).filter((a) => a);
			if (errors.length) {
				return this.$toast.error(errors[0]);
			}
			try {
				await this.$store.dispatch("datasource/patch", [
					this.route.params.id,
					{
						name: this.data.name,
						schoolId: this.data.schoolId,
						config: this.props.config,
					},
				]);
				// TODO: change text
				this.$toast.success(
					this.$t("components.organisms.For datasource.success.patch")
				);
			} catch (e) {
				console.error(e);
				// TODO: chnage text
				this.$toast.error(
					this.$t("components.organisms.For datasource.errors.patch")
				);
			}
		},

		async cancel() {
			this.$dialog.confirm({
				message: this.$t(
					"components.organisms.For datasource.cancel.confirm.message"
				),
				icon: "warning",
				cancelText: this.$t(
					"components.organisms.For datasource.cancel.confirm.cancel"
				),
				confirmText: this.$t(
					"components.organisms.For datasource.cancel.confirm.confirm"
				),
				actionDesign: "success",
				iconColor: "var(--color-danger)",
				invertedDesign: true,
				onConfirm: this.confirmCancelHandler,
			});
		},
		async confirmCancelHandler() {
			const cancelTarget = this.$route.params.id
				? {
						name: "datasource-id",
						params: { id: this.$route.params.id },
				  }
				: {
						name: "datasource",
				  };
			this.$router.push(cancelTarget);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
