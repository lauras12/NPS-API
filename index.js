'use strict'

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function getParks(baseUrl, stateArr, maxResults, apiKey) {
    const params = {
        stateCode: stateArr,
        limit: maxResults
    }
    const queryString = formatQueryParams(params);
    const url = baseUrl + '?' + queryString + '&api_key=' + apiKey;
    console.log(url);

    // Fetch information and display error message if needed
fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
        $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  // clear previous results
  $('.js-error-message').empty();
  $('.results-list').empty();
  for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
      $('.results-list').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
      <p>${responseJson.data[i].description}</p>
      </li>`);
  }
  $('.results').removeClass('hidden');
}

// Watch search form for submit
function watchForm() {
    $('.js-form').on('submit', function() {
        event.preventDefault();
        const baseUrl = 'https://api.nps.gov/api/v1/parks'
        const stateArr = $('#js-search-term').val().split(",");
        const maxResults = $('#js-max-results').val();
        const apiKey = 'e9aegDwVAkPN7HyfE6jMBwRyMFLAUc0VZxOFETdO'
        getParks(baseUrl, stateArr, maxResults, apiKey);
    })
}

$(watchForm);