import * as HOME from "./action-type";
import API from "../../service/api";

// 不感兴趣
export const disfavorBookById = (id, bookType) => {
  return {
    type: HOME.DISFAVOR,
    id,
    bookType
  };
};

// 新书上架
export const getNewBooks = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    const result = await API.get("new");
    dispatch({
      type: HOME.GET_NEW_BOOK,
      next: result.next,
      books: result.results
    });
  };
};

// 热门图书
export const getHotBooks = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    const result = await API.get("hot");
    dispatch({
      type: HOME.GET_HOT_BOOK,
      next: result.next,
      books: result.results
    });
  };
};

// 推荐图书
export const getRecommendBooks = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    const result = await API.get("recommend");
    dispatch({
      type: HOME.GET_RECOMMEND_BOOK,
      next: result.next,
      books: result.results
    });
  };
};
