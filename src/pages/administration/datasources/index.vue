<template>
	<div>
		<user-has-permission permission="DATASOURCES_VIEW">
			<base-breadcrumb :inputs="inputs" />
			<h3>Datenquellen</h3>

			<section v-if="!datasources || datasources.length === 0" class="section">
				<empty-state :image="imgsrc">
					<template v-slot:description
						>Noch keine Datenquellen vorhanden. Mit dem Plus unten rechts kannst
						du eine Datenquelle hinzufügen.
					</template>
				</empty-state>
			</section>

			<section v-if="datasources && datasources.length > 0" class="section">
				<li v-for="element in datasources"  :key="element">
					<!-- todo use from item the  name -> title and type(use method) -> image -->
					<datasource-card
						:image="require('@assets/img/logo/logo-webuntis.svg')"
						title={{ element.name }}
					>

						<template v-slot:actions>
							<BaseButton design="primary text">
								<BaseIcon source="custom" icon="datasource-import" :fill="color" />
								Datenquelle importieren
							</BaseButton>
							<!-- todo use method to return icon -> the method should return the complet icon -->
							<!-- it exist different sketches with different styles how it should displayed, please ask ui -->
							<BaseIcon source="custom" icon="success" :fill="green" />
						</template>
					</datasource-card>
				</li>
			</section>

			<floating-fab
				:position="position"
				:icon="icon"
				to="/administration/datasources/add"
			/>
		</user-has-permission>
	</div>
</template>

<script>
import BaseBreadcrumb from "@components/base/BaseBreadcrumb";
import EmptyState from "@components/molecules/EmptyState";
import FloatingFab from "@components/molecules/FloatingFab";
import ExampleImage from "@assets/img/emptystate-graph.svg";
import UserHasPermission from "@components/helpers/UserHasPermission";
import DatasourceCard from "@components/molecules/DatasourceCard";
import { mapGetters } from "vuex";

export default {
	components: {
		BaseBreadcrumb,
		EmptyState,
		FloatingFab,
		UserHasPermission,
		DatasourceCard,
	},
	data() {
		return {
			inputs: [
				{
					text: "Admin",
					to: "/administration/",
					icon: { source: "fa", icon: "fas fa-cog" },
				},
				{
					text: "Systeme",
					href: "http://schul-cloud.org",
				},
				{
					text: "Datenquellen",
					to: "/administration/datasources",
				},
			],
			imgsrc: ExampleImage,
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
			this.$store.dispatch("datasources/find");
		},
		mapLastStatusIconName(item) {
			const mapping = {
				Success: 'success',
				Warning: 'warning',
				Error: 'error',
			};
			return mapping[item.lastStatus];
		},
		mapTypeToDatasourceImage(item) {
			// todo later - check naming
			const webuntis = require('@assets/img/logo/logo-webuntis.svg');
			const ldap = require('@assets/img/logo/logo-ldap.svg');
			const rss = require('@assets/img/logo/logo-rss.svg');
			const mapping = { webuntis, ldap, rss };
			return mapping[item.config.type];
		}
	},
	head() {
		return {
			title: "Datenquellen",
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
