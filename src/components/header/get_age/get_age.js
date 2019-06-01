/**
 * Returns the age of a person by passing in their birthday.
 */
export function getAge(birthday, now = new Date()) {
  return Math.floor(
    (now.getTime() - birthday.getTime()) / 1000 / 60 / 60 / 24 / 365.25,
  );
}
