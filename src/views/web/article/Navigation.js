import React from 'react'
import { Anchor } from 'antd'

const { Link } = Anchor

//根据article来生成锚点列表
function getAnchorList(str, pathname) {
  const pattern = /<(h[1-6])[\s\S]+?(?=<\/\1>)/g;
  const list = [];

  function pushItem(arr, item){
    const len = arr.length;
    const matchItem = arr[len-1];
    if (matchItem && matchItem.tag !== item.tag) {
      pushItem(matchItem.children, item);
    } else {
      arr.push(item);
    }

  }

  str.replace(pattern, ($0, $1) => {
    // console.log('$0: ', $0, '$1: ',  $1)
    const title = $0.replace(/.*?>/, '');
    const startIndex = $0.indexOf('"');
    const endIndex = $0.indexOf('">');

    const href = `/#${pathname}${$0.slice(startIndex + 1, endIndex)}`;
// console.log("href: ", href)
    const currentItem = {
      tag: $1, //标签类型
      title,
      href,
      children: []
    }
    pushItem(list, currentItem);
  })

  return list;
}

const Navigation = ({ content, pathname }) => {

  const list = getAnchorList(content, pathname);
  // console.log("after content: ", content)
  function renderLink({ href, title, children }){
    return (
      <Link key={href} href={href} title={title}>
        {children.length > 0 && children.map(sub => renderLink(sub))}
      </Link>
    )
  }
  return <Anchor affix={false}>{ list.map(renderLink) }</Anchor>
}

export default Navigation;