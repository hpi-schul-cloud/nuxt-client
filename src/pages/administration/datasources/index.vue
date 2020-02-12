<!-- eslint-disable max-lines -->
<template>
	<div>
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">{{
			$t("pages.administration.datasources.index.title")
		}}</h1>

		<ol v-if="datasources && datasources.length > 0" class="datasources">
			<!-- TODO remove dummies once all datasources are added here -->
			<li>
				<datasource-card
					:image="mapTypeToDatasourceImage({ config: { target: 'rss' } })"
					title="RSS"
					class="mb--md"
				>
					<template v-slot:actions>
						<!-- <BaseButton
							design="primary text"
							@click="handleManageOldDatasourceClick"
						>
							<BaseIcon source="custom" icon="datasource-import" />
							{{ $t("pages.administration.datasources.index.importRedirect") }}
						</BaseButton> -->
						<responsive-button
							design="primary text"
							source="custom"
							icon="datasource-import"
							@click="handleManageOldDatasourceClick"
						>
							{{ $t("pages.administration.datasources.index.importRedirect") }}
						</responsive-button>
					</template>
				</datasource-card>
			</li>
			<li>
				<datasource-card
					:image="mapTypeToDatasourceImage({ config: { target: 'ldap' } })"
					title="LDAP"
					class="mb--xl-3"
				>
					<template v-slot:actions>
						<!-- <BaseButton
							design="primary text"
							@click="handleManageOldDatasourceClick"
						>
							<BaseIcon source="custom" icon="datasource-import" />
							{{ $t("pages.administration.datasources.index.importRedirect") }}
						</BaseButton> -->
						<responsive-button
							design="primary text"
							source="custom"
							icon="datasource-import"
							@click="handleManageOldDatasourceClick"
						>
							{{ $t("pages.administration.datasources.index.importRedirect") }}
						</responsive-button>
					</template>
				</datasource-card>
			</li>
			<li v-for="element in datasources" :key="element._id">
				<!-- todo use from item the name -> title and type(use method) -> image -->
				<datasource-card
					:image="mapTypeToDatasourceImage(element)"
					:title="element.name"
					class="mb--md"
				>
					<template v-slot:subtitle>
						<template v-if="element.lastStatus === 'Success'">
							{{
								$t("pages.administraion.datasources.index.success", {
									relativeDate: dayjs(element.lastRun).fromNow(),
								})
							}}
							<BaseIcon
								source="material"
								icon="check_circle"
								fill="var(--color-success)"
							/>
						</template>
						<template v-else-if="element.lastStatus === 'Error'">
							{{
								$t("pages.administraion.datasources.index.error", {
									relativeDate: dayjs(element.lastRun).fromNow(),
								})
							}}
							<BaseIcon
								source="custom"
								icon="warning"
								fill="var(--color-danger)"
								class="text-md"
							/>
						</template>
						<template v-else-if="element.lastStatus === 'Pending'">
							{{ $t("pages.administraion.datasources.index.pending") }}
							<base-spinner
								:color="color"
								size="small"
								:style="{ 'margin-left': 'var(--space-xs-3)' }"
							/>
						</template>
						<template v-else>
							{{ $t("pages.administraion.datasources.index.empty") }}
						</template>
					</template>

					<template v-slot:actions>
						<!-- <BaseButton design="primary text">
							<BaseIcon source="custom" icon="datasource-import" />
							{{ $t("pages.administration.datasources.index.import") }}
						</BaseButton> -->
						<responsive-button
							design="primary text"
							source="custom"
							icon="datasource-import"
							@click="handleManageOldDatasourceClick"
						>
							{{ $t("pages.administration.datasources.index.import") }}
						</responsive-button>
						<span class="ctx-menu">
							<BaseButton design="icon text" @click="menuOpen = element._id">
								<base-icon
									class="context-menu-icon"
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
			<pagination
				class="mt--xl-3"
				:current-page="page"
				:per-page="pagination.limit"
				:total="pagination.total"
				@update:current-page="onPageChange"
				@update:per-page="onCurrentPageChange"
			/>
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
import Pagination from "@components/organisms/Pagination";
import ResponsiveButton from "@components/base/ResponsiveButton";
import ImageEmptyState from "@assets/img/emptystate-graph.svg";

import { mapGetters, mapState } from "vuex";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/de";
dayjs.locale("de");

export default {
	components: {
		ContextMenu,
		DatasourceCard,
		EmptyState,
		FloatingFab,
		Pagination,
		ResponsiveButton,
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
			dayjs,
			menuOpen: false,
			page: 1,
			limit: localStorage.getItem("datasources_overview_limit") || 5,
		};
	},
	computed: {
		...mapGetters("datasources", {
			datasources: "list",
		}),
		...mapState("datasources", {
			pagination: (state) => state.pagination.default,
		}),
	},
	created(ctx) {
		this.find();

		// TODO: dispatch action
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
			const query = {
				$limit: this.limit,
				$skip: (this.page - 1) * this.limit,
				$sort: {
					// TODO sort for targets
					createdAt: 1,
				},
			};
			this.$store.dispatch("datasources/find", { query }).catch((error) => {
				console.error(error);
				this.$toast.error(this.$t("error.load"));
			});
		},
		mapTypeToDatasourceImage(item) {
			// todo later - check naming
			const webuntis = require("@assets/img/datasources/logo-webuntis.png");
			const ldap = require("@assets/img/datasources/logo-ldap.svg");
			const rss = require("@assets/img/datasources/logo-rss.svg");
			const mapping = { webuntis, ldap, rss };
			return mapping[item.config.target] || "";
		},
		handleManageOldDatasourceClick() {
			this.$router.push({
				path: "/administration/school",
			});
		},
		handleEdit(source) {
			this.$router.push({
				path:
					"datasources/" + source.config.target + "/" + source._id + "/edit",
			});
		},
		async handleRemove(datasource) {
			this.$dialog.confirm({
				icon: "warning",
				actionDesign: "success",
				iconColor: "var(--color-danger)",
				invertedDesign: true,
				message: this.$t(
					"pages.administration.datasources.index.remove.confirm.message",
					{
						name: datasource.name,
					}
				),
				confirmText: this.$t(
					"pages.administration.datasources.index.remove.confirm.btnText",
					{
						name: datasource.name,
					}
				),
				cancelText: this.$t(
					"components.organisms.FormNews.remove.confirm.cancel"
				),
				onConfirm: async () => {
					try {
						await this.$store.dispatch("datasources/remove", datasource._id);
						this.$toast.success(
							this.$t("pages.administration.datasources.index.remove.success", {
								name: datasource.name,
							})
						);
						// if last element on list -> move one page back
						if (
							this.page * this.limit > this.pagination.total &&
							this.page > 1
						) {
							this.page--;
						}
						// show fully populated list
						this.find();
					} catch (error) {
						console.error(error);
						this.$toast.error(
							this.$t("pages.administration.datasources.index.remove.error", {
								name: datasource.name,
							})
						);
					}
				},
			});
		},
		onPageChange(page) {
			this.page = page;
			this.find();
		},
		onCurrentPageChange(limit) {
			this.page = 1;
			this.limit = limit;
			// save user settings in localStorage
			localStorage.setItem("datasources_overview_limit", limit);
			this.find();
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
.context-menu-icon {
	color: var(--color-tertiary);
}
</style>
