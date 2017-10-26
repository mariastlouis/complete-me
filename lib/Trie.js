import Node from '../lib/Node.js';

export class Trie {
  constructor () {
    this.root = new Node();
    this.count = 0;
    // this.suggestions = [];
  }

  insert(word) {

    word = word.toLowerCase();
    word = word.split('');
    
    let currentNode = this.root;
    // let currentParent = this.root;
    // let currentPosition = this.root.children;

    word.forEach( letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
      // currentNode.children = currentPosition[letter].children;

    });

    if (!currentNode.wordEnd) {
      this.count++;
    }

    currentNode.wordEnd = true;
  }


  suggest(phrase) {
    // this.suggestions = [];
    phrase = phrase.toLowerCase()
    phrase = phrase.split('');

    let currentNode = this.root;
    
    phrase.forEach(letter => {

      if(currentNode && currentNode.children) {
          currentNode = currentNode.children[letter];
      }

    
      // if (currentNode === null) {
      //   return null;
      });

    if(!currentNode || !currentNode.children) {
      return [];
    } else {
       return this.findSuggestions(currentNode, phrase.join(''));
    }
  }

  findSuggestions(currentNode, phrase, suggestions = []) {
    let childrenLetters = Object.keys(currentNode.children);

    childrenLetters.forEach(childLetter => {
      let letterNode = currentNode.children[childLetter];
      let newPhrase = phrase + childLetter;

      if (letterNode.wordEnd) {
        suggestions.push({
          word: newPhrase,
          popCount: letterNode.popularity});
      }
      this.findSuggestions(letterNode, newPhrase, suggestions);

    });

    suggestions.sort((a, b) => {
      return b.popCount - a.popCount;
    });

    return suggestions.map(wordObj => {
      return wordObj.word;
    });

  }

  populate(wordList) {
    wordList.forEach(word => {
      this.insert(word);
    });
  }

  // count() {
  //   return this.count;
  // }

  select(word) {
    let currentNode = this.root;

    word = word.split('');
    word.forEach(letter => {
      currentNode = currentNode.children[letter];
    });
    currentNode.popularity++;
  }
  
  // prioritizeSuggestions(suggestions) {
  //   suggestions.forEach(word => {
  //     if (!this.selections[word]) {
  //       this.selections[word] = 0;
  //     }
  //     for (let j = 0; j < suggestions.length; j++) {
  //       for (let i = 0; i < suggestions.length - 1; i++) {
  //         if (this.selections[suggestions[i]] < 
  //             this.selections[suggestions [i + 1]]) {
  //           let temp = suggestions[i];

  //           suggestions[i] = suggestions [i + 1];
  //           suggestions[i + 1] = temp;
  //         }
  //       }
  //     }
  //     return suggestions;
  //   });
  // }

}

