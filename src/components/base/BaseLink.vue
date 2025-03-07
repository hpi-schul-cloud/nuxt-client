<template>
	<a
		v-if="href"
		:class="{
			link: !noStyles,
			'is-external': !noStyles,
			'text-only': noStyles,
		}"
		:href="href"
		v-bind="$attrs"
		:target="linkTarget"
		:rel="external ? 'noreferrer' : undefined"
	>
		<slot />
	</a>
	<!-- TODO use RouterLink if used outside nuxt -->
	<router-link
		v-else
		:class="{ link: !noStyles, 'text-only': noStyles }"
		:to="routerLinkTo"
		v-bind="$attrs"
	>
		<slot />
	</router-link>
</template>

<script>
import { Logger } from "@util-logger";

export default {
	inheritAttrs: false,
	props: {
		href: {
			type: String,
			default: "",
		},
		allowInsecure: {
			type: Boolean,
		},
		to: {
			type: [Object, String],
			default: null,
		},
		target: {
			type: String,
			default: "_self",
			validator: function (value) {
				return ["_blank", "_self", "_parent", "_top"].includes(value);
			},
		},
		name: {
			type: String,
			default: "",
		},
		params: {
			type: Object,
			default: () => ({}),
		},
		noStyles: {
			type: Boolean,
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	computed: {
		routerLinkTo({ name, params }) {
			if (name) {
				return {
					name,
					params,
					...(this.to || {}),
				};
			} else {
				return this.to;
			}
		},
		linkTarget() {
			return this.target
				? this.target
				: this.href.startsWith("/")
					? "_self" // fallback should stay on same page
					: "_blank"; // external links should be in new window opened
		},
		external() {
			return this.href && !this.href.startsWith("/");
		},
	},
	created() {
		this.validateProps();
	},
	methods: {
		// Perform more complex prop validations than is possible
		// inside individual validator functions for each prop.
		validateProps() {
			if (process.env.NODE_ENV === "production") return;

			if (this.href) {
				// Check for non-external URL in href.
				/*
				// currently used for the legacy fallback. Therefore disabled
				if (!/^\w+:/.test(this.href)) {
					return console.warn(
						`Invalid href <base-link>: ${this.href}.\nIf you're trying to link to a local URL, provide at least a name or to`
					);
				}
				*/
				// Check for insecure URL in href.
				if (
					!this.allowInsecure &&
					!/^(https:|mailto:|tel:|\/)/.test(this.href)
				) {
					return Logger.warn(
						`Insecure href <base-link>: ${this.href}.\nWhen linking to external sites, always prefer https URLs. If this site does not offer SSL, explicitly add the allow-insecure attribute on <base-link>.`
					);
				}
			} else {
				// Check for insufficient props.
				if (!this.name && !this.to) {
					return Logger.warn(
						`Invalid props <base-link>:\n\n${JSON.stringify(
							this.$props,
							null,
							2
						)}\n\nEither a \`name\` or \`to\` is required for internal links, or an \`href\` for external links.`
					);
				}
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.text-only {
	text-decoration: none;
}

.link {
	display: inline;
	color: rgba(var(--v-theme-primary));
	text-decoration: none;
	cursor: pointer;
	border-bottom: 2px solid rgba(var(--v-theme-grey));

	&:hover,
	&:focus {
		color: rgba(var(--v-theme-primary-darken-1));
	}

	&:visited {
		color: rgba(var(--v-theme-primary));
	}
}

.is-external {
	border: none;

	&:active {
		color: rgba(var(--v-theme-primary-darken-1));
	}

	&:hover {
		color: rgba(var(--v-theme-primary-darken-1));
	}
}
</style>
