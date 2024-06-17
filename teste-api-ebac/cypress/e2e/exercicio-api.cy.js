/// <reference types="cypress" />

import contrato from '../contracts/Usuarios.contrato'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(Response => {
      return contrato.validateAsync(response.body)
    })
  });

  it.only('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios'      
    }).should(resp =>{
      expect(resp.status).to.equal(200)
      expect(resp.body).to.have.property('Usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    let cadastro = 'Usuario EBAC ' + Math.floor(Math.random() * 10000)
    cy.cadastrarUsuarios(token, 'lucas', email, 'Teste123', administrador).then((response) => {
      expect(response.status).equal(201)
      expect(response.body.message).equal('Cadastro realizado com sucesso')
    })
    })
  });

  it('Deve validar um usuário com email inválido', () => { 
    cy.cadastrarUsuarios(token, 'fulano@qa.com', 'teste', administrador)
    .then(response => {
      expect(response.status).equal(400)
      expect(respomse.body.message).to.equal('Este email já está sendo usado')
    })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    let cadastro = 'Usuario EBAC ' + Math.floor(Math.random() * 10000)
    cy.cadastrarUsuarios(toke, nome, email, 'Teste123', administrador)
    .then(response => {
      let id = response.body._id
      cy.request({
        method: 'PUT',
        url: `usuarios/${id}`,
        headers: {authorization: token},
        body: {
          "nome": nome,
          "email": email,
          "password": "Teste123",
          "administrador": administrador
        }
      }).should(response => {
        expect(response.body.message).to.equal('Registro alterado com sucesso')
        expect(response.status).to.equal(201)
      })
    })
  });

  it('Deve deletar um usuário previamente cadastrado', () => { 
    cy.cadastrarUsuarios(token, 'usuario deletado', email, 'Teste123', administrador)
    .then(response =>{
      let id = response._id
      cy.request({
        method: 'DELETE',
        url: 'usuarios',
        headers: {authorization: token},
      }).should( resp => {
        expect(resp.body.message).to.equal('Registro excluído com sucesso')
        expect(resp.status).to.equal(200)
      })
    })
  });
