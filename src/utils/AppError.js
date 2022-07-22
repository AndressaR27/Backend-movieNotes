class AppError {
    message;
    statusCode;

    constructor (message, statusCode = 400){ // repassando o message e o statusCode para o contexto global
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;