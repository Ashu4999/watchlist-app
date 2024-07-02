function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

function capitalizeSentence(sentence) {
  if (sentence.length === 0) {
    return "";
  }

  const words = sentence.split(" ");

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  const capitalizedSentence = capitalizedWords.join(" ");

  return capitalizedSentence;
}

export { debounce, capitalizeSentence };
