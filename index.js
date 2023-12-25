import { execSync } from "child_process";
import os from "os";
import fs from "fs";
import path from "path";
import url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

/**
 *
 * @param {import(".").RollupElgatoDistributionToolPluginOptions} options
 * @returns {import("rollup").Plugin}
 */
export default function (options) {
  if (!options.plugin) {
    throw new Error("Missing plugin param");
  }
  return {
    name: "elgato-distribution-tool",
    buildEnd() {
      const bin =
        os.platform() === "win32"
          ? "DistributionTool.exe"
          : os.platform() === "darwin"
          ? "DistributionTool"
          : undefined;

      if (!bin) {
        return this.error(`Unsupported platform ${os.platform()}`);
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

      try {
        execSync(
          `${__dirname}/bin/${bin} -b -i ${pluginPath} -o ${outputPath}`
        );
      } catch (e) {
        console.log(e);
        return this.error(`Plugin build failed`);
      }
    },
  };
}
