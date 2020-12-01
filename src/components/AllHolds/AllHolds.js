import React from 'react'

const AllHolds = (props) =>  {
    const {first_name, last_name, title, cover, year, author} = props.hold

    return (
        <div>
            <img src = {cover} alt = "book cover"/>
            <h1>{title}</h1>
            <h2>{author}</h2>
            <h3>{year}</h3>
            <h2>{first_name} {last_name}</h2>
        </div>
    )
}

export default AllHolds