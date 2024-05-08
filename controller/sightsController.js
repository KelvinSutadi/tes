const connectMongoDB = require("../config/mongodb");
const SightsModel = require("../models/sights");

class SightsController {
    static async createSight(request, respond, next) {
        const { name, description, imageUrl, facility, location } = request.body;
        try {
        // console.log(request.body);
        const dataSight = {
            name, description, imageUrl, facility, location
        }
        console.log(dataSight);
        await connectMongoDB()
        await SightsModel.create(dataSight)
        respond.json({message: "created sights into database"}).status(201);
        }   catch (err) {
            console.log(err);
        }
    }

    static async getSights(request, respond, next) {
        const { search, sortByName } = request.query
        console.log(search, sortByName, "test ini sights"); // liat tipe datanya dapatnya apa? -temennya kelep
        console.log(typeof(sortByName)); // buat nge cek tipe data -temennya kelpin
        try {
            await connectMongoDB()
            let query = {}
            let sights;
            
            if (search) {
                console.log("masuk sini") 
                query = { name: { $regex: `.*${search}.*`, $options: 'i' } };
            }      
            if (sortByName) {
                sights = await SightsModel.find(query).sort({ "name": Number(sortByName) }) // kenapa harus di convert ke number?
            } else {
                sights = await SightsModel.find(query)
            }
            sights = await SightsModel.find({})
            respond.json(sights)
        }   catch (err) {
            console.log(err);
        }
    }
}

module.exports = SightsController