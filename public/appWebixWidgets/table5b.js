var self = this;

self.submitData = function () {
    var values = $$("addf").getValues();
   // console.log(values);
    var last_id = 0 ;
    
    if (!values.employee) {
        alert("Employee fied can't be empty !");
        return;
    }

    webix.ajax().post("dbDataAddUpdate.php", values, function (text, data) {
        console.log(data.json());
        var resp = data.json(); // local var or access
        last_id = resp.id; // global aceess
       // console.log(last_id);
        values.id = last_id;
        console.log(2, values);
        $$('myTbl').add(values,0);
    });

    $$('aWin').close();
    $$('mybar').enable(); // enabling mybar after submitting the form
    $$('pagerA').enable(); //  enabling pagination submitting the form

    // dtable.clearAll()
    // dtable.load("dbData.php");
    //window.location.reload();
    // $$('myTbl').refresh();      
    
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
                {view: "datepicker", label: "Date", editor:"text", format: "%Y-%m-%d", name: "date"},
                {view: "select", label: "Employee", editor:"select",  options:["Test","Rami reddy", "Sunil","Chandu","Prashant","Test1","Test2"],name: "employee"},
                {view: "select", label: "Project", editor:"select", options:["Test","CKD","Tigersheet","HCL PS","HCL FS","Non-project","captivatour","Self-project","maintenance","Unlisted"], name: "project"},
                {view: "text", label: "Task", editor:"text", name: "task"},
                {view: "text", label: "Activity", editor:"text", name: "activity"},
                {view: "text", label: "Hours",  editor:"text", name: "hr"},
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
  //  console.log(values);
    webix.ajax().post("dbDataAddUpdate.php", values);

    $$('eWin').close();
    $$('mybar').enable(); // enabling mybar after submitting the form
    $$('pagerA').enable(); //  enabling pagination submitting the form

    //window.location.reload();
    
  // update the table row directly from form data .. instead of realoding the table
    var sel = $$('myTbl').getSelectedId();
    //var row = $$('myTbl').getItem(sel.row); 
    //console.log(sel);
    values.updated_at = self.updatedDate();
    console.log(values);
    $$('myTbl').updateItem(sel.row, values);
    
};

self.editData = function () {
    
    var sel = $$('myTbl').getSelectedId();
   // console.log(sel);
    if (!sel) {
        webix.message({
            type: "error",
            text : "please select a row !",
            expire : 2000
        });
        return;
    }
    
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
                {view: "select", label: "Employee", editor:"select",  options:["Test","Rami reddy", "Sunil","Chandu","Prashant","Test1","Test2"], name: "employee"},
                {view: "select", label: "Project", editor:"select", options:["Test","CKD","Tigersheet","HCL PS","HCL FS","Non-project","captivatour","Self-project","maintenance","Unlisted"], name: "project"},
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
    $$("editf").bind("myTbl");
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
                            multiselect: true,
                            id : "myTbl",
                            css: "my_style", // css class will be applied to the whole table
                            height: 400 ,
                            columns: [
                                {id:"chk", header:"Checkbox", template:"{common.checkbox()}", editor:"checkbox", adjust:true },
                                {id:"id",header:"#", sort: "int", adjust:true},
                                {id: "date", header: "Date", width: 120,  editor: "text", sort: "string"},
                                {id: "employee", header: "Employee", width:150, sort: "string"},
                                {id: "project", header: "Project", adjust:true,  sort: "string"},
                                {id: "task", header: "Task", adjust:true, sort: "string"},
                                {id: "activity", header: "Activity", adjust:true, sort: "string"},
                                {id: "hr", header: "Hour", width: 100,  sort: "int"},
                                {id: "week_no", header: "Week no.", width: 100,  sort: "int"},
                                {id: "created_at", header: "Created on", adjust:true, sort: "string"},
                                {id: "updated_at", header: "Updated on", adjust:true, sort: "string"}
                            ],
                            resizeColumn:true,
                            resizeRow:true,
                            pager:"pagerA",
                            checkboxRefresh:true, 
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



self.addZero = function (i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
};
self.updatedDate = function () {
    var d = new Date();
    var Y = d.getFullYear();
    var M = self.addZero(d.getMonth()+1);
    var D = self.addZero(d.getDate());
    var h = self.addZero(d.getHours());
    var m = self.addZero(d.getMinutes());
    var s = self.addZero(d.getSeconds());
    var date =  Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
    return date ;
};

self.week_no = function () {
    var d = new Date();
    
    
};