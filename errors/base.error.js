module.exports = class BaseError extends Error {
    status
    errors

    constructor(status, messages, errors) {
        super(messages);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError () {
        return new BaseError(401, "Unauthorized");
    }

    static Badrequest (message, errors = []) {
        return new BaseError(400, message, errors);
    }
}