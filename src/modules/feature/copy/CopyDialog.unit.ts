import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { CopyDialog } from "@feature-copy";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

describe("CopyDialog", () => {
	const setup = () => {
		setActivePinia(createTestingPinia({ stubActions: false }));

		const wrapper = mount(CopyDialog, {
			props: {
				isOpen: true,
				copyItemType: ContentItemTypeEnum.Room,
			},
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			attachTo: document.body,
		});
		return { wrapper };
	};

	it("should render", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should render info text", () => {
		setup();

		const infoText = document.querySelector("[data-testid=copy-info-text]");

		expect(infoText?.textContent).toBe("feature-copy.copyInfo.text.nextStep");
	});
});
