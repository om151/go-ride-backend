const mapsService = require('../services/maps.service');
const {validationResult} = require("express-validator")

module.exports.getCoordinates = async (req,res,next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const {address} = req.query;

    try{
        const coordinates = await mapsService.getAddressCoordinates(address);
        res.status(200).json(coordinates);
    }catch(error){
        res.status(404).json({message: "coordinates not found"})
    }
}

module.exports.getDistanceTime = async (req,res,next) => {
    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array() });
        }

        const {origin , destination} = req.query;

        const distanceTime = await mapsService.getDistanceTime(origin,destination);

        res.status(200).json(distanceTime);

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server Error"});
    }
}

module.exports.getAutoCompleteSuggestions = async (req,res,next) => {

    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array() });
        }

        const {input} = req.query;

        const suggestion = await mapsService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestion);

    }catch(err){
        // console.log(err);
        res.status(500).json({message : "Internal server Error"});
    }
}