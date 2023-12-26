import { execSync } from "child_process";
import type { Plugin } from "rollup";
import path from "path";
import os from "os";
import fs from "fs";
import url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

interface PluginOptions {
  /**
   * Path  of the .sdPlugin directory
   */
  plugin: string;

  /**
   * Path where put the .streamdeckPlugin package
   */
  output?: string;
}

const Binaries: Record<string, string> = {
  win32: "DistributionTool.exe",
  darwin: "DistributionTool",
};

/**
 * Rollup plugin to package a .sdPlugin directory into a .streamdeckPlugin package using the Elgato Distribution Tool
 */
export default function (options: PluginOptions): Plugin {
  if (!options.plugin) {
    throw new Error("Missing plugin param");
  }
  return {
    name: "stream-deck-package",
    closeBundle() {
      const platform = os.platform();
      const bin = Binaries[platform];

      if (!bin) {
        return this.error(`Unsupported platform ${platform}`);
      }

      const pluginPath = path.join(process.cwd(), options.plugin);
      const outputPath = path.join(process.cwd(), options.output ?? "");

      const file = path.join(
        options.plugin
          .replace(".sdPlugin", ".streamDeckPlugin")
          .replace(/.+[\\\/]/, "")
      );

      const filePath = path.join(outputPath, file);

      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }

      if (!fs.existsSync(pluginPath)) {
        return this.error(`Plugin not found at ${pluginPath}`);
      }

      if (fs.existsSync(filePath)) {
        fs.rmSync(filePath);
      }

      const executable = `${__dirname}/bin/${bin}`;

      try {
        platform === "darwin" && execSync(`chmod +x ${executable}`);
        execSync(`${executable} -b -i ${pluginPath} -o ${outputPath}`);
      } catch (e) {
        this.error("Error while packaging the plugin");
      }
    },
  };
}
