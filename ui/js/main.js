$("#remote .typeahead").autocomplete({
  source: (request, response) => {
    if (request && request.term) {
      $.getJSON('https://01js17x8hg.execute-api.us-east-2.amazonaws.com/prod?key=' + request.term, data => {
        response(data.map(v => v.Information));
      });
    }
  },
  minLength: 2
});