import TestBase from "../../TestBase";
import {TwingEnvironmentOptions} from "../../../../../src/lib/environment-options";

export class Test extends TestBase {
    getDescription() {
        return 'Twing supports array notation';
    }

    getTemplates() {
        return {
            'index.twig': `
{# empty array #}
{{ []|join(',') }}

{{ [1, 2]|join(',') }}
{{ ['foo', "bar"]|join(',') }}
{{ {0: 1, 'foo': 'bar'}|join(',') }}
{{ {0: 1, 'foo': 'bar'}|keys|join(',') }}

{{ {0: 1, foo: 'bar'}|join(',') }}
{{ {0: 1, foo: 'bar'}|keys|join(',') }}

{# nested arrays #}
{% set a = [1, 2, [1, 2], {'foo': {'foo': 'bar'}}] %}
{{ a[2]|join(',') }}
{{ a[3]["foo"]|join(',') }}

{# works even if [] is used inside the array #}
{{ [foo[bar]]|join(',') }}

{# elements can be any expression #}
{{ ['foo'|upper, bar|upper, bar == foo]|join(',') }}

{# arrays can have a trailing , like in PHP #}
{{
  [
    1,
    2,
  ]|join(',')
}}

{# keys can be any expression #}
{% set a = 1 %}
{% set b = "foo" %}
{% set ary = { (a): 'a', (b): 'b', 'c': 'c', (a ~ b): 'd' } %}
{{ ary|keys|join(',') }}
{{ ary|join(',') }}

{# ArrayAccess #}
{{ array_access['a'] }}

{# array that does not exist #}
{{ does_not_exist[0]|default('ok') }}
{{ does_not_exist[0].does_not_exist_either|default('ok') }}
{{ does_not_exist[0]['does_not_exist_either']|default('ok') }}`
        };
    }

    getExpected() {
        return `
1,2
foo,bar
1,bar
0,foo

1,bar
0,foo

1,2
bar

bar

FOO,BAR,

1,2

1,foo,c,1foo
a,b,c,d

b

ok
ok
ok`;
    }

    getContext() {
        return {
            bar: 'bar',
            foo: new Map([['bar', 'bar']]),
            array_access: new Map([['a', 'b']])
        };
    }
}

export class StrictVariablesSetToFalse extends Test {
    getDescription(): string {
        return super.getDescription() + ' (strict_variables set to false)';
    }

    getEnvironmentOptions(): TwingEnvironmentOptions {
        return {
            strict_variables: false
        }
    }
}
