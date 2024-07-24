# what-the-test

[![Node.js CI](https://github.com/GregRos/what-the-test/actions/workflows/push.yaml/badge.svg)](https://github.com/GregRos/what-the-test/actions/workflows/push.yaml)

<!-- [![Coverage Status](https://coveralls.io/repos/github/GregRos/what-the-test/badge.svg?branch=master)](https://coveralls.io/github/GregRos/what-the-test?branch=master) -->

[![npm](https://img.shields.io/npm/v/what-the-test)](https://www.npmjs.com/package/what-the-test)

Automatically detects the running unit test framework and provides a unified interface for declaring tests. It _just works_ in both ESM and CJS environments. Don't need to `await` anything or change the code in any way.

The following test frameworks are supported:

1. Jest
2. Ava
3. Jasmine
4. Mocha

Only `jest` is thoroughly tested right now.
