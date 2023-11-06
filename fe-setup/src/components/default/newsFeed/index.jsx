import React, {
    useEffect,
    useState,
} from 'react';

import { createRoot } from 'react-dom/client';

import axios from 'axios';

import './_news-feed.scss';

/* eslint-disable react/jsx-indent-props */

const NewsFeed = () => {
    const [localNewsFeed, setLocalNewsFeed] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResult, setFilteredResult] = useState();
    const [pageSize, setPageSize] = useState(20);
    const [pageNumber, setPageNumber] = useState(1);
    const [favouritesArray, setfavouritesArray] = useState([]);
    const [currentFavourite, setCurrentFavourite] = useState('');
    let tempFavouritesArray = [];

    const makeFavourite = (newsItem, favourite) => {
        tempFavouritesArray = favouritesArray;
        if (favourite) {
            if (tempFavouritesArray.filter((favouriteNewsItem) => favouriteNewsItem.id === newsItem.id).length === 0) {
                tempFavouritesArray.push(newsItem);
                setfavouritesArray(tempFavouritesArray);
            }
        } else {
            const markforDeletion = tempFavouritesArray.findIndex((favouriteNewsItem) => favouriteNewsItem.id === newsItem.id);
            // console.log('markforDeletion', markforDeletion);
            tempFavouritesArray.splice(markforDeletion, 1);
            setfavouritesArray(tempFavouritesArray);
        }
        setCurrentFavourite(newsItem);

        console.log('tempFavouritesArray', tempFavouritesArray);
        localStorage.setItem('storedFavouritesArray', JSON.stringify(tempFavouritesArray));
    };

    useEffect(() => {
        console.log('currentFavourite', currentFavourite);
    }, [currentFavourite]);

    const searchFilterFunction = (value) => {
        setSearchTerm(value);
    };

    const removeLocalNewsFeed = () => {
        localStorage.removeItem('localNewsFeed');
    };

    const pageNumberFunction = (value) => {
        setPageNumber(value);
    };

    // get News From the Guardian
    const retrieveNews = function () {
        axios.get(`https://content.guardianapis.com/search?section=world&page=${pageNumber}&page-size=${pageSize}&api-key=c291fc1f-3319-4ee6-a9c0-69a12842370a`)
            .then((response) => {
                console.log('https://content.guardianapis.com/search?section=world&page=1&page-size=20&api-key=c291fc1f-3319-4ee6-a9c0-69a12842370a:', response.data);
                console.log('response.data.response.results', response.data);
                localStorage.setItem('localNewsFeed', JSON.stringify(response.data.response.results));
                // sectionName
                // .sort((a, b) => a.time - b.time)
                setLocalNewsFeed(response.data.response.results);
            })
            .catch(() => {
                alert('There was an error while retrieving data from https://content.guardianapis.com/search?section=world&page=1&page-size=20&api-key=c291fc1f-3319-4ee6-a9c0-69a12842370a');
            });
    };

    useEffect(() => {
        if (localStorage.getItem('storedFavouritesArray') != null) {
            setfavouritesArray(JSON.parse(localStorage.getItem('storedFavouritesArray') || '[]'));
            console.log('localFavourites', JSON.parse(localStorage.getItem('storedFavouritesArray') || '[]'));
        }

        if (localStorage.getItem('localNewsFeed') != null) {
            setLocalNewsFeed(JSON.parse(localStorage.getItem('localNewsFeed') || '[]'));
        } else {
            setFilteredResult(localNewsFeed);
        }
        setPageSize(20);
        setPageNumber(1);
    }, []);

    useEffect(() => {
        setFilteredResult(localNewsFeed);
    }, [
        localNewsFeed,
    ]);

    // Search/filter functionality
    useEffect(() => {
        // if search is not ''
        if (searchTerm.length > 0) {
            const tempFilteredResult = localNewsFeed.filter((item) => item.webTitle.toString().toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredResult(tempFilteredResult);
        } else {
            setFilteredResult(localNewsFeed);
        }
    }, [
        searchTerm,
    ]);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label
                            htmlFor="filterNewsFeed"
                        >
                            Filter the News Feed
                            <input
                                type="text"
                                id="filterNewsFeed"
                                onChange={(e) => searchFilterFunction(e.target.value)}
                            />
                        </label>
                        <br />
                        <button
                            type="button"
                            onClick={(e) => retrieveNews(e)}
                        >
                            Update News Feed
                        </button>
                        <button
                            type="button"
                            onClick={() => removeLocalNewsFeed()}
                        >
                            remove local News Feed
                        </button>
                        <br />
                        <label
                            htmlFor="newsFeedPageNumber"
                        >
                            page number
                            <input
                                type="text"
                                id="newsFeedPageNumber"
                                onChange={(e) => pageNumberFunction(e.target.value)}
                            />
                        </label>
                        <br />
                        {favouritesArray && favouritesArray.length > 0
                            && (
                                <>
                                    <ul className="favourite-list">
                                        {favouritesArray.map((localFavNewsItem) => {
                                            const uniqueID = localFavNewsItem.id.replace(/\\|\//g, '_');

                                            return (
                                                <li key={uniqueID} style={{ border: '3px solid red' }}>
                                                    <div className="favourite">
                                                        <label htmlFor={uniqueID}>
                                                            <input
                                                                id={uniqueID}
                                                                type="checkbox"
                                                                defaultChecked="true"
                                                                onChange={(e) => makeFavourite(localFavNewsItem, e.target.checked)}
                                                            />
                                                            Favourite
                                                        </label>
                                                    </div>
                                                    <br />
                                                    <h3>{localFavNewsItem.webTitle}</h3>
                                                    <br />
                                                    <a
                                                        href={localFavNewsItem.webUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        read more
                                                        <span className="visually-hidden">
                                                            about&nbsp;
                                                            {localFavNewsItem.webTitle}
                                                        </span>
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </>
                            )}

                        {filteredResult && filteredResult.length > 0
                            && (
                                <>

                                    <ul className="list-group">
                                        {filteredResult.map((newsItem) => {
                                            const uniqueID = newsItem.id;

                                            return (
                                                <li key={uniqueID}>
                                                    <div className="favourite">
                                                        <label htmlFor={uniqueID}>
                                                            <input
                                                                id={uniqueID}
                                                                type="checkbox"
                                                                onChange={(e) => makeFavourite(newsItem, e.target.checked)}
                                                            />
                                                            Favourite
                                                        </label>
                                                    </div>
                                                    <br />
                                                    <h3>{newsItem.webTitle}</h3>
                                                    <br />
                                                    <a
                                                        href={newsItem.webUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        read more
                                                        <span className="visually-hidden">
                                                            about&nbsp;
                                                            {newsItem.webTitle}
                                                        </span>
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
};

const container = document.getElementById('newsFeed');
const root = createRoot(container);

if (container) {
    root.render(<NewsFeed />);
}
