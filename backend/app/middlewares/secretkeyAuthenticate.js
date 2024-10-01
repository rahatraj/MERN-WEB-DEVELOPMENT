export  default function secretKeyAuthencate(req,res,next){
    const secretKey = req.headers['x-secret-key']
    if(!secretKey || secretKey !== process.env.SECRET_KEY){
        return res.status(403).json({error : 'Access denied. Invalid secret key'})
    }
    next();
}