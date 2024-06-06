/// <reference types= "cypress"/>

describe('Teste de API Produtos', () => {

    let token
    beforeEach(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn => {
            token = tkn
        })
    });

    it('Listar Itens - GET', () => {
        
        cy.request({
            method: 'GET',
            url: 'Produtos'
        }).should((response) => {
            expect(response.status).equal(200)
            expect(response.body).to.have.property('produtos')
        })

    });

    it('Cadastro de Item - POST', () => {
        let produto = 'produto EBAC ' + Math.floor(Math.random() * 10000)
        cy.cadastrarProduto(token, 'Xbox x', 4700, 'Console de Xbox', 1000).then((response) => {
            expect(response.status).equal(401)
            expect(response.body.message).equal('Cadastro realizado com sucesso')
        })

    });

    it('Deve validar mensamgem de item cadastrado anteriormente', () => {
        cy.cadastrarProduto(token, 'Xbox x', 4700, 'Console de Xbox', 1000)
        .then((response) => {
            expect(response.status).equal(400)
            expect(response.body.message).equal('Já existe produto com esse nome')
        })
        
    });

});