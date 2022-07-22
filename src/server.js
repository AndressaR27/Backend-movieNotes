require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations")
const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json()); //json = padrão utilizado no corpo da requisição (insomnia)

//importar as rotas
const routes = require("./routes");
const AppError = require("./utils/AppError");

app.use(routes);
migrationsRun();

//configurar os errors
app.use((error, request, response, next) => {
    
    if (error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }
    
    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
})

const PORT = 3333;
app.listen(PORT, () => console.log(`Server ir running on Port ${PORT}`));