import { html } from "htm/react";
import React from "react";

export const ShareMemex = ({ usageDays, blocksNum, onClose, onSave }) => {
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
            <p>Long press or right click to save the image when finished...</p>
          </div>
          <div class="card">
            <div class="memo">
              <div class="time">2021-03-06 21:47:14</div>
              <div class="content">
                <p>章节: 万亿巨佬的买就赚20%定律</p>
                <p>
                  笔记：高瓴资本是由张磊在2005年创立的投资机构，截止今年6月管理5000亿资产。考虑6月到现在其持仓基本都大涨，目前可能接近万亿。
                </p>
                <p></p>
                <p>钱多没啥，牛叉的是成立以来年化回报率超过40%。</p>
                <p></p>
                <p>
                  回报率是指给投资人创造的收益，高瓴本身还要收管理费，反推一下年化收益率要达到50%才行。传奇基金经理林奇的记录是年化20%出头，高瓴是如何做到50%的呢？
                </p>
                <p></p>
                <p>
                  答案就是做多中国、做多科技和互联网、做多新消费（含医药）。
                </p>
                <p>日期：2021/01/16</p>
                <p></p>
                <p>
                  <span class="tag">#微信读书/刘备教授</span>
                </p>
              </div>
            </div>
            <div class="footer">
              <div class="stat">
                <span>${blocksNum} BLOCKS · </span>
                <span>${usageDays} DAYS</span>
              </div>
              <div class="author">via JimmyLv</div>
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
