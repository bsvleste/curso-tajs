import {afterAll, beforeAll, describe, expect, it, vi} from 'vitest'
import { server } from '../src/api.js'
/*
  Deve cadastrar usuarios e definir uma categoria onde:
  -Jovens Adultos:
   - Usuarios de 18-25
  - Adultos:
    - Usuarios de 26-50
  -Idosos:
    -51+
  -menores de 18
    -Estora um erro 
*/

describe("API Users E2E Suite",()=>{
  function waitForServerStatus(server){
    return new Promise((resolve,reject)=>{
      server.once("error",(err)=>reject(err))
      server.once("listening",()=>resolve())
    })
  }
 async function createUser(data){
    return fetch(`${_testeServerAddress}/users`,{
      method:"POST",
      body:JSON.stringify(data)
    })
  }
async  function findUserById(id){
    const user=  await fetch(`${_testeServerAddress}/users/${id}`)
    return user.json()
  }
  let _testServer
  let _testeServerAddress
  beforeAll(async()=>{
    _testServer = server.listen()
    await waitForServerStatus(_testServer)
    const serverInfo = _testServer.address()
    _testeServerAddress = `http://localhost:${serverInfo.port}`
  })
  afterAll(done =>{ 
      server.closeAllConnections()
    _testServer.close(done)})
  it("should register a new users with young-adult category",async()=>{
    vi.useFakeTimers({
      now:new Date("2024-01-01T00:00")
    })
    const expectedCategory = "adult"
    const response = await createUser({
      name:"Bruno de souza",
      birthDay:"1985-01-01"
    })
    expect(response.status).toBe(201)
    const result = await response.json()
    expect(result.id).not.toBeUndefined()
    const user = await findUserById(result.id)
    expect(user.category).toBe(expectedCategory)

  })
  it("should register a new users with adult category",async()=>{
    vi.useFakeTimers({
      now:new Date("2024-01-01T00:00")
    })
    const expectedCategory = "young-adult"
    const response = await createUser({
      name:"Bruno de souza",
      birthDay:"2000-01-01"
    })
    expect(response.status).toBe(201)
    const result = await response.json()
    expect(result.id).not.toBeUndefined()
    const user = await findUserById(result.id)
    expect(user.category).toBe(expectedCategory)
  })
  it("should register a new users with senior category",async()=>{
    vi.useFakeTimers({
      now:new Date("2024-01-01T00:00")
    })
    const expectedCategory = "senior"
    const response = await createUser({
      name:"Bruno de souza",
      birthDay:"1969-01-01"
    })
    expect(response.status).toBe(201)
    const result = await response.json()
    expect(result.id).not.toBeUndefined()
    const user = await findUserById(result.id)
    expect(user.category).toBe(expectedCategory)
  })
  it("should trhow an error if age is less than 18",async()=>{
    vi.useFakeTimers({
      now:new Date("2024-01-01T00:00")
    })
    const response = await createUser({
      name:"Bruno de souza",
      birthDay:"2017-01-01"
    })
    expect(response.status).toBe(400)
    const result = await response.json()
    expect(result).toEqual({error:"User must be at least 18 years old"})
  })
})