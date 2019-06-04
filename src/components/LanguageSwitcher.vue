<template>
	<div>
		<base-select
			v-model="content"
			:multiple="false"
			:options="options"
			track-by="_id"
			label="Language"
			option-label="name"
			:placeholder="this.$i18n.locale"
		/>
		<button @click="changeLanguage">Change Language</button>
	</div>
</template>
<script>
import Vuex from "vuex";

export default {
	data: () => ({
		content: [],
		options: [{ value: "de", name: "DE" }, { value: "en", name: "EN" }],
	}),
	methods: {
		changeLanguage: function() {
			if (content.length > 0) {
				this.$i18n.locale = this.content;
				this.$store.commit("i18n/SET_LANG", this.content);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
