
const Database = Object.create({}, {

    //gett
    getUserByUserName: {
        value: (name) => {
            return fetch(`http://localhost:5002/users?name=${name}`)
                .then(e => e.json())
        }
    }
})

export default Database


