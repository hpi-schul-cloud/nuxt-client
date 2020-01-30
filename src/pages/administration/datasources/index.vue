<template>
	<div>
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="h3">{{ $t("pages.administration.datasources.index.title") }}</h1>

		<ol v-if="datasources && datasources.length > 0" class="datasources">
			<li v-for="element in datasources" :key="element._id">
				<!-- todo use from item the name -> title and type(use method) -> image -->
				<datasource-card
					:image="mapTypeToDatasourceImage(element)"
					:title="element.name"
					class="mb--md"
				>
					<template v-slot:actions>
						<BaseButton design="primary text">
							<BaseIcon source="custom" icon="datasource-import" />
							{{ $t("pages.administration.datasources.index.import") }}
						</BaseButton>
						<span class="ctx-menu">
							<BaseButton design="icon text" @click="menuOpen = element._id">
								<base-icon
									class="footer__content-icon"
									source="material"
									icon="more_vert"
								/>
							</BaseButton>
							<context-menu
								:show="menuOpen === element._id"
								anchor="top-right"
								:actions="getActions(element)"
								@update:show="menuOpen = false"
								@edit="handleEdit(element)"
								@remove="handleRemove(element)"
							/>
						</span>
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
			to="/administration/datasources/add"
			:aria-label="$t('pages.administration.datasources.index.create')"
		/>
	</div>
</template>

<script>
import ContextMenu from "@components/molecules/ContextMenu";
import DatasourceCard from "@components/molecules/DatasourceCard";
import EmptyState from "@components/molecules/EmptyState";
import FloatingFab from "@components/molecules/FloatingFab";

import ImageEmptyState from "@assets/img/emptystate-graph.svg";

import { mapGetters } from "vuex";

export default {
	components: {
		ContextMenu,
		DatasourceCard,
		EmptyState,
		FloatingFab,
	},
	meta: {
		requiredPermissions: ["DATASOURCES_VIEW"],
	},
	data() {
		return {
			breadcrumbs: [
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
			menuOpen: false,
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
		getActions(element) {
			return [
				{
					text: this.$t(
						"pages.administration.datasources.index.ctxActions.edit"
					),
					event: "edit",
					attributes: element,
				},
				{
					text: this.$t(
						"pages.administration.datasources.index.ctxActions.remove"
					),
					event: "remove",
					attributes: element,
				},
			];
		},
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
			return mapping[item.config.target];
		},
		handleEdit(source) {
			this.$router.push({
				path: "datasources/" + source.config.type + "/" + source._id + "/edit",
			});
		},
		async handleRemove(datasource) {
			try {
				await this.$store.dispatch("datasources/remove", datasource._id);
				this.$toast.success(
					this.$t("pages.administration.datasources.index.remove.success", {
						name: datasource.name,
					})
				);
			} catch (error) {
				console.error(error);
				this.$toast.error(
					this.$t("pages.administration.datasources.index.remove.error", {
						name: datasource.name,
					})
				);
			}
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
.ctx-menu {
	position: relative;
}
</style>
