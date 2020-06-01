import { mount } from "@vue/test-utils";
import TableHeadRow from "./TableHeadRow";

const placeholder = "{ stubs: { BaseIcon: true; }}";

const modal = {
	data: () => ({ active: false }),
	template: `
		<base-modal id="modal" ref="modal" :active.sync="active" @close="active = false">
			<div>
				<div class="modal-header">
					<h3>custom header</h3>
				</div>

				<div class="modal-body">
					Hello I'm a modal, do you like to close me? Then just click outside of my box or the button below.
				</div>

				<div class="modal-footer">
					<base-button id="btn-close" class="is-light" @click="$refs.modal.close()">
						OK
					</base-button>
				</div>
			</div>
		</base-modal>
	`,
	components: { TableHeadRow, placeholder },
};

describe("@components/organisms/DataTable/TableHeadRow", () => {
	it(...isValidComponent(TableHeadRow));

	it(
		...rendersSlotContent(TableHeadRow, ["default"], {
			propsData: {
				active: true,
			},
		})
	);

	const wrapper = mount(modal);
	wrapper.vm.active = true;

	const $rows = wrapper.findAll("tbody > tr").wrappers;

	// HINT: use { stubs: { BaseIcon: true } } to render a placeholder for the BaseIcon Component. Otherwise you can not tell if the Icon is there.
	it.each($rows)("renders sortable hint icon on sortable rows", (row) => {
		if (row.isSortable()) expect(wrapper.find(BaseIcon).exists()).toBe(true);
	});

	it.each($rows)("renders sortable hint icon only on sortable rows", (row) => {
		if (row.isSortable()) expect(wrapper.find(BaseIcon).exists()).toBe(true);
		else expect(wrapper.find(BaseIcon).exists()).toBe(false);
	});
});
