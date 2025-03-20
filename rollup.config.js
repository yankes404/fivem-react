import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const packageJson = require("./package.json");

const plugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  typescript({ tsconfig: "./tsconfig.json" }),
  terser()
];

const external = ["react", "react-dom"];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true
      },
    ],
    plugins,
    external
  },
  {
    input: "src/hooks/index.ts",
    output: [
      {
        file: "dist/hooks/index.js",
        format: 'cjs',
        sourcemap: true
      },
      {
        file: "dist/hooks/index.mjs",
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins,
    external
  },
  {
    input: "src/utils/index.ts",
    output: [
      {
        file: "dist/utils/index.js",
        format: 'cjs',
        sourcemap: true
      },
      {
        file: "dist/utils/index.mjs",
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins,
    external
  },
  {
    input: "src/index.ts",
    output: [{ file: packageJson.types }],
    plugins: [dts.default()]
  },
  {
    input: "src/hooks/index.ts",
    output: [{ file: "dist/hooks/index.d.ts" }],
    plugins: [dts.default()]
  },
  {
    input: "src/utils/index.ts",
    output: [{ file: "dist/utils/index.d.ts" }],
    plugins: [dts.default()]
  }
];
