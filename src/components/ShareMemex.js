import { html } from "htm/react";
import React from "react";

export const ShareMemex = ({
  block,
  usageDays,
  blocksNum,
  onClose,
  onSave,
}) => {
  return html`
    <div class="bp3-dialog-container share-memex-container">
      <div class="bp3-dialog">
        <div class="bp3-dialog-header">
          <span class="bp3-icon-large bp3-icon-media"></span>
          <h4 class="bp3-heading">Share Zettel Image</h4>
          <button
            aria-label="Close"
            class="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-cross"
            onClick=${onClose}
          ></button>
        </div>
        <div class="bp3-dialog-body">
          <div class="tips">
            <p>Please waiting for the image to be generated...</p>
          </div>
          <div class="card">
            <div class="memo">
              <div class="time">${new Date(block.time).toLocaleString()}</div>
              <div class="content">
                <p>${block.string}</p>
                <p></p>
                <p>
                  <span class="tag">${"#" + block.tags.join("# ")}</span>
                </p>
              </div>
            </div>
            <div class="footer">
              <div class="stat">
                <span>${blocksNum} BLOCKS · </span>
                <span>${usageDays} DAYS</span>
              </div>
              <div class="author">via ${block.username}</div>
            </div>
            <img src="" class="share-card" />
          </div>
        </div>
        <div class="bp3-dialog-footer">
          <div class="bp3-dialog-footer-actions">
            <button type="button" class="bp3-button" onClick=${onClose}>
              Close
            </button>
            <button
              type="submit"
              class="bp3-button bp3-intent-primary"
              onClick=${onSave}
            >
              Save Again
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
};
