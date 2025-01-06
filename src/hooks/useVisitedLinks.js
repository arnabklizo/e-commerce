import { useState } from 'react';

const useVisitedLinks = () => {
    const [visitedLinks, setVisitedLinks] = useState({});

    const markAsVisited = (link) => {
        setVisitedLinks((prevVisitedLinks) => ({
            ...prevVisitedLinks,
            [link]: true,
        }));
    };

    const isVisited = (link) => !!visitedLinks[link];

    return { markAsVisited, isVisited };
};

export default useVisitedLinks;
