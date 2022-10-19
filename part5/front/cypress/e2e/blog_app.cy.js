// describe('Bloglist app', function () {
//   it('front page can be opened', function () {
//     cy.visit('http://localhost:3000')
//     cy.contains('log in')
//     cy.contains('log in to application')
//   })
// })

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'ivane vardoshvili',
      username: 'ivane98',
      password: 'Lukurti123',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('ivane98')
      cy.get('#password').type('Lukurti123')
      cy.get('#login-button').click()

      cy.contains('ivane vardoshvili logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('ivane98')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('ivane98')
      cy.get('#password').type('Lukurti123')
      cy.get('#login-button').click()

      cy.contains('ivane vardoshvili logged in')
    })

    it('A blog can be created and liked', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('new title')
      cy.get('#author').type('new author')
      cy.get('#url').type('new url')
      cy.contains('create').click()
      cy.contains('new title')

      cy.contains('like').click()
      cy.contains(1)
    })

    it('A blog can be deleted', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('new title')
      cy.get('#author').type('new author')
      cy.get('#url').type('new url')
      cy.contains('create').click()
      cy.contains('new title')

      cy.contains('delete').click()
    })
  })
})
