export async function initRssImporter() {
  roam42.loader.addScriptToPage('rss-parser', 'https://cdn.jsdelivr.net/npm/rss-parser@3.12.0/dist/rss-parser.js')

  // Note: some RSS feeds can't be loaded in the browser due to CORS security.
  // To get around this, you can use a proxy.
  const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

  let result = []
  let parser = new RSSParser()
  const feed = await parser.parseURL(CORS_PROXY + 'https://www.reddit.com/.rss')

  console.log(feed.title)
  feed.items.forEach(function (entry) {
    console.log(entry.title + ':' + entry.link)
    result.push(`[${entry.title}](${entry.link})`)
  })
  console.log(result)

  return JSON.stringify({ text: result.join('\n') })
}
