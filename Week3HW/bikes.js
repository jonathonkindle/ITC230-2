let bikes = [
    { modelNumber : "FU13TrackP" , brand : 'Fuji', year : 2013, model : 'Track Pro', price : 1350 },
    { modelNumber : "FU15Cross13" , brand : 'Fuji', year : 2015, model : 'Cross 1.3', price : 1500 },
    { modelNumber : "DI13RecoilC29" , brand : 'Diamondback', year : 2013, model : 'Recoil Comp 29', price : 1100 },
    { modelNumber : "DI13Podium7SR" , brand : 'Diamondback', year : 2013, model : 'Podium 7 Super Record', price : 8500 },
    { modelNumber : "SP16AWOLC" , brand : 'Specialized', year : 2016, model : 'AWOL Comp', price : 2000 },
    { modelNumber : "SP15Allez" , brand : 'Specialized', year : 2015, model : 'Allez', price : 770 },
    { modelNumber : "CA16CAAD10T1" , brand : 'Cannondale', year : 2016, model : 'CAAD10 Track 1', price : 2000 },
    { modelNumber : "CA18Jekyll4" , brand : 'Cannondale', year : 2018, model : 'Jekyll 4', price : 3199 },
    ];

exports.getall = () => {
    return bikes;
};

exports.get = (modelNumber) => {
    return bikes.find((item) => {
        return item.modelNumber === modelNumber;
    })
};

exports.delete = (modelNumber) => {
    const oldLength = bikes.length;
    bikes = bikes.filter((item) => {
        return item.modelNumber !== modelNumber;
    });

    return {deleted: oldLength !== bikes.length};
}