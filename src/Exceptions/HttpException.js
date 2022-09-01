export default class HttpException extends Error {
    #code;
    #message;

    constructor(message, code = 500) {
        super(message);

        this.#code = code;
        this.#message = message;
    }

    getMessage() {
        return this.#message;
    }

    getCode() {
        return this.#code;
    }
}
