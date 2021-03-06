/*jslint node: true, indent: 2 */
'use strict';
var body = require('./helper/body');

module.exports = function (node) {

  if (!node.children || node.children.length === 0) {
    return '';
  }

  var codegen = this.process.bind(this), str = '<?php' + this.nl;
  if (node.children[0].kind === 'inline') {
    str = node.children[0].value + str;
    node.children.shift();
  }
  if (
    !this.forceNamespaceBrackets &&
      node.children.length === 1 &&
      node.children[0].kind === 'namespace'
  ) {
    return str + 'namespace ' + node.children[0].name + ';' +
      this.nl + this.nl +
      body(
        codegen,
        '',
        this.indent,
        this.nl,
        node.children[0].children,
        true
      );
  }
  return str + body(codegen, '', this.indent, this.nl, node.children, true);
};
