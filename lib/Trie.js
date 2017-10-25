import {Node} from './Node.js';

export class Trie {
  constructor () {
    this.root = new Node('');
    this.count = 0;
  }

  insert(word) {
    this.count ++;
    word = word.split('');
    
    let currentParent = this.root;
    let currentPosition = this.root.children;

    for (let i = 0; i < word.length; i++ ) {

      if (!currentPosition.hasOwnProperty(word[i])) {
        currentPosition[word[i]] = new Node(word[i]);
      }
      currentPosition = currentPosition[word[i]].children;
      currentParent = currentParent.children[word[i]];
    }
    currentParent.wordEnd = true;
  }


  suggest(phrase) {
    phrase = phrase.split('');

    let currentNode = this.root;
    
    phrase.forEach(letter => {

      currentNode = currentNode.children[letter];
      if (currentNode === null) {
        return null;
      }
    });
    return this.findSuggestions(currentNode, phrase.join(''));
  }

  findSuggestions(currentNode, phrase) {
    let childrenLetters = Object.keys(currentNode.children);
    
    let suggestions = [];
    
    childrenLetters.forEach(childLetter => {
      let letterNode = currentNode.children[childLetter];

      let newPhrase = phrase + childLetter;

      if (letterNode.children === {}) {
        suggestions.push(newPhrase);
      } else if (letterNode.wordEnd) {
        suggestions.push(newPhrase);
        suggestions.push(...this.findSuggestions(letterNode, newPhrase));
      } else {
        suggestions.push(...this.findSuggestions(letterNode, newPhrase));
      }
    });
    return suggestions;
  }



  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    });
  }


}

