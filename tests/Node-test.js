import { expect } from 'chai';
import Node from '../lib/Node.js';

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node();
  });

  it('should have a default letter of null', () => {
    expect(node.letter).to.equal(null);
  });

  it('should have children default to an empty object', () => {
    expect(node.children).to.deep.equal({})
  });

  it('should default false to wordEnd', () => {
    expect(node.wordEnd).to.equal(false)
  });

  it('should take in a letter', () => {
    node = new Node('a');
    expect(node.letter).to.equal('a')
  });

});