# serviceapis

Loader methods for APIs of various services, currently Google Universal Analytics and YouTube.

![npm downloads total](https://img.shields.io/npm/dt/serviceapis.svg) ![npm version](https://img.shields.io/npm/v/serviceapis.svg) ![npm license](https://img.shields.io/npm/l/serviceapis.svg)

Provides loader methods to safely load the APIs of the following services:

* [Google Universal Analytics](https://developers.google.com/analytics/devguides/collection/analyticsjs/)
* [YouTube](https://developers.google.com/youtube/iframe_api_reference)

## Installation

Install the `serviceapis` module via

```sh
npm install serviceapis --save
```

or

```sh
yarn add serviceapis
```

## Usage

### Google Universal Analytics

Import the loader methods with the following import statement:

```js
import { ga as gaApi } from 'serviceapis';
// or:
var gaApi = require('serviceapis').ga;
```

#### Load the Analytics API

Load the API with the following call:

```js
gaApi.load();
// window.ga(...) is available immediately!
```

Example:

```js
gaApi.load();
ga('create', 'UA-XXXXXXXX-X', 'auto');
ga('set', 'anonymizeIp', true);
```

#### Check if Analytics API is available

Use the following call:

```js
gaApi.isAvailable() // return true or false
```

### YouTube

Import the loader methods with the following import statement:

```js
import { yt as ytApi } from 'serviceapis';
// or:
var ytApi = require('serviceapis').yt;
```

#### Load the YouTube API

Load the API with the following call:

```js
await ytApi.load();
// the API is loaded now
...

// or:
ytApi.load()
  .then(function () {
    // the API is loaded now
    ...
  });
```

#### Wait for the YouTube API

Wait for the API to become ready, but to not trigger a `load`. It waits forever if `load` does not get triggered.

```js
await ytApi.availability();
// the API is loaded now
...

// or:
ytApi.availability()
  .then(function () {
    // the API is loaded now
    ...
  });
```

**Note:** `load` uses `availability` internally. There is no need to call it again, if you just called `load` itself.

#### Check if YouTube API is available

Use the following call:

```js
ytApi.isAvailable() // return true or false
```

#### Create a YouTube player object

Creates a player object and waits till it is ready. Triggers a load of the API automatically in case it is necessary. Therefore, in most cases you can use `createPlayer` without `load`.

```js
const player = await ytApi.createPlayer(
  'my-player',
  { videoId: 'M7lc1UVf-VE' }
);
// the player object is ready now
...

// or:
ytApi.createPlayer('my-player', { videoId: 'M7lc1UVf-VE' })
  .then(function (player) {
    // the player object is ready now
    ...
  });
```
