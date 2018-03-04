const TwingTestCompilerStub = require('../../../../../compiler-stub');
const TwingNodeExpressionConditional = require('../../../../../../lib/twing/node/expression/conditional').TwingNodeExpressionConditional;
const TwingNodeExpressionConstant = require('../../../../../../lib/twing/node/expression/constant').TwingNodeExpressionConstant;

const tap = require('tap');

tap.test('node/expression/conditional', function (test) {
    test.test('constructor', function (test) {
        let expr1 = new TwingNodeExpressionConstant(1, 1);
        let expr2 = new TwingNodeExpressionConstant(2, 1);
        let expr3 = new TwingNodeExpressionConstant(3, 1);
        let node = new TwingNodeExpressionConditional(expr1, expr2, expr3, 1);

        test.same(node.getNode('expr1'), expr1);
        test.same(node.getNode('expr2'), expr2);
        test.same(node.getNode('expr3'), expr3);

        test.end();
    });

    test.test('compile', function (test) {
        let compiler = new TwingTestCompilerStub();

        let expr1 = new TwingNodeExpressionConstant(1, 1);
        let expr2 = new TwingNodeExpressionConstant(2, 1);
        let expr3 = new TwingNodeExpressionConstant(3, 1);
        let node = new TwingNodeExpressionConditional(expr1, expr2, expr3, 1);

        test.same(compiler.compile(node).getSource(), '((1) ? (2) : (3))');
        test.end();
    });

    test.end();
});