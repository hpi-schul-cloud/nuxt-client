<template>
	<v-container class="flex-col justify-center" fluid>
		<vuetify-breadcrumbs :breadcrumbs="breadcrumbs"></vuetify-breadcrumbs>
		<v-container class="container-max-width">
			<h1 class="text-h3">
				{{ $t("pages.administration.school.index.title") }}
			</h1>
			<h2 class="text-h4">
				{{ $t("common.words.schoolYear") }}
				{{ school.currentYear.name }}
			</h2>
			<p>
				{{
					$t(
						"pages.administration.school.index.longText.provideStudentsAndTheirParents"
					)
				}}
			</p>
			<v-divider class="mt-10 mb-13"></v-divider>
			<v-row>
				<v-col>
					<h2 class="text-h4 mb-10">
						{{ $t("pages.administration.school.index.generalSettings") }}
					</h2>
					<v-form>
						<v-row>
							<v-col>
								<v-text-field
									v-model="localSchool.name"
									:label="
										$t(
											'pages.administration.school.index.generalSettings.labels.nameOfSchool'
										)
									"
									dense
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field
									v-model="localSchool.officialSchoolNumber"
									:label="
										$t(
											'pages.administration.school.index.generalSettings.labels.schoolNumber'
										)
									"
									dense
									:disabled="school.officialSchoolNumber ? true : false"
									:hint="
										$t(
											'pages.administration.school.index.generalSettings.changeSchoolValueWarning'
										)
									"
									persistent-hint
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-select
									v-model="localSchool.county"
									:label="
										$t(
											'pages.administration.school.index.generalSettings.labels.chooseACounty'
										)
									"
									:items="federalState.counties"
									item-text="name"
									item-value="_id"
									return-object
									dense
									:disabled="localSchool.county ? true : false"
									:hint="
										$t(
											'pages.administration.school.index.generalSettings.changeSchoolValueWarning'
										)
									"
									persistent-hint
								></v-select>
							</v-col>
						</v-row>
						<v-row>
							<v-col class="d-flex">
								<v-file-input
									v-model="localSchool.logo"
									:label="
										$t(
											'pages.administration.school.index.generalSettings.labels.uploadSchoolLogo'
										)
									"
									dense
									prepend-icon=""
								></v-file-input>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field
									v-model="localSchool.timezone"
									:label="
										$t(
											'pages.administration.school.index.generalSettings.labels.timezone'
										)
									"
									dense
									disabled
									:hint="
										$t(
											'pages.administration.school.index.generalSettings.timezoneHint'
										)
									"
									persistent-hint
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-select
									v-model="localSchool.language"
									:label="
										$t(
											'pages.administration.school.index.generalSettings.labels.language'
										)
									"
									:items="languages"
									item-text="name"
									item-value="abbreveation"
									dense
									:hint="
										$t(
											'pages.administration.school.index.generalSettings.languageHint'
										)
									"
									persistent-hint
								></v-select>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-select
									v-model="localSchool.fileStorageType"
									:items="fileStorageTypes"
									item-text="name"
									item-value="type"
									dense
									label="Cloud-Storage-Anbieter"
								></v-select>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<h4 class="subtitle-1 font-weight-bold my-0">
									{{ $t("pages.administration.school.index.usedFileStorage") }}
								</h4>
								<p class="body-1">
									{{
										$t(
											"pages.administration.school.index.schoolIsCurrentlyDrawing"
										)
									}}
									{{ localSchool.fileStorageTotal }} B.
								</p>
							</v-col>
						</v-row>

						<template v-if="loading">
							<v-skeleton-loader
								v-for="setting of 4"
								:key="setting"
								:type="'list-item-three-line'"
							/>
						</template>
						<privacy-settings
							v-else
							:privacy-settings="{
								permissions: localSchool.permissions,
								features: localSchool.features,
							}"
							@update-privacy-settings="updatePrivacySettings"
						></privacy-settings>
						<v-btn class="my-5" color="primary" depressed @click="save">
							{{ $t("pages.administration.school.index.generalSettings.save") }}
						</v-btn>
					</v-form>
					<school-policies v-if="schoolPolicyEnabled"></school-policies>
					<!-- <h2 class="text-h4">Authentifizierung</h2>
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Alias</th>
										<th class="text-left">Typ</th>
										<th class="text-left"></th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in dataProtectionPolicies" :key="item.name">
										<td>{{ item.title }}</td>
										<td>{{ item.description }}</td>
										<td>{{ item.consentDataId }}</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
						<v-btn color="primary" depressed>System hinzufügen</v-btn> -->
					<rss-feeds></rss-feeds>
				</v-col>
			</v-row>
		</v-container>
		{{ console.log(school, localSchool) }}
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { printDate } from "@plugins/datetime";
import { toBase64, dataUrlToFile } from "@utils/fileHelper.ts";
import RssFeeds from "@components/organisms/administration/RssFeeds";
import SchoolPolicies from "@components/organisms/administration/SchoolPolicies";
//import VuetifyBreadcrumbs from "@components/molecules/VuetifyBreadcrumbs";
import PrivacySettings from "@components/organisms/administration/PrivacySettings";

