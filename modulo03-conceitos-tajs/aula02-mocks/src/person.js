//add github no vccode
class Person{
  static validate(person){
    if(!person.name) throw new Error("name is required")
    if(!person.cpf) throw new Error("cpf is required")
  }
static format(person){
  const [name,...lastName]= person.name.split(" ")
  return {
    name,
    lastName:lastName.join(" "),
    cpf:person.cpf.replace(/\D/g,"")
  }
}
static save(person){
 if(!["cpf","name","lastName"].every(props=>person[props])){
  throw new Error(`Cannot sabe invalid person: ${JSON.stringify(person)}`) 
 }
 //... banco de dados api etc
 console.log("regsitrado com sucesso",person)
}
  static process(person){
    this.validate(person)
    const personFormatted = this.format(person)
    this.save(personFormatted)
    return "ok"
  }
}
/* Person.process({
  name:"Bruno", 
  cpf: '123.456.789-00'
}) */
export default Person