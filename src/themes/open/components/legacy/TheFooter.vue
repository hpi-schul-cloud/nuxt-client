<template>
	<footer class="footer">
		<div class="top-line">
			<img
				class="hpi-logo"
				src="@assets/img/footer-logo.png"
				alt="Anbieterlogo"
			/>
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
					<template v-for="(innerlink, innerindex) in link.innerlinks">
						<span v-if="innerindex !== 0" :key="`${index}-${innerindex}`">
							-
						</span>
						<base-link
							:key="innerlink.text"
							v-bind="innerlink"
							class="footer-link"
							>{{ innerlink.text }}</base-link
						>
					</template>
				</template>
			</template>
		</div>
			<p class="bottom-line">
			Made with
			<span class="heart">❤</span> in Potsdam
		</p>
	</footer>
</template>

<script>
import { mapState } from "vuex";
import defaultDocuments from "@utils/documents.js";

export default {
	computed: {
		...mapState("auth", {
			school: "school",
		}),
		currentYear() {
			return new Date().getFullYear();
		},
		links() {
			return [
				{
					to: "/impressum",
					text: "Impressum",
				},
				{
					innerlinks: [
						{
							to: "/datenschutz",
							text: "Datenschutzerklärung HPI",
						},
						{
							href: defaultDocuments.specificFiles(this.school.documentBaseDir)
								.privacyExemplary,
							text: "Datenschutzerklärung: Schule",
							target: "_blank",
							rel: "noopener",
						},
					],
				},
					{
					href: "https://github.com/schul-cloud/",
					text: "GitHub",
				},
			];
		},
	},
};
</script>

<style lang="scss" scoped>

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
.bottom-line {
	margin-top: var(--space-xs);

	.heart {
		color: var(--color-secondary);
	}
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
