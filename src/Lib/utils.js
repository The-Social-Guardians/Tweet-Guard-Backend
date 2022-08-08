export function isDevMode() {
    if (process.env.NODE_ENV) {
        return /^dev(elopment)?$/i.test(process.env.NODE_ENV)
    }

    return true;
}
