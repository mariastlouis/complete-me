import { expect } from 'chai';
import index from '../lib/index'
import {bubbleSort, insertionSort, mergeSort, quickSort} from '@mariastlouis/sorting-suite'


describe('Example Test File', () => {
  it('should successfully use sorts we imported', () => {
    expect(bubbleSort([3,2,1])).to.deep.equal([1,2,3]);
  }) 
})
