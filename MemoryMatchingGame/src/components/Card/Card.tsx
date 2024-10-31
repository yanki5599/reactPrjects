import React from 'react';
import './Card.css';

interface CardProps {}

const Card:React.FC<CardProps> = ({}) => {
    return (
        <div className="Card">
            <h1>Card Component</h1>
        </div>
    );
};

export default Card;
