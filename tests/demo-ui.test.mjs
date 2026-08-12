import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const demoSource = readFileSync(new URL('../demo.html', import.meta.url), 'utf8');

function loadShowScreen() {
  const match = demoSource.match(/function showScreen\(name\) \{[\s\S]*?\n  \}/);
  assert.ok(match, 'demo.html should define showScreen(name)');
  return new Function('el', 'window', `${match[0]}; return showScreen;`);
}

test('redrawing the active play screen does not scroll the player back to the top', () => {
  const active = new Set(['play']);
  const screens = Object.fromEntries(['pick', 'play', 'end'].map((key) => [key, {
    classList: {
      contains(name) { return name === 'on' && active.has(key); },
      toggle(name, enabled) {
        if (name !== 'on') return;
        if (enabled) active.add(key); else active.delete(key);
      },
    },
  }]));
  const scrolls = [];
  const showScreen = loadShowScreen()((id) => screens[id.replace('screen-', '')], {
    scrollTo(options) { scrolls.push(options); },
  });

  showScreen('play');
  assert.equal(scrolls.length, 0, 'same-screen yearly render must preserve reading position');

  showScreen('end');
  assert.equal(scrolls.length, 1, 'a real screen transition should still begin at the top');
  assert.deepEqual([...active], ['end']);
});
