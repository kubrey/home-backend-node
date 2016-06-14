"use strict";

const utils = require('util');

//классы ошибок, наследуемые от Error

function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);//для поддержки трассировки стэка вызовов

    this.message = message || "Error";
}

utils.inherits(AuthError, Error);//наследование

AuthError.prototype.name = 'AuthError';

function SocketError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, SocketError);//для поддержки трассировки стэка вызовов

    this.message = message || "Error";
}

utils.inherits(SocketError, Error);//наследование

SocketError.prototype.name = 'SocketError';

function HttpError(status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);//для поддержки трассировки стэка вызовов

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}

utils.inherits(HttpError, Error);//наследование

HttpError.prototype.name = 'HttpError';

exports.SocketError = SocketError;
exports.AuthError = AuthError;
exports.HttpError = HttpError;
