

import React from 'react';
import HTMLHighlight from '../HTMLHighlight'
import { shallow } from 'enzyme';

describe('highlightHTMLContent', () => {

  test('highlightHTMLContent should correctly highlight content', () => {
    const wrapper = shallow(<HTMLHighlight/>);
    const instance = wrapper.instance(); 

    const htmlContent = '<p>This is a <b>sample</b> HTML <i>content</i>.</p>';
    const plainText = 'This is a sample HTML content.';
    const plainTextPositions = [
      { start: 0, end: 4 },
      { start: 8, end: 14 },
      { start: 16, end: 23 }
    ];

    const highlightedContent = instance.highlightHTMLContent(htmlContent, plainText, plainTextPositions);
    const expectedOutput = '<p><span style="background-color: yellow;">This</span> is a <b><span style="background-color: yellow;">sample</span></b> HTML <i><span style="background-color: yellow;">content</span></i>.</p>';
    expect(highlightedContent).toEqual(expectedOutput);
  });
  
  
    test('to handle positions that go beyond plainText length', () => {
      const wrapper = shallow(<HTMLHighlight/>);
      const instance = wrapper.instance(); 
      const invalidPositions = [
        { start: 0, end: 100 },
        { start: 5, end: 100 }
      ];
      const highlightedResult = instance.highlightHTMLContent(htmlContent, plainText, invalidPositions);
      expect(highlightedResult).toEqual(htmlContent);
    });
  
    test('to handle empty plainTextPositions array', () => {
      const wrapper = shallow(<HTMLHighlight/>);
      const instance = wrapper.instance(); 
      const emptyPositions = [];
      const highlightedResult = instance.highlightHTMLContent(htmlContent, plainText, emptyPositions);
      expect(highlightedResult).toEqual(htmlContent);
    });
  });
  
  
  
  
  
  