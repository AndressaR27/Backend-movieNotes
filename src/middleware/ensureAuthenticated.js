const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

function ensureAuthenticated(request, response, next){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("JWT token não informado", 401)
    }

    //o authHeader devolve: "Bare xxxxxxxxxx", onde o xxx é o token
    const [, token] = authHeader.split(" "); // split separa a string pelo espaço e para nós não interessa o "Bare", pois isso uma vírgula vazia no Array

    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret) // sub é o conteúdo que está armazenado no verifyn(se o token for válido). E é criado um "apelido" para o sub que passa a ser user_id
        
        request.user = {
            id: Number(user_id)
        }

        return next();
    } catch {
        throw new AppError("JWT token inválido", 401)
    }
}

module.exports = ensureAuthenticated;