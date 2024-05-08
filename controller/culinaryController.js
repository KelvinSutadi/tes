const connectMongoDB = require("../config/mongodb");
const CulinaryModel = require("../models/culinary");

class CulinaryController {
    static async createCulinary(request, respond, next) {
        const { name, description, imageUrl, popularLocation } = request.body;
        try {
        // console.log(request.body);
        const dataCulinary = {
            name, description, imageUrl, popularLocation
        }
        console.log(dataCulinary);
        await connectMongoDB()
        await CulinaryModel.create(dataCulinary)
        respond.json({message: "created culinary into database"}).status(201);
        }   catch (err) {
            console.log(err);
        }
    }

    static async getCulinary(request, respond, next) {
        const { search, sortByName } = request.query
        console.log(search, sortByName, "test ini culinary");
        try {
            await connectMongoDB()
            let query = {}
            let culinary; 
            
            if (search) {
                console.log("masuk sini")
                query = { name: { $regex: `.*${search}.*`, $options: 'i' } };
            }      
            if (sortByName) {
                culinary = await CulinaryModel.find(query).sort({ "name": Number(sortByName) })
            } else {
                culinary = await CulinaryModel.find(query)
            }
            culinary = await CulinaryModel.find({})
            respond.json(culinary)
        }   catch (err) {
            console.log(err);
        }

    }
}

module.exports = CulinaryController