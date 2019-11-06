# Page Permission Check

Sometimes you wan't to prevent access to pages if the user doesn't have some permissions. Therefore you can use the `meta.requiredPermissions` attribute.

The simple syntax would be to add the following code to your page:

```vue{4}
<script>
export default {
	meta: {
		requiredPermissions: ["PERMISSION_A"],
	},
};
</script>
```

In this case, the current user must have all the defined permissions.

If you wan't more controle you can pass an Object:

```vue{4-7}
<script>
export default {
	meta: {
		requiredPermissions: {
			operator: "OR",
			permissions: ["PERMISSION_A"],
		},
	},
};
</script>
```

This way, you can define if the user must have all defined permissions (`operator: "AND"`) or if it is enough to fullfill one of the defined permissions (`operator: "OR"`).

The actual permission-check logic is defined in `@middleware/permission-check.js`.
