import { flushPromises } from "@vue/test-utils";

describe("dashboard announcement", () => {
	describe("when DASHBOARD_ANNOUNCEMENT_TEXT_ENABLED is false", () => {
		it("does not show announcement alert", async () => {
			const { wrapper } = setup({ announcementTextEnabled: false });
			await flushPromises();

			expect(wrapper.find("[data-testid='news-info-alert']").exists()).toBe(false);
		});
	});

	describe("when DASHBOARD_ANNOUNCEMENT_TEXT_ENABLED is true", () => {
		describe("and dashboardAnnouncementText is empty string", () => {
			it("does not show announcement alert", async () => {
				const { wrapper } = setup({ announcementTextEnabled: true, announcementTextTranslation: "" });
				await flushPromises();

				expect(wrapper.find("[data-testid='news-info-alert']").exists()).toBe(false);
			});
		});

		describe("and dashboardAnnouncementText is defined for current language", () => {
			it("shows announcement alert with text", async () => {
				const { wrapper } = setup({
					announcementTextEnabled: true,
					announcementTextTranslation: {
						de: "Ankündigungstext auf Deutsch",
						en: "Announcement text in English",
						es: "Texto de anuncio en español",
						uk: "Текст оголошення українською",
					},
				});
				await flushPromises();

				const alert = wrapper.find("[data-testid='news-info-alert']");
				expect(alert.exists()).toBe(true);
				expect(alert.text()).toBe("Announcement text in English");
			});
		});
	});
});
