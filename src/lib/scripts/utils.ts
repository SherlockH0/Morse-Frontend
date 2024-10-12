// @ts-ignore
import emojiUnicode from "emoji-unicode";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { EMOJI_URL } from "./constants";
import { writable, type Writable } from "svelte/store";

export function isEmoji(character: string): boolean {
  let emoji = /\p{Extended_Pictographic}/u.test(character);

  let length = character.length;

  return emoji && length <= 6;
}

export async function getLottieJSONOfEmoji(string: string) {
  if (isEmoji(string)) {
    const emojiToUnicode = emojiUnicode(string).replace(/ /g, "_");

    const animation: string | null = await axios
      .get(`${EMOJI_URL}/${emojiToUnicode}/lottie.json`)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch(() => {
        return null;
      });
    return animation;
  }

  return null;
}

/**
 * Convert a date to a relative time string, such as
 * "a minute ago", "in 2 hours", "yesterday", "3 months ago", etc.
 * Using Intl.RelativeTimeFormat
 */
export function getRelativeTimeString(
  date: Date | number,
  now: number,
): string {
  // Allow dates or times to be passed
  const timeMs = typeof date === "number" ? date : date.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - now) / 1000);

  // Array representing one minute, hour, day, week, month, etc in seconds
  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ];

  // Array equivalent to the above but in the string representation of the units
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds),
  );

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  // Intl.RelativeTimeFormat do its magic
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}

export const dateTimeStore = writable<number>(Date.now());

setInterval(
  () => {
    dateTimeStore.set(Date.now());
  },
  1000 * 60 * 0.5,
);
