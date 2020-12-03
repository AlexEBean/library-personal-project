import React from 'react'

const AllHolds = (props) =>  {
    const {first_name, last_name, title, cover, author} = props.hold

    return (
        <div className = "one-hold">
            <img src = {cover} alt = "book cover"/>
            <div className = "info">
                <h1>{title}</h1>
                <h2>{author}</h2>
                <h3>User with hold: {first_name} {last_name}</h3>
            </div>
        </div>
    )
}

export default AllHolds