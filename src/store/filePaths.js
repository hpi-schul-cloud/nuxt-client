const specificFiles = {
	privacyExemplary:
		"Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf",
	privacy: "Onlineeinwilligung/Datenschutzerklaerung-Onlineeinwilligung.pdf",
	termsOfUseExemplary:
		"Onlineeinwilligung/Nutzungsordnung-HPI-Schule-Schueler-Onlineeinwilligung.pdf",
	termsOfUse: "Onlineeinwilligung/Nutzungsordnung-Onlineeinwilligung.pdf",
	termsOfUseSchool:
		"Willkommensordner/Datenschutz/Nutzungsordnung-HPI-Schule-Schueler.pdf",
	analogConsent: "Dokumente/Einwilligungserklaerung_analog.pdf",
};

const globalFiles = {
	BeschreibungDerSchulCloud: "Dokumente/Beschreibung-der-HPI-Schul-Cloud.pdf",
	TechnischerBericht2019:
		"Dokumente/Die-HPI-Schul-Cloud_Roll-Out-einer-Cloud-Architektur-für-Schulen-in-Deutschland.pdf",
	BroschuereSCimUnterricht1:
		"Willkommensordner/Begleitmaterial/Broschuere_Die-Schul-Cloud-im-Unterricht-Fachuebergreifende-Unterrichtsszenarien-und-Methoden.pdf",
	BroschuereSCimUnterricht2:
		"Willkommensordner/Begleitmaterial/Broschuere_Die-Schul-Cloud-im-Unterricht-und-Schulalltag-Mehrwert-und-Voraussetzungen.pdf",
	BroschuereSCundLernen4:
		"Willkommensordner/Begleitmaterial/Broschuere_HPI-Schul-Cloud-und-Lernen-4.0.pdf",
	SchulrechnerInDieSC2017:
		"Dokumente/Schulrechner-wandern-in-die-Cloud-2017.pdf",
	SCKonzeptPilotierung2017:
		"Dokumente/Konzept-und-Pilotierung-der-Schul-Cloud-2017.pdf",
};

export const actions = {
	init({ commit, rootState }) {
		try {
			const baseDir =
				rootState["env-config"].env.DOCUMENT_BASE_DIR ||
				"https://s3.hidrive.strato.com/schul-cloud-hpi/";
			const theme = rootState["env-config"].env.SC_THEME;
			const documentBaseDirThemed = String(new URL(`${theme}/`, baseDir));

			commit("setDocumentBaseDir", { baseDir, theme });
			commit("setSpecificFiles", documentBaseDirThemed);
			commit("setGlobalFiles", baseDir);
		} catch (error) {
			commit("setError", error);
		}
	},
};

export const mutations = {
	setDocumentBaseDir(state, { baseDir, theme }) {
		state.documentBaseDir = String(new URL(`${theme}/`, baseDir));
	},
	setSpecificFiles(state, payload) {
		state.specificFiles = Object.entries(specificFiles).reduce(
			(obj, [key, value]) => {
				obj[key] = String(new URL(value, payload));
				return obj;
			},
			{}
		);
	},
	setGlobalFiles(state, payload) {
		state.globalFiles = Object.entries(globalFiles).reduce(
			(obj, [key, value]) => {
				obj[key] = String(new URL(`global/${value}`, payload));
				return obj;
			},
			{}
		);
	},
	setError(state, payload) {
		state.error = payload;
	},
};

export const getters = {
	getDocumentBaseDir(state) {
		return state.documentBaseDir;
	},
	getSpecificFiles(state) {
		return state.specificFiles;
	},
	getGlobalFiles(state) {
		return state.globalFiles;
	},
};

export const state = () => {
	return {
		documentBaseDir: {},
		specificFiles: {},
		globalFiles: {},
		error: {},
	};
};
