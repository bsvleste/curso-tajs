import { beforeAll, describe,expect, it,vi,afterAll } from 'vitest'

function waitForServerStatus(server){
  return new Promise((resolve,reject)=>{
    server.once("error",(err)=>reject(err))
    server.once("listening",()=>resolve())
  })
}
describe("E2E teste suite",()=>{
  describe('E2e Tests for Server in a non-test env', () => {
    it('should start server with PORT 4000', async () => {
        const PORT = 4000
        process.env.NODE_ENV = 'production'
        process.env.PORT = PORT
        vi.spyOn(
            console,
            console.log.name
            )
        const { default: server } = await import('../src/index.js')
        await waitForServerStatus(server)

        const serverInfo = server.address()
        expect(serverInfo.port).toBe(4000)
        expect(console.log).toHaveBeenCalledWith(
            `Server running at ${serverInfo.address}:${serverInfo.port}`
        )

        return new Promise(resolve => server.close(resolve))
    })
})
    describe("E2E Teste for server",()=>{
      let _testServer
      let _testeServerAddress
      beforeAll(async()=>{
        process.env.NODE_ENV = 'test'
       const {default:server} = await import("../src/index.js")
        _testServer = server.listen()
        await waitForServerStatus(_testServer)
        const serverInfo = _testServer.address()
        _testeServerAddress = `http://localhost:${serverInfo.port}`
      })
      afterAll(done => _testServer.close(done))
      it("should return 404 for unsupported routes",async()=>{
        const response = await fetch(`${_testeServerAddress}/unsupported`,{
          method:"POST"
        })
        expect(response.status).toBe(404)
      })
      it("should return 400 and missing fields message when cpf is invalid",async()=>{
        const invalidPerson = {name:"Bruno"}
        const response = await fetch(`${_testeServerAddress}/persons`,{
          method:"POST",
          body:JSON.stringify(invalidPerson)
        })
        expect(response.status).toBe(400)
        const data  = await response.json()
        expect(data.validationError).toEqual("cpf is required")
      })  
      it("should return 400 and missing fields message when name is invalid",async()=>{
        const invalidPerson = {cpf:"123.456.789-00"}
        const response = await fetch(`${_testeServerAddress}/persons`,{
          method:"POST",
          body:JSON.stringify(invalidPerson)
        })
        expect(response.status).toBe(400)
        const data  = await response.json()
        expect(data.validationError).toEqual("name is required")
      })  
      it('should test if person format is correct', async()=>{
        const validPerson = {
        name: 'Bruno de Souza',
        cpf: '123.459.789-00',
        }
        const response = await fetch(`${_testeServerAddress}/persons`,{
        method: 'POST',
        body:JSON.stringify(validPerson)
        })
        expect(response.status).toBe(200)
        })        
    })
  })