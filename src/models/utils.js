import axios from 'axios';
const API_KEY = 'AIzaSyBG3z7B46XHSLNDKTmxHPCioAlwE934Xt4';

export function getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}
export function mySetTimeout(waitTime){
    return new Promise((resolve, reject) => {
        setTimeout(resolve, waitTime);
    })
}
export function myCompare (a, b){
	let dateTimeA = a.date + a.time;
	let dateTimeB = b.date + b.time; 
    if(dateTimeA < dateTimeB) return -1;
    else if(dateTimeA == dateTimeB) return 0;
    else return 1;
}
export function cleanString (str) {
    let div = document.createElement("div");
    div.innerHTML = str;
    return(div.innerText);
}
// export async function getCurrentPosition(){
//     try{
//         const res = await axios.get('https://www.googleapis.com/geolocation/v1/geolocate', {
//             params:{
//                 key: API_KEY
//             }
//         })
//         console.log('res',res);
//     }catch(err){
//         console.log('Cannot get user\'s current location');
//         console.log(err);
//     }
// }

export async function geocoder (task, func_updateLocation) {
	const address = task.location.address;
	try{
        // Only update the location once
        if(task.location.lat === '' && task.location.lng === ''){
            const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params:{
                    address: address,
                    key: API_KEY
                }
            });
            console.log(res.data.results);
            const detail = res.data.results[0]; //most relevent outcome
            const location = {
                address: `${task.location.address}(${detail.formatted_address})`,
                lat: detail.geometry.location.lat,
                lng: detail.geometry.location.lng,
            }
            func_updateLocation(location, task.id);
        }
	}
	catch(err){
		console.log('failed to decode an address to the absolute location');
		console.log(err);
	}
}
export async function geoDecoder (task) {
    const latlng = `${task.location.lat},${task.location.lng}`;
    try{
        const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params:{
                latlng: latlng,
                key: API_KEY
            }
        });
        const address = res.data.results[0].formatted_address;
        return(address);
    }catch(err){
        console.log('failed to decode an lag/lng to the address');
		console.log(err);
    }
}

export function getDirection (prevTask, theTask, func_storeDirection){
    const directionsService = new google.maps.DirectionsService;
    const origin = prevTask.location;
    const destination = theTask.location;
    const params = {
                        origin: `${origin.lat},${origin.lng}`,
                        destination: `${destination.lat},${destination.lng}`,
                        travelMode: 'DRIVING'
                    };
    directionsService.route(params, (res, status) => {
        if(status === 'OK'){
            const steps = res.routes[0].legs[0].steps;
             console.log(steps);
            let data = steps.map(step => ({
                travelMode: step.travel_mode,
                distance: step.distance.text,
                duration: step.duration.text,
                instructions: step.instructions,
            }))
            const info = {
                prevTask: {
                    id: prevTask.id,
                    context: prevTask.context,
                    address: prevTask.location.address,
                },
                theTask: {
                    id: theTask.id,
                    context: theTask.context,
                    address: theTask.location.address,
                },
                info: data,
            }
            // console.log(info);
            func_storeDirection(true, theTask.id, info);
        }
    })
}
