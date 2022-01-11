# @prezly/uploadcare-widget

Prezly's `uploadcare-widget` package is a thin wrapper 
providing *partial* Typescript definitions 
for the original [Uploadcare's `uploadcare-widget`](https://github.com/uploadcare/uploadcare-widget/) library.

![Version](https://img.shields.io/npm/v/@prezly/uploadcare-widget)
![License](https://img.shields.io/npm/l/@prezly/uploadcare-widget)

## Usage

```sh
npm add @prezly/uploadcare-widget
```

```ts
import type { FilePromise } from '@prezly/uploadcare-widget';
import uploadcare from '@prezly/uploadcare-widget';

// your type-safe Typescript code
```

**Note**: The code in this package is not bundled and is expected to be processed 
by a bundler (e.g. [Webpack](webpack.js.org/) or [Rullup](https://rollupjs.org/)) before running in production.

## Versioning

Similarly to [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) we will be following
original package version by providing the corresponding type-definitions on top.

## Credits

Brought to you by [Prezly](https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/uploadcare-widget)
and [Uploadcare](https://uploadcare.com), of course.
