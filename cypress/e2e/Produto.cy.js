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

    it('Deve validar mensamgem de item cadastrado anteriormente - POST', () => {
        cy.cadastrarProduto(token, 'Xbox x', 4700, 'Console de Xbox', 1000)
            .then((response) => {
                expect(response.status).equal(400)
                expect(response.body.message).equal('Já existe produto com esse nome')
            })

    });

    it('Deve realizar alteração no cadastro do produto - PUT', () => {
        let produto = 'produto EBAC Editado' + Math.floor(Math.random() * 10000)
        cy.cadastrarProduto(token, produto, 4700, 'Produto ebac editado', 1000)
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'PUT',
                    url: `produtos/${id}`,
                    headers: { authorization: token },
                    body: {
                        "nome": produto,
                        "preco": 4300,
                        "descricao": "Gamer",
                        "quantidade": 1000
                    }

                }).should(response => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
                    expect(response.status).to.equal(200)
                })

            })
    });

    it('Deve Deletar um item com sucesso - DELETE', () => {
        cy.cadastrarProduto(token, 'Produto a ser deletado', 4700, 'Gamer', 381)
        .then(response => {
            let id = response.body._id
            cy.request({
                method: 'DELETE',
                url: `produtos/${id}`,
                headers: {authorization: token}

            }).should(resp => {
                expect(resp.body.message).to.equal('Registro excluido com sucesso')
                expect(resp.status).to.equal(200)
        })

    });

});
});