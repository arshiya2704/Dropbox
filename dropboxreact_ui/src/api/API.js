const apis = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3002';


export const login = (payload) =>
    fetch(`${apis}/users/api/doLogin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username:payload.userData.email,password:payload.userData.password})
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
        body: JSON.stringify({username:payload.formData.email,password:payload.formData.password,fname:payload.formData.Fname,lname:payload.formData.Lname})
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
        return res.json();
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
            return res.json();
        }).catch(error => {
            console.log("This is error");
            return error;
        });


export const createDirectory = (payload) =>
    fetch(`${apis}/files/createDir`, {
        method: 'POST',
        body: payload
    }).then(res => {
        return res.json();
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

export const logOut = () =>
    fetch(`${apis}/users/api/logout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;});

export const star = (payload) =>
    fetch(`${apis}/files/api/doStar`, {
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

export const del = (payload) =>
    fetch(`${apis}/files/api/delete`, {
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

export const getLogs = (payload) =>
    fetch(`${apis}/users/api/fetchLogs`, {
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

export const getSharedImages = (value) =>
    fetch(`${apis}/files/shared`,{
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