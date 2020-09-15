import { React, ReactDOM } from "https://unpkg.com/es-react@16"
import htm from "https://unpkg.com/htm?module"

const html = htm.bind(React.createElement)

const Counter = props => {
  const [count, setCount] = React.useState(parseInt(props.count))
  return html`
    <div>
      <h1>${count}</h1>
      <button onClick=${e => setCount(count - 1)}>Decrement</button>
      <button onClick=${e => setCount(count + 1)}>Increment</button>
    </div>
  `
}

function initRenderStuff() {
  const root =
    document.getElementsByTagName("cardify-root")[0] ||
    document.createElement("cardify-root")
  document.body.appendChild(root)

  ReactDOM.render(
    html`
      <h1>Look Ma! No script tags, no build step</h1>
      <${Counter} count=${0} />
    `,
    root,
  )
}


export const roam_onInit = () => {
  if (!window.roamAlphaAPI) {
    setTimeout(roam_onInit, 100)
    return
  }

  initRenderStuff()
}
