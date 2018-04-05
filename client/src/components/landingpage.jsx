import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Button } from 'antd';
import * as actions from '../actions/index.js';
import logo from '../../../beatbooklogo.png';


class LandingPageBeta extends React.Component {
  constructor(props) {
    super(props);
  }

  loadLoginPage() {
    this.props.actions.loadLoginPage();
  }


  scrollDown(id) {
    $('html,body').animate({ scrollTop: $(`#${id}`).offset().top }, 'slow');
  }

  render() {
    return (
      <div>
        <div style={styles.logocontainer}>
          <img src={logo} style={styles.logo} alt="" />
          <div style={styles.beatbook}>beatbook</div>
        </div>
        <div style={styles.info}>Booking A Venue/Talent has never been easier</div>
        <div style={styles.buttoncontainer}>
          <Button style={styles.learnbutton} onClick={() => this.scrollDown('below')}>Learn more</Button>
          <Button style={styles.loginbutton} onClick={() => this.loadLoginPage()}>Signup / Login</Button>
        </div>
        <div style={styles.bottombulletscontainer}>
          <div style={styles.bottombulletleft}>faq</div>
          <div style={styles.bottombulletleft}>•</div>
          <div style={styles.bottombullet}>contact</div>
          <div style={styles.bottombulletright}>•</div>
          <div style={styles.bottombulletright}>help</div>
        </div>
        <div id="below" style={styles.below}>
          <article style={styles.article}>
            <div style={styles.articlecontent}>
              <h1 style={styles.h3}>Easy Registration for Venue/Artist</h1>
              <div style={styles.text}>
                Manage holds for all your rooms and shows on one calendar.
                Automatically select best available hold levels and easily input large multi date hold requests.
                One click hold status reporting.
                Automatically populate agent/promoter contact info for each hold.
              </div>
            </div>
            <div style={styles.articlegif}>
              <iframe
                title="gif"
                src="https://giphy.com/embed/AFIFa25PDLoRfQMUA9"
                width="480"
                height="294"
                frameBorder="0"
                className="giphy-embed"
                style={styles.gifright}
              />
            </div>
          </article>
          <article style={styles.article}>
            <div style={styles.articlegif}>
              <iframe
                title="gif"
                src="https://giphy.com/embed/AFIFa25PDLoRfQMUA9"
                width="480"
                height="294"
                frameBorder="0"
                className="giphy-embed"
                style={styles.gifleft}
              />
            </div>
            <div style={styles.articlecontent}>
              <h1 style={styles.h3}>Live Calendar viewing/updating</h1>
              <div style={styles.text}>
                Manage holds for all your rooms and shows on one calendar.
                Automatically select best available hold levels and easily input large multi date hold requests.
                One click hold status reporting.
                Automatically populate agent/promoter contact info for each hold.
              </div>
            </div>
          </article>
          <article style={styles.article}>
            <div style={styles.articlecontent}>
              <h1 style={styles.h3}>Artist EPK</h1>
              <div style={styles.text}>
                Manage holds for all your rooms and shows on one calendar.
                Automatically select best available hold levels and easily input large multi date hold requests.
                One click hold status reporting.
                Automatically populate agent/promoter contact info for each hold.
              </div>
            </div>
            <div style={styles.articlegif}>
              <iframe
                title="gif"
                src="https://giphy.com/embed/AFIFa25PDLoRfQMUA9"
                width="480"
                height="294"
                frameBorder="0"
                className="giphy-embed"
                style={styles.gifright}
              />
            </div>
          </article>


        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  { store: state }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageBeta);


const styles = {
  logo: {
    height: 150,
    width: 150,
    display: 'inline-block',
    filter: 'invert(1)',
  },
  beatbook: {
    fontSize: 150,
    fontFamily: "'Baumans', cursive",
    color: 'white',
    display: 'inline-block',
  },
  info: {
    color: 'white',
    fontSize: 20,
    marginTop: -40,
    opacity: 0.7,
    marginLeft: '40%',
  },
  logocontainer: {
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '10%',
  },
  buttoncontainer: {
    textAlign: 'center',
    marginTop: '15%',
  },
  learnbutton: {
    display: 'inline-block',
    backgroundColor: 'white',
    color: 'Translucent',
    width: '120px',
    height: '40px',
  },
  loginbutton: {
    display: 'inline-block',
    backgroundColor: 'Transparent',
    color: 'white',
    width: '120px',
    height: '40px',
    marginLeft: '10px',
  },
  bottombulletscontainer: {
    marginTop: 150,
    textAlign: 'center',
  },
  bottombullet: {
    color: 'white',
    display: 'inline-block',
  },
  bottombulletleft: {
    color: 'white',
    display: 'inline-block',
    marginRight: 10,
  },
  bottombulletright: {
    color: 'white',
    display: 'inline-block',
    marginLeft: 10,
  },
  below: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    backgroundColor: 'white',
    overflow: 'scroll',
  },
  gifonecontainer: {
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: 'white',
    width: '100%',
    height: 400,
  },
  gifonetext: {
    borderStyle: 'solid',
    borderColor: 'white',
    width: '50%',
    height: 400,
    marginLeft: 100,
    display: 'inline-block',
  },
  gifright: {
    float: 'right',
    marginRight: 100,
    display: 'inline-block',
    boxShadow: '10px 10px 10px 0px #888888',
  },
  gifleft: {
    float: 'right',
    marginRight: 100,
    display: 'inline-block',
    boxShadow: '10px 10px 10px 0px #888888',
  },
  article: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 100,
  },
  h3: {
    textAlign: 'center',
    fontSize: 25,
  },
  articlecontent: {
    flex: '0 0 calc(50% - 50px)',
  },
  articlegif: {
    flex: '0 0 50%',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
};
