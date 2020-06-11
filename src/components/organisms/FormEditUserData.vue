<template>
	<form autocomplete="off" v-on="$listeners" @submit.prevent="submitHandler">
		<slot name="inputs" />
		<div class="action">
			<base-button
				class="mt--lg mr--md"
				design="text"
				text
				data-testid=""
				@click.prevent="$router.go(-1)"
			>
				{{ $t("common.actions.cancel") }}
			</base-button>
			<base-button
				type="submit"
				class="mt--lg"
				design="secondary"
				data-testid=""
			>
				<slot />
			</base-button>
		</div>
	</form>
</template>

<script>
export default {
	props: {
		userId: {
			type: String,
			required: false,
			default: undefined,
		},
	},

	data() {
		return {};
	},

	methods: {
		submitHandler() {
			this.$emit("onFormSubmit");
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.action {
	float: right;
}
</style>
