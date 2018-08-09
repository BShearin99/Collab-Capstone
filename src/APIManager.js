
const Database = Object.create({}, {

    //gett
    getUserByUserName: {
        value: (name) => {
            return fetch(`http://localhost:5002/users?name=${name}`)
                .then(e => e.json())
        }
    },


deleteSong:{
    value: (id) => {
        return fetch (`http://localhost:5002/songs/${id}`,{
        method: "DELETE",
    })
    .then((Response) => {
        return fetch (`http://localhost:5002/songs/${id}`).then((Response) => {
            return Response.json()
    })
    })
}},



    getSongData:{
        value: (id) => {
            console.log("id", id)
            return fetch (`http://localhost:5002/songs/${id}`)
            .then(e => e.json())
        }
    },

    getUserSongData:{
    value: (userId) => {
        console.log(userId)
        return fetch(`http://localhost:5002/UserSongs?userId=${+userId}&_expand=song`)
        .then(e => e.json())
        
    }
    },

    saveSong:{
        value: (newSong) => {
            // console.log("id", id)
            return fetch("http://localhost:5002/songs/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSong)
        }).then(e => e.json())
        // .then(() => {
        //     return fetch(`http://localhost:5002/songs/${id}`)
        // })
        // .then(a => a.json())
    }
},

joinSongs:{
value: (songStuff) => {
    return fetch ("http://localhost:5002/userSongs/",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(songStuff)
        }).then(e => e.json())
    }
}




})

export default Database


