import { html } from 'htm/react';

export default function MenuList() {
  function hello() {
    alert('eh');
  }

  return html`
    <ul class='bp3-menu bp3-elevation-1'>
      <li>
        <a class='bp3-menu-item bp3-icon-people' tabindex='0' onClick='${hello}'> Share... </a>
      </li>
      <li>
        <a class='bp3-menu-item bp3-icon-circle-arrow-right' tabindex='0'> Move... </a>
      </li>
      <li>
        <a class='bp3-menu-item bp3-icon-edit' tabindex='0'> Rename </a>
      </li>
      <li class='bp3-menu-divider'></li>
      <li>
        <a class='bp3-menu-item bp3-icon-trash bp3-intent-danger' tabindex='0'> Delete </a>
      </li>
    </ul>`;
}
