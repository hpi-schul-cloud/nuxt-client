<template>
	<div>
		<base-input
			v-for="lang in languages"
			:key="lang"
			v-model="value"
			:value="lang"
			:label="lang"
			type="radio"
			name="radio"
			@click.native="changeLanguage(lang)"
		/>
	</div>
</template>
<script>
export default {
	data: () => ({
		languages: ["de", "en"],
		value: "de",
	}),
	methods: {
		changeLanguage: function (lang) {
			this.$store.commit("i18n/SET_LANG", lang);
			this.$i18n.locale = lang;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
