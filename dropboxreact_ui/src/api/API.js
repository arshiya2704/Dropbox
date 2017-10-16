const apis = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3002'
//
// const headers = {
//     'Accept': 'application/json'
// };

export const login = (payload) =>
    fetch(`${apis}/users/api/doLogin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
    return res.json();
})
    .catch(error => {
        console.log("This is error");
        return error;});

export const register = (payload) =>
    fetch(`${apis}/users/api/doRegister`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const getImages = (value) =>
    fetch(`${apis}/files/`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)

    })
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const uploadFile = (payload) =>
    fetch(`${apis}/files/upload`, {
        method: 'POST',
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const share = (payload) =>
    fetch(`${apis}/files/share`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
        }).then(res => {
            return res.message;
        }).catch(error => {
            console.log("This is error");
            return error;
        });


export const createDirectory = (payload) =>
    fetch(`${apis}/files/createDir`, {
        method: 'POST',
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const checkSession = () =>
    fetch(`${apis}/users/api/checkSession`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: {}
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const update = (payload) =>
    fetch(`${apis}/users/api/doUpdate`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});