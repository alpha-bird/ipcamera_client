const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const postJSON = function( url, body ) {
    return fetch(url , {
        method : 'POST',
        headers: headers,
        body : JSON.stringify( body )
    }).then( resp => resp.json() );
}

export const getJSON = function( url ) {
    return fetch(url , {
        method : 'GET',
        headers: headers
    }).then( resp => resp.json() );
}
