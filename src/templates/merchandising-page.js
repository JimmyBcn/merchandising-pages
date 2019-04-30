import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import triggerAnalytics from "../analytics"

function RichTextEmbeddedImage(props) {
	var url = "http:" + props.sourceUrl;
  return <img src={url}/>
}

export default class MerchandisingPageTemplate extends React.Component {
  componentDidMount() {
    triggerAnalytics("MerchandisingPage")
  }
  
  // TODO: We need a better approach to parse embeeded content, this is taken from https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer
  render() {
    const page = this.props.data.contentfulMerchandisingPage
    const document = page.placeholder.json
    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: node => {
					const imageUrl = node.data.target.fields.file["en-US"].url
          return <RichTextEmbeddedImage sourceUrl={imageUrl} />
        },
      },
    }
    const output = documentToReactComponents(document, options)

    return (
      <Layout>
        <h1>{page.title}</h1>
        {output}
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    contentfulMerchandisingPage(id: { eq: $id }) {
      title
      placeholder {
        json
      }
    }
  }
`
