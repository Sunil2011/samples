var self = this;

self.submitData = function () {
    var values = $$("addf").getValues();
    console.log(values);
    
    if (!values.employee) {
        alert("Employee fied can't be empty !");
        return;
    }
    
    webix.ajax().post("dbDataAddUpdate.php", values);
    
    $$('aWin').close();
    $$('mybar').enable(); // enabling mybar after submitting the form
    $$('pagerA').enable(); //  enabling pagination submitting the form
    
//    dtable.clearAll()
//    dtable.load("dbData.php");
    window.location.reload();
     
};

self.addData = function () {
    //alert("Add !");
    $$("mybar").disable(); // disable mybar when add-window is open 
    $$("pagerA").disable(); // disable pagination submitting the form
    
    webix.ui({
        view: "window",
        id: "aWin",
        height: 550,
        width: 1100,
        left: 100, top: 50,
        head: {
            view: "toolbar", cols: [
                {view: "label", label: "New entry", css: "text_heading"},
                {view: "button", label: 'X', width: 100, align: 'right',
                    click: "$$('aWin').close(); $$('mybar').enable(); $$('pagerA').enable(); ",
                    css: "button_primary button_raised "
                }
            ]
        }
        ,
        body: {
            view: "form",
            id: "addf",
            elements: [
                {view: "datepicker", format: "%Y-%m-%d",label: "Date", name: "date"},
                {view: "text", label: "Employee", name: "employee"},
                {view: "text", label: "Project", name: "project"},
                {view: "text", label: "Task", name: "task"},
                {view: "text", label: "Activity", name: "activity"},
                {view: "text", label: "Hours", name: "hr"},
                {margin: 10, cols: [
                        {},
                        {view: "button", label: "Save", type: "form", width: 100, algin: "right",
                            on: {
                                'onItemClick': self.submitData
                            }
                        },
                        {view: "button", label: "Cancel", width: 100, algin: "right", click: "$$('aWin').close(); $$('mybar').enable(); $$('pagerA').enable();"}
                    ]},
                {}
            ]
        }
    }).show();
};

self.updateData = function () {
    var values = $$("editf").getValues();
    console.log(values);
    
    
};

self.editData = function () {

    $$("mybar").disable(); // disable mybar when edit-window is open
    $$("pagerA").disable(); // disable pagination when edit-window is open
    webix.ui({
        view: "window",
        id: "eWin",
        height: 550,
        width: 1100,
        left: 100, top: 50,
        head: {
            view: "toolbar", cols: [
                {view: "label", label: "Update", css: "text_heading"},
                {view: "button", label: 'X', width: 100, align: 'right',
                    click: "$$('eWin').close(); $$('mybar').enable(); $$('pagerA').enable();",
                    css: "button_primary button_raised "
                }
            ]
        }
        ,
        body: {
            view: "form",
            id : "editf",
            elements : [
                {view:"text", label:"Id", name:"id", placeholder: "readonly data",readonly:true },
                {view: "datepicker", format: "%Y-%m-%d",label: "Date", name: "date"},
                {view: "text", label: "Employee", name: "employee"},
                {view: "text", label: "Project", name: "project"},
                {view: "text", label: "Task", name: "task"},
                {view: "text", label: "Activity", name: "activity"},
                {view: "text", label: "Hours", name: "hr"},
                {margin: 10, cols: [
                        {},
                        {view: "button", label: "Update", type: "form", width: 100, algin: "right",
                            on: {
                                'onItemClick': self.updateData
                            }
                        },
                        {view: "button", label: "Cancel", width: 100, algin: "right", click: "$$('eWin').close(); $$('mybar').enable(); $$('pagerA').enable();"}
                    ]},
                {}
            ]
        }
    }).show();
    
//    console.log(123);

};

dtable = new webix.ui({
    rows: [
        {
            view: "toolbar",
           // height: 70,
            css: "right_align",
            id: "mybar",
            elements : [
                {view: "button", value: "Add", id: "add", width: 70 ,
                    css: "button_primary button_raised ",
                    on : {
                        'onItemClick': self.addData                        
                    }
                },
                {view: "button", value: "Edit", id: "edit", width: 70 ,
                    css: "button_primary button_raised ",
                    on : {
                        'onItemClick': self.editData
                    }
                }                

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
                            id : "myTbl",
                            css: "my_style", // css class will be applied to the whole table
                            height: 400 ,
                            columns: [
                                {id:"chk", header:"Checkbox", template:"{common.checkbox()}", editor:"checkbox", adjust:true, cssFormat:chk },
                                {id:"id",header:"#", sort: "int", adjust:true, cssFormat:chk},
                                {id: "date", header: "Date", width: 120,  editor: "text", sort: "string", cssFormat:chk},
                                {id: "employee", header: "Employee", width:150, sort: "string", cssFormat:chk},
                                {id: "project", header: "Project", adjust:true,  sort: "string", cssFormat:chk},
                                {id: "task", header: "Task", adjust:true, sort: "string", cssFormat:chk},
                                {id: "activity", header: "Activity", adjust:true, sort: "string", cssFormat:chk},
                                {id: "hr", header: "Hour", width: 100,  sort: "int", cssFormat:chk},
                                {id: "week_no", header: "Week no.", width: 100,  sort: "int", cssFormat:chk},
                                {id: "created_at", header: "Created on", adjust:true, sort: "string", cssFormat:chk},
                                {id: "updated_at", header: "Updated on", adjust:true, sort: "string", cssFormat:chk}
                            ],
                            resizeColumn:true,
                            resizeRow:true,
                            pager:"pagerA",
                            checkboxRefresh:true, // for css change on selecting a row (checkbox) 
                           // data : webix.ajax().get("dbData.php")                           
                            url : "dbData.php"
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

// for changing the css of selected row (selected checkbox)
function chk(id, obj) {
    if (obj.chk) {
        return "row-marked";
    }
    return "";
} ;

