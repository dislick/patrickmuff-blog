import { obfuscateEmail, deobfuscateEmail } from './email_obfuscation';

describe('email_obfuscation', () => {
  it('should obfuscate and deobfuscate a string', () => {
    expect(deobfuscateEmail(obfuscateEmail('hello'))).toBe('hello');
  });
  it('should obfuscate and deobfuscate an email address', () => {
    expect(deobfuscateEmail(obfuscateEmail('dwight.schrute@office.com'))).toBe(
      'dwight.schrute@office.com',
    );
  });
});
