# Roam𐃏Files (Research)

Roam Research ✍️ **Files Attachment Dashboard**

Upload images to custom servers rather than default Firebase

> the story begins from [@RoamBounties](https://twitter.com/RoamBounties/status/1384169593208332295?s=20)

## Quick Start

1. Add a `{{[[roam/js]]}}` tag
2. Add a child JavaScript code block to it with this code...

```js
// 1. New token from https://github.com/settings/tokens/new?scopes=repo
// 2. Setup your GitHub repo and savePath to upload images 👇👇👇👇👇👇
// e.g. https://raw.githubusercontent.com/JimmyLv/images/master/2021/1618990038204.png
window.roamFiles = {
  GITHUB_ACCESS_TOKEN: 'please update to yours',
  repo: 'JimmyLv/images',
  branch: 'master',
  savePath: '2021',
}
window.URLScriptServer = "https://styled-roam.vercel.app/";
var existing = document.getElementById("roam-files");
if (!existing) {
  var extension = document.createElement("script");
  extension.src = window.URLScriptServer + "file.js";
  extension.id = "roam-files";
  extension.async = true;
  extension.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(extension);
}
```

3. Update the `window.roamFiles` config and Press the <span style="color:red;">BIG RED</span> button
