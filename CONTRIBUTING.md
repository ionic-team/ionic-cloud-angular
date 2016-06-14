# Contributing

## Issues

This package wraps the [cloud client](https://github.com/driftyco/ionic-cloud) to
add Angular integration. Because of this, most issues should be reported in the
[cloud client issues](https://github.com/driftyco/ionic-cloud/issues) or the
[cloud issues](https://github.com/driftyco/ionic-cloud-issues/issues).

**Before submitting your issue, be sure to update the client and any associated
Cordova plugins to their latest versions.**

## Pull Requests

Pull requests are welcome!

The bleeding edge is `master`, so you'll want to make your changes off of that.
The source code is Typescript and lives in `src/`.

### Local Setup

After cloning and installing npm dependencies, there are a variety of gulp
tasks to help you during development.

* `gulp lint` - Lint your code.
* `gulp build` - Transpile the Typescript source files.
