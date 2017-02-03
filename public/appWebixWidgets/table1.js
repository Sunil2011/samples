 
dtable = new webix.ui({
    view: "datatable",
    select: "row",
    
    columns: [
        // for first column custom-sort is textLength
        {id: "title", header: "Film Title", fillspace: true, sort: textLength, editor:"text" },
        {id: "year", header: "Year", width: 100, sort: "int"},
        {id: "category", header: "Category", width: 100, sort: "string"},
        {id: "votes", header: "Votes", width: 100, sort: "int"}
    ],
    editable:true,
    data: [
        {id: 1, title: "The Shawshank Redemption", year: 1994, votes: 678790, category: "Thriller"},
        {id: 2, title: "The Godfather", year: 1972, votes: 511495, category: "Crime"},
        {id: 3, title: "The Godfather: Part II", year: 1974, votes: 319352, category: "Crime"},
        {id: 4, title: "Pulp fiction", year: 1994, votes: 533848, category: "Crime"}
    ]
});

function textLength(a, b) {
    a = a.title.toString().length;
    b = b.title.toString().length;
    return a > b ? 1 : (a < b ? -1 : 0);
}
;

    


