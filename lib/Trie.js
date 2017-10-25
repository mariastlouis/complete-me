import Node from '../lib/Node.js';

export class Trie {
  constructor () {
    this.root = new Node();
    this.count = 0;
    this.selections = {};
  }

  insert(word) {
    this.count ++;
    word = word.split('');
    
    let currentParent = this.root;
    let currentPosition = this.root.children;

    word.forEach( letter => {
      if (!currentPosition[letter]) {
        currentPosition[letter] = new Node(letter);
      }
      currentParent = currentParent.children[letter];
      currentPosition = currentPosition[letter].children;

    });

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

