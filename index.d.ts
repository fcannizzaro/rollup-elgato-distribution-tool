import type { Plugin } from "rollup";

export interface RollupElgatoDistributionToolPluginOptions {
  /**
   * Path  of the .sdPlugin directory
   */
  plugin: string;

  /**
   * Path where put the .streamdeckPlugin package
   */
  output?: string;
}

export default function (options: RollupElgatoDistributionToolPluginOptions): Plugin;
