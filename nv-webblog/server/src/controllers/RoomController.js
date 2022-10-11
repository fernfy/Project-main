const { Room } = require('../models')

module.exports = {
    // get all room
    async index(req, res) {
        try {
            const rooms = await Room.findAll()
            res.send(rooms)
        } catch (err) {
            res.status(500).send({
                error: 'The rooms information was incorrect'
            })
        }
    },

    // create room
    async create(req, res) {
        try {
            const room = await Room.create(req.body)
            res.send(room.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create room incorrect'
            })
        }
    },

    // edit room, suspend, active
    async put(req, res) {
        try {
            await Room.update(req.body, {
                where: {
                    id: req.params.roomId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update room incorrect'
            })
        }
    },

    // delete room
    async remove(req, res) {
        try {
            const room = await Room.findOne({
                where: {
                    id: req.params.roomId
                }
            })

            if (!room) {
                return res.status(403).send({
                    error: 'The room information was incorrect'
                })
            }

            await room.destroy()
            res.send(room)
        } catch (err) {
            res.status(500).send({
                error: 'The room information was incorrect'
            })
        }
    },

    // get room by id
  async show (req, res) {
    try {
      const room = await Room.findByPk(req.params.roomId)
      res.send(room)
    } 
    catch (err) {
        res.status(500).send({
            error: 'The room information was incorrect'
        })
    }
  }
}