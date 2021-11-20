export function updateCardsStickyTop(top) {
  setTimeout(() => {
    const cards = document.querySelectorAll('.rm-block__children.rm-level-0 > .roam-block-container');

    console.log({ cards });

    for (let i = 0; i < cards.length; i++) {
      cards[i].style.top = top || String(130 + (i - 1) * 70) + 'px';
    }
  }, 500);
}
