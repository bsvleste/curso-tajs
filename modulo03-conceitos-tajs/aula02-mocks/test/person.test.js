import {describe, expect, it, vi} from 'vitest'
import Person from '../src/person'
describe("#Person suite", () => {
  describe("#validate", () => {
    it('should throw an error if name is empty', () => {
      //mock é a entrada necessaria para que o teste funcione
      const mockInvlaidPerson = {
          name:"",
          cpf:"123.456.789-00"
      }  
      expect(()=>Person.validate(mockInvlaidPerson)).toThrowError(new Error("name is required"))
    })
    it('should throw an error if cpf is empty', () => {
      //mock é a entrada necessaria para que o teste funcione
      const mockInvlaidPerson = {
          name:"Bruno de souza",
          cpf:""
      }  
      expect(()=>Person.validate(mockInvlaidPerson)).toThrowError(new Error("cpf is required"))
    })
    it('should not throw an person is vlaid', () => {
      //mock é a entrada necessaria para que o teste funcione
      const mockInvlaidPerson = {
          name:"Bruno de souza",
          cpf:"123.456.789-00"
      }  
      expect(()=>Person.validate(mockInvlaidPerson)).not.toThrowError()
    })
  })
  describe("#Format",() => {
    //parte do principo que os dados ja foram validados
    it('should format the person name a CPF',()=>{
       //AAA
       //Arrange = Preparar
       const mockPerson ={
        name :"Bruno de Souza",
        cpf:"123.456.789-00"
       }
       //Act = Executar
       const formattedPerson = Person.format(mockPerson)
       //Assert = Validar
      const expected = {
        name:"Bruno",
        lastName:"de Souza",
        cpf:"12345678900"
      }
      expect(formattedPerson).toStrictEqual(expected)
    })
  })
  describe("#save",()=>{
    it('should thorw an error when save a person without name',()=>{
      const mockPerson = {
        name:"",
        lastName:"last name",
        cpf:"12345678900"
      }
      expect(()=>Person.save(mockPerson)).toThrowError()
    })
    it('should thorw an error when save a person without last name',()=>{
      const mockPerson = {
        name:"Bruno",
        lastName:"",
        cpf:"12345678900"
      }
      expect(()=>Person.save(mockPerson)).toThrowError()
    })
    it('should thorw an error when save a person without cpf',()=>{
      const mockPerson = {
        name:"Bruno",
        lastName:"",
        cpf:"12345678900"
      }
      expect(()=>Person.save(mockPerson)).toThrowError()
    })
    it('should save a person ',()=>{
      const mockPerson = {
        name:"Bruno",
        lastName:"Souza Valeiro",
        cpf:"12345678900"
      }
      expect(()=>Person.save(mockPerson)).not.toThrowError()
    })
    
  })
  describe("#process",()=>{
    it("should process a valid person",()=>{
    // Uma outra ideia é não retestar o que já foi testado
    // lembra dos checkpoints?
    // Testou do caminho A ao caminho B,
    //      agora testa do caminho B ao caminho C
    // Então aqui, eu pulo o caminho A (validate), caminho B (format)
    // e vou direto para o caminho C (save) pois estes caminhos
    // ja foram validados

    // Este método abaixo faz mais sentido para quando se tem interações externas como
    // chamadas de API, bancos de dados, etc (que será mostrado na próxima aula)

    // Mocks são simulações de funções que você pode fazer ao testar o comportamento!!
      //AAA = arange, act, assert
      //arrange
      const mockPerson ={
        name :"Bruno de Souza",
        cpf:"123.456.789-00"
      }
      vi.spyOn(Person,Person.validate.name)
     /* .mockImplementation(()=>{
        throw new Error("Deu ruim")
      }) */
      .mockReturnValue()
      vi.spyOn(Person,Person.format.name).mockReturnValue({
       
          name:"Bruno",
          lastName:"Souza Valeiro",
          cpf:"12345678900"
        
      })

      //act
      const result = Person.process(mockPerson)

      //assert
      const expected = "ok"
      expect(result).toStrictEqual(expected) 
    })
  })
})