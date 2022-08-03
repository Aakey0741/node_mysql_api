const appRoute = require("express").Router();
const jwt = require('jsonwebtoken')
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { fileStorageEngine } = require("../controllers/avatar");
const {
  find_one,
  create_data,
  update_data,
} = require("../curd_oprations/crudOptions");

const uploadAvtar = multer({ storage: fileStorageEngine });

appRoute.post("/info", uploadAvtar.none(), async (req, res) => {
  try {
    const { id, token } = req.body;

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const verified = jwt.verify(token, jwtSecretKey);

    if (verified) {
      return res.send("Successfully Verified");
    } else {
      // Access Denied
      return res.status(401).send(error);
    }

    let params = {
      database: "emp_db",
      tableName: "emp_profile",
      select: "*",
      where: `WHERE _id = '${id}'`,
    };
    let response = await find_one(params);

    return res.json(response);
  } catch (errors) {
    return res.json({
      status: 0,
      message: `Unable to fatch profile details...!`,
      error: `Server error - ${errors}`,
    });
  }
});

appRoute.post("/create", uploadAvtar.single("avatar"), async (req, res) => {
  try {
    const { id, dob, contact_number, joining_date, department, job_profile } =
      req.body;

    let { filename } = req.file === undefined ? { filename: "" } : req.file;

    let params = {
      database: "emp_db",
      tableName: "emp_profile",
      select: "*",
      where: `WHERE _id = '${id}'`,
      insert_column_name:
        "(_id, emp_dob, emp_contact_number, emp_joining_date, emp_department, emp_job_profile, emp_avatar)",
      insert_column_value: `('${id}', '${dob}', '${contact_number}', '${joining_date}', '${department}', '${job_profile}', '${filename}')`,
    };

    let response = await create_data(params);

    return res.json(response);
  } catch (errors) {
    return res.json({
      status: 0,
      message: `Unable to fatch profile details...!`,
      error: `Server error - ${errors}`,
    });
  }
});

appRoute.post("/update", uploadAvtar.single("avatar"), async (req, res) => {
  try {
    const { id, dob, contact_number, joining_date, department, job_profile } =
      req.body;

    let { filename } = req.file === undefined ? { filename: "" } : req.file;

    let getUserParams = {
      database: "emp_db",
      tableName: "emp_profile",
      select: "*",
      where: `WHERE _id = '${id}'`,
    };

    let getUser = await find_one(getUserParams);

    let params = {
      database: "emp_db",
      tableName: "emp_profile",
      select: "*",
      where: `WHERE _id = '${id}'`,
      update_column_with_values: `emp_dob ='${
        dob ? dob : getUser.data[0].emp_dob
      }', emp_contact_number ='${
        contact_number ? contact_number : getUser.data[0].emp_contact_number
      }', emp_joining_date ='${
        joining_date ? joining_date : getUser.data[0].emp_joining_date
      }', emp_department ='${
        department ? department : getUser.data[0].emp_department
      }', emp_job_profile ='${
        job_profile ? job_profile : getUser.data[0].emp_job_profile
      }', emp_avatar ='${filename ? filename : getUser.data[0].emp_avatar}'`,
    };

    if (getUser.data[0].emp_avatar) {
      fs.unlinkSync(path.resolve(`./avatar/${getUser.data[0].emp_avatar}`));
    }

    let response = await update_data(params);

    return res.json(response);
  } catch (errors) {
    return res.json({
      status: 0,
      message: `Unable to fatch profile details...!`,
      error: `Server error - ${errors}`,
    });
  }
});

module.exports = appRoute;
