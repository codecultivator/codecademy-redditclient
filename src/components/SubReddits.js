import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadSubReddits } from "../features/subReddits/subRedditsSlice";

export default function SubReddits() {
  const dispatch = useDispatch();
  const [subRedditsRequestStatus, setSubRedditsRequestStatus] = useState("");

  useEffect(() => {
    if (subRedditsRequestStatus === "") {
      setSubRedditsRequestStatus("pending");
      try {
        dispatch(loadSubReddits());
      } catch (err) {
        console.log(err);
      } finally {
        setSubRedditsRequestStatus("complete");
      }
    }
  }, [subRedditsRequestStatus, dispatch]);

  const subReddits = useSelector((state) => state.subReddits);

  let content;

  if (subReddits.status === "loading") {
    content = <span>Loading...</span>;
  } else if (subReddits.status === "succeeded") {
    const subRedditItems = subReddits.subReddits.map((subReddit) => (
      <li key={subReddit.data.id}>
        <NavLink
          to={`/${subReddit.data.display_name}`}
          key={subReddit.data.id}
          className="nav-link"
          activeClassName="nav-link-active"
        >
          {subReddit.data.title}
        </NavLink>
      </li>
    ));
    content = (
      <section className="sub-reddits">
        <h4>SubReddits</h4>
        <ul>{subRedditItems}</ul>
      </section>
    );
  } else if (subReddits.status === "failed") {
    content = <div>{subReddits.error}</div>;
  }

  return <section className="subreddits">{content}</section>;
}
