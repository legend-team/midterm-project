'use strict ';

const joTourism = require('express').Router();

const historical = require('../models/classes/hist_model.js');
const city = require('../models/classes/city_model.js');





function dynamicModel(req, res, next) {
    let cities = ['ajloun', 'irbed', 'jarash']
    // console.log('ssssssssss', req.params.model);
    let model = req.params.model;
    for(let i = 0 ; i < cities.length ; i++){
        if (model === cities[i]) {
          req.model = city;
          next();
          return;
      } else{
        next();
        return;}


    // switch (model) {
    //     case 'ajloun':
    //         req.model = city;
    //         next();
    //         return;

    //     case 'irbed':
    //         req.model = city;
    //         next();
    //         return;

    //     case 'jarash':
    //         req.model = city;
    //         next();
    //         return;

    //     case 'site':
    //         req.model = historical;
    //         next();
    //         return;
    //     default:
    //         next('not found');
    //         return
    // }
}

}


// function dynamicSites(req, res, next) {
//     // console.log('ssssssssss', req.params.model);
//     let model = req.params.hist;


//     switch (model) {
//         case '*':
//             req.hist = historical;
//             next();
//             return;



//         default:
//             next('not found');
//             return
//     }
// }





// joTourism.param('model', dynamicModel)
// joTourism.param('hist', dynamicSites)



joTourism.get('/', getHitsPlaceAtAll) //// all citeis w/o virtuals
joTourism.get('/site', getHitsSiteAtAll) //// all sites

joTourism.get('/:model/:id', getHitsPlace) /// one city with sites 
joTourism.get('/:model/:id/*/:id', getHitsSite) // one site

joTourism.post('/', postHistPlaces) /// add a city
joTourism.post('/site', postHistSite) /// add a site

joTourism.put('/:id', updateHitsPlace) // update a city
joTourism.put('/site/:id', updateHitsSite) // update a site

joTourism.delete('/:id', deleteHitsPlace) // delete a city
joTourism.delete('/site/:id', deleteHitsSite) // delete a site




function getHitsPlaceAtAll(req, res, next) {   
    city.get()
        .then(output => {
            res.status(200).json(output)
        }).catch()
}

function getHitsSiteAtAll(req, res, next) {
    historical.get()
        .then(output => {
            res.status(200).json(output)
        }).catch()
}

function getHitsPlace(req, res, next) {
    city.get(req.params.id)
        .then(output => {
            res.status(200).json(output)
        }).catch(next)
}

function getHitsSite(req, res, next) {
    historical.get(req.params.id)
        .then(output => {
            res.status(200).json(output)
        })
        .catch(e => console.error(e));

}


function postHistPlaces(req, res, next) {
    city.create(req.body)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(next)
}

function postHistSite(req, res, next) {
    historical.create(req.body)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(next)
}

function updateHitsPlace(req, res, next) {
    city.update(req.params.id, req.body)
        .then(data => {
            res.status(200).json(data)
        }).catch(next);
}

function updateHitsSite(req, res, next) {
    historical.update(req.params.id, req.body)
        .then(data => {
            res.status(200).json(data)
        }).catch(next);
}

function deleteHitsPlace(req, res, next) {
    let message = 'deleted';
    city.delete(req.params.id)
        .then(() => {
            res.status(200).json(message)
        }).catch(next);
}

function deleteHitsSite(req, res, next) {
    let message = 'deleted';
    historical.delete(req.params.id)
        .then(() => {
            res.status(200).json(message)
        }).catch(next);
}


module.exports = joTourism;
