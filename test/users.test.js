const request = require('supertest')
const app = require('../main')

describe('/users', () => {
  it('GET', async () => {
    const result = await request(app).get('/users')
    expect(result.status).toEqual(200)
  })
})

describe('/user', () => {
  it('POST', async () => {
    const user = {
      username: 'Danis',
      email: 'danisSuper69@mail.ru',
      roles: 'admin',
    }
    const { body } = await request(app).post('/user').send(user)
    expect(body.username).toEqual(user.username)
  })
})
