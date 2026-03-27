const JWT=require('jsonwebtoken');

const secret='\/(-|)@|\|T';

function createTokenForUser(user){
    const payload={
        fullName:user.fullName,
        _id:user._id,
        email:user.email,
        profileImage:user.profileImage,
        role:user.role,
    }
    const token=JWT.sign(payload,secret);
    return token;
}

function validateToken(token){
    const payload=JWT.verify(token,secret);
    return payload;
}

module.exports={
    createTokenForUser,
    validateToken,
}