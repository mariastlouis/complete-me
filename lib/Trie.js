import Node from '../lib/Node.js';

export class Trie {
  constructor () {
    this.root = new Node();
    this.count = 0;
    this.suggestions = [];
  }

  insert(word) {


    // this.count ++;
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

    if (!currentParent.wordEnd){
      this.count++;
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

    childrenLetters.forEach(childLetter => {
      let letterNode = currentNode.children[childLetter];
      let newPhrase = phrase + childLetter;

      if (letterNode.wordEnd) {
        this.suggestions.push({word: newPhrase,
          popCount: letterNode.popularity});
      }
      return this.findSuggestions(letterNode, newPhrase);

    });

    this.suggestions.sort((a, b) => {
      return b.popCount - a.popCount;
    });

    return this.suggestions.map(newWord => {
      return newWord.word;
    });

  }


  
  // findSuggestions(currentNode, phrase) {
  //   let childrenLetters = Object.keys(currentNode.children);
  //   let suggestions = [];
    
  //   childrenLetters.forEach(childLetter => {
  //     let letterNode = currentNode.children[childLetter];
  //     let newPhrase = phrase + childLetter;

  //     if (letterNode.children === {}) {
  //       suggestions.push(newPhrase);
  //     } else if (letterNode.wordEnd) {
  //       suggestions.push(newPhrase);
  //       suggestions.push(...this.findSuggestions(letterNode, newPhrase));
  //     } else {
  //       suggestions.push(...this.findSuggestions(letterNode, newPhrase));
  //      console.log(suggestions)32
  //     }
  //   });

  //   return this.prioritizeSuggestions(suggestions);
  // }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    });
  }

  count() {
    return this.count;
  }

  select(word) {
    let currentNode = this.root;

    word = word.split('');
    word.forEach(letter => {
      currentNode = currentNode.children[letter];
    });
    currentNode.popularity++;
  }
  // select(word) {
  //   if (this.selections[word]) {
  //     this.selections[word]++;
  //   } else {
  //     this.selections [word] = 1;
  //   }
  // }

  prioritizeSuggestions(suggestions) {
    suggestions.forEach(word => {
      if (!this.selections[word]) {
        this.selections[word] = 0;
      }
      for (let j = 0; j < suggestions.length; j++) {
        for (let i = 0; i < suggestions.length - 1; i++) {
          if (this.selections[suggestions[i]] < 
              this.selections[suggestions [i + 1]]) {
            let temp = suggestions[i];

            suggestions[i] = suggestions [i + 1];
            suggestions[i + 1] = temp;
          }
        }
      }
      return suggestions;
    });
  }

}

