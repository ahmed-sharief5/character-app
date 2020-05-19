import React, { useState, useEffect } from "react";
import Filter from "../../components/Filter";
import Search from "../../components/Search";
import Sort from "../../components/Sort";
import "./home.css";
import { getCharacters } from "../../services/";
import { useSelector, useDispatch } from "react-redux";
import { fetchingCharacters, setAllCharacters } from "../../store/actions/action";
import Skeleton from "react-loading-skeleton";

const Home = () => { 
    const pageNumbersPerClick = 5;  
    const [searchedText, setSearchedText] = useState("");
    const [sortBy, setSortBy] = useState(true)
    const [selectSpeciesGender, setSelectedSpeciesGender] = useState({"species": "", "gender": ""});
    const [activeClass, setActiveClass] = useState("active");
    const [currentPagination, setcurrentPagination] = useState(0);
    const [activePage, setActivePage] = useState(1);
    const [disableClass, setDisableClass] = useState("disabled");

    const { characters, fetchingDone, error, species, gender, totalPages } = useSelector(state => state.charactersReducer);
    const dispatch = useDispatch();

    const dispatchData = (characters, species, gender, totalPages) => {
        dispatch(setAllCharacters({
            characters,
            species,
            gender,
            totalPages
        }))
    }

    async function fetchCharacters(page) {
        dispatch(fetchingCharacters({characters, species, gender, totalPages}))
        let species = [], gender = [];
        let speciesCache = {}, genderCache = {};
    
        const characters = await getCharacters(page);
        let totalPages = characters["info"]["pages"];
        if(characters["results"].length > 0){
            characters["results"].map(async character => {
                if(!speciesCache[character.species]){
                    species.push(character.species);
                    speciesCache[character.species] = 1
                }
                if(!genderCache[character.gender]){
                    gender.push(character.gender);
                    genderCache[character.gender] = 1
                }
            });
        }
        dispatchData(characters["results"],species,gender, totalPages)
    }

    const searchCharacter = (e) => {
        if(e.target.value == "")
            fetchCharacters(activePage)
        setSearchedText(e.target.value)
    }

    const _handleSearchCharacter = () => {
        let searchedCharacters = characters.filter(character => character.name.toLocaleLowerCase().includes(searchedText.toLocaleLowerCase()))
        dispatchData(searchedCharacters, species, gender, totalPages)
    }

    const _handleSortCharacter = () => {
        setSortBy(!sortBy);
        let sortedCharacters = characters.sort((a,b) => sortBy ? b.id - a.id : a.id - b.id );
        dispatchData(sortedCharacters, species, gender, totalPages)
    }

    const _handleFilterSpecies = (e, kind) => {
        e.preventDefault();
        let filteredCharacters = characters.filter(character => character[kind] === e.target.text);
        dispatchData(filteredCharacters, species, gender, totalPages);
        setSelectedSpeciesGender({...selectSpeciesGender, [kind]:e.target.text});
    }

    const _handleClearFilter = () => {
        setSelectedSpeciesGender({"species": "", "gender": ""});
        fetchCharacters(activePage);
    }

    const formatDate = (date) => {
        const formatDt = new Intl.DateTimeFormat('en-US',{year: 'numeric'}).format(new Date(date));
        return new Date().getFullYear() - new Date(formatDt).getFullYear();
    }

    // Handling the data items display
    const handleClickPage = e => {
        setActiveClass("active");
        setActivePage(Number(e.target.id));
        fetchCharacters(Number(e.target.id));
    }

    // Handling the page number display
    const handleClickPrevNext = e => {
        setActivePage(Number(e.target.id) + 1);
        setDisableClass(e.target.id <= 0 ? "disabled" : "");
        setcurrentPagination(Number(e.target.id));
    }
    
    // Logic for displaying pageNumbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const indexOfLastItemPage = currentPagination + pageNumbersPerClick;
    const indexOfFirstItemPage = indexOfLastItemPage - pageNumbersPerClick;
    const currentPageNumber = pageNumbers.slice(indexOfFirstItemPage, indexOfLastItemPage);

    const renderPageNumbers = currentPageNumber.map(number => {
    return (
        <span key={number} id={number} className={activePage === number ? `pagination ${activeClass}` : `pagination`} onClick={handleClickPage}>{number}</span>
        );
    });

    useEffect(() => {  
        fetchCharacters(activePage)
    }, [])

    return ( 
        <div className="containter">
            <div className="home__container__characters--actions container">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 home__container__characters--each">
                        <Sort onClick={_handleSortCharacter} byWhich="Id" sortBy={sortBy ? "Desc" : "Asc"}/>
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 home__container__characters--each">
                        <h5>Filter By</h5>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-11 col-xs-11 home__container__characters--each">
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 home__container__characters--filter">
                            <Filter elements={species} kind={"Species"} value={selectSpeciesGender["species"]} onSelect={e => _handleFilterSpecies(e, "species")}/>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 home__container__characters--filter">
                            <Filter elements={gender} kind="Gender" value={selectSpeciesGender["gender"]} onSelect={e => _handleFilterSpecies(e, "gender")}/>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 home__container__characters--filter">
                            <button type="button" className="btn btn-danger" onClick={_handleClearFilter}>Clear</button>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 home__container__characters--each">
                        <Search onSearch={e => searchCharacter(e)} onSubmit={_handleSearchCharacter} byWhat="Name"/>
                    </div>
                </div>
            </div> 
            <div className="container">
                <ul id="page-numbers">
                    <span id={currentPagination - pageNumbersPerClick} className={`pagination ${disableClass}`} onClick={handleClickPrevNext}>&laquo; Previous</span>
                    {renderPageNumbers}
                    <span id={currentPagination + pageNumbersPerClick} className={`pagination ${currentPagination + pageNumbersPerClick >= totalPages ? "disabled" : ""}`} onClick={handleClickPrevNext}>&raquo; Next</span>
                </ul>
            </div>
            <div className="container">
                <div className="home__container__characters--layout container">
                    <div className="row">
                        {fetchingDone && characters && characters.length > 0 ? 
                            characters.map((character, index) => {
                                return (
                                    <div key={index} className="col-lg-3 col-md-3 col-sm-6 col-xs-6 home__container__characters--each">
                                        <div className="home__container__characters--img--title">
                                            <img className="home__container__characters--img--img" src={character.image} />
                                            <span>
                                                <h5>{character.name}</h5>
                                                <p>Id: {character.id} - <span>created {formatDate(character.created)} years ago</span></p>
                                            </span>
                                        </div>
                                        <div className="home__container__characters__features--section">
                                            <div className="home__container__characters__features--each">
                                                <span className="home__container__characters__features--each-left">status</span>
                                                <span className="home__container__characters__features--each-right">{character.status}</span>
                                            </div>
                                            <div className="home__container__characters__features--each">
                                                <span className="home__container__characters__features--each-left">species</span>
                                                <span className="home__container__characters__features--each-right">{character.species}</span>
                                            </div>
                                            <div className="home__container__characters__features--each">
                                                <span className="home__container__characters__features--each-left">gender</span>
                                                <span className="home__container__characters__features--each-right">{character.gender}</span>
                                            </div>
                                            <div className="home__container__characters__features--each">
                                                <span className="home__container__characters__features--each-left">origin</span>
                                                <span className="home__container__characters__features--each-right">{character.origin.name}</span>
                                            </div>
                                            <div className="home__container__characters__features--each">
                                                <span className="home__container__characters__features--each-left">last location</span>
                                                <span className="home__container__characters__features--each-right">{character.location.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        : 
                        !error ? 
                            fetchingDone && characters.length == 0 ? <h2 className="home__container__characters__status">No Characters Found</h2> : 
                                <CharacterSkeleton/>
                            : <h2>{error}</h2>
                        }
                        
                    </div>
                </div> 
            </div> 
        </div>
    );
};

const CharacterSkeleton = () => {
    return (
            <div className="row">
                {Array(8)
                .fill()
                .map((item, index) => (
                    <div key={index} className="col-lg-3 col-md-3 col-sm-6 col-xs-6 home__container__characters--each">
                        <div className="home__container__characters--img--title">
                            {/* <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" /> */}
                            <div className="home__container__characters--img--img">
                                <Skeleton animation="wave" height={270} width={258}/>
                            </div>
                            <span>
                                <h5><Skeleton animation="wave" height={24} width={235}/></h5>
                                <p><Skeleton animation="wave" height={18} width={235}/></p>
                            </span>
                        </div>
                        <div className="home__container__characters__features--section">
                            <div className="home__container__characters__features--each">
                                <Skeleton animation="wave" height={20} width={225}/>
                            </div>
                            <div className="home__container__characters__features--each">
                                <Skeleton animation="wave" height={20} width={225}/>
                            </div>
                            <div className="home__container__characters__features--each">
                                <Skeleton animation="wave" height={20} width={225}/>
                            </div>
                            <div className="home__container__characters__features--each">
                                <Skeleton animation="wave" height={20} width={225}/>
                            </div>
                            <div className="home__container__characters__features--each">
                                <Skeleton animation="wave" height={20} width={225}/>
                            </div>
                        </div>
                    </div>
                    // <div key={index} className="col-lg-3 col-md-3 col-sm-6 col-xs-6 home__container__characters--each">
                    //     <div className="home__container__characters--img--title">
                    //         <Skeleton height={200} widht={270}/>
                    //         <h5><Skeleton height={10} width={100} /></h5>
                    //         <p><Skeleton height={8} width={50} /></p>
                    //     </div>
                    //     <div className="home__container__characters__features--section">
                    //         <div className="home__container__characters__features--each">
                    //             <Skeleton height={20} width={100} />
                    //         </div>
                    //         <div className="home__container__characters__features--each">
                    //             <Skeleton height={20} width={100} />
                    //         </div>
                    //         <div className="home__container__characters__features--each">
                    //             <Skeleton height={20} width={100} />
                    //         </div>
                    //         <div className="home__container__characters__features--each">
                    //             <Skeleton height={20} width={100} />
                    //         </div>
                    //         <div className="home__container__characters__features--each">
                    //             <Skeleton height={20} width={100} />
                    //         </div>
                    //     </div>
                    // </div>
                ))}
            </div>
        
    );
}

export default Home;