# Elgato Distribution Tool (Rollup plugin)

## Usage

```typescript
import elgatoDistributionTool from "@fcannizzaro/rollup-elgato-distribution-tool";

export default {
  /// ...
  plugins: [
    elgatoDistributionTool({
      plugin:  "./com.sample.plugin.sdPlugin"
    }),
  ],
};
```

## Options

- `plugin`: path to plugin folder (.sdPlugin)

- `output`: path to output folder (default: `./`)

## License

MIT
