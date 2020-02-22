const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

const app = express();
mongoose.connect(
  "mongodb+srv://week10:week10@cluster0-v5hws.mongodb.net/week10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
app.use(cors());
app.use(express.json());
app.use(routes);

// Principais métodos HTTP: GET, POST, PUT, UPDATE, DELETE
// Tipos de parâmetros:

// Query Params: acessibilidade req.query (Filtros, Ordenação, paginação)...
// Route Params: acessibilidade req.params (Identificar recurso na alteração, identificação)...
// Body: acessibilidade req.body (Dados para criação ou atualização de um registro)

app.listen(process.env.PORT || 3333);
