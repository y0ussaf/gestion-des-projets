exports.handler =  function (err,docs,res) {
    if(err) return res.json({err})
    console.log(docs)
    res.json({docs})
}
exports.omitUndefined = (obj) => Object.keys(obj).forEach(value => obj[value] === undefined && delete obj[value])
