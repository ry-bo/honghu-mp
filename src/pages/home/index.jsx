import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";
import {
  getNewBooks,
  getHotBooks,
  getRecommendBooks
} from "../../store/home/action";
import Panel from "../../components/panel";
import HorizonList from "../../components/horizon-list";
import FakeSearchBar from "../../components/fake-search-bar";
import URL from "../../constants/urls";

import "./index.scss";

@connect(
  ({ home }) => ({
    newBooks: home.newBooks,
    hotBooks: home.hotBooks,
    recommendBooks: home.recommendBooks
  }),
  {
    dispatchGetNewBooks: getNewBooks,
    dispatchGetHotBooks: getHotBooks,
    dispatchGetRecommendBooks: getRecommendBooks
  }
)
export default class Home extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  static propTypes = {
    newBooks: PropTypes.arrayOf(PropTypes.object),
    hotBooks: PropTypes.arrayOf(PropTypes.object),
    recommendBooks: PropTypes.arrayOf(PropTypes.object)
  };

  constructor() {
    super(...arguments);
    this.onClickSearchBar = this.onClickSearchBar.bind(this);
  }

  componentDidMount() {
    this.props.dispatchGetNewBooks('new');
    this.props.dispatchGetHotBooks('hot');
    this.props.dispatchGetRecommendBooks('recommend');
  }

  onClickSearchBar() {
    Taro.navigateTo({ url: URL.SEARCH });
  }

  render() {
    return (
      <View>
        {/* <FakeSearchBar onClick={this.onClickSearchBar} /> */}
        <Panel
          url={`${URL.BOOK_LIST}?type=new`}
          title='新图速递'
          className='panel--first'
        >
          <HorizonList data={this.props.newBooks} />
        </Panel>
        <Panel
          url={`${URL.BOOK_LIST}?type=hot`}
          title='近期热门'
          className='margin-top-lg'
        >
          <HorizonList data={this.props.hotBooks} />
        </Panel>
        <Panel
          url={`${URL.BOOK_LIST}?type=recommend`}
          title='为你推荐'
          className='margin-top-lg'
        >
          <HorizonList data={this.props.recommendBooks} />
        </Panel>
      </View>
    );
  }
}
