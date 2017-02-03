
dtable = new webix.ui({
    rows: [
        {
            view: "toolbar",
           // height: 70,
            css: "myclass",
            id: "mybar",
            elements : [
                {view: "button", value: "Add", id: "add", width: 70 , css: "button_warning button_raised"},
                {view: "button", value: "edit", id: "edit", width: 70 , css: "button_warning button_raised"}                

            ]
        },
        
        {
            cols: [
                {
                    width: 250,
                    minWidth: 100,
                    maxWidth: 350,
                    // template:"col 1"            
                    rows: [
                        {
                            view: "template",
                            type: "header",
                            css: {"text-align": "center", "color": "coral", "background-color": "#112233"},
                            template: "<h3> Sidebar !! </h3>"
                        },
                        {
                            height: 50,
                            view: "template",
                            css: {"background-color": "#112233", "color": "white"},
                            template: "navbar-1 "
                        },
                        {
                            height: 50,
                            view: "template",
                            css: {"background-color": "#112233", "color": "white"},
                            template: "navbar-2 "
                        },
                        {
                            //  height : 50,
                            view: "template",
                            css: {"background-color": "#112233", "color": "white"},
                            template: "navbar-3 "
                        }
                    ]
                },
                {view: "resizer"},
                {
                    rows: [
                        {
                            view: "template",
                            type: "header",
                            css: {"text-align": "center", "color": "coral"},
                            template: "<h3> Webix-Table !! </h3>"
                        },
                        {
                            view: "datatable",                            
                            select: "row",
                            css: "my_style", // css class will be applied to the whole table
                            height: 400 ,
                            columns: [
                                {id: "date", header: "Date", width: 100, editor: "text", sort: "string"},
                                {id: "employee", header: "Employee", fillspace: true, sort: "string"},
                                {id: "project", header: "Project", width: 100, sort: "string"},
                                {id: "task", header: "Task", fillspace: true, sort: "string"},
                                {id: "activity", header: "Activity", fillspace: true, sort: "string"},
                                {id: "hour", header: "Hour", width: 100, sort: "int"},
                                {id: "weekno", header: "Week no.", width: 100, sort: "int"},
                                {id: "createdon", header: "Created on", width: 100, sort: "string"},
                                {id: "updatedon", header: "Updated on", width: 100, sort: "string"}
                            ],
                            pager:"pagerA",
                            data: [
                                {id: 1, date: "2016-10-04", employee: "Rami Reddy", project: "CKD", task: "Api-changes", activity: "Developer-Coding", hour: 5, weekno: 40, createdon: "2016-10-04", updatedon: "2016-10-04"},
                                {id: 2, date: "2016-10-05", employee: "Chandu", project: "Non-project", task: "placement-test", activity: "Other", hour: 6, weekno: 40, createdon: "2016-10-05", updatedon: "2016-10-05"},
                                {id: 3, date: "2016-10-05", employee: "Sunil", project: "Non-project", task: "JS-framework(webix)", activity: "Developer-Coding", hour: 6, weekno: 40, createdon: "2016-10-05", updatedon: "2016-10-05"},
                                {id: 4, date: "2016-10-05", employee: "Prashant", project: "Maintainance", task: "UX- design", activity: "Design", hour: 6.5, weekno: 40, createdon: "2016-10-05", updatedon: "2016-10-05"},
                                {id: 5, date: "2016-10-05", employee: "Rami Reddy", project: "CKD", task: "Api-changes", activity: "Developer-Coding", hour: 5, weekno: 40, createdon: "2016-10-05", updatedon: "2016-10-05"},
                                {id: 6, date: "2016-10-06", employee: "Rami Reddy", project: "CKD", task: "Api-changes", activity: "Developer-Coding", hour: 7, weekno: 40, createdon: "2016-10-06", updatedon: "2016-10-07"},
                                {id: 7, date: "2016-10-06", employee: "Prashant", project: "Maintainance", task: "UX- design", activity: "Design", hour: 6.5, weekno: 40, createdon: "2016-10-06", updatedon: "2016-10-06"},
                                {id: 8, date: "2016-10-06", employee: "Chandu", project: "Non-project", task: "placement-test", activity: "Other", hour: 7.5, weekno: 40, createdon: "2016-10-06", updatedon: "2016-10-06"},
                                {id: 9, date: "2016-10-05", employee: "Sunil", project: "HCL FS", task: "Api", activity: "Developer-Coding", hour: 6, weekno: 40, createdon: "2016-10-06", updatedon: "2016-10-06"},
                                {id: 10, date: "2016-10-07", employee: "Chandu", project: "Tigersheet", task: "placement-test", activity: "Other", hour: 6, weekno: 40, createdon: "2016-10-07", updatedon: "2016-10-07"},
                                {id: 11, date: "2016-10-07", employee: "Prashant", project: "Maintainance", task: "UX- design", activity: "Design", hour: 6.5, weekno: 40, createdon: "2016-10-07", updatedon: "2016-10-07"},
                                {id: 12, date: "2016-10-06", employee: "Test1", project: "Maintainance", task: "UX- design", activity: "Design", hour: 6.5, weekno: 40, createdon: "2016-10-06", updatedon: "2016-10-07"},
                                {id: 13, date: "2016-10-06", employee: "Test2", project: "Tigersheet", task: "placement-test", activity: "Other", hour: 6, weekno: 40, createdon: "2016-10-06", updatedon: "2016-10-07"},
                                {id: 14, date: "2016-10-06", employee: "Test3", project: "CKD", task: "Api-changes", activity: "Developer-Coding", hour: 7, weekno: 40, createdon: "2016-10-06", updatedon: "2016-10-07"},
                                {id: 15, date: "2016-10-06", employee: "Test4", project: "Test", task: "Api-changes", activity: "Developer-Coding", hour: 4, weekno: 40, createdon: "2016-10-06", updatedon: "2016-10-07"},
                                {id: 16, date: "2016-10-06", employee: "Abc", project: "Test", task: "Test", activity: "Developer-Coding", hour: 5, weekno: 40, createdon: "2016-10-07", updatedon: "2016-10-07"},
                                {id: 17, date: "2016-10-07", employee: "Test1", project: "Maintainance", task: "UX- design", activity: "Design", hour: 6.5, weekno: 40, createdon: "2016-10-07", updatedon: "2016-10-07"},
                                {id: 18, date: "2016-10-07", employee: "Test2", project: "Tigersheet", task: "placement-test", activity: "Other", hour: 6, weekno: 40, createdon: "2016-10-07", updatedon: "2016-10-07"},
                                {id: 19, date: "2016-10-07", employee: "Test3", project: "CKD", task: "Api-changes", activity: "Developer-Coding", hour: 7, weekno: 40, createdon: "2016-10-07", updatedon: "2016-10-07"},
                                {id: 20, date: "2016-10-07", employee: "Test4", project: "Test", task: "Api-changes", activity: "Developer-Coding", hour: 4, weekno: 40, createdon: "2016-10-07", updatedon: "2016-10-07"},
                                {id: 21, date: "2016-10-07", employee: "Abc", project: "Test", task: "Test", activity: "Developer-Coding", hour: 5, weekno: 40, createdon: "2016-10-07", updatedon: "2016-10-07"}
                            ]
                           
                            
                        },                        
                        {
                            view:"pager", id:"pagerA",
                            //animate:true,
                            size:8,
                            group:5
                        },
                        {                            
                        }
                    ]
                }
            ]
        }
    ]
});
// for text length sorting 
function textLength(a, b) {
    a = a.title.toString().length;
    b = b.title.toString().length;
    return a > b ? 1 : (a < b ? -1 : 0);
};









