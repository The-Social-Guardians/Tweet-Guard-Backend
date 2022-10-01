export default class HttpException extends Error {
    #code;
    #message;

    constructor(message, code = 500) {
        if (message instanceof Error) {
            super(message.message);
            super.stack = message.stack;
            super.name = message.name;
            this.#message = message.message;
        } else {
            super(message);
            this.#message = message;
        }

        this.#code = code;
    }

    getMessage() {
        return this.#message;
    }

    getCode() {
        return this.#code;
    }

    getStack() {
        return this.stack;
    }

    getName() {
        return this.name;
    }
}
