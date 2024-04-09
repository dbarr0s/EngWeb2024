const Pessoa = require('../models/pessoas');

module.exports.list = () => {
    return Pessoa.find().sort({_id: 1}).exec();
};

module.exports.findById = (id) => {
    return Pessoa.findOne({_id: id}).exec();
};

module.exports.create = (pessoa) => {
    return Pessoa.create(pessoa);
};

module.exports.update = (id, pessoa) => {
    return Pessoa.updateOne({_id: id}, pessoa);
};

module.exports.delete = (id) => {
    return Pessoa.deleteOne({_id: id});
};

module.exports.modalidadesList = () => {
    return Pessoa.distinct("desportos");
};

module.exports.modalidade = (modalidade) => {
    return Pessoa.find({ desportos: modalidade }).sort({ nome: 1 });
};