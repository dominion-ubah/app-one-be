const mongoose = require('mongoose')
const Schema = mongoose.Schema;


// Create Apartment Schema and Model
const ApartmentSchema = new Schema({

    apartmentId: Schema.Types.ObjectId,

	toiletDetails: {
        type:String,
        required: [true, "Please Enter Toilet Details, It's Required"]
    },

	noOfRooms: {
        type: Number,
        required: [true, "Please Enter The Number of Rooms Available, It's Required"]
    },

    //  Value is in Number of Cars
	parkingSpace: {
        type:Number,
        default: 0
    },

	shortDescription: {
        type:String,
        required: [true, "Please Enter a short Description, It's Required"]
    },
	title: {
        type:String,
        required: [true, "Please Enter a Title, It's Required"]
    },
    location: {
        type: String,
        required: [true, "Please select a location or enter a custom loaction, It's Required"]
    },
    budget: {
        type: [Number],
        required: [true, "Please Select a budget Range, It's Required"]
        
    },
    // Rent is 1 else Sale is 0
    rent: {
        type:Boolean,
        required: [true]
    },
    propertyType: {
        type: String,
        required: [true],
        enum: ['Self-Contained', 'Apartment', 'PentHouse', 'BQ', 'Office Space']
    },
    imgpath: {
        type: String,
        required: [true, "Please Insert a Picture, It's Required"]
    }
// 	ratings
//     pics : {
// 		4 
// 	}
// 	CalltoAction
// 	SendMessage
})

// Create Model and assign it to collection name and assign schema
const Apartment = mongoose.model('apartment', ApartmentSchema);

module.exports = Apartment; 