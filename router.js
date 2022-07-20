const express = require('express');
const router = express.Router()
const users = require('./users.js')
const md5 = require('blueimp-md5')

router.get('/', function (req, res) {
    res.render('留言板.html', {
        user: req.session.user
    })
})

router.get('/login', function (req, res) {
    res.render('login.html')
})

router.post('/login', function (req, res) {
    users.findOne({
        email: req.body.email,
        password: md5(md5(req.body.password))
    }, (err, data) => {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '服务端错误'
            })
        }

        if (!data) {
            return res.status(200).json({
                err_code: 1,
                message: 'email或密码错误'
            })
        }
        req.session.user = data
        return res.status(200).json({
            err_code: 0,
            message: 'ok'
        })
    })
})

router.get('/res', function (req, res) {
    res.render('res.html')
})

router.post('/res', function (req, res) {

    users.findOne({
        $or: [
            {
                name: req.body.name
            },
            {
                email: req.body.email
            }
        ]
    }, function (err, data) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: '服务端错误'
            })
        }

        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: '昵称或e-mail重复'
            })
        }

        req.body.password = md5(md5(req.body.password))
        new users(req.body).save((err, data) => {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: '服务端错误'
                })
            }
            req.session.user = data

            return res.status(200).json({
                err_code: 0,
                message: 'ok'
            })
        })
    })
})
router.get("/out", (req, res) => {
    req.session.user = null
    res.redirect('/')
})
module.exports = router
