# which-test-framework

[![Node.js CI](https://github.com/GregRos/what-the-test/actions/workflows/push.yaml/badge.svg)](https://github.com/GregRos/what-the-test/actions/workflows/push.yaml)

<!-- [![Coverage Status](https://coveralls.io/repos/github/GregRos/which-test-framework/badge.svg?branch=master)](https://coveralls.io/github/GregRos/preszr?branch=master) -->

[![npm](https://img.shields.io/npm/v/what-the-test)](https://www.npmjs.com/package/what-the-test)

Automatically detects the running unit test framework and provides a unified interface for declaring tests. In theory, supports:

1. Jest
2. Ava
3. Jasmine
4. Mocha

With facilities to support anything else really. In practice, it only has basic tests. I know it works with jest since that's what I use it for, but it doesn't have as many tests as I'd like. Your mileage may vary.

It _just works_ in ESM environments, with no need to `await` anything.
