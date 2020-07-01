import Head from 'next/head'
import { Table, Icon } from 'semantic-ui-react'

function Home({ path, dir }) {
  return (
    <div className="ui top container">
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
                <a href={"/" + path.split('/').slice(0, path.split('/').length-1).join('/')}>..</a>
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
            <Table.Cell>
              {r.isDir ? '' : FileSize(r.size)}
            </Table.Cell>

            <Table.Cell textAlign="right">
            {r.isDir ? '' : <a href={r.name} download><Icon className="cloud download"/></a>}
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

Home.getInitialProps = (ctx) => {
  try {
  const fs = require('fs')
  const path = require('path')


  const pathText = ctx.query.dir.join('/')
  const paths = pathText.split('/')
  paths.unshift('./public/files')

  const dir = fs.readdirSync(path.join(...paths))

  return { dir: dir.map(el=> { 
    const stat = fs.lstatSync(path.join(...paths, el))
    return { isDir: stat.isDirectory(), name: el, size: stat.size }
  } ).sort((x,y) => (x.isDir===y.isDir) ? 0 : x.isDir? -1 : 1) , path: pathText}
  } catch(e){
    console.log(e)
    const paths = ctx.query.dir
    const pathText = paths.join('/')
    return { dir: [],  path: pathText }
  }

}
export default Home

function FileSize(bytes, si=false, dp=1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si 
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
}