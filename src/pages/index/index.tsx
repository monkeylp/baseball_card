import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import {
  Block,
  View,
  Text,
  Swiper,
  SwiperItem,
  Image
} from '@tarojs/components'
import { connect } from '@tarojs/redux'


import './index.less'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion
interface IBanner {
  _id: string;
  type: string;
  value: string;
  imgUrl: string;
}

type PageStateProps = {
  banner: IBanner[];
}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ home }) => ({
  banner: home.banner
}))

class Index extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { banner } = this.props;
    return (
      <Block>
        <View className="home">
          <View>
            <Swiper
              indicatorDots={banner.length > 1 ? true : false}
              autoplay={banner.length > 1 ? true : false}
              circular={true}
              indicatorColor="rgba(255,255,255,0.40)"
              indicatorActiveColor="#fff"
            >
              {banner.map((item, index) => {
                return (
                  <Block key={index}>
                    <SwiperItem>
                      <Image src={item.imgUrl} className="slide-image" />
                    </SwiperItem>
                  </Block>
                );
              })}
            </Swiper>
          </View>
          <View className="title_h">
            <Text>Hello, World</Text>
          </View>
        </View>
      </Block>
    );
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
