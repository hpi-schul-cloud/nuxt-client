<template>
	<form autocomplete="off" v-on="$listeners" @submit.prevent="submitHandler">
		<slot name="inputs" />
		<div class="action">
			<base-button
				class="mt--lg mr--md action-btn"
				design="outline"
				text
				data-testid=""
				@click="cancelHandler"
				@click.prevent="$router.go(-1)"
			>
				{{ $t("common.actions.cancel") }}
			</base-button>
			<base-button
				type="submit"
				class="mt--lg action-btn"
				design="secondary"
				data-testid=""
			>
				{{ submitButton }}
			</base-button>
		</div>
	</form>
</template>

<script>
export default {
	props: {
		submitButton: {
			type: String,
			required: true,
		},
	},
	data() {
		return {};
	},
	methods: {
		cancelHandler() {
			this.$emit("onFormCancel");
			console.log("CANCEL");
		},
		submitHandler() {
			console.log("onFormSubmit");
			this.$emit("onFormSubmit");
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.action {
	display: flex;
	justify-content: space-between;
}

.action-btn {
	width: 100%;
}
</style>
