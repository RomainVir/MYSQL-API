//Importamos el archivo mysql.js y definimos la función para buscar un usuario ya registrado:

import db from "../mysql.js";
import moment from "moment/moment.js";
import md5 from "md5";

const userQueries = {};

userQueries.getUser = async (email) => {
  // Conectamos con la base de datos y buscamos si existe el usuario por el email.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM usuario WHERE email = ?",
      email,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

userQueries.addUser = async (userData) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos del usuario a guardar en la base de datos.
    // Encriptamos la password con md5 y usamos la libreria momentjs para registrar la fecha actual
    let userObj = {
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      password: md5(userData.password),
      ts_Alta: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    return await db.query("INSERT INTO users SET ?", userObj, "insert", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

export default userQueries;
