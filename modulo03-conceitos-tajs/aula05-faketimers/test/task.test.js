import {beforeEach, describe,it,vi,expect}from 'vitest'
import Task from '../src/task';
  import{setTimeout} from 'node:timers/promises'
describe("Task Test Suite",()=>{
  let _logMoc;
  let _task
  beforeEach(()=>{
    _logMoc = vi.spyOn(
      console,
      console.log.name
    ).mockImplementation()
    _task = new Task()
  })
  it.skip("should only run task that are due whitout fake timers{slow}",async()=>{
    ///AAA -> Arrange, act, assert
    //Arrange
    const tasks=[
      {
        name:"Task-will-run-in-5-sec",
        dueAt:new Date(Date.now()+5000),
        fn:vi.fn()
      },
      {
        name:"Task-will-run-in-10-sec",
        dueAt:new Date(Date.now()+10000),
        fn:vi.fn()
      },
    ]
    _task.save(tasks.at(0))
    _task.save(tasks.at(1))

    //Act
    _task.run(200)
    await setTimeout(11e3) //11_000
    //Assert
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).toHaveBeenCalled()
  },
//configurar para o vitest aguaradar 15 segundos neste test
  15e3
)
  it("should only run task that are due whitout fake timers{fast}",async()=>{
    vi.useFakeTimers()
    ///AAA -> Arrange, act, assert
    //Arrange
    const tasks=[
      {
        name:"Task-will-run-in-5-sec",
        dueAt:new Date(Date.now()+5000),
        fn:vi.fn()
      },
      {
        name:"Task-will-run-in-10-sec",
        dueAt:new Date(Date.now()+10000),
        fn:vi.fn()
      },
    ]
    _task.save(tasks.at(0))
    _task.save(tasks.at(1))

    //Act
    _task.run(200)
    
    //Assert
    vi.advanceTimersByTime(4000)
    //ninguem deve ser executado ainda
    expect(tasks.at(0).fn).not.toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()
    
    vi.advanceTimersByTime(2000)
    //4+2  = 6s somente a primeira tarefa deve ser executada
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()
    
    vi.advanceTimersByTime(4000)
    //4+2+4  = 10s somente a primeira tarefa deve ser executada
    expect(tasks.at(1).fn).toHaveBeenCalled()
    vi.useRealTimers()
  })
})