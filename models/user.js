import { Schema, model, models } from 'mongoose';
 
const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'E-mail již existuje!'],
        required: [true, 'E-mail je povinný'],
    },
    username: {
        type: String,
        required: [true, 'Přihlašovací jméno je povinné!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Přihlašovací jméno je neplatné, musí obsahovat 8-20 alfa-numerických znaků a nesmí být již použito!"]
    },
    image: {
        type: String,

    }
});

const User =  models.User || model("User", UserSchema);

export default User;