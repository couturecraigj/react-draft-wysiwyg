/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSelectedBlocksType } from 'draftjs-utils';
import { RichUtils } from 'draft-js';

import LayoutComponent from './Component';

class TableType extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    expanded: false,
    currentTableType: 'unstyled',
  };

  componentWillMount(): void {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
      this.setState({
        currentTableType: getSelectedBlocksType(editorState),
      });
    }
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        currentTableType: getSelectedBlocksType(properties.editorState),
      });
    }
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  onExpandEvent: Function = (): void => {
    this.signalExpanded = !this.state.expanded;
  };

  expandCollapse: Function = (): void => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  }

  tablesTypes: Array<Object> = [
    { label: 'Normal', style: 'unstyled' },
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'tablequote' },
    { label: 'Code', style: 'code' },
  ];

  doExpand: Function = (): void => {
    this.setState({
      expanded: true,
    });
  };

  doCollapse: Function = (): void => {
    this.setState({
      expanded: false,
    });
  };

  toggleTableType: Function = (tableType: string) => {
    const tableTypeValue = this.tablesTypes.find(bt => bt.label === tableType).style;
    const { editorState, onChange } = this.props;
    const newState = RichUtils.toggleTableType(
      editorState,
      tableTypeValue,
    );
    if (newState) {
      onChange(newState);
    }
  };

  render(): Object {
    const { config, translations } = this.props;
    const { expanded, currentTableType } = this.state;
    const TableTypeComponent = config.component || LayoutComponent;
    const tableType = this.tablesTypes.find(bt => bt.style === currentTableType);
    return (
      <TableTypeComponent
        config={config}
        translations={translations}
        currentState={{ tableType: tableType && tableType.label }}
        onChange={this.toggleTableType}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
      />
    );
  }
}

export default TableType;
