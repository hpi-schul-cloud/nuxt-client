import { storiesOf } from "@storybook/vue";
import { text, select, boolean } from "@storybook/addon-knobs";

import BaseButton from "@basecomponents/BaseButton";

import BaseDialog from "@basecomponents/BaseModal";

storiesOf("4 Base UI Components/Dialog", module).add(
	"Default",
	() => ({
		components: {
			BaseButton,
			BaseDialog,
		},
		data: () => ({
			message: text(
				"message",
				"Are you sure you want to <b>delete</b> this user? This action cannot be undone."
			),
			confirmText: text("confirmText", "Delete Account"),
			cancelText: text("cancelText", "Abbrechen"),
			icon: text("icon", "report_problem"),
			iconSource: select(
				"source",
				{ material: "material", fa: "fa", custom: "custom" },
				"material"
			),
			iconColor: text("iconColor", "var(--color-danger)"),
			actionDesign: select(
				"actionDesign",
				{
					default: "default",
					primary: "primary",
					secondary: "secondary",
					success: "success",
					danger: "danger",
				},
				"danger"
			),
			invertedDesign: boolean("invertedDesign", false),
		}),
		template: `
		<div>
			<BaseButton @click="
				$dialog.confirm({
					message,
					confirmText,
					cancelText,
					icon,
					iconSource,
					iconColor,
					actionDesign,
					onConfirm,
					onCancel,
					invertedDesign,
				})
			">
				Delete User
			</BaseButton>
		</div>
	`,
		methods: {
			onConfirm() {
				alert("confirmed");
			},
			onCancel() {
				alert("canceled");
			},
		},
	}),
	{
		knobs: {
			escapeHTML: false,
		},
	}
);
