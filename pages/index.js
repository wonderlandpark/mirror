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
      <h1 className="ui header">Welcome to WonderLand</h1>

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
            <Table.Cell>
              {r.isDir ? '' : FileSize(r.size)}
            </Table.Cell>

            <Table.Cell textAlign="right">
            {r.isDir ? '' : <a href={`/files/${r.name}`} download><Icon className="cloud download"/></a>}
            </Table.Cell>
            
          </Table.Row>
            </>
          )
        }
      </Table.Body>
    </Table>
    <div className="ui right aligned container">This Website is made with ❤️<br/><a href="https://github.com/wonderlandpark/mirror">Github</a></div>
    </div>
  )
}

Home.getInitialProps = () => {
  const fs = require('fs')
  const path = require('path')

  const dir = fs.readdirSync('./public/files')

  return { dir: dir.map(el=> { 
    const stat = fs.lstatSync(path.join('./public/files', el))
    return { isDir: stat.isDirectory(), name: el, size: stat.size }
  } ).sort((x,y) => (x.isDir===y.isDir) ? 0 : x.isDir? -1 : 1) }
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