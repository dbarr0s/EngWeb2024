var Periodos = require('../models/periodos')

module.exports.list = () => {
    return Periodos.find().sort({_id: 1}).exec()
}

module.exports.findById = id => {
    return Periodos.findOne({_id: id}).exec()
}

module.exports.create = periodo => {
    return Periodos.create(periodo)
}

module.exports.update = (id, periodo) => {
    return Periodos.updateOne({_id: id}, periodo)
}

module.exports.delete = id => {
    return Periodos.deleteOne({_id: id})
}