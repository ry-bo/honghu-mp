import Taro, { Component, useReachBottom } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtMessage, AtNoticebar } from "taro-ui";
import { connect } from "@tarojs/redux";
import { disfavorBookById, getHotBooks, getNewBooks, getRecommendBooks } from "../../store/home/action";
import BookCard from "../../components/book-card";

import "./index.scss";

@connect(
  ({ home }) => ({
    newBooks: home.newBooks,
    newNext: home.newNext,
    hotBooks: home.hotBooks,
    hotNext: home.hotNext,
    recommendBooks: home.recommendBooks,
    recommendNext: home.recommendNext
  }),
  {
    dispatchDisfavorBook: disfavorBookById,
    dispatchGetNewBooks: getNewBooks,
    dispatchGetHotBooks: getHotBooks,
    dispatchGetRecommendBooks: getRecommendBooks
  }
)
export default class BookList extends Component {
  config = {
    navigationBarTitleText: ""
  };

  constructor() {
    super(...arguments);
    this.state = { isShowNoticebar: true };
    this.onLongPress = this.onLongPress.bind(this);
  }

  componentDidMount() {
    const { type } = this.$router.params;
    switch (type) {
      case "new":
        return Taro.setNavigationBarTitle({ title: "新图速递" });
      case "hot":
        return Taro.setNavigationBarTitle({ title: "近期热门" });
      case "recommend":
        return Taro.setNavigationBarTitle({ title: "为你推荐" });
    }
  }

  onLongPress(id) {
    Taro.showActionSheet({
      itemList: ["不感兴趣"]
    })
      .then(() => {
        this.props.dispatchDisfavorBook(id, this.$router.params.type);
        Taro.atMessage({ message: "我们会减少此图书的出现频率" });
      })
      .catch(e => {
        console.log("取消点击", e);
      });
  }

  onCloseNoticebar() {
    this.setState({ isShowNoticebar: false });
  }

  render() {
    let data;
    const { type } = this.$router.params;
    switch (type) {
      case "new":
        data = this.props.newBooks;
        break;
      case "hot":
        data = this.props.hotBooks;
        break;
      case "recommend":
        data = this.props.recommendBooks;
        break;
    }
    useReachBottom(() => {
      if (this.$router.params.type === 'new'){
        this.props.dispatchGetNewBooks(this.props.newNext);
      }
      if (this.$router.params.type === 'hot'){
        this.props.dispatchGetHotBooks(this.props.hotNext);
      }
      if (this.$router.params.type === 'recommend'){
        this.props.dispatchGetRecommendBooks(this.props.recommendNext);
      }
    })
    return (
      <View>
        {/* <AtMessage />
        {this.state.isShowNoticebar && (
          <AtNoticebar close onClose={this.onCloseNoticebar}>
            长按标记不感兴趣的图书
          </AtNoticebar>
        )} */}
        {data.map(item => (
          <BookCard data={item} key={item.id} onLongPress={this.onLongPress} />
        ))}
      </View>
    );
  }
}
