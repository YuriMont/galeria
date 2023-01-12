# Backend - galeria

### Funções
* Sistema rustico de login
* Validação dos dados
* Entegração com Banco de dados MySQL
* Adicionar usuário no banco
* Excluir usuário do banco
* Adicionar imagem na galeria do usuário
* Excluir imagem da galeria do usuário
* Mudar status de favorito da imagem
* Mostrar todas as imagens favoritadas de um usuário

### Rotas
* Inicio 
> GET - http://localhost:8080/

* Adicionar usuário
> POST - http://localhost:8080/cadastro

* Remover usuário
> DELETE - http://localhost:8080/u/delete?usuario_id=<usuario_id>

* Logar
> POST - http://localhost:8080/u/login

* Obter todos os usuários
> GET - http://localhost:8080/u/all

* Adicionar imagem na galeria do usuário 
> POST - http://localhost:8080/u/<usuario_id>/galeria

* Visualizar galeria do usuário
> GET - http://localhost:8080/u/<usuario_id>/galeria

* Visualigar imagem
> GET - http://localhost:8080/u/<usuario_id>/galeria/<imagem_id>

* Pesquisar imagem por titulo ou por data de publicação
> GET - http://localhost:8080/u/<usuario_id>/galeria?find=<pesquisa>

* Alterar status de favorito
> PUT - http://localhost:8080/u/<usuario_id>/galeria/favorito?imagem_id=<imagem_id>

* Visualizar todas as imagens favoritadas
> GET - http://localhost:8080/u/<usuario_id>/galeria/favoritos

* Deletar imagem
> DELETE - http://localhost:8080/u/<usuario_id>/galeria/<imagem_id>



