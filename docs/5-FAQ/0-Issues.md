# Issues

[[toc]]

## How to make a page visible without login

During development you may get the issue that the browser will redirect you to the homepage or the login page when you try to access your new page. This may happen, because the user isn't authenticated yet. By default you must be authenticated to view a page. Otherwise you will be redirected. To fix this issue you can add the meta-Attribute `isPublic` to the page. This prevents the redirect and everyone can view the page.

```Vue
<script>
export default {
	meta: {
		isPublic: true,
	},
};
</script>
```
