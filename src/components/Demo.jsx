import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setAllArticles(updatedAllArticles);
      setArticle(newArticle);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      console.log(newArticle);
    }
  };
  return (
    <section className="mt-16 w-full max-w-xl">
      {}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          ></img>
          <input
            type="url"
            placeholder="Enter URL to get its summary"
            value={article.url}
            onChange={(e) => {
              setArticle({
                ...article,
                url: e.target.value,
              });
            }}
            required
            className="url_input peer"
          ></input>
          <button type="submit" className="submit_btn">
            Submit
          </button>
        </form>
        {/*URL history */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn">
                <img
                  src={copy}
                  alt="copy"
                  className="w-[40%] h-[40%] object-contain"
                ></img>
              </div>
              <p className="flex-1">{item.url}</p>
            </div>
          ))}
        </div>
      </div>
      {/*Display results*/}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader}></img>
        ) : error ? (
          <p className="font-inter text-black text-center">
            Error
            <br />
            <span className="font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi text-gray-700">
                Article <span className="blue_gradient"> Summary</span>
              </h2>
              <div className="summary_box">
                <p>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
