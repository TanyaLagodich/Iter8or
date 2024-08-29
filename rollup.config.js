const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const cleaner = require('rollup-plugin-cleaner');
const alias = require('@rollup/plugin-alias');
const path = require('path');

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/iter8or.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/iter8or.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/iter8or.min.js',
      format: 'umd',
      name: 'Iter8or',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    cleaner({
      targets: ['./dist/'],
    }),
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    alias({
      entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    }),
  ],
};
