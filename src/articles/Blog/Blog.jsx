import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { motion } from "framer-motion";

import * as styles from "./Blog.module.scss";
import Bracket from "../../components/Bracket/Bracket";

const c = classNames.bind(styles);

const Blog = () => {
    const { VITE_API_KEY } = import.meta.env;
    const [posts, setPosts] = useState([]);

    async function fetchPost() {
        const response = await fetch(VITE_API_KEY);
        const data = await response.json();

        setPosts(data.tistory.item.posts);
    }

    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <article id="blog" className={c("blog")}>
            <div className={c("container")}>
                <Bracket>BLOG</Bracket>
                <ul className={c("post__list")}>
                    {posts.slice(0, 6).map((post, i) => (
                        <motion.li
                            key={i}
                            className={c("post__item")}
                            initial={{
                                opacity: 0,
                                y: 30,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                        >
                            <a className={c("post__link")} href={post.postUrl}>
                                <h4 className={c("post__title")}>
                                    {post.title}
                                </h4>
                                <p className={c("post__date")}>{post.date}</p>
                            </a>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </article>
    );
};

export default Blog;
