import { useParams } from "react-router-dom";
import { article } from "../../base";

const DetailArticlePage = () => {
  const { articleId } = useParams();
  const fromArticleID = article.find((el) => el.url === articleId);

  return (
    <div className="article-detail d-flex flex-column justify-content-center ">
      <div className="article-img-container">
        <img src={fromArticleID?.thumbnail} alt="" />
      </div>
      <div className="article-detail-content p-5">
        <h2>{fromArticleID?.header}</h2>
        <div className="text-start">{fromArticleID?.content}</div>
      </div>
    </div>
  );
};

export default DetailArticlePage;
