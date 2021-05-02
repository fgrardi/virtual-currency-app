const create = (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "transfer": {"transaction": "Add coins to database"}
        } 
    })
};

const getAll = (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "transfers": [] //empty array of transfers
        }
    })
};

const getId = (req, res) => {
    res.json({
        "status": "success",
        "data": "data of one transfer"
    })
};

module.exports.create = create;
module.exports.getAll = getAll;
module.exports.getId = getId;