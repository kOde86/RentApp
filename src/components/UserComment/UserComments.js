import React from "react";
import './UserComments.scss'
import profile from  '../../Assets/profile.png'



const UserComments = ({ name, body, createdAt, msg }) => {
  return (
    <div className="user-comment">
      <div className="row">
        <div className="col-lg-12">
          <div className="comments-list"> 
            <div className="media">
              {msg ? (
                <h4 className="mt-5">{msg}</h4>
              ) : (
                <>
                  <div className="media-left">
                    <img
                      src={profile}
                      alt="user"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="media-body">
                    <h3 className="text-start media-heading user_name">
                      {name} <small>{createdAt.toDate().toDateString()}</small>
                    </h3>
                    <p className="text-start">{body}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComments;
