const jwt = require ('jsonwebtoken'); //Importa la biblioteca jsonwebtoken, que es necesaria para trabajar con tokens JWT.

const generateJWT =  (uid= '') =>{ //Define una función llamada generateJWT, que acepta un parámetro opcional uid. Este parámetro representa el identificador único del usuario al que se le va a generar el token. Si no se proporciona ningún uid, se tomará una cadena vacía como valor predeterminado

    return new Promise ((resolve, reject)=>{ //Crea una nueva promesa. La promesa se utilizará para manejar el proceso de generación del token, ya que el método jwt.sign() es asíncrono y utiliza un callback.

        const payload = {uid}; // Crea un objeto payload que contiene la información que se desea incluir en el token. En este caso, solo incluye el uid

        jwt.sign(payload,process.env.SECRET_OR_PRIVATE_KEY, { //Llama a la función jwt.sign() para generar el token. Esta función toma tres argumentos: el payload (información a incluir en el token), la clave secreta 
            expiresIn : '4h'
        }, (err, token)=>{
            if (err){
                console.log(err);
                reject ('No se pudo generar el JSON WEB TOEKN')
            } else {
                resolve (token)
            }
        })
    })
}

module.exports = {
    generateJWT
}