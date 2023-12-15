const Partient = require('../models/patient')
const asyncHandler = require('express-async-handler')

const getProfiles = asyncHandler(async (req, res) => {
    const response = await Partient.find()
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})

const createNewProfile = asyncHandler(async (req, res) => {
    const { name, phone, address, diagnosis, doctor } = req.body
    if (!name || !phone || !address || !diagnosis || !doctor) {
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })
    }
    else {
        const newPartient = await Partient.create(req.body)
        return res.status(200).json({
            success: newPartient ? true : false,
            mes: newPartient ? 'Create is success' : 'Something went wrong',
        })
    }
})

const updateProfile = asyncHandler(async (req, res) => {
    const { uid } = req.params
    if (Object.keys(req.body).length === 0) {
        throw new Error('Missing inputs')
    }
    const response = await Partient.findByIdAndUpdate(uid, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})

const deleteProfile = asyncHandler(async (req, res) => {
    const { _id } = req.query
    if (!_id) {
        throw new Error('Missing inputs')
    }
    const response = await Partient.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? `Profile has been deleted` : 'No profile delete'
    })
})

module.exports = {
    getProfiles,
    createNewProfile,
    updateProfile,
    deleteProfile,
}