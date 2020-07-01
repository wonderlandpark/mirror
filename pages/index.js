import Head from 'next/head'
import { Table, Icon } from 'semantic-ui-react'

function Home({ dir }) {
  return (
    <div className="ui top container">
    <Head>
      <title>WonderMirror</title>
      <meta property="og:description" content="Wonder is GOD."/>
      <meta property="og:title" content="WonderMirror"/>
    </Head>
      <h1 className="ui header">Wonder Mirror</h1>

    <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>/</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

      <Table.Body>
        {
          dir.map(r=> 
            <>
            <Table.Row>
            <Table.Cell collapsing>
              {
                r.isDir ? ( 
                  <>
                  <Icon name='folder outline' />
                  <a href={r.name}>{r.name}</a>
                  </>
                ) : (
                  <>
                  <Icon name='file outline' />
                  {r.name}
                  </>
                )
              }
            </Table.Cell>
            
          </Table.Row>
            </>
          )
        }
      </Table.Body>
    </Table>
    </div>
  )
}

Home.getInitialProps = () => {
  const fs = require('fs')
  const path = require('path')

  const dir = fs.readdirSync('./files')

  return { dir: dir.map(el=> { return { isDir: fs.lstatSync(path.join('./files', el)).isDirectory(), name: el } } )}
}
export default Home