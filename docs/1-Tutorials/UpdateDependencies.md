# Update dependencies

Most dependencies should be automaticly updates using a combination of mergify.io, dependabot and pullapprove but sometimes it can happen that there are som many PRs that it is easier to update the dependencies manually.

This can be easily achived by running `npx -p npm-check-updates ncu -u -i` and `npm i` afterwards.

After updating dependencies, please check that everything still works.

Some hints what to test:

- `npm run dev`
  - are all dev servers reachable?
  - will icons be displayed (BaseIcon Component must currently be tested manually)
- `npm run build`
- `npm run lint`
- `npm run test:unit`
- `npm run test:screenshot`
