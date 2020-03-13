/**
 * CVR CODE
 */

function cvrapi(vat, country) {
    jQuery.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: '//cvrapi.dk/api?search=' + vat + '&country=' + country,
        success: function(b) {
            // Write pretty JSON
            // document.write( JSON.stringify(b, null, 1) );

            // Get and write specific
            var cvrName = document.getElementById('cvrName');
            cvrName.innerHTML = 'Firmanavn: ' + b.name;
            cvrAddress.innerHTML = 'Adresse: ' + b.address;
            cvrZipcode.innerHTML = 'Postnummer: ' + b.zipcode;
            cvrCity.innerHTML = 'By: ' + b.city;
            //document.write(b.name);

            /**
             * COORDINATE CODE
             * API Key: a3b24158f6144cbe9db37049448b3807
             */

            var request = new XMLHttpRequest();
            request.open('GET', `https://api.opencagedata.com/geocode/v1/json?q=${b.city}&key=6f310a8ad60b4b22a123c6715fead1e0`, true);
            request.onload = function() {
                // Begin accessing JSON data here
                var data = JSON.parse(this.response);
                if (request.status >= 200 && request.status < 400) {
                    document.getElementById('coordsLat').innerHTML = 'Latitude: ' + JSON.stringify(data.results[0].geometry.lat);
                    document.getElementById('coordsLng').innerHTML = 'Longtitude: ' + JSON.stringify(data.results[0].geometry.lng);
                    console.log(data.results[0].geometry);
                } else {
                    const errorMessage = document.createElement('h3');
                    errorMessage.textContent = b.error + ' - ' + b.message;
                    const app = document.getElementById('errorInfo');
                    app.appendChild(errorMessage);
                }
            };

            request.send();
        }
    });
}
