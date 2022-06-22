import React from 'react';

const List = ({ data }) => {
	return (
		data.map(el => {
			return <div className="content-card" key={el.name}>{el.name.charAt(0).toUpperCase() + el.name.slice(1)}</div>
		})
	)
}

export default List;