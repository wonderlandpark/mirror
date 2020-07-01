import Head from 'next/head'
import { Table, Icon } from 'semantic-ui-react'

function Home({ path, dir }) {
  return (
    <div className="ui top container">
      <h1 className="ui header">Wonder Mirror</h1>

    <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>/{path}</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

      <Table.Body>
        <Table.Row>
              <Table.Cell collapsing>
                <Icon name='folder open outline' />
                <a href={"/" + path.split('/').slice(1).join('/')}>..</a>
              </Table.Cell>
              
            </Table.Row>
        {
          dir.map(r=> 
            <>
            <Table.Row>
            <Table.Cell collapsing>
              {
                r.isDir ? ( 
                  <>
                  <Icon name='folder outline' />
                  <a href={ path + '/' + r.name}>{r.name}</a>
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
      {
        dir.map(r=> JSON.stringify(r))
      }
    </div>
  )
}

Home.getInitialProps = (ctx) => {
  const fs = require('fs')
  const path = require('path')


  const paths = ctx.query.dir
  const pathText = paths.join('/')
  paths.unshift('./files')

  console.log()
  const dir = fs.readdirSync(path.join(...paths))

  return { dir: dir.map(el=> { return { isDir: fs.lstatSync(path.join(...paths, el)).isDirectory(), name: el } } ).sort((x,y) => (x.isDir===y.isDir) ? 0 : x.isDir? -1 : 1), path: pathText }
}
export default Home