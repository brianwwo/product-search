$("#remote .typeahead").autocomplete({
  source: (request, response) => {
    if (request && request.term) {
      $.ajax({
        type: "GET",
        url: 'https://01js17x8hg.execute-api.us-east-2.amazonaws.com/prod',
        data: {
          key: request.term
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          response(data.map(v => v.Information));
        }
      });
    }
  },
  minLength: 2
});