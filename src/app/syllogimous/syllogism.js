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

Syllogism.prototype.namePropositions = function (arrayOfThree) {
    [this.S, this.M, this.P] = arrayOfThree
}

Syllogism.prototype.pickThree = function (array) {
    var a = [...array]
    var result = []
    for (var i = 0; i < 3; i++) {
        result[i] = a.splice(Math.random()*a.length|0, 1).pop()
    }
    return result
}

Syllogism.prototype.useLetters = function () {
    return this.pickThree([...'QWERTYUIOPASDFGHJKLZXCVBNM'])
}

Syllogism.prototype.useWords = function () {
    return this.pickThree(['BEE', 'BET', 'BELL', 'CAB', 'CAT', 'CAP', 'DOLL', 'DOC', 'DOG'])
    
}

Syllogism.prototype.useBraille = function () {
    return this.pickThree([...'⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿⡀⡁⡂⡃⡄⡅⡆⡇⡈⡉⡊⡋⡌⡍⡎⡏⡐⡑⡒⡓⡔⡕⡖⡗⡘⡙⡚⡛⡜⡝⡞⡟⡠⡡⡢⡣⡤⡥⡦⡧⡨⡩⡪⡫⡬⡭⡮⡯⡰⡱⡲⡳⡴⡵⡶⡷⡸⡹⡺⡻⡼⡽⡾⡿⢀⢁⢂⢃⢄⢅⢆⢇⢈⢉⢊⢋⢌⢍⢎⢏⢐⢑⢒⢓⢔⢕⢖⢗⢘⢙⢚⢛⢜⢝⢞⢟⢠⢡⢢⢣⢤⢥⢦⢧⢨⢩⢪⢫⢬⢭⢮⢯⢰⢱⢲⢳⢴⢵⢶⢷⢸⢹⢺⢻⢼⢽⢾⢿⣀⣁⣂⣃⣄⣅⣆⣇⣈⣉⣊⣋⣌⣍⣎⣏⣐⣑⣒⣓⣔⣕⣖⣗⣘⣙⣚⣛⣜⣝⣞⣟⣠⣡⣢⣣⣤⣥⣦⣧⣨⣩⣪⣫⣬⣭⣮⣯⣰⣱⣲⣳⣴⣵⣶⣷⣸⣹⣺⣻⣼⣽⣾⣿'])
}

Syllogism.prototype.useCuneiform = function () {
    return this.pickThree([...'𒀀𒀁𒀂𒀃𒀄𒀅𒀆𒀇𒀈𒀉𒀊𒀋𒀌𒀍𒀎𒀏𒀐𒀑𒀒𒀓𒀔𒀕𒀖𒀗𒀘𒀙𒀚𒀛𒀜𒀝𒀞𒀟𒀠𒀡𒀢𒀣𒀤𒀥𒀦𒀧𒀨𒀩𒀪𒀫𒀬𒀭𒀮𒀯𒀰𒀱𒀲𒀳𒀴𒀵𒀶𒀷𒀸𒀹𒀺𒀻𒀼𒀽𒀾𒀿𒁀𒁁𒁂𒁃𒁄𒁅𒁆𒁇𒁈𒁉𒁊𒁋𒁌𒁍𒁎𒁏𒁐𒁑𒁒𒁓𒁔𒁕𒁖𒁗𒁘𒁙𒁚𒁛𒁜𒁝𒁞𒁟𒁠𒁡𒁢𒁣𒁤𒁥𒁦𒁧𒁨𒁩𒁪𒁫𒁬𒁭𒁮𒁯𒁰𒁱𒁲𒁳𒁴𒁵𒁶𒁷𒁸𒁹𒁺𒁻𒁼𒁽𒁾𒁿𒂀𒂁𒂂𒂃𒂄𒂅𒂆𒂇𒂈𒂉𒂊𒂋𒂌𒂍𒂎𒂏𒂐𒂑𒂒𒂓𒂔𒂕𒂖𒂗𒂘𒂙𒂚𒂛𒂜𒂝𒂞𒂟𒂠𒂡𒂢𒂣𒂤𒂥𒂦𒂧𒂨𒂩𒂪𒂫𒂬𒂭𒂮𒂯𒂰𒂱𒂲𒂳𒂴𒂵𒂶𒂷𒂸𒂹𒂺𒂻𒂼𒂽𒂾𒂿𒃀𒃁𒃂𒃃𒃄𒃅𒃆𒃇𒃈𒃉𒃊𒃋𒃌𒃍𒃎𒃏𒃐𒃑𒃒𒃓𒃔𒃕𒃖𒃗𒃘𒃙𒃚𒃛𒃜𒃝𒃞𒃟𒃠𒃡𒃢𒃣𒃤𒃥𒃦𒃧𒃨𒃩𒃪𒃫𒃬𒃭𒃮𒃯𒃰𒃱𒃲𒃳𒃴𒃵𒃶𒃷𒃸𒃹𒃺𒃻𒃼𒃽𒃾𒃿𒄀𒄁𒄂𒄃𒄄𒄅𒄆𒄇𒄈𒄉𒄊𒄋𒄌𒄍𒄎𒄏𒄐𒄑𒄒𒄓𒄔𒄕𒄖𒄗𒄘𒄙𒄚𒄛𒄜𒄝𒄞𒄟𒄠𒄡𒄢𒄣𒄤𒄥𒄦𒄧𒄨𒄩𒄪𒄫𒄬'])
}

Syllogism.prototype.useSimilarCircles = function () {
    return [...'◴◵◶']
}

Syllogism.prototype.useSimilarSquares = function () {
    return [...'◰◱◲']
}

Syllogism.prototype.usePolygons = function () {
    return [...'⬟⯂⬢']
}

Syllogism.prototype.usePointers = function () {
    return [...'🞛🞚🞜']
}

Syllogism.prototype.randomPattern = function () {
    var chance = 0.448
    if (Math.random() < chance) {
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

Syllogism.prototype.init = function (namingFn) {
    this.namePropositions(namingFn.call(this))
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