import { describe,it,expect,beforeEach, vi } from 'vitest'
import Service from '../src/service.js'
import fs from "node:fs/promises"
describe("Service Test Suite", () => {
  let _service
  const filename = "testfile.ndjson"
  beforeEach(()=>{
    _service = new Service({filename})
  })
  describe("#read",async ()=>{
    it("should return an empty array if the file is empty",async ()=>{
      vi.spyOn(fs,fs.readFile.name).mockResolvedValue('') 
      const result = await _service.read()
      expect(result).toEqual([])  
    })
    it("should return users witout password if the file contains users",async ()=>{
     //AAA -> Arrange, act, assert
      //arrange
      const dbData=[
        {
          username:"user1",
          password:"pass1",
          createAt:new Date().toISOString()
        },
        {
          username:"user2",
          password:"pass2",
          createAt:new Date().toISOString()
        }
      ]
       const filecontents = dbData
       .map(item => JSON.stringify(item).concat('\n')).join('')
      //act
      vi.spyOn(
        fs,
        "readFile"
    )
    .mockResolvedValue(filecontents)
    //act
    const result = await _service.read()
    //assert
    const expected = dbData.map(({password,...rest})=>({...rest}))
    expect(result).toEqual(expected)
    }) 
    it('should thow an error if the file does no exist',async ()=>{
      const error = new Error("file not found")
      vi.spyOn(fs,"readFile").mockRejectedValue(error)       
      await expect(_service.read()).rejects.toThrow(error)
    }) 
  })    
})