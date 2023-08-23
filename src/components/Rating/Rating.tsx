import React, { FC, useEffect, useState } from 'react';
import { RatingProps } from './Rating.props';
import styles from './rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';

const Rating: FC<RatingProps> = ({
    isEditable = true,
    rating,
    setRating,
    className,
    ...props
}) => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
        new Array(5).fill(<></>),
    );

    const changeDisplay = (index: number) => {
        if (!isEditable) {
            return;
        }
        constructRating(index);
    };
    const setNewRating = (index: number) => {
        if (!isEditable || !setRating) {
            return;
        }
        setRating(index);
    };

    const constructRating = (currentRating: number) => {
        const updateArray = ratingArray.map((item: JSX.Element, i: number) => {
            return (
                <StarIcon
                    className={cn(styles.star, {
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable,
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => setNewRating(i + 1)}
                />
            );
        });
        setRatingArray(updateArray);
    };
    useEffect(() => {
        constructRating(rating);
    }, [rating]);
    return (
        <>
            <div {...props}>
                {ratingArray.map((star, i) => {
                    return <span key={i}>{star}</span>;
                })}
            </div>
        </>
    );
};

export default Rating;
