import HttpException from './HttpException.js';

export default class HttpAccessDeniedException extends HttpException {
    constructor(message) {
        super(message, 403);
    }
}
