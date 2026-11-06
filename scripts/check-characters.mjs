import assert from 'node:assert/strict';
import { access, readdir } from 'node:fs/promises';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

// Windows also needs to catch paths that would fail on GitHub's Linux runner.
async function checkPublicAsset(url) {
  if (!url || /^https?:\/\//i.test(url)) return;
  assert.ok(url.startsWith('/archive/'), `Нет базового пути: ${url}`);
  let directory = new URL('../public/', import.meta.url);
  const parts = url.slice('/archive/'.length).split('/');
  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    assert.ok(part && part !== '.' && part !== '..', `Некорректный путь: ${url}`);
    assert.ok((await readdir(directory)).includes(part), `Файл отсутствует или отличается регистр букв: ${url}`);
    directory = new URL(`${encodeURIComponent(part)}${index < parts.length - 1 ? '/' : ''}`, directory);
  }
  await access(directory);
}

// Exercise Vite's real JSON imports and BASE_URL handling without a browser server.
const server = await createServer({
  base: '/archive/',
  server: { middlewareMode: true },
  ssr: { noExternal: ['react-router-dom', 'react-router'], resolve: { conditions: ['module', 'import', 'development'] } },
});
try {
  const { characters, findCharacter } = await server.ssrLoadModule('/src/data/characters.ts');
  const { loadCharacters } = await server.ssrLoadModule('/src/data/characterLoader.ts');
  const { readCharacterFilters, filterCharacters, characterTheme } = await server.ssrLoadModule('/src/data/characterFilters.ts');
  const { beyondCategories } = await server.ssrLoadModule('/src/data/beyond.ts');
  const { attributes } = await server.ssrLoadModule('/src/data/attributes.ts');
  for (const attribute of attributes) await checkPublicAsset(attribute.image);

  assert.equal(new Set(characters.map(character => character.id)).size, characters.length);
  for (const character of characters) {
    assert.equal(findCharacter(character.id), character);
    await checkPublicAsset(character.image);
    for (const artifact of character.artifacts ?? []) await checkPublicAsset(artifact.image);
  }
  assert.equal(findCharacter('missing-character'), undefined);
  const actualSelect = query => filterCharacters(characters, readCharacterFilters(new URLSearchParams(query))).map(character => character.id).sort();
  for (const side of ['neutral', 'white', 'black']) {
    const expected = characters.filter(character => character.side === side && character.roles?.includes('figure')).map(character => character.id).sort();
    assert.ok(expected.length > 0);
    assert.deepEqual(actualSelect(`side=${side}&role=figure`), expected);
  }
  assert.ok(!actualSelect('side=unknown').includes('ange'));

  const fixtures = loadCharacters({
    'white-lord.json': { id: 'white-lord', name: 'A', side: 'white', roles: ['territorial-lord', 'observer'], attributes: ['star', 'void'], image: 'characters/a.png', artifacts: [{ id: 'item', name: 'Item', image: 'artifacts/item.png' }] },
    'black-witch.json': { id: 'black-witch', name: 'B', side: 'black', roles: ['witch'], attributes: ['fire'] },
    'unknown.json': { id: 'unknown', name: 'C', roles: ['observer'], attributes: null, artifacts: null },
    'empty.json': { id: 'empty', name: 'D', roles: [], attributes: [] },
  });
  const fixture = fixtures.find(character => character.id === 'white-lord');
  assert.equal(fixture.image, '/archive/characters/a.png');
  assert.equal(fixture.artifacts[0].image, '/archive/artifacts/item.png');
  const select = query => filterCharacters(fixtures, readCharacterFilters(new URLSearchParams(query))).map(character => character.id).sort();
  assert.deepEqual(select('side=white&role=territorial-lord&attribute=star'), ['white-lord']);
  assert.deepEqual(select('side=black&role=territorial-lord'), []);
  assert.deepEqual(select('role=observer'), ['unknown', 'white-lord']);
  assert.deepEqual(select('role=observer&role=witch'), ['black-witch', 'unknown', 'white-lord']);
  assert.deepEqual(select('attribute=void&attribute=fire'), ['black-witch', 'white-lord']);
  assert.deepEqual(select('side=unknown'), ['empty', 'unknown']);
  assert.deepEqual(select('attribute=star'), ['white-lord']);
  assert.deepEqual(select('side=white&side=black'), ['black-witch', 'white-lord']);
  assert.equal(select('').length, fixtures.length);
  assert.deepEqual(readCharacterFilters(new URLSearchParams('side=white&side=white&role=invalid&attribute=unknown')), { sides: ['white'], roles: [], attributes: [] });
  assert.equal(characterTheme(['white']), 'white');
  assert.equal(characterTheme(['black']), 'black');
  assert.equal(characterTheme(['unknown']), 'unknown');
  assert.equal(characterTheme(['neutral']), 'neutral');
  assert.equal(characterTheme(['white', 'black']), 'all');
  assert.equal(characterTheme([]), 'all');
  for (const category of beyondCategories) assert.ok(category.path.startsWith('/characters?role='));

  assert.throws(() => loadCharacters({ 'a.json': { id: 'same', name: 'A' }, 'b.json': { id: 'same', name: 'B' } }), /повторяется/);
  assert.throws(() => loadCharacters({ 'bad.json': { id: 'bad', name: 'A', roles: ['typo'] } }), /roles/);
  assert.throws(() => loadCharacters({ 'bad.json': { id: 'bad', name: 'A', attributes: ['Star'] } }), /attributes/);
  assert.throws(() => loadCharacters({ 'bad.json': { id: 'bad', name: 'A', side: 'typo' } }), /side/);
  assert.throws(() => loadCharacters({ 'bad.json': { id: 'bad', name: 'A', artifacts: 'sword' } }), /artifacts/);
  assert.throws(() => loadCharacters({ 'bad.json': { id: 'bad' } }), /name/);
  const { default: CharactersPage } = await server.ssrLoadModule('/src/pages/CharactersPage.tsx');
  const { default: CharacterPage } = await server.ssrLoadModule('/src/pages/CharacterPage.tsx');
  const { MemoryRouter, Route, Routes } = await server.ssrLoadModule('react-router-dom');
  function renderPage(path, page, route) {
    return renderToString(createElement(MemoryRouter, { initialEntries: [path] }, createElement(Routes, null, createElement(Route, { path: route, element: createElement(page) }))));
  }
  const catalog = renderPage('/characters', CharactersPage, '/characters');
  assert.ok(catalog.includes('Каталог персонажей'));
  assert.ok(catalog.includes('Атрибуты'));
  assert.ok(catalog.includes('Кем является'));
  for (const character of characters) {
    assert.ok(catalog.includes(`/characters/${character.id}`));
    const profile = renderPage(`/characters/${character.id}`, CharacterPage, '/characters/:characterId');
    assert.ok(profile.includes('Что известно:'));
    assert.ok(profile.includes('Информация о персонаже'));
    assert.ok(!profile.includes('Персонаж не найден'));
  }
  assert.ok(renderPage('/characters/missing-character', CharacterPage, '/characters/:characterId').includes('Персонаж не найден'));
  console.log(`Каталог проверен: ${characters.length} персонажей; комбинации фильтров, темы, пути изображений и валидация работают.`);
} finally {
  await server.close();
}
