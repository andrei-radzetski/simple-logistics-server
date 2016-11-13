
module.exports = {

    getAll: (req, res) => {
        res.json([]);
    },

    getById: (req, res) => {
        res.json({ id: req.params.id });
    }
}