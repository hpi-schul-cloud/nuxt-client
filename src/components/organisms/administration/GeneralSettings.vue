<template>
	<section>
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
						:disabled="!!school.officialSchoolNumber"
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
						:disabled="!!localSchool.county"
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
						:label="
							$t(
								'pages.administration.school.index.generalSettings.labels.cloudStorageProvider'
							)
						"
						:items="fileStorageTypes"
						item-text="name"
						item-value="type"
						dense
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
							$t("pages.administration.school.index.schoolIsCurrentlyDrawing")
						}}
						{{ localSchool.fileStorageTotal }} B.
					</p>
				</v-col>
			</v-row>
			<template v-if="loading">
				<v-skeleton-loader
					v-for="setting of 4"
					:key="setting"
					type="list-item-three-line"
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
		{{ console.log(school, localSchool) }}
	</section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { printDate } from "@plugins/datetime";
import { toBase64, dataUrlToFile } from "@utils/fileHelper.ts";
import PrivacySettings from "@components/organisms/administration/PrivacySettings";

export default {
	components: {
		PrivacySettings,
	},
	data() {
		return {
			localSchool: {
				name: "",
				officialSchoolNumber: "",
				logo: null,
				county: {},
				timezone: "",
				language: "",
				permissions: {},
				features: [],
				fileStorageType: "",
				fileStorageTotal: 0,
			},
			fileStorageTypes: [{ type: "awsS3", name: "HPI Schul-Cloud" }],
		};
	},
	computed: {
		...mapGetters("env-config", {
			availableLanguages: "getAvailableLanguages",
		}),
		...mapGetters("schools", {
			federalState: "getFederalState",
			school: "getSchool",
			fileStorageTotal: "getFileStorageTotal",
			loading: "getLoading",
		}),
		console: () => console, // TODO - delete when done
		languages() {
			return this.availableLanguages.split(",").map((lang) => {
				const name = this.$t(
					`pages.account.index.user.locale.longName.${lang}`
				);
				return { name, abbreveation: lang };
			});
		},
	},
	// TODO - watch for school changes, doesn't seem to be neccessary anymore?
	/* watch: {
		school(updatedSchool) {
			console.log("hello");
			this.localSchool = updatedSchool;
		},
	}, */
	async created() {
		this.fetchFileStorageTotal();
		this.localSchool = { ...this.school };
		this.localSchool.logo = await dataUrlToFile(
			this.school.logo_dataUrl,
			"logo"
		);
	},
	methods: {
		printDate,
		toBase64,
		dataUrlToFile,
		...mapActions("schools", ["fetchFileStorageTotal", "update"]),
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
				id: this.localSchool.id,
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
				updatedSchool.officialSchoolNumber =
					this.localSchool.officialSchoolNumber;
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
};
</script>
