/// <reference types="cypress" />


describe('tasks', ()=> {
    let testData;
    before(() =>{
        cy.fixture('tasks').then(t =>{
            testData = t
        })
    })
    
    context('cadastro', () => {
        it.only('deve cadastrar uma nova tarefa', ()=> {
            const taskName ='ler um livro de node.js'
            cy.RemoveTaskbyname(taskName)
            cy.createTask(taskName)
            cy.contains('main div p', taskName)
                .should('be.visible')
        })
        it('nao deve permitir tarefa duplicada', ()=> {
            const task = {
                name: 'estudar java script',
                is_done: false
            }
            cy.RemoveTaskbyname(task.name)
            cy.postTask(task)
            cy.createTask(task.name)
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text','Task already exists!')
        })
        it('campo obrigatorio', () => {
            cy.createTask()
            cy.isRequired('This is a required field')
        })
    })
    context('atualizacao', () => {
        it('deve concluir uma tarefa', () =>{
            const task = {
                name: 'fazer compras' , is_done: false
            }
            cy.RemoveTaskbyname(task.name)
            cy.postTask(task)
            cy.visit('/')
            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()
                cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line' , 'line-through')
        })
    })
    context('exclusao', () => {
        it('deve remover uma tarefa', () =>{
                const task = testData.dup
                cy.RemoveTaskbyname(task.name)
                cy.postTask(task)
                cy.visit('/')
                cy.contains('p', task.name)
                    .parent()
                    .find('button[class*=ItemDelete]')
                    .click()
                    cy.contains('p', task.name)
                    .should('not.exist') 
        })
    })
})

