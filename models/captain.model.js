const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname: {
             type: String,
             required: true,
             minLength : [3,'First name must be at least 3 character long']
            },
            lastname: {
                type: String,
                minLength : [3,'Last name must be at least 3 character long']
            }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match : [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,'Invalid email'],
    },
    password: {
           type: String,
           required: true,
           select: false,
           minLength : [6,'Password must be at least 6 character long'],
    },
    socketId: {
         type: String
    },

    status: {
        type: String,
        enum: ['active','inactive'],
        default: 'inactive'
    },

    vehicle: {
        color:{
            type: String,
            required: true,
            minLength : [3,'Color must be at least 3 character long'],
        },
        plate:{
            type: String,
            required: true,
            minLength : [3,'Plate must be at least 3 character long'],
        },
        capacity:{
            type: Number,
            required: true,
            min: [1,'Capacity must be at least 1']
        },
        vehicleType:{
            type: String,
            enum: ['car','motorcycle','auto'],
            required: true
        }
    },

    location:{
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id},process.env.JWT_SECRET,{expiresIn: '24h'});
    return token;
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};



const captainModel = mongoose.model('captain',captainSchema);

module.exports = captainModel;