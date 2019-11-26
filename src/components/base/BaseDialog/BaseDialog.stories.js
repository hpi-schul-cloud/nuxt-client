import { storiesOf } from "@storybook/vue";
import { text, select } from "@storybook/addon-knobs";

import BaseButton from "@basecomponents/BaseButton";

import BaseDialog from "@basecomponents/BaseModal";

storiesOf("Base|Dialog", module).add(
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
		}),
		template: `
		<div>
			<BaseButton @click="
				$dialog.confirm({
					message: message,
					confirmText: confirmText,
					cancelText: cancelText,
					icon: icon,
					iconSource: iconSource,
					iconColor: iconColor,
					actionDesign: actionDesign,
					onConfirm,
					onCancel,
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
