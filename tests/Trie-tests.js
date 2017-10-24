import {expect} from 'chai';
// import {index} from './index.js';
import {Trie} from '../lib/Trie.js';

describe('Trie', () => {
  it('should make a tree object', () => {
    var wordTrie = new Trie()
    expect(wordTrie).to.be.an('object');

  });

  it('should increment word count as words inserted into tree', () => {
    var wordTrie = new Trie ();
    wordTrie.insert('hello');
    expect(wordTrie.count).to.equal(1)
    wordTrie.insert('goodbye');
    expect(wordTrie.count).to.equal(2)

  })





})