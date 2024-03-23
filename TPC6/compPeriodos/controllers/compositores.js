var Compositores = require('../models/compositores')

module.exports.list =  () => {
    return Compositores.find().sort({_id: 1}).exec()
}

module.exports.listPeriod = periodo => {
    return Compositores.find({periodo: periodo}).sort({_id: 1}).exec()
}

module.exports.findById = id => {
    return Compositores.findOne({_id: id}).exec()
}

module.exports.create = periodo => {
    return Compositores.create(periodo)
}

module.exports.update = (id, compositor) => {
    return Compositores.updateOne({_id: id}, compositor)
}

module.exports.delete = id => {
    return Compositores.deleteOne({_id: id})
}