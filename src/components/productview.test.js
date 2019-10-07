import React from 'react';
import { shallow } from 'enzyme';
import ProductView from './productview.jsx'
import ReactImageMagnify from 'react-image-magnify';

let wrapper;
let props = [ { id: 9000112,
  photoid: 'YpvmeZV5rfI',
  link:
   'https://images.unsplash.com/photo-1550548151-273c31c7edfb?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjcyNjg1fQ',
  username: 'hibow',
  productTag: 'Apple chips',
  tagID: 10 },
{ id: 9000113,
  photoid: 'e31ANd1PXUw',
  link:
   'https://images.unsplash.com/photo-1530319067432-f2a729c03db5?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjcyNjg1fQ',
  username: 'hibow',
  productTag: 'Apple chips',
  tagID: 10 },
{ id: 9000114,
  photoid: '0tNF_mHm_Ls',
  link:
   'https://images.unsplash.com/photo-1556557598-84d97035e37c?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjcyNjg1fQ',
  username: 'hibow',
  productTag: 'Apple chips',
  tagID: 10 },
{ id: 9000115,
  photoid: 'mqpGqcVQU2A',
  link:
   'https://images.unsplash.com/photo-1541356501913-031478b55680?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjcyNjg1fQ',
  username: 'hibow',
  productTag: 'Apple chips',
  tagID: 10 },
{ id: 9000116,
  photoid: '4JY0X81wthg',
  link:
   'https://images.unsplash.com/photo-1534882406436-6b6b0152efae?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjcyNjg1fQ',
  username: 'leftofsean',
  productTag: 'Apple chips',
  tagID: 10 } ];

beforeEach(() => {
  wrapper = shallow(<ProductView images = {props}/>);
  // wrapper.set
});

describe('Product view', () => {
  it('should contain photos', () => {
    expect(wrapper.find("img")).toBeTruthy();
  })

  it('should zoom in on photos', () => {
    expect(wrapper.find(ReactImageMagnify)).toBeTruthy();
  })
})