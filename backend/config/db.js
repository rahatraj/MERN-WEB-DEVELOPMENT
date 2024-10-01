import mongoose from 'mongoose'

const configureDB = async () => {
    try{
        const db = await mongoose.connect(process.env.DB_URL)
        console.log(`connected to db`)
    }catch(err){
        console.log(`Errors : ${err}`)
    }
}

export default configureDB;