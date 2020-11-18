const initialMode = localStorage.getItem("INIT_MODE") || "document";
document.querySelector("html").classList = initialMode;

const MODES = {
  cardList: { text: "Card List", icon: "bp3-icon-full-stacked-chart" },
  cardFlow: { text: "Card Flow", icon: "bp3-icon-heat-grid" },
  document: { text: "Document", icon: "bp3-icon-horizontal-bar-chart" },
};

function createSpacer() {
  const spacer = document.createElement('div')
  spacer.setAttribute('style', 'flex: 0 0 3px')
  return spacer
}

function appendIcon(type, clickHandler) {
  const mode = MODES[type];
  const icon = document.createElement("div");
  icon.id = `mode-button-${type}`;
  icon.className = `bp3-button bp3-minimal bp3-small ${mode.icon}`;
  icon.setAttribute("style", "position:relative;left:2px");
  icon.onclick = clickHandler;
  document.querySelector(".roam-topbar .flex-h-box").appendChild(icon);

  const spacer = createSpacer();
  document.querySelector(".roam-topbar .flex-h-box").appendChild(spacer);
}

const appendButton = function (type, clickHandler) {
  const mode = MODES[type];
  const navbar = document.querySelector(".roam-topbar > .flex-h-box");
  let hasMenuIcon = navbar.firstChild.classList.contains("bp3-icon-menu");
  let targetElement = hasMenuIcon ? navbar.childNodes[1] : navbar.firstChild;

  targetElement.style.display = "flex";
  targetElement.style.justifyContent = "center";

  const button = document.createElement("button");
  button.name = mode.text;
  button.className = `mode-button bp3-button bp3-minimal bp3-small ${mode.icon} ${type}`;
  button.onclick = clickHandler;

  targetElement.appendChild(button);
};

function switchTo(mode) {
  document.querySelector("html").classList = mode;
  localStorage.setItem("INIT_MODE", mode);
}

const switchToCardList = function () {
  switchTo("card-mode");
  document.querySelector(".zoom-path-view.rm-zoom").firstChild.click();
};

const switchToEditCard = function () {
  switchTo("edit-mode");
  let selected = document.querySelector('textarea[autocapitalize="none"]');
  if (selected) {
    selected.parentNode.parentNode.parentNode
      .querySelector(".simple-bullet-inner")
      .click();
  } else {
    document
      .querySelector(".block-highlight-blue")
      .querySelector(".simple-bullet-inner")
      .click();
  }
};

const switchToCardFlow = function () {
  switchTo("flow-mode");
};

const switchToDocument = function () {
  switchTo("document-mode");
  // document.querySelector('.zoom-path-view.rm-zoom').firstChild.click()
};

function addFocusMode() {
  var wrapper = document.querySelector(".roam-topbar .flex-h-box");
  var styleScript = document.createElement("style");
  styleScript.innerHTML = `
	.roam-block-container div[id]{
  		opacity: 0.2;
    }
	.roam-block-container div[id]:hover{
 	 	opacity: 1;
	}
`;

  var focusMode = document.createElement("div");
  focusMode.id = 'mode-toggle-focus'
  focusMode.className = `bp3-button bp3-minimal bp3-icon-eye-open bp3-small`;
  wrapper.appendChild(focusMode);

  function toggleFocusMode() {
    if (
      [].find.call(focusMode.classList, (name) => {
        return name === 'bp3-icon-eye-on'
      })
    ) {
      focusMode.className = `bp3-button bp3-minimal bp3-icon-eye-open bp3-small`
      document.head.removeChild(styleScript)
    } else {
      focusMode.className = `bp3-button bp3-minimal bp3-icon-eye-on bp3-small`
      document.head.appendChild(styleScript)
    }
  }

  focusMode.addEventListener("click", toggleFocusMode);
}

appendIcon("cardList", switchToCardList);
appendIcon("cardFlow", switchToCardFlow);
appendIcon("document", switchToDocument);
addFocusMode();

setTimeout(() => {
  hotkeys("alt+shift+1", function (event, handler) {
    event.preventDefault();
    switchToCardList();
  });
  hotkeys("alt+shift+2", function (event, handler) {
    event.preventDefault();
    switchToCardFlow();
  });
  hotkeys("alt+shift+3", function (event, handler) {
    event.preventDefault();
    switchToDocument();
  });
  hotkeys("alt+shift+4", function (event, handler) {
    event.preventDefault();
    toggleFocusMode();
  });

  tippy("#mode-button-cardList", {
    content: "Switch to Card List<sup>mode</sup>",
    allowHTML: true,
    theme: "light-border",
  });

  tippy("#mode-button-cardFlow", {
    content: "Switch to Card Flow<sup>mode</sup>",
    allowHTML: true,
    theme: "light-border",
  });

  tippy("#mode-button-document", {
    content: "Switch to Document<sup>mode</sup>",
    allowHTML: true,
    theme: "light-border",
  });
  tippy("#mode-toggle-focus", {
    content: "Switch to Focus<sup>mode</sup>",
    allowHTML: true,
    theme: "light-border",
  });

  console.log('init styled-roam')
}, 30000);
