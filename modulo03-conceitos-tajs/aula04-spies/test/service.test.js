import { describe,it,expect,beforeEach, vi } from 'vitest'
import Service from '../src/service.js'
import fs from "node:fs/promises"
import crypto from "node:crypto"

describe("Service Test Suite", () => {
  let _service
  const filename = "testfile.ndjson"
  const MOCKED_HASH_PWD = "HASHED_PWD"
  describe("#create-spies",async ()=>{
    beforeEach(()=>{
      vi.spyOn(crypto,crypto.createHash.name).mockReturnValue({
        update:vi.fn().mockReturnThis(),
        digest:vi.fn().mockReturnValue(MOCKED_HASH_PWD)
      })
      vi.spyOn(fs,fs.appendFile.name).mockResolvedValue()     
      _service = new Service({filename})
    })
      it('should call appendFile with rigth params',async ()=>{
        //AAA -> Arrange, act, assert
        //arrange
        const input ={
          username:"Bruno",
          password:"pass1"
        }
        const expectedCretedAt = new Date().toISOString()
        vi.spyOn(Date.prototype,Date.prototype.toISOString.name)
        .mockReturnValue(expectedCretedAt)
      
        //Act
        await _service.create(input)
        //Assert
        expect(crypto.createHash).toHaveBeenCalledWith("sha256")        
        const hash = crypto.createHash("sha256")
        expect(hash.update).toHaveBeenCalledWith(input.password)
        expect(hash.digest).toHaveBeenCalledWith("hex")
        const expected = JSON.stringify({
          ...input,
          createdAt:expectedCretedAt,
          password:MOCKED_HASH_PWD
        }).concat('\n')
        expect(fs.appendFile).toHaveBeenCalledWith(filename,expected)
      })
  })    
})