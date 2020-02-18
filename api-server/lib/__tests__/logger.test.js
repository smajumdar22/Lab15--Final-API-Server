'use strict';

const logger =  require('../middleware/logger.js')

const req = { params : { model: "categories"}};
const res = {};
const next = jest.fn();
jest.spyOn(global.console, 'log');

describe('logger middleware', () => {
    it('works',() => {
        logger(req,res,next);
        expect(console.log).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        //expect(next).not.toHaveBeenCalled();
    })
})