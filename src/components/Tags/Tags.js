import React from "react";
import { Link } from "react-router-dom";
import './Tags.scss'

const Tags = ({ tags }) => {
  return (
    <div>
      <div className="tags">
        {tags?.map((tag, index) => (
            <Link to={`/tag/${tag}`}>
              <button  className="btn tag" key={index}>{tag}</button > 
            </Link> 
        ))}
      </div>
    </div>
  );
};

export default Tags;
