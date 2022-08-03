const { connection } = require("../mysqlconn");

const find_all = async (params) => {
  const {
    database = "",
    select = "*",
    tableName,
    where = "",
    limit = "",
    order = "",
  } = params;

  const response = await new Promise((resolve, reject) => {
    let query = `SELECT ${select} FROM ${database}.${tableName} ${where} ${order} ${limit}`;
    connection.query(query, (err, results) => {
      if (err) reject(new Error(`${err.toString()} , Err No : ${err.errno}`));
      resolve({
        status: 1,
        message: "All users.",
        data: results,
      });
    });
  });
  return response;
};

const find_one = async (params, token) => {
  const { database = "", select = "*", tableName, where = "" } = params;

  const response = await new Promise((resolve, reject) => {
    let checkExistRecord = `SELECT ${select} FROM ${database}.${tableName} ${where}`;
    connection.query(checkExistRecord, (err, row) => {
      if (row.length === 0) {
        if (err)
          reject(new Error(`${err.toString()}, Error No : ${err.errno}`));
        resolve({
          status: 2,
          message: "This user does not exist.",
        });
      } else {
        if (err)
          reject(new Error(`${err.toString()}, Error No : ${err.errno}`));
        resolve({
          status: 1,
          message: "User found.",
          data: row,
          token: token
        });
      }
    });
  });
  return response;
};

const create_data = async (params) => {
  const {
    database = "",
    tableName,
    where = "",
    select = "*",
    insert_column_name,
    insert_column_value,
  } = params;

  const response = await new Promise((resolve, reject) => {
    let checkExistRecord = `SELECT ${select} FROM ${database}.${tableName} ${where}`;
    connection.query(checkExistRecord, (err, row) => {
      if (err) reject(new Error(`${err.toString()}, Error No : ${err.errno}`));
      if (row.length === 0) {
        let query = `INSERT INTO ${database}.${tableName} ${insert_column_name} VALUES ${insert_column_value}`;
        connection.query(query, (err, results) => {
          if (err)
            reject(new Error(`${err.toString()}, Error No : ${err.errno}`));
          resolve({
            status: 3,
            message: `Employee created successfully...!`,
            data: results,
          });
        });
      } else {
        resolve({
          status: 1,
          message: "This user exist.",
          data: row,
        });
      }
    });
  });
  return response;
};

const delete_data = async (params) => {
  const { database = "", tableName, where = "", select = "*" } = params;

  const response = await new Promise((resolve, reject) => {
    let checkExistRecord = `SELECT ${select} FROM ${database}.${tableName} ${where}`;
    connection.query(checkExistRecord, (err, row) => {
      if (err) reject(new Error(`${err.toString()}, Error No : ${err.errno}`));
      if (row.length === 0) {
        resolve({
          status: 0,
          message: `This employee already removed.`
        });
      } else {
        let query = `DELETE FROM ${database}.${tableName} ${where}`;
        connection.query(query, (err, results) => {
          if (err)
            reject(new Error(`${err.toString()}, Error No : ${err.errno}`));
          resolve({
            status: 4,
            message: `Employee deleted successfully.`,
            data: results,
          });
        });
      }
    });
  });
  return response;
};

const update_data = async (params) => {
  const {
    database = "",
    tableName,
    select = "*",
    where = "",
    update_column_with_values = "",
  } = params;

  const response = await new Promise((resolve, reject) => {
    // let checkExistRecord = `SELECT count(*) as row_count  FROM ${database}.${tableName} WHERE ${where}`;
    // const result = Object.values(JSON.parse(JSON.stringify(row)));
    // console.log('JHbvdfjisb', result[0].row_count)

    let checkExistRecord = `SELECT ${select} FROM ${database}.${tableName} ${where}`;

    connection.query(checkExistRecord, (err, row) => {
      if (err)
        reject(new Error(`${err.toString()}, Error No : ${err.errno}`));
      if (row.length === 0) {
        resolve({
          status: 0,
          message: "This user does not exist..",
        });
      } else {
        let query = `UPDATE ${database}.${tableName} SET ${update_column_with_values} ${where}`;
        connection.query(query, (err, results) => {
          if (err)
            reject(new Error(`${err.toString()}, Error No : ${err.errno}`));
          resolve({
            status: 5,
            message: `Employee's details successfully updated...!`,
            data: results,
          });
        });
      }
    });
  });
  return response;
};

module.exports = { find_all, find_one, create_data, delete_data, update_data };
