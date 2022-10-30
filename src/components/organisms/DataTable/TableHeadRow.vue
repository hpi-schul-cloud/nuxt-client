<template>
	<tr class="table__row">
		<th v-if="allRowsSelectable">
			<div class="th-wrap select-wrap">
				<base-input
					v-model="selectionStatus"
					type="checkbox"
					label="Alle Zeilen auswählen"
					:label-hidden="true"
					class="select"
					:show-undefined-state="true"
					style="color: var(--v-secondary-base)"
				/>
			</div>
		</th>
		<th
			v-for="(column, index) in columns"
			:key="index"
			class="th-slot"
			cellspacing="0"
			:data-testid="column.label"
		>
			<slot
				:name="`headcolumn-${columns[index].field.replace(/\./g, '-')}`"
				:label="column.label"
				:sortable="column.sortable"
				:sortBy="sortBy"
				:sortOrder="sortOrder"
			>
				<span v-if="column.infobox">
					<span class="info-slot">
						<base-button
							class="info-button"
							style="background-color: transparent"
							design="info text icon"
							@click="infoBoxActive = !infoBoxActive"
						>
							<base-icon source="material" icon="info" style="margin: 0" />
						</base-button>
					</span>
					<info-box
						v-if="isConsentNecessary"
						class="info-box"
						:active.sync="infoBoxActive"
					>
						<template #header>{{
							$t("pages.administration.students.infobox.headline")
						}}</template>
						<template #body>
							<div v-if="showExternalText" class="content">
								{{
									$t("pages.administration.students.infobox.LDAP.paragraph-1")
								}}
								<br />
								<br />
								{{
									$t("pages.administration.students.infobox.LDAP.paragraph-2")
								}}
								<br />
								<br />
								<base-icon
									source="material"
									icon="warning"
									color="var(--v-error-base)"
								/>{{
									$t("pages.administration.students.infobox.LDAP.paragraph-3")
								}}
								<br />
								<br />
								{{
									$t("pages.administration.students.infobox.LDAP.paragraph-4")
								}}
								<base-link
									class="link-style"
									style="color: var(--v-white-base); text-decoration: underline"
									to="/"
									href="https://docs.dbildungscloud.de/pages/viewpage.action?pageId=36700189"
									target="_blank"
									:no-styles="true"
									traget="_blank"
								>
									{{
										$t(
											"pages.administration.students.infobox.LDAP.helpsection"
										)
									}}.
								</base-link>
							</div>
							<div v-else class="content">
								{{ $t("pages.administration.students.infobox.paragraph-1") }}
								<ul class="list">
									<li>
										{{ $t("pages.administration.students.infobox.li-1") }}
									</li>
									<li>
										{{ $t("pages.administration.students.infobox.li-2") }}
									</li>
									<li>
										{{ $t("pages.administration.students.infobox.li-3") }}
									</li>
									<base-link
										class="link-style"
										style="
											color: var(--v-white-base);
											text-decoration: underline;
										"
										to="/"
										href="https://s3.hidrive.strato.com/cloud-instances/default/Dokumente/Einwilligungserklaerung_analog.pdf"
										target="_blank"
										:no-styles="true"
										traget="_blank"
									>
										{{ $t("pages.administration.students.infobox.more.info") }}.
									</base-link>
								</ul>
								{{ $t("pages.administration.students.infobox.paragraph-2") }}
								<br />
								<br />
								{{ $t("pages.administration.students.infobox.paragraph-3") }}
								<br />
								<br />
								<base-icon
									source="material"
									icon="warning"
									color="var(--v-error-base)"
								/>{{ $t("pages.administration.students.infobox.paragraph-4") }}
							</div>
						</template>
					</info-box>
					<info-box v-else class="info-box" :active.sync="infoBoxActive">
						<template #header>{{
							$t(
								"pages.administration.students.infobox.registrationOnly.headline"
							)
						}}</template>
						<template #body>
							<div class="content">
								{{
									$t(
										"pages.administration.students.infobox.registrationOnly.paragraph-1"
									)
								}}
								<br />
								<br />
								{{
									$t(
										"pages.administration.students.infobox.registrationOnly.paragraph-2"
									)
								}}
								<br />
								<br />
								{{
									$t(
										"pages.administration.students.infobox.registrationOnly.paragraph-3"
									)
								}}
								<br />
								<br />
								<ul class="list">
									<li>
										{{
											$t(
												"pages.administration.students.infobox.registrationOnly.li-1"
											)
										}}
									</li>
									<li>
										{{
											$t(
												"pages.administration.students.infobox.registrationOnly.li-2"
											)
										}}
									</li>
									<li>
										{{
											$t(
												"pages.administration.students.infobox.registrationOnly.li-3"
											)
										}}
									</li>
									<li>
										{{
											$t(
												"pages.administration.students.infobox.registrationOnly.li-4"
											)
										}}
									</li>
								</ul>
							</div>
						</template>
					</info-box>
				</span>
				<BaseButton
					v-if="column.sortable"
					:class="{
						'is-current-sort': sortBy === column.field,
						'is-sortable': column.sortable,
					}"
					design="none"
					class="th-wrap"
					@click.stop="sort(column)"
				>
					<span>{{ column.label }}</span>
					<base-icon
						v-if="sortBy === column.field"
						:icon="sortOrder === 'asc' ? 'sort-up' : 'sort-down'"
						source="custom"
					/>
					<base-icon v-else-if="column.sortable" icon="sort" source="custom" />
				</BaseButton>
				<div v-else class="th-wrap">
					<span>{{ column.label }}</span>
				</div>
			</slot>
		</th>
	</tr>
