import HttpException from './HttpException.js';

export default class HttpNotAcceptableException extends HttpException {
    constructor(message) {
        super(message, 406);
    }
}
