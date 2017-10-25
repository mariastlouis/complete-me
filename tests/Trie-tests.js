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
    // wordTrie = new Trie ();
    expect(wordTrie).to.exist;
  });

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
    console.log(wordTrie.root.children);
       expect(
        wordTrie.root.children
          .h.children
          .e.children
          .l.children
          .l.children
          .o.letter).to.equal('o');
  });

  // Should be able to insert two words
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


  it.skip('should populate a dictionary', () => {
        const wordTrie = new Trie();

        wordTrie.populate(dictionary);
        expect(wordTrie.count).to.equal(235886);
    });


});


describe('Suggest', () => {
  
  let wordTrie;

   it('should return array of all the complete words', () => {
          wordTrie = new Trie();
          wordTrie.insert('pizza');
          expect(wordTrie.suggest('piz')).to.deep.equal(['pizza'])
    })

});




