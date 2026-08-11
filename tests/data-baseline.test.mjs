import assert from 'node:assert/strict';
import test from 'node:test';

globalThis.window = globalThis;
await import('../assets/actions-data.js');
await import('../assets/world-data.js');
await import('../assets/choices-data.js');

test('the published prototype data loads without a browser', () => {
  assert.ok(globalThis.MINGUO);
  assert.ok(globalThis.MINGUO_WORLD);
  assert.ok(globalThis.MINGUO_CHOICES);
});

test('the published prototype keeps its three-family baseline', () => {
  assert.deepEqual(Object.keys(globalThis.MINGUO.families), [
    'subeipoor',
    'jiangnanshen',
    'shanghaigongshang',
  ]);
  assert.equal(Object.keys(globalThis.MINGUO.tracks).length, 6);
  assert.equal(globalThis.MINGUO_CHOICES.situations.length, 12);
  assert.equal(globalThis.MINGUO_CHOICES.count(), 37);
});

test('legacy origin data remains available during the v2 migration', () => {
  assert.equal(Object.keys(globalThis.MINGUO.origins).length, 6);
  assert.ok(globalThis.MINGUO.findAction('care-mother'));
  assert.ok(globalThis.MINGUO.findEvent('tenant', 'conscript'));
});
