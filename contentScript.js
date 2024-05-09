// it is for car
kolesa_html_row = `
  <div id="airway-row">
    <div style="border: 4px solid #000; padding: 8px; width: fit-content; margin-left: 1em; font-size: 16px;border-radius: 10px;">
        Индекс экологичности авто   - 
        <span style="display: inline-block; position: relative; width: 60px; height: 20px; margin-bottom: -5px; border-radius: 10px; background-color: {{color}}; margin-left: 8px;">
            <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 18px; color: white;">{{index}}</span>
        </span>
    </div>
    <div>
        <a style="margin-left: 35px; font-size: 12px" href="https://www.airway.ai">Посмотреть полный отчет по экологичности авто</a>
    </div>
  </div>       
`;

// it is for real estate location
krisha_html_row = `
  <div id="airway-row">
    <div style="border: 4px solid #000; padding: 8px; width: fit-content; margin-left: 1em; font-size: 16px;border-radius: 10px;">
        <p style="font-size: 14px;"> Индекс экологичности района   - <p>     
        <span style="display: inline-block; position: relative; width: 60px; height: 20px; margin-bottom: -5px; border-radius: 10px; background-color: {{color}}; margin-left: 8px;">
            <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 12px; color: white;">{{index}}</span>
        </span>
        <p style="font-size: 14px;"> Уровень озелененности района   - <p> 
        <span style="display: inline-block; position: relative; width: 60px; height: 20px; margin-bottom: -5px; border-radius: 10px; background-color: {{greens_color}}; margin-left: 8px;">
            <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 12px; color: white;">{{greens}}</span>
        </span>
    </div>
    <div>
        <a style="margin-left: 35px; font-size: 12px" href="https://www.airway.ai">Посмотреть полный отчет по экологичности района</a>
    </div>
  </div>
`;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // if airway-row is already present, remove it
    if (document.getElementById("airway-row") !== null) {
        document.getElementById("airway-row").remove();
    }
    if (request.event === "new_url_krisha") {
        // add row to div with classname :offer__short-description
        fillApartmentData(request.url);
    } else if (request.event === "new_url_kolesa") {
        // add row to div with classname :offer__sidebar-info offer__sidebar-info
        fillCarData(request.url);
    }
})

async function fillApartmentData(url) {
    apartment_index = await getApartmentAirQualityIndex({
        "city": "Almaty",
        "district": "Bostandyk",
        "street": "Satpaev",
        "house": "1",
        "apartment": "1",
        "rooms": "2",
        "area": "50",
        "floor": "5",
        "price": "100000"
    });
    color = getColorFromIndex(apartment_index);
    div = document.getElementsByClassName("offer__short-description")[0];

    greens_index = await getGreensIndex({})
    greens_color = getColorFromIndex(greens_index);

    krisha_html_row_indexed = krisha_html_row.replace("{{index}}", apartment_index);
    krisha_html_row_indexed = krisha_html_row_indexed.replace("{{color}}", color);
    krisha_html_row_indexed = krisha_html_row_indexed.replace("{{greens_color}}", greens_color);
    krisha_html_row_indexed = krisha_html_row_indexed.replace("{{greens}}", greens_index);
    div.innerHTML = krisha_html_row_indexed + div.innerHTML;
}

async function fillCarData(url) {
    car_index = await getCarAirQualityIndex({
        "brand": "Toyota",
        "model": "Camry",
        "year": "2018",
        "engine": "2.5",
        "mileage": "10000",
        "transmission": "automatic",
        "drive": "front",
        "fuel": "petrol",
        "color": "black",
        "price": "10000"
    });
    color = getColorFromIndex(car_index);
    div = document.getElementsByClassName("offer__sidebar-info")[0];

    kolesa_html_row_indexed = kolesa_html_row.replace("{{index}}", car_index);
    kolesa_html_row_indexed = kolesa_html_row_indexed.replace("{{color}}", color);
    div.innerHTML = kolesa_html_row_indexed + div.innerHTML;
}

function getColorFromIndex(index) {
    if (index > 60) {
        return "#ff0000";
    } else if (index > 30) {
        return "#ff6600";
    } else {
        return "#00ff00";
    }
}

async function getCarAirQualityIndex(car_data) {
    // return random number between 1 and 100
    return Math.floor(Math.random() * 100) + 1;
}

async function getApartmentAirQualityIndex(apartment_data) {
    // return random number between 1 and 100
    return Math.floor(Math.random() * 100) + 1;
}

async function getGreensIndex(apartment_data) {
    // return random number between 1 and 100
    return Math.floor(Math.random() * 100) + 1;
}