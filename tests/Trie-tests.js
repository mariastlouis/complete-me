import fs from 'fs';
import {expect} from 'chai';
import {Trie} from '../lib/Trie.js';

const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe('Trie', () => {
  let wordTrie;

  it('should make a tree object', () => {
    wordTrie = new Trie();
    expect(wordTrie).to.be.an('object');

  });

  it('should increment word count as words inserted into tree', () => {
    wordTrie = new Trie ();
    wordTrie.insert('hello');
    expect(wordTrie.count).to.equal(1);
    wordTrie.insert('goodbye');
    expect(wordTrie.count).to.equal(2);

  });


  it.skip('should take in a word',() => {
   wordTrie = new Trie ();
   expect(wordTrie.count).to.equal(0);
    wordTrie.insert('hello');
       expect(
        wordTrie
          .children['h']
          .children['e']
          .children['l']
          .children['l']
          .children['l']
          .children['o'].endWord
      ).to.equal(1);

  });

it.skip('should return suggestions', () => {
    let wordTrie = new Trie();
    wordTrie.insert('hi');
    wordTrie.insert('high');
    wordTrie.insert('high');
    expect(wordTrie.suggest('h')).to.deep.eq(['hi', 'high', 'hight'])
  });





  it.skip('should populate a dictionary', () => {
        const wordTrie = new Trie();
        wordTrie.populate(dictionary);
        expect(wordTrie.count).to.equal(235886);
    });



});

