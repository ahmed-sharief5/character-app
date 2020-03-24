import fetch from "./apis";

export async function getCharacters(page){
    try{
        const response = await fetch.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
        return response.data;
    }
    catch (err) {
        throw err;
    }
}