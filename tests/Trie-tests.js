import fs from 'fs';
import {expect} from 'chai';
import {Trie} from '../lib/Trie.js';

const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe('Trie', () => {
  let wordTrie;
  let node;

  // beforeEach(() => {
  //   wordTrie = new Trie();
  //   node = new Node();
  // });

  // it('should make a tree object', () => {
  //   expect(wordTrie).to.be.an('object');

  // });

  it('should exist', () => {
    wordTrie = new Trie;
    expect(wordTrie).to.exist;
  });

  it('should increment word count as words inserted into tree', () => {
    wordTrie.insert('hello');
    expect(wordTrie.count).to.equal(1);
    wordTrie.insert('goodbye');
    expect(wordTrie.count).to.equal(2);

  });


  it('should take in a word',() => {
    wordTrie.insert('hello');
    console.log(JSON.stringify(wordTrie, null, 2));
       expect(
        wordTrie.root.child
          .h.child
          .e.child
          .l.child
          .l.child
          .o.letter).to.equal('o')

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

 
    it('should return array', () => {
        wordTrie.insert('pizza');
        expect(wordTrie.suggest('piz')).to.be.an('array');
        expect(wordTrie.suggest('piz')).to.deep.equal(['pizza'])
      })


// });


})



