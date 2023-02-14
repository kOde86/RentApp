import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  orderBy,
  where,
} from "firebase/firestore";
import { isEmpty } from "lodash";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CommentBox from "../../components/CommentBox/CommentBox";
import Like from "../../components/Likes/Like";
import FeatureBlogs from "../../components/Features/FeatureBlogs";
import RelatedBlog from "../../components/RelaredBlog/RelatedBlog";
import Tags from "../../components/Tags/Tags";
import UserComments from "../../components/UserComment/UserComments";
import { db } from "../../firebase";
import Spinner from "../../components/Spinner/Spinner";
import './Detail.scss'

const Detail = ({ setActive, user }) => {
  const userId = user?.uid;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  let [likes, setLikes] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const getRecentBlogs = async () => {
      const blogRef = collection(db, "blogs");
      const recentBlogs = query(
        blogRef,
        orderBy("timestamp", "desc"),
        limit(5)
      );
      const docSnapshot = await getDocs(recentBlogs);
      setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    getRecentBlogs();
  }, []);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  const getBlogDetail = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    const blogs = await getDocs(blogRef);
    let tags = [];
    blogs.docs.map((doc) => tags.push(...doc.get("tags")));
    let uniqueTags = [...new Set(tags)];
    setTags(uniqueTags);
    setBlog(blogDetail.data());
    const relatedBlogsQuery = query(
      blogRef,
      where("tags", "array-contains-any", blogDetail.data().tags, limit(3))
    );
    setComments(blogDetail.data().comments ? blogDetail.data().comments : []);
    setLikes(blogDetail.data().likes ? blogDetail.data().likes : []);
    const relatedBlogSnapshot = await getDocs(relatedBlogsQuery);
    const relatedBlogs = [];
    relatedBlogSnapshot.forEach((doc) => {
      relatedBlogs.push({ id: doc.id, ...doc.data() });
    });
    setRelatedBlogs(relatedBlogs);
    setActive(null);
    setLoading(false);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    comments.push({
      createdAt: Timestamp.fromDate(new Date()),
      userId,
      name: user?.displayName,
      body: userComment,
    });
    toast.success("Comment posted successfully");
    await updateDoc(doc(db, "blogs", id), {
      ...blog,
      comments,
      timestamp: serverTimestamp(),
    });
    setComments(comments);
    setUserComment("");
  };

  const handleLike = async () => {
    if (userId) {
      if (blog?.likes) {
        const index = likes.findIndex((id) => id === userId);
        if (index === -1) {
          likes.push(userId);
          setLikes([...new Set(likes)]);
        } else {
          likes = likes.filter((id) => id !== userId);
          setLikes(likes);
        }
      }
      await updateDoc(doc(db, "blogs", id), {
        ...blog,
        likes,
        timestamp: serverTimestamp(),
      });
    }
  };

  // console.log("relatedBlogs", relatedBlogs);
  return (
    <div className="single">
      <div
        className="blog-title-box"
        style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
      >
        
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0 gap">
            <div className="col-md-8">
              <span className="meta-info text-start hd-text">
                    <h4>{`By ${blog?.author}`}</h4>
                <p>{blog?.timestamp.toDate().toDateString()}</p>
          
              </span>
              <h2 className="header text-start">{blog?.title}</h2>
              <p className="text-start">{blog?.description}</p>

              <div className="text-start for-like">
                <p  className="price">{`${blog?.price} per month`}</p>
                <p className="pd-head">{`Poster contact: ${blog?.contact}`}</p>
                 <Like handleLike={handleLike} likes={likes} userId={userId} />
              </div>
              <br />
            
              <div className="custombox">
                <div className="scroll">
                  <h4 className="small-title">{comments?.length} Comment</h4>
                  {isEmpty(comments) ? (
                    <UserComments
                      msg={
                        "No Comment yet posted on this ad. Be the first to comment"
                      }
                    />
                  ) : (
                    <>
                      {comments?.map((comment) => (
                        <UserComments {...comment} />
                      ))}
                    </>
                  )}
                </div>
              </div>
              <CommentBox
                userId={userId}
                userComment={userComment}
                setUserComment={setUserComment}
                handleComment={handleComment}
              />
            </div>
            <div className="col-md-3 detail-left">
              <div className="blog-heading text-start py-2 mb-4">Tags</div>
              <Tags tags={tags} />
              <FeatureBlogs title={"Recent Posts"} blogs={blogs} />
            </div>
          </div>
          <RelatedBlog id={id} blogs={relatedBlogs} />
        </div>
      </div>
    </div>
  );
};

export default Detail;