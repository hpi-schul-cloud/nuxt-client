import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import {
	ExternalToolMediumResponse,
	ExternalToolMediumStatus,
} from "@/serverApi/v3";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { VIcon, VTextField } from "vuetify/components";
import ExternalToolMediumDetails from "./ExternalToolMediumDetails.vue";
import { expectNotification } from "@@/tests/test-utils";
import { beforeAll } from "vitest";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

describe("ExternalToolMediumDetails", () => {
	const getWrapper = (selectedTemplateMedium: ExternalToolMediumResponse) => {
		const wrapper = mount(ExternalToolMediumDetails, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				selectedTemplateMedium,
			},
		});

		return { wrapper };
	};

	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("Title", () => {
		describe("when the medium is a template", () => {
			it("should show the template title", () => {
				const { wrapper } = getWrapper({
					status: ExternalToolMediumStatus.Template,
					mediaSourceId: "media-source-id",
				});

				const title = wrapper.find('[data-testid="medium-details-title"]');

				expect(title.text()).toEqual("pages.tool.medium.template");
			});
		});

		describe("when the medium is not a template", () => {
			it("should show the medium title", () => {
				const { wrapper } = getWrapper({
					status: ExternalToolMediumStatus.Active,
					mediumId: "medium-id",
					mediaSourceId: "media-source-id",
				});

				const title = wrapper.find('[data-testid="medium-details-title"]');

				expect(title.text()).toEqual("pages.tool.medium");
			});
		});
	});

	describe("Medium Id", () => {
		describe("when the medium is a template", () => {
			it("should not show the medium id text", () => {
				const { wrapper } = getWrapper({
					status: ExternalToolMediumStatus.Template,
					mediaSourceId: "media-source-id",
				});

				const mediumIdText = wrapper.findComponent<typeof VTextField>(
					'[data-testid="medium-details-medium-id"]'
				);

				expect(mediumIdText.exists()).toBe(false);
			});
		});

		describe("when the medium is not a template", () => {
			it("should show the medium id", () => {
				const { wrapper } = getWrapper({
					status: ExternalToolMediumStatus.Active,
					mediumId: "medium-id",
					mediaSourceId: "media-source-id",
				});

				const mediumIdText = wrapper.findComponent<typeof VTextField>(
					'[data-testid="medium-details-medium-id"]'
				);

				expect(mediumIdText.isVisible()).toBe(true);
				expect(mediumIdText.props().modelValue).toEqual("medium-id");
			});
		});

		describe("when the copy icon is clicked", () => {
			describe("when the copy is successful", () => {
				const setup = () => {
					const mediumId = "medium-id";

					const { wrapper } = getWrapper({
						status: ExternalToolMediumStatus.Active,
						mediaSourceId: "media-source-id",
						mediumId,
					});

					const clipboardWriteTextMock = vi.fn();
					Object.assign(navigator, {
						clipboard: {
							writeText: clipboardWriteTextMock,
						},
					});

					return { wrapper, clipboardWriteTextMock, mediumId };
				};

				it("should copy the medium id to the clipboard", async () => {
					const { wrapper, clipboardWriteTextMock, mediumId } = setup();

					const copyIcon = wrapper
						.findComponent('[data-testid="medium-details-medium-id"]')
						.findComponent(VIcon);

					await copyIcon.trigger("click");
					await nextTick();

					expect(clipboardWriteTextMock).toHaveBeenCalledWith(mediumId);
				});

				it("should show a success notification", async () => {
					const { wrapper } = setup();

					const copyIcon = wrapper
						.findComponent('[data-testid="medium-details-medium-id"]')
						.findComponent(VIcon);

					await copyIcon.trigger("click");
					await nextTick();

					expectNotification("success");
				});
			});

			describe("when the medium id fails to copy", () => {
				const setup = () => {
					const { wrapper } = getWrapper({
						status: ExternalToolMediumStatus.Active,
						mediumId: "medium-id",
						mediaSourceId: "media-source-id",
					});

					const clipboardWriteTextMock = vi.fn().mockImplementation(() => {
						throw new Error();
					});
					Object.assign(navigator, {
						clipboard: {
							writeText: clipboardWriteTextMock,
						},
					});

					return { wrapper, clipboardWriteTextMock };
				};

				it("should show a error notification", async () => {
					const { wrapper } = setup();

					const copyIcon = wrapper
						.findComponent('[data-testid="medium-details-medium-id"]')
						.findComponent(VIcon);

					await copyIcon.trigger("click");
					await nextTick();

					expectNotification("error");
				});
			});
		});
	});

	describe("Media Source Id", () => {
		describe("when the medium is a template", () => {
			it("should show the media source id", () => {
				const { wrapper } = getWrapper({
					status: ExternalToolMediumStatus.Template,
					mediaSourceId: "media-source-id-1",
				});

				const sourceIdText = wrapper.findComponent<typeof VTextField>(
					'[data-testid="medium-details-media-source-id"]'
				);

				expect(sourceIdText.isVisible()).toBe(true);
				expect(sourceIdText.props().modelValue).toEqual("media-source-id-1");
			});
		});

		describe("when the medium is not a template", () => {
			it("should show the media source id", () => {
				const { wrapper } = getWrapper({
					status: ExternalToolMediumStatus.Active,
					mediumId: "medium-id",
					mediaSourceId: "media-source-id-2",
				});

				const sourceIdText = wrapper.findComponent<typeof VTextField>(
					'[data-testid="medium-details-media-source-id"]'
				);

				expect(sourceIdText.isVisible()).toBe(true);
				expect(sourceIdText.props().modelValue).toEqual("media-source-id-2");
			});
		});

		describe("when the copy icon is clicked", () => {
			describe("when the copy is successful", () => {
				const setup = () => {
					const mediaSourceId = "media-source-id";

					const { wrapper } = getWrapper({
						status: ExternalToolMediumStatus.Active,
						mediumId: "medium-id",
						mediaSourceId,
					});

					const clipboardWriteTextMock = vi.fn();
					Object.assign(navigator, {
						clipboard: {
							writeText: clipboardWriteTextMock,
						},
					});

					return {
						wrapper,
						clipboardWriteTextMock,
						mediaSourceId,
					};
				};

				it("should copy the media source id to the clipboard", async () => {
					const { wrapper, clipboardWriteTextMock, mediaSourceId } = setup();

					const copyIcon = wrapper
						.findComponent('[data-testid="medium-details-media-source-id"]')
						.findComponent(VIcon);

					await copyIcon.trigger("click");
					await nextTick();

					expect(clipboardWriteTextMock).toHaveBeenCalledWith(mediaSourceId);
				});

				it("should show a success notification", async () => {
					const { wrapper } = setup();

					const copyIcon = wrapper
						.findComponent('[data-testid="medium-details-media-source-id"]')
						.findComponent(VIcon);

					await copyIcon.trigger("click");
					await nextTick();

					expectNotification("success");
				});
			});

			describe("when the media source id fails to copy", () => {
				const setup = () => {
					const { wrapper } = getWrapper({
						status: ExternalToolMediumStatus.Active,
						mediumId: "medium-id",
						mediaSourceId: "media-source-id",
					});

					const clipboardWriteTextMock = vi.fn().mockImplementation(() => {
						throw new Error();
					});
					Object.assign(navigator, {
						clipboard: {
							writeText: clipboardWriteTextMock,
						},
					});

					return { wrapper, clipboardWriteTextMock };
				};

				it("should show a error notification", async () => {
					const { wrapper } = setup();

					const copyIcon = wrapper
						.findComponent('[data-testid="medium-details-media-source-id"]')
						.findComponent(VIcon);

					await copyIcon.trigger("click");
					await nextTick();

					expectNotification("error");
				});
			});
		});
	});
});
