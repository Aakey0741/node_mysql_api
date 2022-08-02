// Example starter JavaScript for disabling form submissions if there are invalid fields
import { getAllEmps, createEmp } from "./api_call.js";

const submitBtn = document.querySelector("#submitBtn")

submitBtn.addEventListener("click", async () => {
  let string = `{ "firstName": "${document.getElementsByName("firstName")[0].value}", "lastName": "${document.getElementsByName("lastName")[0].value}", "username": "${document.getElementsByName("username")[0].value}", "email": "${document.getElementsByName("email")[0].value}", "password": "${document.getElementsByName("password")[0].value}" }`
  const data = JSON.parse(string);
  await createEmp(data)
  let newData = await getAllEmps();
  createEmpList(newData);
  document.getElementsByTagName("input").value = ''
})

const createEmpList = async (data) => {
  let empListHtml = "";
  if (data.status === 1) {
    document.getElementById("empApiMsg").innerHTML = data.message;
    data.data.map((item, i) => {
      empListHtml += `<li class="list-group-item d-flex justify-content-between lh-sm">`;
      empListHtml += ` <div class="w-100">`;
      empListHtml += ` <p class="fw-bold my-0"><small>${item.emp_first_name} ${item.emp_last_name}</small></p>`;
      empListHtml += `<small class="text-muted">${item.emp_email}</small>`;
      empListHtml += `</div>`;
      // empListHtml+= `<small class="text-muted"><b>ID - </b>${item.emp_username}</small>`
      empListHtml += `</li>`;
    });
    document.getElementById("empList").innerHTML = empListHtml;
    document.getElementById("empCounts").innerHTML = data.data.length;
  } else {
    document.getElementById("empApiMsg").innerHTML = data.message;
  }
};

window.addEventListener("load", async () => {
  let data = await getAllEmps();
  createEmpList(data);
});
