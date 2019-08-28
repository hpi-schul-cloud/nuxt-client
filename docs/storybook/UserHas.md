# User has ...

These components check the user object for permissions/roles/... and restrict content to the given permission/role

If you specify the permission/role as a string, the user can view the page when he has this permission/role.
In case you need more controle you can also specify a function as the permission/role attribute. This function gets called with all permissions/roles the user has. This function must return a boolean value. If true is returned, the access gets granted.
