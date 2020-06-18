# Content Security Policy

## Rules to be observed in the future to avoid problems:

- No more on-events (OnClick, OnError, OnMouseover etc.) in HTML tags
- No more \<style> tags in the HTML unless it is absolutely necessary because they contain dynamic values.
- No more \<script> tags in the HTML unless it is absolutely necessary because they contain dynamic values ​​or include JS files.
- Generally no inline CSS and especially no JS in HTML tags, please outsource them, if not possible they are should whitelisted with nonce method in the csp config, more details below.

## Information

The nonce attribute contains a dynamically generated value that changes each time the page is called up, and the above-mentioned items are put on a whitelist that is used in the content security policy in connection with the 'dynamic-strict' attribute thus ensuring a high level of security as to what can be used.
