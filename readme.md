# Prerender Action: Unzip

Unzip your template source before rendering begins

## Installation

```
npm i -g nexrender-action-unzip
```

## Usage

When creating your render job, provide this module as one of the `prerender` actions:

```js
// job.json
{
    "actions": {
        "prerender": [
            {
                "module": "nexrender-action-unzip",
                "output": "MyTemplate.aep"
            }
        ]
    }
}
```

## Information

- `output` is the file name that your Job's composition source changes to after it unzips.

In this example, the template source has a hash in the zip's file name, but when it unzips, we want to save it to a new loation.

```json
{
    "template": {
      "src": "gs://bucket/MyTemplate.hash.zip",
      "output": "MyTemplate.aep"
    }
}
```
