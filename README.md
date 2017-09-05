# broccoli-flow

[![Build Status](https://travis-ci.org/alexlafroscia/broccoli-flow.svg?branch=master)](https://travis-ci.org/alexlafroscia/broccoli-flow)
[![Test Coverage](https://codeclimate.com/github/alexlafroscia/broccoli-flow/badges/coverage.svg)](https://codeclimate.com/github/alexlafroscia/broccoli-flow/coverage)
[![Code Climate](https://codeclimate.com/github/alexlafroscia/broccoli-flow/badges/gpa.svg)](https://codeclimate.com/github/alexlafroscia/broccoli-flow)
[![npm version](https://badge.fury.io/js/broccoli-flow.svg)](https://badge.fury.io/js/broccoli-flow)

Run [Flow](https://github.com/facebook/flow) checking through Broccoli

## Installation

```bash
npm install --save-dev broccoli-flow
```

## Usage

Chances are, you're not going to use this directly, since Broccoli is most often used as part of the Ember CLI. If that's the case for you, then you'll want to check out [`ember-cli-flow`][ember-cli-flow].

If you actually _are_ using it through Broccoli directly, the API is pretty simple.

```javascript
// See more in `tests/broccoli-plugin.js`
const Funnel = require('broccoli-funnel');
const { mv } = require('broccoli-stew');
const FlowFilter = require('broccoli-flow');

let tree = new Funnel('input');
tree = new FlowFilter(tree, {
  printErrors: false
});
tree = mv(tree, 'output');
```

[ember-cli-flow]: https://github.com/alexlafroscia/ember-cli-flow
