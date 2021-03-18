import { createOverlayObserver, isApple } from "./entry-helpers";
import { downloadImage, shareImage } from "./share-image";

let blockElementSelected;

const ALIAS_PAGE_SYNONYM_OPTION_CLASSNAME = "roamjs-alias-page-synonyms";
const ALIAS_PAGE_SYNONYM_ATTRIBUTE = "data-roamjs-has-alias-option";

export const initMenuOption = () => {
  const createMenuOption = (menuName, menuOnClick) => {
    const option = document.createElement("li");
    const aTag = document.createElement("a");
    aTag.setAttribute("label", `${isApple ? "Opt" : "Alt"}-B`);
    aTag.className = "bp3-menu-item bp3-popover-dismiss";
    option.appendChild(aTag);
    const optionText = document.createElement("div");
    optionText.className = "bp3-text-overflow-ellipsis bp3-fill";
    optionText.innerText = menuName;
    aTag.appendChild(optionText);
    const shortcut = document.createElement("span");
    shortcut.className = "bp3-menu-item-label";
    shortcut.innerText = "Alt-B";
    aTag.appendChild(shortcut);
    aTag.onclick = menuOnClick;
    option.className = ALIAS_PAGE_SYNONYM_OPTION_CLASSNAME;
    return option;
  };

  const optionCallback = async () => {
    if (!blockElementSelected) {
      return;
    }
    const memo = { slug: "jimmylv" };
    const imageSrc = await shareImage(memo);
    downloadImage(imageSrc, memo.slug + ".png");
  };

  const option = createMenuOption("Share Image", optionCallback);

  createOverlayObserver(() => {
    const uls = document.getElementsByClassName("bp3-menu bp3-text-small");
    console.log("uls", uls);
    Array.from(uls)
      .filter((u) => !u.hasAttribute(ALIAS_PAGE_SYNONYM_ATTRIBUTE))
      .forEach((u) => {
        if (
          u.tagName === "UL" &&
          !u.getElementsByClassName(ALIAS_PAGE_SYNONYM_OPTION_CLASSNAME).length
        ) {
          const ul = u;
          ul.setAttribute(ALIAS_PAGE_SYNONYM_ATTRIBUTE, "true");
          const dividers = Array.from(
            ul.getElementsByClassName("bp3-menu-divider")
          );
          console.log('dividers', dividers)
          if (dividers.length > 0 && !ul.contains(option)) {
            const divider = dividers[0];
            ul.insertBefore(option, divider);
          }
        }
      });
  });

  document.addEventListener("mousedown", (e) => {
    const htmlTarget = e.target;
    if (
      htmlTarget.className === "rm-bullet" ||
      htmlTarget.className ===
        "bp3-icon-standard bp3-icon-caret-down rm-caret rm-caret-open rm-caret-hidden" ||
      htmlTarget.className === "rm-bullet__inner" ||
      htmlTarget.className === "rm-bullet__inner--user-icon"
    ) {
      const bullet = htmlTarget.closest(".controls");
      blockElementSelected = bullet.parentElement.getElementsByClassName(
        "rm-block-text"
      )[0];
      console.log("blockElementSelected", blockElementSelected);
    }
  });

  document.addEventListener("keydown", async (e) => {
    if (e.code === "KeyB" && e.altKey) {
      blockElementSelected = document.activeElement;
      console.log("blockElementSelected", blockElementSelected);
      await optionCallback();
      e.preventDefault();
    }
  });
};
