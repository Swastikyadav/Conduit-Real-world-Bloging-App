const initialOption = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }
}
export default function myFetch(url, options = initialOption){
    return fetch(url, options).then(res => res.json())
}