export default {
	components: {
		RssFeeds,
		SchoolPolicies,
	//	VuetifyBreadcrumbs,
		PrivacySettings,
	},
	layout: "defaultVuetify",
	data() {
		return {
			localSchool: {
				name: "",
				officialSchoolNumber: "",
				logo: null,
				county: {},
				timezone: "",
				language: "",
				permissions: {
					teacher: {
						STUDENT_LIST: false,
					},
					student: {
						LERNSTORE_VIEW: false,
					},
				},
				features: [],
				fileStorageType: "",
				fileStorageTotal: 0,
			},
			languages: [
				{ name: "System-Default (Deutsch)", abbreveation: "sys" },
				{ name: "Deutsch", abbreveation: "de" },
				{ name: "Englisch", abbreveation: "en" },
				{ name: "Spanisch", abbreveation: "es" },
			],
			fileStorageTypes: [{ type: "awsS3", name: "HPI Schul-Cloud" }],
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					href: "/administration/",
				},
				{
					text: this.$t("pages.administration.school.index.title"),
					disabled: true,
				},
			],
		};
	},
	computed: {
		...mapGetters("auth", {
			user: "getUser",
		}),
		...mapGetters("schools", {
			school: "getSchool",
			fileStorageTotal: "getFileStorageTotal",
			loading: "getLoading",
		}),
		...mapGetters("federal-states", {
			federalState: "getCurrentFederalState",
		}),
		...mapGetters("systems", {
			systems: "getSystems",
		}),
		...mapGetters("env-config", {
			schoolPolicyEnabled: "getSchoolPolicyEnabled",
		}),
		console: () => console, // TODO - delete when done
	},
	// TODO - watch for school changes
	/* watch: {
		school(updatedSchool) {
			console.log("hello");
			this.localSchool = updatedSchool;
		},
	}, */
	async created() {
		this.fetchCurrentFederalState(this.school.federalState);
		this.fetchFileStorageTotal();

		/* this.fetchSetOfSystems(this.school.systems).then(() => {
			console.log("blub", JSON.parse(JSON.stringify(this.systems)));
		}); */

		this.localSchool.name = this.school.name;
		this.localSchool.officialSchoolNumber = this.school.officialSchoolNumber;
		this.localSchool.county = this.school.county;
		this.localSchool.logo = await dataUrlToFile(
			this.school.logo_dataUrl,
			"logo"
		);
		this.localSchool.timezone = this.school.timezone || "Europe/Berlin";
		this.localSchool.language = this.school.language;
		this.localSchool.permissions = { ...this.school.permissions };
		this.localSchool.features = [...this.school.features];
		this.localSchool.fileStorageType = this.school.fileStorageType;
	},
	methods: {
		printDate,
		toBase64,
		dataUrlToFile,
		...mapActions("federal-states", ["fetchCurrentFederalState"]),
		...mapActions("schools", ["fetchFileStorageTotal", "update"]),
		...mapActions("systems", ["fetchSetOfSystems"]),
		updatePrivacySettings(value, settingName) {
			const keys = settingName.split(".");
			if (keys[0] === "features") {
				if (value) {
					this.localSchool.features.push(keys[1]);
				} else {
					this.localSchool.features = this.localSchool.features.filter(
						(feature) => feature !== keys[1]
					);
				}
			}
			if (keys[0] === "permissions") {
				const newPermissions = {
					...this.localSchool.permissions,
					[keys[1]]: {
						[keys[2]]: value,
					},
				};
				this.localSchool.permissions = newPermissions;
			}
		},
		async save() {
			const updatedSchool = {
				id: this.school.id,
				name: this.localSchool.name,
				language: this.localSchool.language,
				fileStorageType: this.localSchool.fileStorageType,
				permissions: this.localSchool.permissions,
				features: this.localSchool.features,
			};
			if (
				!this.school.officialSchoolNumber &&
				this.localSchool.officialSchoolNumber
			) {
				updatedSchool.officialSchoolNumber = this.localSchool.officialSchoolNumber;
			}
			if (!this.school.county && this.localSchool.county._id) {
				updatedSchool.county = this.localSchool.county._id;
			}
			if (this.localSchool.logo) {
				updatedSchool.logo_dataUrl = await toBase64(this.localSchool.logo);
			} else {
				updatedSchool.logo_dataUrl = "";
			}
			console.log("updated", updatedSchool);
			this.update(updatedSchool);
		},
	},
	head() {
		return {
			title: `${this.$t("pages.administration.school.index.title")} - ${
				this.$theme.short_name
			}`,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.container-max-width {
	max-width: var(--size-content-width-max);
}

.relative {
	position: relative;
}
</style>
