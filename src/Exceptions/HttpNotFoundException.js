import HttpException from "./HttpException.js"

export default class HttpAuthenticationException extends HttpException {
    constructor(message) {
        super(message, 404)
    }
}
