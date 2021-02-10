module.exports = (temp, property) => {
    let output = temp.replace(/{%PROPERTYNAME%}/g, property.propertyTitle);
    output = output.replace(/{%ID%}/g, property.id);
    output = output.replace(/{%PROPERTYTYPE%}/g, property.propertyType);
    output = output.replace(/{%BEDS%}/g, property.beds);
    output = output.replace(/{%BATH%}/g, property.baths);
    output = output.replace(/{%SQFT%}/g, property.sqft);
    output = output.replace(/{%PRICE%}/g, property.price);
    output = output.replace(/{%DESCRIPTION%}/g, property.description);

    return output;
}