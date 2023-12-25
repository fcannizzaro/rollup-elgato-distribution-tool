# Stream Deck Package (Rollup plugin)

This plugin uses the [Elgato Distribution Tool](https://docs.elgato.com/sdk/plugins/packaging) to package a Stream Deck plugin.

## Usage

```typescript
import streamDeckPackage from "@fcannizzaro/rollup-stream-deck-package";

export default {
  plugins: [
    streamDeckPackage({
      plugin: "./com.sample.plugin.sdPlugin",
    }),
  ],
};
```

## Options

- `plugin` path to plugin folder (.sdPlugin)

- `output` path to output folder (default: `./`)

## License

MIT
