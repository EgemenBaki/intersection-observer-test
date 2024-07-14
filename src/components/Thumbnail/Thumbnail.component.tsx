import React from 'react';
import { Props } from './Thumbnail.config';

import classes from './Thumbnail.module.scss';

const Thumbnail: React.FC<Props> = ({name}) => {
    return (
        <div className={classes.wrapper} key={name}>
            <img
                className={classes.image}
                src={`https://img.pokemondb.net/artwork/${name}.jpg`}
            />
            <h3 className={classes.name}>{name}</h3>
        </div>
    )
}

export default Thumbnail;