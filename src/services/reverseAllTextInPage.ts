export const reverseAllTextInPage = () => {
  const reverseText = (text: string) => Array.from(text).reverse().join("");

  const traverseAndReverse = (node: HTMLElement | ChildNode) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent) {
      node.textContent = reverseText(node.textContent);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach(traverseAndReverse);
    }
  };

  traverseAndReverse(document.body);
}
