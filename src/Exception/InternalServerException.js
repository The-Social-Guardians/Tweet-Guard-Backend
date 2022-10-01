import HttpException from './HttpException.js';

export default class InternalServerException extends HttpException {
    constructor(message) {
        super(message);
    }
}
