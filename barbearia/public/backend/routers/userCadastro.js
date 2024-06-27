const databaseRegisterUsers = require("../db/dbCadastroProdutos");

module.exports = (api) => {
    const bodyMiddle = require("body-parser");
    api.use(bodyMiddle.json());
    api.post("/registro", async (res, data) => {
      try {
        const { nome,email, idade } = res.body;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            data.send({message: "Digite um email valido, obrigado.", status: 400}).status(400)
            return
        }
        if(!nome && !email && !idade) {
         data.send({message: "Os campo é obrigatório e não pode ficar vazio.", status: 400,  }).status(400); 
         return
        }
        await databaseRegisterUsers(nome,email, idade)
        data.send({  message: "Os dados foram recebidos com sucesso.",  status: 200, }) .status(200);
      } catch (error) {
        data.send({message:"servidor nao encontrou ou deu um erro, tente novamente mais tarde.",status: 404, }).status(404);
      }
    });
}