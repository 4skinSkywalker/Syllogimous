function Syllogism() {
    this.S
    this.M
    this.P

    this.isValid
    this.pattern

    this.major
    this.minor
    this.conclusion

    this.text
}

Syllogism.prototype.namePropositions = function () {
    var alphabet = [...'QWERTYUIOPASDFGHJKLZXCVBNM']
    this.S = alphabet.splice(Math.random()*alphabet.length|0, 1).pop()
    this.M = alphabet.splice(Math.random()*alphabet.length|0, 1).pop()
    this.P = alphabet.splice(Math.random()*alphabet.length|0, 1).pop()
}

Syllogism.prototype.randomPattern = function () {
    var chance = 0.25
    if (Math.random() > chance) {
        return this.validSyllogisms[Math.random()*this.validSyllogisms.length|0]
    } 
    var letters = Object.keys(this.types)
    var schema = [0,0,0].map(() => letters[Math.random()*letters.length|0]).join``
    return schema + (1 + Math.random()*4|0)
}

Syllogism.prototype.assignPropositions = function () {
    var typeSchema = [...this.pattern]
    var figureIndex = typeSchema.pop()

    this.major = this.types[ typeSchema[0] ]( ...this.figures[figureIndex](this.S, this.M, this.P)[0].split('-') )
    this.minor = this.types[ typeSchema[1] ]( ...this.figures[figureIndex](this.S, this.M, this.P)[1].split('-') )
    this.conclusion = this.types[ typeSchema[2] ](this.S, this.P)
}

Syllogism.prototype.init = function () {
    this.namePropositions()
    this.pattern = this.randomPattern()
    this.isValid = this.validSyllogisms.indexOf(this.pattern) > -1
    this.assignPropositions()
    this.text = `${this.major}\n${this.minor}\n${this.conclusion}`
    return this
}

Syllogism.prototype.validSyllogisms = ["aaa1", "eae1", "aii1", "eio1", "aai1", "eao1", "aee2", "eae2", "eio2", "aoo2", "aeo2", "eao2", "aii3", "iai3", "oao3", "eio3", "aai3", "eao3", "aee4", "iai4", "eio4", "aeo4", "eao4", "aai4"]

Syllogism.prototype.types = {
    a: (S, P) => `All ${S} is ${P}`,
    e: (S, P) => `No ${S} is ${P}`,
    i: (S, P) => `Some ${S} is ${P}`,
    o: (S, P) => `Some ${S} is not ${P}`,
}

Syllogism.prototype.figures = {
    1: (S, M, P) => [`${M}-${P}`, `${S}-${M}`],
    2: (S, M, P) => [`${P}-${M}`, `${S}-${M}`],
    3: (S, M, P) => [`${M}-${P}`, `${M}-${S}`],
    4: (S, M, P) => [`${P}-${M}`, `${M}-${S}`]
}

module.exports = { Syllogism }