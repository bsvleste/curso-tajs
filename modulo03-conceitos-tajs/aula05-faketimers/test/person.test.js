import {describe, expect, it}from 'vitest'
import { mapPerson } from '../src/person'
describe("Person Test Suite",()=>{ 
  describe("Happpy Path",()=>{
    it('should map a person ',()=>{
    const personStr = '{"name":"Bruno","age":38}'
      const personObj = mapPerson(personStr)
      expect(personObj).toStrictEqual({
        name:"Bruno",
        age:38,
        createdAt:expect.any(Date)
      })  
    })
  })
  describe("what coverage doest tell you",()=>{
    it('should not map a person give a json string ',()=>{
    const personStr = '{"name":'
     expect(()=>mapPerson(personStr)).toThrow("Unexpected end of JSON input")
    })
    it('should not map a person give a json data ',()=>{
    const personStr = '{}'
    const personObj = mapPerson(personStr)
      expect(personObj).toStrictEqual({
        name:undefined,
        age:undefined,
        createdAt:expect.any(Date)
      })
    })
  })
})