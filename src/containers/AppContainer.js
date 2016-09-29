import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, changeCategory } from '../actions/categories';
import { fetchArticles } from '../actions/articles';
import { View, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from '../components/Header';
import Subheader from '../components/Subheader';
import Navigation from '../components/Navigation';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class AppContainer extends Component {
  static propTypes = {
    articles: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      appLoaded: false,
      menuOpened: false,
    };
    props.dispatch(fetchCategories(63));
  }

  componentWillReceiveProps(nextProps) {
    const { articles, dispatch } = nextProps;
    const categories = nextProps.categories.items;
    const numOfCategories = categories.length;

    // If categories have been fetched
    if (numOfCategories && numOfCategories !== this.props.categories.items.length) {
      for (let i = 0; i < numOfCategories; i++) {
        dispatch(fetchArticles(10, categories[i].locationId));
      }
    }

    if (numOfCategories && numOfCategories === Object.keys(articles.fetchedArticles).length) {
      this.setState({ appLoaded: true });
    }
  }

  _onPressMenu() {
    this.setState({ menuOpened: !this.state.menuOpened });
  }

  _onChangeCategory(category) {
    this.props.dispatch(changeCategory(category));
    this._onPressMenu();
  }

  render() {
    const { articles, categories } = this.props;
    const activeCategory = categories.currentlyActive;
    const subHeading = activeCategory
      ? categories.items.find(item => item.locationId === activeCategory).name
      : 'Recent';

    return (
      <View style={styles.container}>
        <Header
          isMenuOpened={this.state.menuOpened}
          onPressMenu={this._onPressMenu.bind(this)} />
        <Subheader
          title={subHeading} />
        <Spinner
          visible={!this.state.appLoaded}
          overlayColor="#ef4134" />
        <Navigation
          ref="navigation"
          isOpen={this.state.menuOpened}
          categories={categories.items}
          onChangeCategory={this._onChangeCategory.bind(this)} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return state;
}


export default connect(mapStateToProps)(AppContainer);
