webix.ui({
    rows: [
        {view: "template",
            type: "header", template: "<b>My App!</b>"},
        {view: "datatable",
            autoConfig: true,
            editable: true,
            data: [
                {title: "My Fair Lady", year: 1964, votes: 533978, rating: 9.7, rank: 2},
                {title: "My Fair Lady", year: 1965, votes: 533835, rating: 8.5, rank: 5},
                {title: "Rami reddy", year: 1964, votes: 533960, rating: 9.3, rank: 3},
                {title: "Rami reddy", year: 1965, votes: 533990, rating: 9.8, rank: 1},
                {title: "Chandu", year: 1964, votes: 533992, rating: 9.8, rank: 1},
                {title: "Prashant", year: 1966, votes: 533965, rating: 8.8, rank: 4}
            ]
        }
    ]
});


