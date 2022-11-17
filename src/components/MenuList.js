import { html } from 'htm/react'
import { switchTo } from '../utils/dom-helper'

export default function MenuList() {
  return html` <ul class="bp3-menu bp3-elevation-1">
    <li>
      <a
        class="bp3-menu-item bp3-icon-heat-grid"
        id="mode-button-cardFlow"
        tabindex="0"
        onClick="${() => switchTo('flow-mode')}"
        >Card Flow</a
      >
    </li>
    <li>
      <a
        class="bp3-menu-item bp3-icon-full-stacked-chart"
        id="mode-button-cardList"
        tabindex="0"
        onClick="${() => switchTo('card-mode')}"
        >Card List</a
      >
    </li>
    <li>
      <a
        class="bp3-menu-item bp3-icon-timeline-bar-chart"
        tabindex="0"
        onClick="${() => switchTo('presentation-card-mode')}"
        >Presentation</a
      >
    </li>
    <li>
      <a
        class="bp3-menu-item bp3-icon-th"
        id="mode-button-treeTable"
        tabindex="0"
        onClick="${() => switchTo('table-mode')}"
        >Tree Table</a
      >
    </li>
    <li>
      <a
        class="bp3-menu-item bp3-icon-cube-add"
        id="mode-toggle-calendar"
        tabindex="0"
        onClick="${() => switchTo('calendar-mode')}"
        >Calendar</a
      >
    </li>
    <li>
      <a
        class="bp3-menu-item bp3-icon-cube"
        id="mode-toggle-simple-calendar"
        tabindex="0"
        onClick="${() => switchTo('simple-calendar-mode')}"
        >Simple Calendar</a
      >
    </li>
    <li>
      <a
        class="bp3-menu-item bp3-icon-download"
        id="mode-toggle-download"
        tabindex="0"
        onClick="${() => switchTo('simple-calendar-mode')}"
        >Share Card</a
      >
    </li>
    <li>
      <a
        class="bp3-menu-item bp3-icon-eye-on"
        id="mode-toggle-focus"
        tabindex="0"
        onClick="${() => document.querySelector('html').classList.add('focus-mode')}"
        >Focus</a
      >
    </li>
    <li class="bp3-menu-divider"></li>

    <li>
      <a
        class="bp3-menu-item bp3-icon-eye-open"
        id="mode-toggle-unfocus"
        tabindex="0"
        onClick="${() => document.querySelector('html').classList.remove('focus-mode')}"
        >Unfocus</a
      >
    </li>

    <li>
      <a
        class="bp3-menu-item bp3-icon-horizontal-bar-chart"
        id="mode-button-document"
        tabindex="0"
        onClick="${() => switchTo('document-mode')}"
        >Document</a
      >
    </li>
  </ul>`
}
