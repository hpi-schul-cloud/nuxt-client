<template>
	<footer class="footer">
		<div class="top-line">
			<span class="current-year">© {{ currentYear }} </span>
		</div>

		<div>
			<template v-for="(link, index) in links">
				<span v-if="index !== 0" :key="index"> - </span>
				<template v-if="!link.innerlinks">
					<base-link :key="link.text" class="footer-link" v-bind="link">{{
						link.text
					}}</base-link>
				</template>
				<template v-else>
					<span :key="link.text">{{ link.text }} </span>
				</template>
			</template>
		</div>
	</footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters("auth", {
			school: "getSchool",
		}),
		currentYear() {
			return new Date().getFullYear();
		},
		links() {
			return [
				{
					to: "/imprint",
					text: "Impressum",
				},
				{
					to: "/termsofuse",
					text: this.$t("components.legacy.footer.termsofuse"),
				},
			];
		},
	},
};
</script>

<style lang="scss" scoped>
.current-year {
	margin-bottom: var(--space-xs);
	font-size: var(--text-lg);
}
.footer {
	width: 100%;
	padding: 0 var(--space-md);
	margin: var(--space-lg) 0 var(--space-md);
	color: var(--color-tertiary-dark);
	text-align: center;
}
.top-line {
	display: flex;
	align-items: center;
	justify-content: center;
}
.footer-link {
	color: var(--color-secondary);
	border: none;
	&:focus,
	&:hover {
		color: var(--color-secondary-dark);
		text-decoration: underline;
	}
	&:visited {
		color: var(--color-secondary);
	}
}
</style>
