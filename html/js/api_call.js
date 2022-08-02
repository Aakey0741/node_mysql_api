const baseUrl = 'http://localhost:1900/api/v1';

const getAllEmps = async () => {
     try {
         let endPoint = '/employees',
             data = '';
         let config = {
             method: 'get',
             url: `${baseUrl}/${endPoint}`,
             headers: { 
               'Content-Type': 'application/json'
             },
             data
         };
         
         const response = await axios(config);
         return response.data;
             
     } catch (errors){
         console.error(errors);
     }
 };

 const createEmp = async (reqData) => {
     try {
         let endPoint = '/employee/create',
         data = JSON.stringify({
          "first_name": reqData.firstName,
          "last_name": reqData.lastName,
          "email": reqData.email,
          "password": reqData.password,
          "username": reqData.username
        });
         let config = {
             method: 'post',
             url: `${baseUrl}${endPoint}`,
             headers: { 
               'Content-Type': 'application/json'
             },
             data
         };
         
         const response = await axios(config);
         return response.data;
             
     } catch (errors){
         console.error(errors);
     }
 };
 
 export { getAllEmps, createEmp };