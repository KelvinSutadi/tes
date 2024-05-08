const connectMongoDB = require("../config/mongodb");
const UsersModel = require("../models/users");
const { hashPassword, comparePassword } = require("../helper/hashPassword")
const {signToken} = require("../helper/jwt")

class UsersController {
    static async register(request, respond, next) {
        const { fullname, email, password } = request.body;
        try {
        const dataUsers = {
            fullName: fullname, email, password: hashPassword(password)
        }
        console.log(dataUsers);
        await connectMongoDB()
        await UsersModel.create(dataUsers)
        respond.json({message: "created users into database"}).status(201);
        }   catch (err) {
            console.log(err);
        }
    }

    static async login(request, respond, next) {
        const { email, password } = request.body;
        try {
            const dataLogin = {
                email, password
            }
            await connectMongoDB()
            const checkUser = await UsersModel.find({ email: { $regex: `.*${email}.*`, $options: 'i' } })
            
            // console.log(checkUser, "ini email user");

            if (checkUser) { //condition
                const checkUserPass = comparePassword(dataLogin.password, checkUser[0].password)
                
                if (!checkUserPass) {
                    throw Error({message: "email/password invalid"})
                } else {
                    const token = signToken({
                        name: checkUser.name,
                        email: checkUser.email
                    })
                    respond.json({token}).status(200)
                }
            } else if(!checkUser){
                throw Error({message: "email/password invalid"})
            }
        } catch (err) {
            console.log(err);
            respond.json(err).status(404)
        }

    }
}

module.exports = UsersController