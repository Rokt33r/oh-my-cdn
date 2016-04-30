# Oh My CDN

A simple file fetcher CLI.

## How to use

### Install

You can use Oh My CDN globally or package-specifically.

#### Global

```
npm i -g oh-my-cdn
```

#### Package Specific

Install

```
npm i -S oh-my-cdn
```

Add `oh-my-cdn` command to `scripts` inpackage.json

```json
{
  "scripts": {
    "vendor": "oh-my-cdn"
  }
}
```

### Configure

Add `oh-my-cdn.json` to your package

```json
{
  "directory": "vendor",
  "targets": {
    "react": "https://fb.me/react-0.14.7.js",
    "react-dom": {
      "filename": "react-dom.min.js",
      "url": "https://fb.me/react-dom-0.14.7.min.js"
    }
  }
}
```

### Run

#### Global

```
oh-my-cdn
```

#### Package Specific

```
npm run oh-my-cdn
```

## API

### `oh-my-cdn.json`

#### `directory`

A directory to save the fetched scripts.

This is optional. If it doesn't be set, files will be fetched to `vendor` by default.

#### `targets`

Files to fetch.

Each key means a file and accepts string and object as value.

If string is set, the string will be used as a URL and use the key for filename.
If object is set, you must set `url` key. `filename` is optional.
