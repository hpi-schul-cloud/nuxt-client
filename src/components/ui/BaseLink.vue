<template>
	<a
		v-if="href"
		class="link is-external"
		:class="{inactive: inactive}"
		:href="href"
		v-bind="$attrs"
		target="_blank"
		rel="noreferrer"
	>
		<slot />
	</a>
	<!-- TODO use RouterLink if used outside nuxt -->
	<NuxtLink v-else class="link" :class="{inactive: inactive}" tag="a" :to="routerLinkTo" v-bind="$attrs">
		<slot />
	</NuxtLink>
</template>

<script>
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
		name: {
			type: String,
			default: "",
		},
		params: {
			type: Object,
			default: () => ({}),
		},
		inactive: {
			type: Boolean,
		}
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
				if (!/^\w+:/.test(this.href)) {
					return console.warn(
						`Invalid href <base-link>: ${
							this.href
						}.\nIf you're trying to link to a local URL, provide at least a name or to`
					);
				}
				// Check for insecure URL in href.
				if (!this.allowInsecure && !/^(https|mailto|tel):/.test(this.href)) {
					return console.warn(
						`Insecure href <base-link>: ${
							this.href
						}.\nWhen linking to external sites, always prefer https URLs. If this site does not offer SSL, explicitly add the allow-insecure attribute on <base-link>.`
					);
				}
			} else {
				// Check for insufficient props.
				if (!this.name && !this.to) {
					return console.warn(
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
@import "@styles";

.link {
	display: inline;
	color: var(--color-black);
	text-decoration: none;
	cursor: pointer;
	border-bottom: 2px solid var(--color-gray);
	&:hover,
	&:focus {
		color: var(--color-primary-dark);
	}
	&:visited {
		color: var(--color-primary);
	}
	&.inactive {
		color: var(--color-black);
	}

}


.is-external {
	border: none;
	&:active {
		color: var(--color-black);
	}
	&:hover {
		color: var(--color-primary-dark);
	}
	&.inactive {
		color: var(--color-black);
	}

}
</style>
