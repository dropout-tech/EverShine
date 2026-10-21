import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

async function loadTs(path) {
  const source = fs.readFileSync(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
  return import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));
}
const { buildMemberSlug, resolveMemberFromSlug } = await loadTs('../src/lib/memberSlug.ts');
const { formatTaiwanPhoneTelHref } = await loadTs('../src/lib/phoneFormat.ts');
const members = [{ id: 48, name: '楊明翰' }, { id: 1020, name: '楊明翰' }, { id: 41, name: '吳貞妮' }];
assert.equal(buildMemberSlug(members[0]), '48');
assert.equal(buildMemberSlug(members[1]), '1020');
assert.equal(resolveMemberFromSlug('48', members), members[0]);
assert.equal(resolveMemberFromSlug('1020', members), members[1]);
assert.equal(resolveMemberFromSlug(encodeURIComponent('楊明翰'), members), null);
assert.equal(resolveMemberFromSlug(encodeURIComponent('吳貞妮'), members), members[2]);
assert.equal(resolveMemberFromSlug('9999', members), null);
assert.equal(formatTaiwanPhoneTelHref('+85267360566'), '+85267360566');
assert.equal(formatTaiwanPhoneTelHref('0972-735-987'), '0972735987');
assert.equal(formatTaiwanPhoneTelHref('+886972735987'), '0972735987');
console.log('PASS: distinct member IDs, unambiguous legacy links, and international phone links');
const { findReferralMember } = await loadTs('../src/lib/referralMember.ts');
assert.equal(findReferralMember(members, 48, '楊明翰'), members[0]);
assert.equal(findReferralMember(members, 1020, '楊明翰'), members[1]);
assert.equal(findReferralMember(members, null, '楊明翰'), undefined);
assert.equal(findReferralMember(members, 9999, '吳貞妮'), undefined);
assert.equal(findReferralMember(members, null, '吳貞妮'), members[2]);
console.log('PASS: referral identity cannot mix same-name members');
