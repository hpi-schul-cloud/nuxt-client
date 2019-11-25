<script>
// Hack to render Vue components in HTML
// https://medium.com/haiiro-io/compile-markdown-as-vue-template-on-nuxt-js-1c606c15731c

import VueWithCompiler from "vue/dist/vue.esm";
export default {
	props: {
		html: {
			type: String,
			default: "",
		},
	},
	data() {
		return { templateRender: undefined };
	},
	layout: "loggedout",
	created() {
		const compiled = VueWithCompiler.compile(`<div>${this.html}</div>`);
		this.templateRender = compiled.render;
		this.$options.staticRenderFns = [];
		for (const staticRenderFunction of compiled.staticRenderFns) {
			this.$options.staticRenderFns.push(staticRenderFunction);
		}
	},
	render(createElement) {
		if (this.templateRender) {
			return this.templateRender();
		} else {
			return createElement("div", "Looading");
		}
	},
};
</script>
