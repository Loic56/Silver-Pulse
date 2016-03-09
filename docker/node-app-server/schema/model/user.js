var db = require('./../db.js');
var ottoman = require('ottoman');

var UserMdl = ottoman.model('User', {
    userId: {type: 'string', auto: 'uuid', readonly:true},
    externalId: {type: 'string'},
    name: {
        first: 'string',
        last: 'string'
    }}, {
    index: {
        findByUserId:{
            by: 'userId',
            type: 'refdoc'
        },
        findByExternalId:{
            by: 'externalId',
            type: 'refdoc'
        },
        findByFirstName: {
            by: 'name.first'
        },
        findByLastName: {
            by: 'name.last'
        }
    }
});

UserMdl.createAndSave = function (externalId, firstname, lastname, done) {
    this.create({
        externalId: externalId,
        name: {first: firstname, last: lastname},
    }, done);
}

module.exports = UserMdl;