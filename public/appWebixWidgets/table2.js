
dtable = new webix.ui({
   //  container: "testB",
    view: "datatable",
    select: "row",
    css:"my_style",// css class will be applied to the whole table
    columns: [
        {id: "date", header: "Date", width: 100, editor:"text",  sort: "string" },
        //  implement column css 
        {id: "employee", header: "Employee", fillspace: true, sort: "string", css:{"color":"blue"}},        
        {id: "project", header: "Project", width: 100, sort: "string"},
        {id: "task", header: "Task", fillspace: true, sort: "string"},
        {id: "activity", header: "Activity", fillspace: true, sort: "string"},
        {id: "hour", header: "Hour", width: 100, sort: "int"},
        {id: "weekno", header: "Week no.", width: 100, sort: "int"},
        {id: "createdon", header: "Created on", width: 100, sort: "string"},
        {id: "updatedon", header: "Updated on", width: 100, sort: "string"}
    ],
    data: [
        {id: 1, date: "2016-10-04", employee : "Rami Reddy", project : "CKD", task : "Api-changes", activity : "Developer-Coding", hour : 5, weekno : 40,createdon : "2016-10-04",updatedon: "2016-10-04" },
        {id: 2, date: "2016-10-05", employee : "Chandu", project : "Non-project", task : "placement-test", activity : "Other", hour : 6, weekno : 40,createdon : "2016-10-05",updatedon: "2016-10-05" },
        {id: 3, date: "2016-10-05", employee : "Sunil", project : "Non-project", task : "JS-framework(webix)", activity : "Developer-Coding", hour : 6, weekno : 40,createdon : "2016-10-05",updatedon: "2016-10-05" },
        {id: 4, date: "2016-10-05", employee : "Prashant", project : "Maintainance", task : "UX- design", activity : "Design", hour : 6.5, weekno : 40,createdon : "2016-10-05",updatedon: "2016-10-05" },
        {id: 5, date: "2016-10-05", employee : "Rami Reddy", project : "CKD", task : "Api-changes", activity : "Developer-Coding", hour : 5, weekno : 40,createdon : "2016-10-05",updatedon: "2016-10-05" }
    ]
});

function textLength(a, b) {
    a = a.title.toString().length;
    b = b.title.toString().length;
    return a > b ? 1 : (a < b ? -1 : 0);
};

   


