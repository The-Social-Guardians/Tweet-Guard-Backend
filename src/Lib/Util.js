import express from 'express';

export function isDevMode() {
    if (process.env.NODE_ENV) {
        return /^dev(elopment)?$/i.test(process.env.NODE_ENV);
    }

    return true;
}

/**
 * @param {express.RequestHandler} controllerMethod
 *
 * @returns {express.RequestHandler}
 */
export function createController(controllerMethod) {
    return controllerMethod;
}
