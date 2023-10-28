import { useState } from "react";
import { article } from "../../base";

const ArticlePage = () => {
  const [articletype, setArticleType] = useState<string>("all");
  const articleTypeHandler = (articleType: string) => {
    return (event: React.MouseEvent) => {
      setArticleType(articleType);
      event.preventDefault();
    };
  };
  const getArticle = () => {
    let content;
    if (articletype === "all") {
      content = article;
    } else {
      content = article.filter((el) => el.type === articletype);
    }
    return content!.map((el) => (
      <a
        key={el.id}
        href={`/article/${el.id}`}
        className="article-content container d-flex  "
      >
        <div>
          <img src={el.thumbnail} alt="" />
        </div>
        <div className="d-flex flex-column justify-content-center align-items-start p-5 text-left">
          <h6>{el.type.toUpperCase()}</h6>
          <h4>{el.header}</h4>
          <div>{el.intro}</div>
          <div className="d-flex">
            <div>{el.date}</div>
            <div className="ms-3">by {el.author}</div>
          </div>
        </div>
      </a>
    ));
  };
  return (
    <div className="page">
      <h1 className="m-4">
        {articletype == "all" ? "ARTICLES" : articletype.toUpperCase()}
      </h1>
      <div className="d-flex justify-content-center">
        <div className="p-5">
          <h3>FILTER</h3>
          <div className="d-flex flex-column filter-option">
            {article.map((el) => (
              <div
                key={el.id}
                className="my-2"
                onClick={articleTypeHandler(el.type)}
              >
                {el.type.toUpperCase()}
              </div>
            ))}
            <div className="my-2" onClick={articleTypeHandler("all")}>
              all
            </div>
          </div>
        </div>
        <div className="d-flex flex-column article">{getArticle()}</div>
      </div>
    </div>
  );
};

export default ArticlePage;
// justify - content - start;
