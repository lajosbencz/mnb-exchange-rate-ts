const { typescript } = require('projen');
const { NodePackageManager, NpmAccess } = require('projen/lib/javascript');

const project = new typescript.TypeScriptProject({
  // Project metadata
  name: 'mnb-exchange-rate',
  description: 'TypeScript client for Hungarian National Bank (MNB) exchange rate API',
  defaultReleaseBranch: 'master',
  packageManager: NodePackageManager.YARN_CLASSIC,
  license: 'MIT',
  majorVersion: 0,
  
  // TypeScript configuration
  tsconfig: {
    compilerOptions: {
      target: 'es2020',
      module: 'commonjs',
      rootDir: './lib/',
      outDir: './build',
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      strict: true,
      skipLibCheck: true,
    },
    include: [
      'lib/*.ts',
      'lib/**/*.ts'
    ],
  },

  // Source and build directories
  srcdir: 'lib',
  libdir: 'build',
  sampleCode: false,
  
  // Entry points
  entrypoint: 'build/index.js',
  typescriptVersion: '~5.1.6',

  // Node.js requirements
  minNodeVersion: '18.17.0',
  
  // Dependencies
  deps: [
    'fast-xml-parser@^4.4.1',
    'soap@^1.1.2',
  ],
  
  // Dev dependencies
  devDeps: [
    '@types/node@20.12.7',
    'gts@^5.3.1',
  ],

  // Jest configuration
  jest: true,
  jestOptions: {
    jestConfig: {
      verbose: true,
      preset: 'ts-jest',
      testEnvironment: 'node',
    },
  },

  // Scripts
  scripts: {
    dev: 'tsc -w',
    lint: 'gts lint',
    fix: 'gts fix',
    clean: 'gts clean',
    prepare: 'yarn run compile',
    pretest: 'yarn run compile',
    posttest: 'yarn run lint',
  },

  // Git ignore patterns (projen will manage .gitignore)
  gitignore: [
    '.idea/',
    '.vscode/',
    'node_modules/',
    'build/',
  ],

  // Enable GitHub Actions for publishing
  github: true,
  releaseToNpm: true,
  npmRegistryUrl: 'https://registry.npmjs.org',
  npmAccess: NpmAccess.PUBLIC,
  npmProvenance: true,
  releaseEnvironment: 'pub',
  npmTrustedPublishing: true,
  // npmTokenSecret: "NPM_TOKEN",
  npmIgnoreOptions: {
    ignorePatterns: [
      '/.github/',
      '/test/',
      '**/*.test.ts',
      '/coverage/',
    ],
  },
  
  // Disable some default features we don't need
  eslint: false, // Disable default ESLint, we'll use gts
  prettier: false, // Disable default Prettier, we'll use gts
  
  // Package.json fields
  authorName: 'lajosbencz',
  authorEmail: '',
  copyrightOwner: 'lajosbencz',
  repository: 'https://github.com/lajosbencz/mnb-exchange-rate-ts.git',
});

project.synth();
