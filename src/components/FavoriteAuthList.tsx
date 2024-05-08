import React from 'react';

interface FavoriteAuthorsListProps {
    authors: string[];
    onAuthorClick: (author: string) => void;
}

export const FavoriteAuthorsList: React.FC<FavoriteAuthorsListProps> = ({ authors, onAuthorClick }) => {
    return (
        <ul>
            {authors.map((author) => (
                <li key={author} onClick={() => onAuthorClick(author)}>
                    {author}
                </li>
            ))}
        </ul>
    );
};