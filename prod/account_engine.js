const fs = require('fs')
const short_hash = require('short-hash')

const data_dir = __dirname + '/data'

const account_engine = {}
module.exports = account_engine

// ------------------------------------------------- UTILS

function token_hash(token) {
    const ht = short_hash(token)
    return ht + short_hash(ht)
}

function account_path(token) {
    return data_dir + '/' + token_hash(token) + '.json'
}

function load_account_lists(token) {
    if (!fs.existsSync(data_dir)) fs.mkdirSync(data_dir)
    const path = account_path(token)
    if (!fs.existsSync(path)) save_account_lists(token, {})
    return JSON.parse(fs.readFileSync(path))
}

function save_account_lists(token, lists) {
    if (!fs.existsSync(data_dir)) fs.mkdirSync(data_dir)
    fs.writeFileSync(account_path(token), JSON.stringify(lists))
    return true
}

// ------------------------------------------------- API

account_engine.account_exists = (token) => {
    return fs.existsSync(account_path(token))
}

account_engine.get_account_lists = (token) => {
    return load_account_lists(token)
}

account_engine.set_account_lists = (token, lists) => {
    return save_account_lists(token, lists)
}