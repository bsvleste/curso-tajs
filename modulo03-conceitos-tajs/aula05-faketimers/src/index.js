import Task from './task.js'
const onSecond = 1000
const runInSec = new Date(Date.now() + onSecond)
const runInTwoSec = new Date(Date.now() + onSecond *2)
const runInThreeSec = new Date(Date.now() + onSecond *3)
const task= new Task()
task.save({
  name:"task1",
  dueAt:runInSec,
  fn:()=>{
    console.log("task1 executed ")
  }
})
task.save({
  name:"task2",
  dueAt:runInTwoSec,
  fn:()=>{
    console.log("task2 executed ")
  }
})
task.save({
  name:"task3",
  dueAt:runInThreeSec,
  fn:()=>{
    console.log("task3 executed ")
  }
})
task.run(onSecond)