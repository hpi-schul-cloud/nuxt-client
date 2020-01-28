<template>
	<div>
		<base-breadcrumb :inputs="breadcrumb" />
		<h1 class="h3">{{ $t("pages.administration.datasources.index.title") }}</h1>

		<ol v-if="datasources && datasources.length > 0" class="datasources">
			<li v-for="element in datasources" :key="element._id">
				<!-- todo use from item the name -> title and type(use method) -> image -->
				<datasource-card
					:image="mapTypeToDatasourceImage(element)"
					:title="element.name"
					class="mb--md"
				>
					<template v-slot:subtitle>
						<template v-if="element.lastStatus === 'Success'"
							>{{
								$t("pages.administraion.datasources.index.success", {
									relativeDate: dayjs(element.lastRun).fromNow(),
								})
							}}
							<BaseIcon
								source="material"
								icon="check_circle"
								fill="var(--color-success)"
						/></template>
						<template v-else-if="element.lastStatus === 'Error'"
							>{{
								$t("pages.administraion.datasources.index.error", {
									relativeDate: dayjs(element.lastRun).fromNow(),
								})
							}}
							<BaseIcon
								source="material"
								icon="warning"
								fill="var(--color-danger)"
						/></template>
						<template v-else-if="element.lastStatus === 'Pending'"
							>{{ $t("pages.administraion.datasources.index.pending") }}
							<base-spinner :color="color" size="small"
						/></template>
						<template v-else>{{
							$t("pages.administraion.datasources.index.empty")
						}}</template>
					</template>

					<template v-slot:actions>
						<BaseButton design="primary text">
							<BaseIcon source="custom" icon="datasource-import" />
							{{ $t("pages.administration.datasources.index.import") }}
						</BaseButton>
						<!-- todo use method to return icon -> the method should return the complet icon -->
						<!-- it exist different sketches with different styles how it should displayed, please ask ui -->
						<!-- <BaseIcon source="custom" icon="success" :fill="green" /> -->
					</template>
				</datasource-card>
			</li>
		</ol>
		<template v-else>
			<empty-state :image="imgsrc">
				<template v-slot:description>
					{{ $t("pages.administration.datasources.index.empty") }}
				</template>
			</empty-state>
		</template>

		<floating-fab
			position="bottom-right"
			icon="add"
			to="/administration/datasources/new"
		/>
	</div>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/de";
dayjs.locale("de");
import EmptyState from "@components/molecules/EmptyState";
import FloatingFab from "@components/molecules/FloatingFab";
import ImageEmptyState from "@assets/img/emptystate-graph.svg";
import DatasourceCard from "@components/molecules/DatasourceCard";
import { mapGetters } from "vuex";

export default {
	components: {
		EmptyState,
		FloatingFab,
		DatasourceCard,
	},
	props: {
		color: {
			type: String,
			default: "var(--color-primary)",
		},
	},
	meta: {
		requiredPermissions: ["DATASOURCES_VIEW"],
	},
	data() {
		return {
			breadcrumb: [
				{
					text: this.$t("pages.administration.index.title"),
					to: "/administration/",
					icon: { source: "fa", icon: "fas fa-cog" },
				},
				{
					text: this.$t("pages.administration.datasources.index.title"),
				},
			],
			imgsrc: ImageEmptyState,
			dayjs,
		};
	},
	computed: {
		...mapGetters("datasources", {
			datasources: "list",
		}),
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			this.$store.dispatch("datasources/find").catch((error) => {
				console.error(error);
				this.$toast.error(this.$t("error.load"));
			});
		},
		mapLastStatusIconName(item) {
			const mapping = {
				Success: "success",
				Warning: "warning",
				Error: "error",
			};
			return mapping[item.lastStatus];
		},
		mapTypeToDatasourceImage(item) {
			// todo later - check naming
			const webuntis = require("@assets/img/datasources/logo-webuntis.png");
			const ldap = require("@assets/img/datasources/logo-ldap.svg");
			const rss = require("@assets/img/datasources/logo-rss.png");
			const mapping = { webuntis, ldap, rss };
			return mapping[item.config.type];
		},
	},
	head() {
		return {
			title: this.$t("pages.administration.datasources.index.title"),
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.datasources {
	list-style: none;
}
</style>