</template>

<script>
import BaseButton from "@/components/base/BaseButton";
import InfoBox from "@/components/molecules/InfoBox";
import { envConfigModule } from "@/store";

const selectionStateMap = new Map([
	[true, "all"],
	[undefined, "some"],
	[false, "none"],
	["all", true],
	["some", undefined],
	["none", false],
]);

export default {
	components: {
		InfoBox,
	},
	props: {
		allRowsSelectable: Boolean,
		currentPageSelectionState: {
			type: String,
			required: true,
			validator: (value) => ["all", "some", "none"].includes(value),
		},
		columns: {
			type: Array,
			default: () => [],
		},
		sortBy: {
			type: String,
			default: "",
		},
		sortOrder: {
			type: String,
			default: "asc",
			validator: (val) => ["asc", "desc"].includes(val),
		},
		showExternalText: {
			type: Boolean,
		},
	},
	data() {
		return {
			infoBoxActive: false,
		};
	},
	computed: {
		selectionStatus: {
			get() {
				return selectionStateMap.get(this.currentPageSelectionState);
			},
			set(state) {
				this.$emit(
					"update:current-page-selection-state",
					selectionStateMap.get(state)
				);
			},
		},
		isConsentNecessary() {
			return envConfigModule.getEnv.FEATURE_CONSENT_NECESSARY;
		},
	},
	methods: {
		getColumnWrapperComponent(column) {
			return column.sortable ? BaseButton : "div";
		},
		invertSortOrder(currentOrder) {
			return currentOrder === "desc" ? "asc" : "desc";
		},
		sort(column) {
			// invert sort order if clicked again
			const newSortOrder =
				column.field === this.sortBy
					? this.invertSortOrder(this.sortOrder)
					: "asc";
			/**
			 * will toggle if a new sort is requested by the user
			 *
			 * @event update:sort
			 * @type {String} contains the field value of the selected column
			 * @type {String} represent the new desired sort order ("asc" or "desc")
			 */
			this.$emit("update:sort", column.field, newSortOrder);
			/**
			 * helper event for the .sync modifier
			 *
			 * @event update:sort-by
			 * @type {String} contains the field value of the selected column
			 */
			this.$emit("update:sort-by", column.field);
			/**
			 * helper event for the .sync modifier
			 *
			 * @event update:sort-order
			 * @type {String} represent the new desired sort order ("asc" or "desc")
			 */
			this.$emit("update:sort-order", newSortOrder);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.table__row {
	font-weight: var(--font-weight-bold);

	th {
		border-bottom: calc(2 * var(--border-width)) solid var(--v-secondary-base);

		&.is-current-sort {
			opacity: 1;
		}

		.th-wrap {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			padding: var(--space-xs);
			font-size: var(--text-md);
			font-weight: var(--font-weight-normal);

			svg {
				font-size: calc(1.5 * var(--text-lg));
				color: var(--v-secondary-base);
			}
		}

		.select-wrap {
			padding: var(--space-xs);

			.select {
				margin-bottom: 0;
			}
		}
	}
}

.info-box {
	position: absolute;
	right: 0%;
	z-index: calc(var(--layer-fab) + 1);
	min-width: 320px;
	margin-top: var(--space-xl-2);
	margin-right: var(--space-lg);
	margin-left: var(--space-lg);

	@include breakpoint(tablet) {
		min-width: 450px;
		max-width: 50%;
		margin-right: var(--space-xl);
	}

	.content {
		max-height: 35vh;
		overflow-y: scroll;
		font-weight: var(--font-weight-normal);
	}

	button:not(.is-none):focus {
		z-index: var(--layer-fab);
		outline: none;
		box-shadow: 0 0 0 0 var(--v-white-base), 0 0 0 3px var(--button-background);
	}
}

.th-slot {
	position: relative;
}

.info-slot {
	position: absolute;
	top: -20%;
	left: 56%;
}
</style>
