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
export const getNewBooks = (url) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    const result = await API.get(url);
    dispatch({
      type: HOME.GET_NEW_BOOK,
      next: result.next,
      books: result.results
    });
  };
};

// 热门图书
export const getHotBooks = (url) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    const result = await API.get(url);
    dispatch({
      type: HOME.GET_HOT_BOOK,
      next: result.next,
      books: result.results
    });
  };
};

// 推荐图书
export const getRecommendBooks = (url) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    const result = await API.get(url);
    dispatch({
      type: HOME.GET_RECOMMEND_BOOK,
      next: result.next,
      books: result.results
    });
  };
};
