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
  props: {
    defaultLanguage: {
      type: String,
      default: "de"
    },
  },
	data() {
		return {
			languages: ["de", "en"],
			value: this.defaultLanguage,
		};
	},
	methods: {
		changeLanguage: function (lang) {
			this.$store.commit("auth/setLocale", lang);
      this.$i18n.locale = lang;
    },
	}
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
