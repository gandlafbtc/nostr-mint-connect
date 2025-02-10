# NMC - Nostr mint connect

Cashu-ts plugin for connecting to mints via nostr

## Get Started

1. Run `npm install` in your terminal
1. Then run `npm run build`
1. Sign in to your npm account in your terminal with `npm login`
1. Run `npm publish --access=public` to publish your package

### Testing

1. Install developer dependencies using the following command in your terminal `npm i -D typescript @types/node`
1. Create a `tests` folder
1. Create an `index.test.ts` file in the `tests` folder
1. Write unit tests in the `index.test.ts` file to test the code in `index.ts`
1. Add a `"test"` property in the `package.json` file `"scripts"` object and give it a value of `"node --experimental-strip-types --test"`
1. Run `npm test` in your terminal from the root folder of the project
