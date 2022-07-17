
# Cadastro de carro

**RF**
- [ ] Deve ser possível cadastrar um novo carro.
- [ ] Deve ser possível listar todas as categorias de carros.


**RN**
- [ ] Não deve ser possível cadastrar um carro com uma placa já existente.
- [ ] Não deve ser possível alterar a placa de um carro já cadastrado.
- [ ] O carro deve ser cadastrado com a disponibilidade, por padrão.
- [ ] O usuário responsável pelo cadastro deve ser um usuário admin.

# Listagem de carros

**RF**
- [ ] Deve ser possível listar todos os carros disponíveis.
- [ ] Deve ser possível listar um modelo de carro pelo nome da categoria.
- [ ] Deve ser possível listar um modelo de carro pelo nome da marca.
- [ ] Deve ser possível listar um modelo de carro pelo nome.

**RN**
- [ ] Não deve ser necessário estar logado no sistema para listar os carros.


# Cadastro de especificação no carro

**RF**
- [ ] Deve ser possível cadastrar uma especificação para um carro.
- [ ] Deve ser possível listar as especificações de um carro.
- [ ] Deve ser possível listar todos os carros

**RN**
- [ ] Não deve ser cadastrar uma especificação para um carro não cadastrado.
- [ ] Não deve ser cadastrar uma especificação já existente para o mesmo carro.
- [ ] Não deve ser necessário estar logado no sistema para listar os carros.

# Cadastro de imagens do carro

**RF**
- [ ] Deve ser possível cadastrar uma imagem para um carro.
- [ ] Deve ser possível listar todos os carros.

**RNF**
- [ ] Deve se utilizar o multer para upload dos arquivos.
  
**RN**
- [ ] Não deve ser cadastrar uma imagem para um carro não cadastrado.
- [ ] Deve ser possível cadastrar mais de uma imagem para o mesmo carro.
- [ ] O usuário responsável pelo cadastro deve ser um usuário admin.

# Aluguel de carro

**RF**
- [ ] Deve ser possível alugar um carro.

**RNF**

**RN**
- [ ] Deve ser possível alugar um carro disponível, com duração de no mínimo 24hrs.
- [ ] Não deve ser possível alugar um carro não disponível.
- [ ] Não deve ser possível alugar mais de um carro por usuário.