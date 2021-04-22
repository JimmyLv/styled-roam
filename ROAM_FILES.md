# Roam𐃏Files (Research)

Roam Research ✍️ **Files Attachment Dashboard** 🗃

Upload files to custom servers rather than default Firebase storage, and manage your files in one place

> the story begins from [@RoamBounties](https://twitter.com/RoamBounties/status/1384169593208332295?s=20)

## Quick Start

1. Add a `{{[[roam/js]]}}` tag
2. Add a child JavaScript code block to it with this code...

```js
// 1. New token from https://github.com/settings/tokens/new?scopes=repo
// 2. Create your GitHub repo and choose savePath to upload images 👇👇👇👇👇👇
// e.g. https://raw.githubusercontent.com/JimmyLv/images/master/2021/1618990038204.png
// 3. optional? DROPBOX_APP_KEY https://www.dropbox.com/developers/saver
window.roamFiles = {
  DROPBOX_APP_KEY: 'PLEASE UPDATE TO YOURS!!!',
  GITHUB_ACCESS_TOKEN: 'PLEASE UPDATE TO YOURS!!!',
  repo: 'JimmyLv/images',
  branch: 'main',
  savePath: '2021',
  embedType: 'preview', // or 'edit'
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

## How to get your `GITHUB_ACCESS_TOKEN`

1. Generate new token from <https://github.com/settings/tokens/new?scopes=repo>

![0421-GoogleChrome-Newpersonalaccesstoken](https://raw.githubusercontents.com/JimmyLv/images/master/2021/0421-Google%20Chrome-New%20personal%20access%20token.jpg)

2. Create your GitHub repo (e.g. [JimmyLv/images](https://github.com/JimmyLv/images)) here: <https://repo.new>

![0421-GoogleChrome-CreateaNewRepository](https://raw.githubusercontents.com/JimmyLv/images/master/2021/0421-Google%20Chrome-Create%20a%20New%20Repository.jpg)

3. Update the `window.roamFiles` config in `{{roam/js}}`

![0421-RoamResearch-roamjsfile-attachment](https://raw.githubusercontents.com/JimmyLv/images/master/2021/0421-Roam%20Research-roamjsfile-attachment.jpg)

4. Just Copy and Paste (Ctrl-C/Ctrl-V) to save image into Roam Research as normal

https://twitter.com/Jimmy_JingLv/status/1384795856939847684?s=20

## How to get your `DROPBOX_APP_KEY`

Create a new @Dropbox app and get the APP_KEY here: https://www.dropbox.com/developers/saver

(don't forget to add http://roamresearch.com into the Saver domains, and File Permission Scopes)

![5L5bjx](https://raw.githubusercontents.com/JimmyLv/images/master/2021/5L5bjx.jpg)
