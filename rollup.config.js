import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import cleaner from 'rollup-plugin-cleaner';

export default {
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
  ],
};
