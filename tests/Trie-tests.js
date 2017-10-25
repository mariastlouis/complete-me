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


  it('should take in a word',() => {
    // wordTrie = new Trie ();
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


  it.skip('should populate a dictionary', () => {
        const wordTrie = new Trie();

        wordTrie.populate(dictionary);
        expect(wordTrie.count).to.equal(235886);
    });

 it('should return array', () => {
        let wordTrie = new Trie();
        wordTrie.insert('pizza');
        console.log(JSON.stringify(wordTrie, null, 2));
        // expect(wordTrie.suggest('piz')).to.be.an('array');

        
        expect(wordTrie.suggest('piz')).to.deep.equal(['pizza'])
      })




});


// describe('SUGGEST', () => { 
//     it('should return an array', () => {
//     let wordTrie = new Trie();
//     wordTrie.insert('pizza');
//     expect(wordTrie.suggest('piz')).to.be.array;
//     expect(wordTrie.suggest('piz')).to.deep.equal(['pizza']);
//   });
// });
    
  


