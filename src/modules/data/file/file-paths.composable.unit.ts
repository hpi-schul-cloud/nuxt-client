import { useFilePaths } from "./file-paths.composable";
import { createTestEnvStore, mountComposable } from "@@/tests/test-utils";
import { SchulcloudTheme } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

describe("useFilePaths", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	describe("documentBaseDir", () => {
		it("should return themed base directory URL", () => {
			const mockURL = "https://dbildungscloud.de/";
			createTestEnvStore({ DOCUMENT_BASE_DIR: mockURL, SC_THEME: SchulcloudTheme.DEFAULT });

			const { documentBaseDir } = mountComposable(() => useFilePaths());

			expect(documentBaseDir.value).toBe(`${mockURL}${SchulcloudTheme.DEFAULT}/`);
		});
	});

	describe("specificFiles", () => {
		it("should return resolved URLs for specific files", () => {
			const mockURL = "https://dbildungscloud.de/";
			createTestEnvStore({ DOCUMENT_BASE_DIR: mockURL, SC_THEME: SchulcloudTheme.DEFAULT });

			const { specificFiles } = mountComposable(() => useFilePaths());

			expect(specificFiles.value.accessibilityStatement).toContain(mockURL);
			expect(specificFiles.value.accessibilityStatement).toContain("Barrierefreiheitserklaerung.pdf");
		});

		it("should use THR-specific files when theme is THR", () => {
			const mockURL = "https://dbildungscloud.de/";
			createTestEnvStore({ DOCUMENT_BASE_DIR: mockURL, SC_THEME: SchulcloudTheme.THR });

			const { specificFiles } = mountComposable(() => useFilePaths());

			expect(specificFiles.value.termsOfUse).toContain("Nutzungsordnung.pdf");
			expect(specificFiles.value.termsOfUse).not.toContain("Nutzungsordnung_Schueler-innen.pdf");
			expect(specificFiles.value.privacy).toContain("Datenschutzhinweise.pdf");
		});

		it("should use default files when theme is not THR", () => {
			const mockURL = "https://dbildungscloud.de/";
			createTestEnvStore({ DOCUMENT_BASE_DIR: mockURL, SC_THEME: SchulcloudTheme.BRB });

			const { specificFiles } = mountComposable(() => useFilePaths());

			expect(specificFiles.value.termsOfUse).toContain("Nutzungsordnung_Schueler-innen.pdf");
			expect(specificFiles.value.privacy).toContain("Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf");
		});
	});

	describe("globalFiles", () => {
		it("should return resolved URLs for global files", () => {
			const mockURL = "https://dbildungscloud.de/";
			createTestEnvStore({ DOCUMENT_BASE_DIR: mockURL, SC_THEME: SchulcloudTheme.DEFAULT });

			const { globalFiles } = mountComposable(() => useFilePaths());

			expect(globalFiles.value.BeschreibungDerSchulCloud).toContain(mockURL);
			expect(globalFiles.value.BeschreibungDerSchulCloud).toContain("global/");
			expect(globalFiles.value.BeschreibungDerSchulCloud).toContain("Beschreibung-der-HPI-Schul-Cloud.pdf");
		});
	});
});
