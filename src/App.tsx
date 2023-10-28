import React from "react";
import "./App.css";
import { DOMMessage, DOMMessageResponse } from "./types";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import axios from "axios";
import LikeDislike from "./components/like-dislike";

function App() {
  const [title, setTitle] = React.useState("");
  const [headlines, setHeadlines] = React.useState<string[]>([]);
  const [image, setImage] = React.useState("");
  const [factsFetched, setFactsFetched] = React.useState(false);
  let [pageData, setPageData] = React.useState<{ [key: string]: any }>({});

  React.useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          chrome.tabs.sendMessage(
            tabs[0].id || 0,
            { type: "GET_DOM" } as DOMMessage,
            (response: DOMMessageResponse) => {
              console.log(response);
              setTitle(response.title);
              setHeadlines(response.headlines);
              setImage(response.image);
              axios
                .post("http://localhost:4000/api/articles/check", {
                  title: response.title,
                  headlines: response.headlines[0],
                  source: tabs[0].url,
                })
                .then((res) => {
                  console.log(res);
                  setPageData(res.data);
                  setFactsFetched(true);
                });
            }
          );
        }
      );
  }, []);

  return (
    <div className="App">
      <div className=" h-full divide-y divide-slate-200 w-[500px] space-y-5  flex justify-start items-start flex-col bg-white shadow-md p-5">
        <div className="text-start py-0">
          <h1 className="text-xl  font-medium">
            {title || "This is the headinh"}
          </h1>

          <ul>
            {headlines.map((headline, index) => (
              <li key={index}>{headline || "This is extra "}</li>
            ))}
          </ul>
        </div>

        {factsFetched ? (
          <div className="flex divide-y divide-slate-200  text-start space-y-3 flex-col justify-start items-start w-full">
            <div className="w-full pt-3">
              {pageData?.facts?.length > 0 ? (
                <div className="flex flex-col  w-full space-y-2">
                  <LikeDislike
                    factsFetched={factsFetched}
                    dummyFacts={pageData?.facts}
                  />
                  <h1 className="text-lg font-medium">Verified Facts</h1>
                  <div className="flex flex-col  w-full space-y-2">
                    {pageData?.facts?.map((fact: any, index: number) => (
                      <a
                        key={index}
                        href={fact.source}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex space-x-5 flex-row border justify-start items-center p-3 border-slate-200 rounded-md shadow  w-full
                        ${
                          fact.verdict && fact.verdict === "true"
                            ? "border-l-4 border-l-teal-600"
                            : "border-l-4 border-l-red-600"
                        }`}
                      >
                        {fact.verdict && fact.verdict === "true" ? (
                          <div className="flex flex-col rounded-full bg-teal-400 p-2 space-y-2 items-start justify-center">
                            <FiThumbsUp className="h-5 w-5 text-teal-50" />
                          </div>
                        ) : (
                          <div className="flex flex-col rounded-full bg-red-400 p-2 space-y-2 items-start justify-center">
                            <FiThumbsDown className="h-5 w-5 text-red-50" />
                          </div>
                        )}
                        <div className="flex flex-col space-y-0 items-start justify-center">
                          <h1 className="text-normal leading-tight font-medium">
                            {fact.title}
                          </h1>
                          <p className="text-xs h-5 w-[300px] truncate text-slate-600 font-medium">
                            {fact.description ?? "Please click to read more"}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col text-center space-y-2 justify-start items-start w-full">
                  <h1 className="text-sm font-medium">Sorry. No facts found</h1>
                  <button className="text-transparent text-start bg-clip-text bg-gradient-to-r from-pink-900 to-orange-700 w-full  rounded-md">
                    Help us Debunk this news
                  </button>
                </div>
              )}
            </div>

            {pageData?.relatedArticles?.length > 0 && (
              <div className="flex pt-2 space-y-3 flex-col justify-start items-start w-full">
                <h1 className="text-lg font-medium">Related Articles</h1>
                <div className="flex flex-col  w-full space-y-2">
                  {pageData?.relatedArticles?.map(
                    (article: any, index: number) => (
                      <a
                        key={index}
                        className={`flex flex-col border-l-2 border-l-red border p-3 border-slate-200 rounded-md shadow justify-start items-start w-full`}
                        href={article.relatedArticleAlias.source}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <h1 className="text-base  font-medium">
                          {article.relatedArticleAlias.title}
                        </h1>
                        <p className="h-10 text-xs truncate w-full font-medium">
                          {article.relatedArticleAlias.description ||
                            "No description. Click to read more"}
                        </p>
                      </a>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex text-center justify-start items-start w-full">
            <h1 className="text-xl font-medium">Searching for facts....</h1>
          </div>
        )}

        <div className="flex flex-col space-y-2 text-center justify-center items-center w-full">
          <a
            href={`http://localhost:5173/fact-submit?title=${title}`}
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-r from-pink-900 to-orange-700 w-full text-white p-2 rounded-md"
          >
            Help us Debunk
          </a>
          <a href="https://www.google.com" className="text-xs font-medium">
            Provide feedback
          </a>
        </div>
      </div>
      <div className="flex text-center justify-end items-end w-full">
        <h2 className="text-xs font-medium">Powered by DeBunk</h2>
      </div>
    </div>
  );
}

export default App;
