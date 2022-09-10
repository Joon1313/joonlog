import { PrismaClient } from "@prisma/client";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import Comment from "../../../components/common/comment";
import styles from "../../../styles/Post.module.scss";
import Tag from "../../../components/common/tag";
import Date from "../../../components/common/date";
import Head from "next/head";
import { useEffect, useState } from "react";

marked.setOptions({
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
});

// const Viewer = dynamic(() => import("../../../components/common/viewer"), {
//   ssr: false,
// });

export default function Post({ post }) {
  const router = useRouter();
  const [idList, setIdList] = useState([]);
  useEffect(() => {
    const el = [...document.getElementById("viewer").children].filter((child) => child.id).map((child) => child.id);
    setIdList(el);
  }, []);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.preview} />
        <meta name="keywords" content={post.tag} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.preview} />
        <link rel="canonical" href={`https://camlog.vercel.app/posts/${post.slug}`} />
      </Head>
      <article className={styles.articleWrap}>
        <Typography variant="h4" component="h1" align="center" className={styles.postTitle}>
          {post.title}
        </Typography>
        <div className={styles.description}>
          <Date createdAt={post.createdAt} />
          <Tag tags={post.tag} />
        </div>
        <div
          id="viewer"
          className="마크다운뷰어"
          dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
        ></div>
        {/* <Viewer content={post.content} /> */}
        <Comment repo="Joon1313/camlog-comments" />
        <div className={styles.sideBar}>
          {idList.map((id) => {
            return (
              <a href={`${location.pathname}#${id}`} key={id}>
                {id}
              </a>
            );
          })}
        </div>
      </article>
    </>
  );
}

export const getStaticPaths = async () => {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const slug = params.slug;
  const prisma = new PrismaClient();
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });
  const newPost = {
    ...post,
    createdAt: JSON.stringify(post.createdAt),
    updateAt: JSON.stringify(post.updateAt),
  };
  return { props: { post: newPost } };
};
