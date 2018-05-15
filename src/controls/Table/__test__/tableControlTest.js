/* @flow */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import Table from '..';
import defaultToolbar from '../../../config/defaultToolbar';
import ModalHandler from '../../../event-handler/modals';
import localeTranslations from '../../../i18n';

describe('Table test suite', () => {
  const contentTables = convertFromHTML('<table><tr><td>test</td></tr></table>');
  const contentState = ContentState.createFromBlockArray(contentTables);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div at root when rendered', () => {
    const block = mount(
      <Table
        onChange={() => { }}
        editorState={editorState}
        config={{ ...defaultToolbar.blockType, inDropdown: false }}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(block.html().startsWith('<div')).to.equal(true);
  });

  it('should have a dropdown child component defined', () => {
    const block = mount(
      <Table
        onChange={() => { }}
        editorState={editorState}
        config={defaultToolbar.blockType}
        modalHandler={new ModalHandler()}
        translations={localeTranslations.en}
      />,
    );
    expect(block.find('Dropdown').length).to.equal(1);
  });

  it('should have 9 child elements when inDropdown is false', () => {
    const block = mount(
      <Table
        onChange={() => { }}
        editorState={editorState}
        config={{ ...defaultToolbar.blockType, inDropdown: false }}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(block.find('Option').length).to.equal(9);
  });
});
