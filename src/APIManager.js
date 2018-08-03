
const Database = Object.create({}, {

    //gett
    getUserByUserName: {
        value: (name) => {
            return fetch(`http://localhost:5002/users?name=${name}`)
                .then(e => e.json())
        }
    },

    getSongData:{
    value: (id) => {
        return fetch(`http://localhost:5002/Songs/${id}`)
        .then(e => e.json())
        // .then((response) => {
        //     console.log(response)
        // return response.sequence.sequence
        // })
    }
    }




})

export default Database


