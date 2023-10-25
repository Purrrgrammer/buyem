import { useParams } from "react-router-dom";
import { article } from "../../base";

const DetailArticlePage = () => {
  const { articleId } = useParams();
  const fromArticleID = article.find((el) => el.url === articleId);

  return (
    <div className="article-detail d-flex flex-column justify-content-center ">
      <img src={fromArticleID?.thumbnail} alt="" />
      <div className="p-5">
        <h2>{fromArticleID?.header}</h2>
        {fromArticleID?.content}
      </div>
    </div>
  );
};

export default DetailArticlePage;
