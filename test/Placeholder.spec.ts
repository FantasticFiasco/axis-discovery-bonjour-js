import * as chai from 'chai';

import { Placeholder } from './../src';

chai.should();

describe('placeholder', () => {
    it('#add', () => {
        const placeholder = new Placeholder();

        placeholder.add(1, 2).should.equal(3);
    });
});
