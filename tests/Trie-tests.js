import fs from 'fs';
import {expect} from 'chai';
import {Trie} from '../lib/Trie.js';

const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe('Trie', () => {
  let wordTrie;


  beforeEach(() => {
    wordTrie = new Trie();
  });

  it('should exist', () => {
    expect(wordTrie).to.exist;
  });

  it('should be an object', () => {
    expect(wordTrie).to.be.an('object');
  })

  it('should be able to populate with every word in the dictionary', () => {
    const wordTrie = new Trie();

    wordTrie.populate(dictionary);
    expect(wordTrie.count).to.equal(234371);
  });


});

describe('Insert', () => {
  let wordTrie;

  beforeEach(() => {
    wordTrie = new Trie();
  });

  it('should take a letter into the tree', () => {
    wordTrie.insert('a');
    expect(wordTrie.root.children.a.letter).to.equal('a')
  })

  it('should increment word count as words inserted into tree', () => {
    wordTrie.insert('hello');
    expect(wordTrie.count).to.equal(1);
    wordTrie.insert('goodbye');
    expect(wordTrie.count).to.equal(2);

  });

  it('should not increment add count if word already exists', () => {
    wordTrie.insert('hello');
    expect(wordTrie.count).to.equal(1);
    wordTrie.insert('hello');
    expect(wordTrie.count).to.equal(1)
  })

  it('should take in a word',() => {
    wordTrie.insert('hello');
    expect(
      wordTrie.root.children
      .h.children
      .e.children
      .l.children
      .l.children
      .o.letter).to.equal('o');
  });

  it('Should be able to insert two words', () => {
    wordTrie.insert('plaza');
    wordTrie.insert('place');
    expect(
      wordTrie.root.children
      .p.children
      .l.children
      .a.children
      .z.children
      .a.letter
      ).to.equal('a');
    expect(
      wordTrie.root.children
      .p.children
      .l.children
      .a.children
      .c.children
      .e.letter
      ).to.equal('e');
  })

});


describe('Suggest', () => {

  let wordTrie;

  beforeEach(() => {
    wordTrie = new Trie();
  });

  it('should return full words when given letters', () => {
    wordTrie = new Trie();
    wordTrie.insert('pizza');
    expect(wordTrie.suggest('piz')).to.deep.equal(['pizza'])
  })

  it('should make suggestions despite capitalization of inserted words', () => {
    wordTrie.insert('piZzLe');
    wordTrie.insert('PizzA');
    expect(wordTrie.suggest('piz')).to.deep.equal(['pizzle', 'pizza']);
    expect(wordTrie.suggest('PiZ')).to.deep.equal(['pizzle', 'pizza']);
  })

  it('should include several words when only given a few letters' , () => {
    wordTrie.populate(dictionary);
    expect(wordTrie.suggest('app')).to.include.members(['apple', 'appreciation', 'approachable', 'appendicitis'])
  })
  
  it('should prioritize suggestions based on what is selected most often', () => {
    wordTrie = new Trie();
    wordTrie.insert('pizzle');
    wordTrie.insert('pizza');
    wordTrie.insert('pizzeria')
    expect(wordTrie.suggest('piz')).to.deep.equal(['pizzle', 'pizza', 'pizzeria'])
    wordTrie.select('pizza');
    expect(wordTrie.suggest('piz')).to.deep.equal(['pizza', 'pizzle', 'pizzeria'])
    wordTrie.select('pizza');
    wordTrie.select('pizzeria')
    expect(wordTrie.suggest('piz')).to.deep.equal(['pizza', 'pizzeria', 'pizzle'])
  })

});






