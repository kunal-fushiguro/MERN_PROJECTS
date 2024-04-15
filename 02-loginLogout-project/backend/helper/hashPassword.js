import bcrypt from "bcrypt"

const hashpass = (pass) =>{
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(12,(err,salt) =>{
            if(err){
                reject(err)
            }
            bcrypt.hash(pass,salt,(err,hash) =>{
                if(err){
                    reject(err)
                }
                resolve(hash);
            })
        })
    })
}

const comparepass = (pass,hashpass) =>{
    return bcrypt.compare(pass,hashpass)
}

export {hashpass , comparepass}