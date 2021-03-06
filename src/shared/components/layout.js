/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Header } from "./header"
import LinksNavigation from '../components/links'
import { SideNavigation } from '../components/side-nav'
import MessengerCustomerChat from 'react-messenger-customer-chat'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main className="page-content page-home main-sidenav wrapper">
        <SideNavigation />
        <div className="sections-wrapper" id="content">
          <LinksNavigation />
          {children}
        </div>
      </main>
      <MessengerCustomerChat
        pageId="103257615458094"
        appId="620650052375933"
      />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
