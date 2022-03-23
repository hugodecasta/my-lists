const api = require('express').Router()
const json_parser = require('body-parser').json()
const account_engine = require('./account_engine')

module.exports = api

// ---------------------------------- UTILS

function get_auth(req, res, next) {
    const token = req.header('authorization')
    req.auth_token = token
    next()
}

function check_auth(req, res, next) {
    if (!req.auth_token || !account_engine.account_exists(req.auth_token)) return res.status(401).send()
    next()
}

function create_reser(method) {
    return function (req, res) {
        try {
            res.json(method(req))
        } catch (e) {
            res.status(500).send(e.message)
        }
    }
}

// ---------------------------------- API

// ------------------ ENTRY POINT
api.get('/api', (req, res) => res.json('Hello !!!'))

// ------------------ CHECK ACCOUNT
api.get('/api/account/exists',
    get_auth,
    create_reser((req) => account_engine.account_exists(req.auth_token)))

// ------------------ CREATE ACCOUNT
api.post('/api/account/create',
    get_auth,
    create_reser((req) => account_engine.set_account_lists(req.auth_token, {})))

// ------------------ GET ACCOUNT LISTS
api.get('/api/account/lists',
    get_auth, check_auth,
    create_reser((req) => account_engine.get_account_lists(req.auth_token)))

// ------------------ SET ACCOUNT
api.put('/api/account/lists',
    get_auth, check_auth, json_parser,
    create_reser((req) => account_engine.set_account_lists(req.auth_token, req.body)))