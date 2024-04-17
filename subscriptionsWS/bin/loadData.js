const fs = require('fs');

const jsonphRepo = require('../repositories/jsonphRepo')
const memberRepo = require('../repositories/memberRepo')

const tvmazeRepo = require('../repositories/tvmazeRepo')
const movieRepo = require('../repositories/movieRepo')

const loadMembersData = async () => {
    try{
        const allMembers = await jsonphRepo.getAll()
        const allMembersData = allMembers.map((user) => {
            return {
                name: user.name,
                email: user.email,
                city: user.address.city
            }
        })

        await memberRepo.removeAll()
        await memberRepo.createMany(allMembersData)
    }catch(error){
        console.error(error)
        return false
    }
    return true
}

const loadMoviesData = async () => {
    try {

        const allMovies = await tvmazeRepo.getAll()
        const allMoviesData = allMovies.map((movie) => {
            return {
                name: movie.name,
                genres: movie.genres,
                premiered: movie.premiered,
                image: movie.image.medium
            }
        })
        
        await movieRepo.removeAll()
        await movieRepo.createMany(allMoviesData)
    }
    catch(error){
        console.error(error)
        return false
    }
    return true
}

const createFlag = (flagName) => {
    const path = `./${flagName}-loaded.flag.txt`
    
    fs.open(path, 'w', (err, file) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Flag for [${flagName}] created successfully!`);
        }
    });
}

const flagExists = (flagName) => {
    const path = `./${flagName}-loaded.flag.txt`

    try {
        if (fs.existsSync(path)) {
            console.log(`Flag for [${flagName}] exists (${path})`);
            return true
        } else {
            console.log(`Flag for [${flagName}] does not exists (${path})`);
        }
    } catch (err) {
        console.error(err);
    }
    return false
}

const loadExternalData = async () => {
    if(!flagExists('members')){
        console.log('loading [members] data from remote location into the db')
        if(await loadMembersData()){
            createFlag('members')
        }
    }
    if(!flagExists('movies')){
        console.log('loading [movies] data from remote location into the db')
        if(await loadMoviesData()){
            createFlag('movies')
        }
    }
}

module.exports = loadExternalData