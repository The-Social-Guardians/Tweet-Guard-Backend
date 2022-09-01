export function isDevMode() {
    if (process.env.NODE_ENV) {
        return /^dev(elopment)?$/i.test(process.env.NODE_ENV);
    }

    return true;
}

/**
 * @param {import("express").RequestHandler} controllerMethod
 *
 * @returns {import("express").RequestHandler}
 */
export function createController(controllerMethod) {
    return controllerMethod;
}
