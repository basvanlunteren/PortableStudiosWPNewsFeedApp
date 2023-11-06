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
                setLocalNewsFeed(response.data.response.results);
            })
            .catch(() => {
                alert('There was an error while retrieving data from https://content.guardianapis.com/search?section=world&page=1&page-size=20&api-key=c291fc1f-3319-4ee6-a9c0-69a12842370a');
            });
    };

    useEffect(() => {
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
                        {filteredResult && filteredResult.length > 0
                            && (
                                <>
                                    <ul className="list-group">
                                        {filteredResult.map((newsItem, index) => (
                                            <li key={newsItem.id}>
                                                {index}
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
                                        ))}
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
