let myLeads = [];
const inputEl = document.getElementById("leads-input");
const inputBtn = document.getElementById("input-btn");
const leadsList = document.getElementById("leads-list");
const deleteBtn = document.getElementById("delete-btn");
const myLeadsData = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

if (myLeadsData) {
  myLeads = myLeadsData;
  render(myLeads);
}

function render(leads) {
  let listItems = "";

  for (let i = 0; i < leads.length; i++) {
    listItems += `<li> <a target= '_blank' href='${leads[i]}'> ${leads[i]} </a> </li>`;
  }

  leadsList.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      render(myLeads);
    }
  );
});
