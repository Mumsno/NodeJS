const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middlewares/auth')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        if (!user) return res.status(401).send()

        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e.toString())
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (!user) return res.status(401).send()

        const token = await user.generateAuthToken()

        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e.toString())
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'email', 'password', 'age']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) return res.status(400).send({ error: 'Invalid Update' })

        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])

        await user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) return res.status(404).send()

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await User.remove(req.user)
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router