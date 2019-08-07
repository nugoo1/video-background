/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import YouTube from "react-youtube"

import Header from "./header"
import "./layout.css"

const videoOptions = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    controls: 0,
    rel: 0,
    showinfo: 0,
  },
}

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const _onReady = event => {
    // access to player in all event handlers via event.target
    // event.target.mute();
    event.target.playVideo()

    setTimeout(() => {
      setPlayer(true)
      event.target.stopVideo()
    }, 13000)
  }

  const _onEnd = event => {
    event.target.playVideo()
  }

  const [hidePlayer, setPlayer] = useState(false)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
          display: hidePlayer ? "none" : "block",
          zIndex: hidePlayer ? -99 : 1024,
        }}
      >
        <div className="video-background">
          <div className="video-foreground">
            <YouTube
              videoId="_mrdWNcoLYo"
              opts={videoOptions}
              className="video-iframe"
              onReady={_onReady}
              onEnd={_onEnd}
            />
          </div>
        </div>
      </div>
      <main style={{maxWidth: "80vw", margin: "0 auto", display: "flex", justifyContent:"center", alignItems:"center", height: "80vh"}}>{children}</main>
      <footer style={{position: "fixed", bottom: "0", margin:"20px"}}>© {new Date().getFullYear()}, Built by Nugoo</footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
