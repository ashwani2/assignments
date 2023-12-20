const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const zod = require("zod");
function signJwt(username, password) {
  const mySchema = zod.object({
    username: zod.string().email(),
    password: zod
      .string()
      .min(6, { message: "Must be 6 or more characters long" }),
  });

  const obj = {
    username,
    password,
  };
  const response = mySchema.safeParse(obj);

  if(response.success){
    const token=jwt.sign(obj,jwtPassword)
    return token
  }
  else{
    return null
  }

}

function verifyJwt(token) {
    try {
        // Decode the JWT token
        const decodedToken = jwt.verify(token, jwtPassword);
    
        // If decoding is successful, return true
        return true;
      } catch (error) {
        // If decoding fails, return false
        return false;
      }
}


module.exports = {
  signJwt,
  verifyJwt,
  jwtPassword,
};
