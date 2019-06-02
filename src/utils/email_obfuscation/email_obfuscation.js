/**
 * Very simple obfuscate functions I use to hide my email address in the source
 * code from bots.
 */

export function obfuscateEmail(email) {
  let obfuscated = '';
  for (let i = 0; i < email.length; i++) {
    obfuscated += String.fromCharCode(email[i].charCodeAt(0) + 7);
  }
  return obfuscated;
}

export function deobfuscateEmail(email) {
  let cleartext = '';
  for (let i = 0; i < email.length; i++) {
    cleartext += String.fromCharCode(email[i].charCodeAt(0) - 7);
  }
  return cleartext;
}
