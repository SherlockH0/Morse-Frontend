const is_emoji = (character: string): boolean => {
  let emoji = /\p{Extended_Pictographic}/u.test(character);
  let length = character.match(/./gu)!.length;
  return emoji && length == 1;
};

const unicode2LottieUrl = (unicode: string): string =>
  `https://fonts.gstatic.com/s/e/notoemoji/latest/${unicode.codePointAt(0)!.toString(16)}/lottie.json`;

export { is_emoji, unicode2LottieUrl };
